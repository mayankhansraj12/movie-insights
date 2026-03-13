"use client";


import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import ErrorState from "@/components/shared/ErrorState";
import MovieHero from "@/components/movie/MovieHero";
import CastList from "@/components/movie/CastList";
import PlotSummary from "@/components/movie/PlotSummary";
import SentimentCard from "@/components/movie/SentimentCard";
import ShareButton from "@/components/shared/ShareButton";
import { useMovie } from "@/hooks/useMovie";
import { isValidImdbId } from "@/lib/validators";

interface MoviePageProps {
    params: { id: string };
}

export default function MoviePage({ params }: MoviePageProps) {
    const { id } = params;
    const { data, loading, error, retry } = useMovie(id);

    // Determine error type for the error state component
    function getErrorType(): "invalid-id" | "not-found" | "server-error" {
        if (!isValidImdbId(id)) return "invalid-id";
        if (error?.toLowerCase().includes("not found") || error?.toLowerCase().includes("incorrect imdb")) return "not-found";
        return "server-error";
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
                {/* Top nav row: back link + share button */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm transition-all hover:opacity-70"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        <ArrowLeft size={16} />
                        Back to Search
                    </Link>
                    {data && <ShareButton title={data.title} />}
                </div>

                {/* Loading state */}
                {loading && <SkeletonLoader />}

                {/* Error state — pass retry for server errors */}
                {!loading && error && (
                    <ErrorState
                        type={getErrorType()}
                        id={id}
                        onRetry={getErrorType() === "server-error" ? retry : undefined}
                    />
                )}

                {/* Success state — staggered fade-in */}
                {!loading && !error && data && (
                    <div className="space-y-5">
                        {/* Hero Card: poster + title + cast */}
                        <div
                            className="rounded-2xl p-6 sm:p-8 animate-fade-in-up"
                            style={{
                                backgroundColor: "var(--bg-surface)",
                                border: "1px solid var(--border-subtle)",
                                boxShadow: "var(--shadow-card)",
                                animationDelay: "0ms",
                            }}
                        >
                            <MovieHero
                                title={data.title}
                                year={data.year}
                                rating={data.rating}
                                genre={data.genre}
                                poster={data.poster}
                            />

                            {data.cast && data.cast.length > 0 && (
                                <div
                                    className="mt-5 pt-5"
                                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                                >
                                    <CastList cast={data.cast} />
                                </div>
                            )}
                        </div>

                        {/* Plot Card */}
                        <div
                            className="rounded-2xl p-6 sm:p-8 animate-fade-in-up"
                            style={{
                                backgroundColor: "var(--bg-surface)",
                                border: "1px solid var(--border-subtle)",
                                boxShadow: "var(--shadow-card)",
                                animationDelay: "80ms",
                            }}
                        >
                            <PlotSummary plot={data.plot} />
                        </div>

                        {/* AI Sentiment Card */}
                        <SentimentCard
                            sentiment={data.sentiment}
                            sentimentError={data.sentimentError}
                            movieContext={{
                                title: data.title,
                                year: data.year,
                                plot: data.plot,
                                rating: data.rating,
                                genre: data.genre,
                            }}
                        />

                        {/* Cache indicator */}
                        {data.fromCache && (
                            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                                ⚡ Served from cache
                            </p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
