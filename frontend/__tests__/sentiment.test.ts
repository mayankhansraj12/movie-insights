import { describe, it, expect } from "vitest";

// Inline the parsing logic to test it in isolation
function parseSentimentResponse(raw: string) {
    const clean = raw.replace(/```json|```/g, "").trim();
    let parsed: { summary: string; sentiment: string };
    try {
        parsed = JSON.parse(clean);
    } catch {
        return {
            summary: "Sentiment analysis could not be generated for this film.",
            classification: "MIXED" as const,
        };
    }

    const allowed = ["POSITIVE", "MIXED", "NEGATIVE"];
    const classification = allowed.includes(parsed.sentiment)
        ? (parsed.sentiment as "POSITIVE" | "MIXED" | "NEGATIVE")
        : "MIXED";

    return { summary: parsed.summary, classification };
}

describe("sentiment response parser", () => {
    it("parses a valid JSON response correctly", () => {
        const raw = JSON.stringify({ summary: "Great film!", sentiment: "POSITIVE" });
        const result = parseSentimentResponse(raw);
        expect(result.summary).toBe("Great film!");
        expect(result.classification).toBe("POSITIVE");
    });

    it("handles JSON wrapped in markdown fences", () => {
        const raw = "```json\n{\"summary\":\"Mixed reactions.\",\"sentiment\":\"MIXED\"}\n```";
        const result = parseSentimentResponse(raw);
        expect(result.classification).toBe("MIXED");
    });

    it("returns MIXED fallback for malformed JSON", () => {
        const result = parseSentimentResponse("not valid json at all");
        expect(result.classification).toBe("MIXED");
        expect(result.summary).toContain("could not be generated");
    });

    it("falls back to MIXED when sentiment label is invalid", () => {
        const raw = JSON.stringify({ summary: "Some summary.", sentiment: "AWESOME" });
        const result = parseSentimentResponse(raw);
        expect(result.classification).toBe("MIXED");
    });

    it("correctly identifies a NEGATIVE classification", () => {
        const raw = JSON.stringify({ summary: "Poorly received.", sentiment: "NEGATIVE" });
        const result = parseSentimentResponse(raw);
        expect(result.classification).toBe("NEGATIVE");
    });
});
