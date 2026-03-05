import { NextRequest, NextResponse } from "next/server";
import { fetchSentimentFromGroq } from "@/lib/groq";
import { SentimentApiRequest } from "@/types/api";

/**
 * POST /api/sentiment
 * Standalone endpoint for retrying sentiment analysis independently.
 * Called by the client if the initial /api/movie call returned sentimentError: true.
 */
export async function POST(request: NextRequest) {
    let body: SentimentApiRequest;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { title, year, plot, rating, genre } = body;
    if (!title || !plot) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const result = await fetchSentimentFromGroq(title, year, plot, rating, genre);
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        console.error("[api/sentiment] Groq call failed:", err);
        return NextResponse.json({ error: "Failed to generate sentiment" }, { status: 500 });
    }
}
