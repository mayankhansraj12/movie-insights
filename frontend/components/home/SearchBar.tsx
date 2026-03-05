"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { isValidImdbId } from "@/lib/validators";

const EXAMPLE_IDS = [
    { id: "tt0133093", title: "The Matrix" },
    { id: "tt0468569", title: "The Dark Knight" },
    { id: "tt1375666", title: "Inception" },
];

export default function SearchBar() {
    const [inputValue, setInputValue] = useState("");
    const [validationError, setValidationError] = useState("");
    const [shaking, setShaking] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        const trimmed = inputValue.trim();

        if (!isValidImdbId(trimmed)) {
            setValidationError("Please enter a valid IMDb ID (e.g. tt0133093)");
            setShaking(true);
            setTimeout(() => setShaking(false), 400);
            return;
        }

        setValidationError("");
        router.push(`/movie/${trimmed}`);
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") handleSubmit();
    }

    function fillExample(id: string) {
        setInputValue(id);
        setValidationError("");
    }

    const hasError = !!validationError;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Search row */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                {/* Input */}
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: hasError ? "var(--negative)" : isFocused ? "var(--accent)" : "var(--text-muted)" }}
                    />
                    <input
                        id="imdb-search-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (validationError) setValidationError("");
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="e.g. tt0133093"
                        className={`w-full pl-11 pr-10 rounded-xl text-base outline-none transition-all ${shaking ? "animate-shake" : ""}`}
                        style={{
                            height: "56px",
                            backgroundColor: "var(--bg-input)",
                            border: `1.5px solid ${hasError ? "var(--negative)" : isFocused ? "var(--accent)" : "var(--border-default)"}`,
                            color: "var(--text-primary)",
                            boxShadow: isFocused && !hasError
                                ? "0 0 0 3px var(--accent-muted), var(--glow-accent)"
                                : "none",
                        }}
                    />
                    {/* Clear button */}
                    {inputValue && (
                        <button
                            type="button"
                            onClick={() => { setInputValue(""); setValidationError(""); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-sm transition-all"
                            style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-elevated)" }}
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    id="get-insights-btn"
                    type="submit"
                    className="flex-shrink-0 sm:w-auto w-full rounded-xl font-semibold text-base transition-all"
                    style={{
                        height: "56px",
                        padding: "0 28px",
                        backgroundColor: "var(--accent)",
                        color: "#ffffff",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--accent-hover)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--accent)")
                    }
                >
                    Get Insights
                </button>
            </form>

            {/* Inline validation error */}
            {hasError && (
                <p
                    className="mt-2 text-sm flex items-center gap-1.5 animate-fade-in"
                    style={{ color: "var(--negative)" }}
                >
                    ⚠ {validationError}
                </p>
            )}

            {/* Example ID chips */}
            <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="text-xs self-center" style={{ color: "var(--text-muted)" }}>
                    try:
                </span>
                {EXAMPLE_IDS.map(({ id, title }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => fillExample(id)}
                        className="px-3 py-1.5 rounded-full text-xs transition-all"
                        style={{
                            backgroundColor: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-secondary)",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.borderColor = "var(--accent)";
                            el.style.color = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.borderColor = "var(--border-subtle)";
                            el.style.color = "var(--text-secondary)";
                        }}
                    >
                        <span className="font-mono">{id}</span>
                        <span style={{ color: "var(--text-muted)" }}> · {title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
