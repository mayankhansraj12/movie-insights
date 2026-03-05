// Shared TypeScript interfaces for movie data

export interface SentimentResult {
    summary: string;
    classification: "POSITIVE" | "MIXED" | "NEGATIVE";
}

export interface MovieData {
    title: string;
    year: string;
    rating: string;
    plot: string;
    poster: string | null;
    cast: string[];
    genre: string;
    sentiment?: SentimentResult;
    sentimentError?: boolean;
    fromCache?: boolean;
}

// Mongoose document interface for the cache
export interface ICachedMovie {
    imdbId: string;
    title: string;
    year: string;
    rating: string;
    plot: string;
    poster: string | null;
    cast: string[];
    genre: string;
    sentiment: SentimentResult;
    cachedAt: Date;
}
