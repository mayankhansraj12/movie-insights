// API request and response shape types

export interface MovieApiSuccessResponse {
    title: string;
    year: string;
    rating: string;
    plot: string;
    poster: string | null;
    cast: string[];
    genre: string;
    sentiment?: {
        summary: string;
        classification: "POSITIVE" | "MIXED" | "NEGATIVE";
    };
    sentimentError?: boolean;
    fromCache?: boolean;
}

export interface MovieApiErrorResponse {
    error: string;
}

export type MovieApiResponse = MovieApiSuccessResponse | MovieApiErrorResponse;

// POST /api/sentiment request body
export interface SentimentApiRequest {
    title: string;
    year: string;
    plot: string;
    rating: string;
    genre: string;
}

// POST /api/sentiment response body
export interface SentimentApiResponse {
    summary: string;
    classification: "POSITIVE" | "MIXED" | "NEGATIVE";
}
