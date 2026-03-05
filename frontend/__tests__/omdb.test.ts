import { describe, it, expect } from "vitest";

// Inline OMDB mapping logic to test it in isolation
function mapOmdbResponse(data: {
    Response: "True" | "False";
    Error?: string;
    Title?: string;
    Year?: string;
    Genre?: string;
    Actors?: string;
    Plot?: string;
    Poster?: string;
    imdbRating?: string;
}) {
    if (data.Response === "False") {
        throw new Error(data.Error ?? "Movie not found");
    }

    return {
        title: data.Title!,
        year: data.Year!,
        rating: data.imdbRating === "N/A" ? "N/A" : data.imdbRating!,
        plot: data.Plot!,
        poster: data.Poster === "N/A" ? null : (data.Poster ?? null),
        cast: (data.Actors ?? "").split(", ").slice(0, 5),
        genre: data.Genre!,
    };
}

describe("OMDB response mapper", () => {
    it('maps Poster "N/A" to null', () => {
        const result = mapOmdbResponse({
            Response: "True",
            Title: "Test Movie",
            Year: "2020",
            Genre: "Drama",
            Actors: "Actor A",
            Plot: "A test plot.",
            Poster: "N/A",
            imdbRating: "7.5",
        });
        expect(result.poster).toBeNull();
    });

    it("preserves a real poster URL", () => {
        const url = "https://m.media-amazon.com/images/test.jpg";
        const result = mapOmdbResponse({
            Response: "True",
            Title: "Test",
            Year: "2020",
            Genre: "Drama",
            Actors: "Actor A",
            Plot: "Plot.",
            Poster: url,
            imdbRating: "7.5",
        });
        expect(result.poster).toBe(url);
    });

    it("splits the actors string into an array correctly", () => {
        const result = mapOmdbResponse({
            Response: "True",
            Title: "Test",
            Year: "2020",
            Genre: "Action",
            Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, Joe Pantoliano",
            Plot: "A plot.",
            Poster: "N/A",
            imdbRating: "8.7",
        });
        expect(result.cast).toEqual([
            "Keanu Reeves",
            "Laurence Fishburne",
            "Carrie-Anne Moss",
            "Hugo Weaving",
            "Joe Pantoliano",
        ]);
        expect(result.cast.length).toBe(5);
    });

    it('throws an error when Response is "False"', () => {
        expect(() =>
            mapOmdbResponse({ Response: "False", Error: "Movie not found!" })
        ).toThrow("Movie not found!");
    });

    it('maps imdbRating "N/A" to "N/A" string', () => {
        const result = mapOmdbResponse({
            Response: "True",
            Title: "Test",
            Year: "2020",
            Genre: "Drama",
            Actors: "Actor A",
            Plot: "Plot.",
            Poster: "N/A",
            imdbRating: "N/A",
        });
        expect(result.rating).toBe("N/A");
    });
});
