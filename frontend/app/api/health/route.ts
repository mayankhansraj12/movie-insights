import { NextResponse } from "next/server";

export async function GET() {
    const results: Record<string, { ok: boolean; message: string }> = {};

    // ── 1. OMDB ────────────────────────────────────────────────
    try {
        const res = await fetch(
            `https://www.omdbapi.com/?i=tt0133093&plot=short&apikey=${process.env.OMDB_API_KEY}`,
            { next: { revalidate: 0 } }
        );
        const data = await res.json();
        if (data.Response === "True") {
            results.omdb = { ok: true, message: `✅ Connected — fetched "${data.Title}"` };
        } else {
            results.omdb = { ok: false, message: `❌ API returned error: ${data.Error}` };
        }
    } catch (e) {
        results.omdb = { ok: false, message: `❌ Network error: ${(e as Error).message}` };
    }

    // ── 2. Groq ────────────────────────────────────────────────
    try {
        const Groq = (await import("groq-sdk")).default;
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: 10,
            messages: [{ role: "user", content: "Reply with just: OK" }],
        });
        const reply = completion.choices[0]?.message?.content ?? "";
        results.groq = { ok: true, message: `✅ Connected — model replied: "${reply.trim()}"` };
    } catch (e) {
        results.groq = { ok: false, message: `❌ Error: ${(e as Error).message}` };
    }

    // ── 3. MongoDB ─────────────────────────────────────────────
    try {
        const { connectDB } = await import("@/lib/db");
        await connectDB();
        // Quick ping via mongoose connection state (1 = connected)
        const mongoose = (await import("mongoose")).default;
        const state = mongoose.connection.readyState;
        // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
        const stateLabel = ["disconnected", "connected", "connecting", "disconnecting"][state] ?? "unknown";
        if (state === 1) {
            results.mongodb = { ok: true, message: `✅ Connected — state: ${stateLabel}` };
        } else {
            results.mongodb = { ok: false, message: `❌ Not connected — state: ${stateLabel}` };
        }
    } catch (e) {
        results.mongodb = { ok: false, message: `❌ Error: ${(e as Error).message}` };
    }

    const allOk = Object.values(results).every((r) => r.ok);

    return NextResponse.json(
        { status: allOk ? "all_ok" : "degraded", services: results },
        { status: allOk ? 200 : 207 }
    );
}
