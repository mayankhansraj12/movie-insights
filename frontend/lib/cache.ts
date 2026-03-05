import MovieModel from "@/models/Movie";
import { MovieData } from "@/types/movie";

/**
 * Read a cached movie doc from MongoDB by IMDb ID.
 * Returns null on cache miss or any DB error.
 */
export async function readCache(imdbId: string): Promise<MovieData | null> {
    try {
        const doc = await MovieModel.findOne({ imdbId }).lean();
        if (!doc) return null;

        return {
            title: doc.title,
            year: doc.year,
            rating: doc.rating,
            plot: doc.plot,
            poster: doc.poster,
            cast: doc.cast,
            genre: doc.genre,
            sentiment: doc.sentiment,
            fromCache: true,
        };
    } catch {
        return null;
    }
}

/**
 * Write or update a movie doc in the cache (upsert).
 * Silently swallows failures — caching is best-effort.
 */
export async function writeCache(imdbId: string, data: MovieData): Promise<void> {
    try {
        await MovieModel.findOneAndUpdate(
            { imdbId },
            {
                $set: {
                    ...data,
                    cachedAt: new Date(),
                },
            },
            { upsert: true, returnDocument: "after" }
        );
    } catch (err) {
        // Cache write failure is non-fatal — log but don't throw
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[cache] Failed to write cache for ${imdbId}: ${msg}`);
    }
}
