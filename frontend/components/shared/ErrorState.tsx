"use client";

import { Film, Search, AlertCircle } from "lucide-react";
import Link from "next/link";

type ErrorType = "invalid-id" | "not-found" | "server-error";

interface ErrorStateProps {
    type: ErrorType;
    id?: string;
    onRetry?: () => void;
}

const errorConfig: Record<
    ErrorType,
    { icon: React.ReactNode; title: string; message: string; showRetry?: boolean }
> = {
    "invalid-id": {
        icon: <Film size={48} style={{ color: "var(--text-muted)" }} />,
        title: "Invalid IMDb ID",
        message: 'IDs follow the format: "tt" followed by 7–8 digits. Example: tt0133093',
    },
    "not-found": {
        icon: <Search size={48} style={{ color: "var(--text-muted)" }} />,
        title: "No Movie Found",
        message: "We couldn't find a movie for that ID. Double-check it on imdb.com and try again.",
    },
    "server-error": {
        icon: <AlertCircle size={48} style={{ color: "var(--text-muted)" }} />,
        title: "Something Went Wrong",
        message: "We had trouble loading this movie. This is likely temporary.",
        showRetry: true,
    },
};

export default function ErrorState({ type, id, onRetry }: ErrorStateProps) {
    const config = errorConfig[type];

    return (
        <div className="flex items-center justify-center min-h-[50vh] px-4 animate-fade-in">
            <div
                className="text-center rounded-2xl p-8 sm:p-10 max-w-[420px] w-full"
                style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-card)",
                }}
            >
                {/* Icon */}
                <div className="flex justify-center mb-4">{config.icon}</div>

                {/* Title */}
                <h2
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                >
                    {config.title}
                </h2>

                {/* Message */}
                {id && (
                    <p
                        className="text-sm mb-1 font-mono"
                        style={{ color: "var(--accent)" }}
                    >
                        &quot;{id}&quot;
                    </p>
                )}
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                    {config.message}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {config.showRetry && onRetry && (
                        <button
                            onClick={onRetry}
                            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                            style={{
                                backgroundColor: "var(--accent)",
                                color: "#ffffff",
                            }}
                            onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                "var(--accent-hover)")
                            }
                            onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                                "var(--accent)")
                            }
                        >
                            ↺ Retry
                        </button>
                    )}
                    <Link
                        href="/"
                        className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all inline-block"
                        style={{
                            backgroundColor: "var(--bg-elevated)",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--border-default)",
                        }}
                    >
                        ← Back to Search
                    </Link>
                </div>
            </div>
        </div>
    );
}
