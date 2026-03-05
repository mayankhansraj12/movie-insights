"use client";

import { useState, useEffect, useCallback } from "react";
import { MovieData } from "@/types/movie";

export function useMovie(imdbId: string) {
    const [data, setData] = useState<MovieData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Incrementing this triggers a re-fetch when the user clicks Retry
    const [retryCount, setRetryCount] = useState(0);

    const retry = useCallback(() => {
        setData(null);
        setError(null);
        setRetryCount((c) => c + 1);
    }, []);

    useEffect(() => {
        if (!imdbId) return;

        // AbortController lets us cancel the in-flight request if the user
        // navigates away before the fetch completes
        const controller = new AbortController();

        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/movie?id=${imdbId}`, {
                    signal: controller.signal,
                });

                // Parse body once — it can only be consumed once
                const json = await res.json();

                if (!res.ok) {
                    throw new Error(json?.error ?? "Something went wrong");
                }
                setData(json);
            } catch (e) {
                // AbortError is expected on unmount, not a real error
                if ((e as Error).name === "AbortError") return;
                setError((e as Error).message ?? "Failed to load movie");
            } finally {
                setLoading(false);
            }
        }

        load();

        // Cleanup: cancel fetch if component unmounts mid-request
        return () => controller.abort();
    }, [imdbId, retryCount]);

    return { data, loading, error, retry };
}

