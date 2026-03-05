/**
 * Groq API client
 * Uses llama-3.1-8b-instant to generate audience sentiment analysis for a movie.
 * User-supplied imdbId is NEVER passed here — only OMDB-sourced data enters the prompt.
 */

import Groq from "groq-sdk";
import { SentimentResult } from "@/types/movie";

// Lazy-initialize client (avoids issues when env var not set during build)
let groqClient: Groq | null = null;

function getGroqClient(): Groq {
    if (!groqClient) {
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is not configured");
        }
        groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return groqClient;
}

const SYSTEM_PROMPT = `You are a film analyst AI. Given basic movie information, analyze how general audiences tend to receive the film based on its genre, plot, and critical rating. Respond ONLY with valid JSON — no markdown, no preamble, no explanation outside the JSON object.`;

export async function fetchSentimentFromGroq(
    title: string,
    year: string,
    plot: string,
    rating: string,
    genre: string
): Promise<SentimentResult> {
    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        max_tokens: 300,
        temperature: 0.7,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
                role: "user",
                content: `Movie: ${title} (${year})
Genre: ${genre}
IMDb Rating: ${rating}/10
Plot: ${plot}

Write a 2-3 paragraph summary of how audiences generally react to this film.
Classify sentiment as exactly one of: POSITIVE, MIXED, or NEGATIVE.

Respond ONLY with:
{ "summary": "...", "sentiment": "POSITIVE" | "MIXED" | "NEGATIVE" }`,
            },
        ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // Strip accidental markdown code fences before parsing
    const clean = raw.replace(/```json|```/g, "").trim();

    let parsed: { summary: string; sentiment: string };
    try {
        parsed = JSON.parse(clean);
    } catch {
        // If JSON parse fails entirely, return a safe fallback
        return {
            summary: "Sentiment analysis could not be generated for this film.",
            classification: "MIXED",
        };
    }

    // Validate classification is one of the three allowed values
    const allowed = ["POSITIVE", "MIXED", "NEGATIVE"];
    const classification = allowed.includes(parsed.sentiment)
        ? (parsed.sentiment as "POSITIVE" | "MIXED" | "NEGATIVE")
        : "MIXED";

    return {
        summary: parsed.summary ?? "No summary available.",
        classification,
    };
}
