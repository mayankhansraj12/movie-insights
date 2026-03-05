"use client";

import { Sparkles, AlertTriangle, Loader2 } from "lucide-react";
import SentimentBadge from "./SentimentBadge";
import { SentimentResult } from "@/types/movie";
import { useState } from "react";

interface SentimentCardProps {
    sentiment?: SentimentResult;
    sentimentError?: boolean;
    movieContext?: {
        title: string;
        year: string;
        plot: string;
        rating: string;
        genre: string;
    };
}

export default function SentimentCard({
    sentiment,
    sentimentError,
    movieContext,
}: SentimentCardProps) {
    const [retrying, setRetrying] = useState(false);
    const [retryResult, setRetryResult] = useState<SentimentResult | null>(null);
    const [retryFailed, setRetryFailed] = useState(false);

    const currentSentiment = retryResult ?? sentiment;
    const showError = (sentimentError || retryFailed) && !retryResult;

    async function handleRetry() {
        if (!movieContext) return;
        setRetrying(true);
        setRetryFailed(false);
        try {
            const res = await fetch("/api/sentiment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(movieContext),
            });
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            setRetryResult(data);
        } catch {
            setRetryFailed(true);
        } finally {
            setRetrying(false);
        }
    }

    return (
        <div
            className="rounded-2xl p-6 sm:p-8 animate-fade-in-up"
            style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
                animationDelay: "200ms",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Sparkles size={18} style={{ color: "var(--accent)" }} />
                    <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                        AI Audience Insight
                    </h3>
                </div>
                {currentSentiment && (
                    <SentimentBadge classification={currentSentiment.classification} />
                )}
            </div>

            {/* Divider */}
            <div
                className="mb-5"
                style={{ height: "1px", backgroundColor: "var(--border-subtle)" }}
            />

            {/* Content */}
            {showError ? (
                /* Partial failure state */
                <div className="text-center py-2">
                    <AlertTriangle
                        size={24}
                        className="mx-auto mb-3"
                        style={{ color: "var(--mixed)" }}
                    />
                    <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                        Sentiment analysis is temporarily unavailable. The movie details above are accurate.
                    </p>
                    {movieContext && (
                        <button
                            onClick={handleRetry}
                            disabled={retrying}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: "var(--bg-elevated)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--border-default)",
                            }}
                        >
                            {retrying ? (
                                <>
                                    <Loader2 size={14} className="animate-spin-slow" />
                                    Retrying...
                                </>
                            ) : (
                                "↺ Retry Sentiment"
                            )}
                        </button>
                    )}
                </div>
            ) : currentSentiment ? (
                /* Sentiment summary */
                <p
                    className="leading-relaxed"
                    style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7" }}
                >
                    &ldquo;{currentSentiment.summary}&rdquo;
                </p>
            ) : null}

            {/* Footer */}
            {currentSentiment && (
                <>
                    <div
                        className="mt-5 mb-3"
                        style={{ height: "1px", backgroundColor: "var(--border-subtle)" }}
                    />
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Powered by Groq · llama-3.1-8b-instant
                    </p>
                </>
            )}
        </div>
    );
}
