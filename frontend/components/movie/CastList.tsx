"use client";

interface CastListProps {
    cast: string[];
}

export default function CastList({ cast }: CastListProps) {
    if (!cast || cast.length === 0) return null;

    return (
        <div>
            <h3
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-muted)" }}
            >
                Cast
            </h3>

            {/* horizontal scroll on mobile, wrap on desktop */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 sm:flex-wrap">
                {cast.map((actor) => (
                    <span
                        key={actor}
                        className="flex-shrink-0 px-3 py-1.5 rounded-full text-sm transition-all cursor-default"
                        style={{
                            backgroundColor: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-secondary)",
                            fontSize: "0.875rem",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLSpanElement;
                            el.style.backgroundColor = "var(--accent-muted)";
                            el.style.color = "var(--accent)";
                            el.style.borderColor = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLSpanElement;
                            el.style.backgroundColor = "var(--bg-elevated)";
                            el.style.color = "var(--text-secondary)";
                            el.style.borderColor = "var(--border-subtle)";
                        }}
                    >
                        {actor}
                    </span>
                ))}
            </div>
        </div>
    );
}
