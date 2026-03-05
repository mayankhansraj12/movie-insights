import { NextRequest, NextResponse } from "next/server";
import { isValidImdbId } from "@/lib/validators";
import { connectDB } from "@/lib/db";
import { readCache, writeCache } from "@/lib/cache";
import { fetchMovieFromOmdb } from "@/lib/omdb";
import { fetchSentimentFromGroq } from "@/lib/groq";

// OMDB returns these exact strings when a movie isn't found
const NOT_FOUND_MESSAGES = ["movie not found", "incorrect imdb id"];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id") ?? "";

        // Server-side validation (in addition to client-side)
        if (!isValidImdbId(id)) {
            return NextResponse.json({ error: "Invalid IMDb ID format" }, { status: 400 });
        }

        // Try to connect to MongoDB (failure is non-fatal)
        let dbConnected = false;
        try {
            await connectDB();
            dbConnected = true;
        } catch (err) {
            console.error("[api/movie] MongoDB connection failed, proceeding without cache:", err);
        }

        // Check MongoDB cache first
        if (dbConnected) {
            const cached = await readCache(id);
            if (cached) {
                return NextResponse.json(cached, { status: 200 });
            }
        }

        // Cache miss — fetch live data from OMDB
        let movieData: Awaited<ReturnType<typeof fetchMovieFromOmdb>>;
        try {
            movieData = await fetchMovieFromOmdb(id);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch movie data";
            const lower = message.toLowerCase();
            // Check against known OMDB "not found" messages
            const is404 = NOT_FOUND_MESSAGES.some((m) => lower.includes(m));
            return NextResponse.json({ error: message }, { status: is404 ? 404 : 500 });
        }

        // Fetch AI sentiment from Groq (failure is non-fatal — partial response allowed)
        let sentiment = undefined;
        let sentimentError = false;
        try {
            sentiment = await fetchSentimentFromGroq(
                movieData.title,
                movieData.year,
                movieData.plot,
                movieData.rating,
                movieData.genre
            );
        } catch (err) {
            console.error("[api/movie] Groq sentiment failed:", err);
            sentimentError = true;
        }

        const fullData = {
            ...movieData,
            ...(sentiment ? { sentiment } : {}),
            sentimentError,
            fromCache: false,
        };

        // Write to cache (best-effort, non-fatal)
        if (dbConnected && sentiment) {
            await writeCache(id, { ...movieData, sentiment });
        }

        return NextResponse.json(fullData, { status: 200 });
    } catch (err) {
        // Top-level safety net — ensures we always return structured JSON
        console.error("[api/movie] Unhandled error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

