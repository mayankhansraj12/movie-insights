import mongoose, { Schema, Document } from "mongoose";
import { SentimentResult } from "@/types/movie";

export interface ICachedMovieDoc extends Document {
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

const MovieSchema = new Schema<ICachedMovieDoc>({
    imdbId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    year: { type: String, required: true },
    rating: { type: String, default: "N/A" },
    plot: { type: String, required: true },
    poster: { type: String, default: null },
    cast: { type: [String], default: [] },
    genre: { type: String, default: "" },
    sentiment: {
        summary: { type: String, required: true },
        classification: {
            type: String,
            enum: ["POSITIVE", "MIXED", "NEGATIVE"],
            required: true,
        },
    },
    cachedAt: { type: Date, default: Date.now },
});

// TTL index: MongoDB auto-deletes documents after 24 hours
MovieSchema.index({ cachedAt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.models.Movie ||
    mongoose.model<ICachedMovieDoc>("Movie", MovieSchema);
