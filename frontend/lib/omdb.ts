/**
 * OMDB API client
 * Fetches movie metadata by IMDb ID and maps the raw response to our internal shape.
 */

const OMDB_BASE = "https://www.omdbapi.com";

// Raw OMDB API response shape (only fields we use)
interface OmdbRaw {
    Response: "True" | "False";
    Error?: string;
    Title: string;
    Year: string;
    Genre: string;
    Actors: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
}

export async function fetchMovieFromOmdb(imdbId: string) {
    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) throw new Error("OMDB_API_KEY is not configured");

    const url = `${OMDB_BASE}/?i=${imdbId}&plot=short&apikey=${apiKey}`;

    // revalidate: 0 — always fetch fresh from OMDB (caching handled by MongoDB)
    const res = await fetch(url, { next: { revalidate: 0 } });

    if (!res.ok) throw new Error(`OMDB network error: ${res.status}`);

    const data: OmdbRaw = await res.json();

    if (data.Response === "False") {
        throw new Error(data.Error ?? "Movie not found");
    }

    // Map raw OMDB fields to our internal MovieData shape
    return {
        title: data.Title,
        year: data.Year,
        // If OMDB returns "N/A" for rating, keep it as "N/A"
        rating: data.imdbRating === "N/A" ? "N/A" : data.imdbRating,
        plot: data.Plot,
        // If OMDB returns "N/A" for poster, use null (triggers fallback image)
        poster: data.Poster === "N/A" ? null : data.Poster,
        // Guard: OMDB can return "N/A" or empty string for Actors
        cast:
            data.Actors && data.Actors !== "N/A"
                ? data.Actors.split(", ").slice(0, 5)
                : [],
        genre: data.Genre,
    };
}
