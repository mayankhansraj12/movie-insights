"use client";

import Image from "next/image";
import { Film } from "lucide-react";
import RatingRing from "./RatingRing";

interface MovieHeroProps {
    title: string;
    year: string;
    rating: string;
    genre: string;
    poster: string | null;
}

export default function MovieHero({ title, year, rating, genre, poster }: MovieHeroProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Poster + Rating Ring stacked */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3 mx-auto sm:mx-0">
                {/* Poster */}
                {poster ? (
                    <div
                        className="relative overflow-hidden rounded-xl transition-all duration-250"
                        style={{
                            width: "140px",
                            height: "210px",
                            boxShadow: "var(--shadow-card)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-hover)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                            (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card)";
                        }}
                    >
                        <Image
                            src={poster}
                            alt={`${title} poster`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 140px, 200px"
                            priority
                        />
                    </div>
                ) : (
                    /* Fallback poster */
                    <div
                        className="flex flex-col items-center justify-center rounded-xl gap-2"
                        style={{
                            width: "140px",
                            height: "210px",
                            background:
                                "linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)",
                            border: "1px solid var(--border-subtle)",
                            boxShadow: "var(--shadow-card)",
                        }}
                    >
                        <Film size={32} style={{ color: "var(--text-muted)" }} />
                        <span className="text-xs text-center px-2" style={{ color: "var(--text-muted)" }}>
                            No poster
                        </span>
                    </div>
                )}

                {/* Rating Ring — centred below poster */}
                <RatingRing rating={rating} size={88} />
            </div>

            {/* Movie Details */}
            <div className="flex-1 min-w-0">
                {/* Title */}
                <h1
                    className="font-bold mb-2 leading-tight"
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        letterSpacing: "-0.02em",
                        color: "var(--text-primary)",
                    }}
                >
                    {title}
                </h1>

                {/* Meta row: year · genre */}
                <div
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    <span>{year}</span>
                    {genre && (
                        <>
                            <span style={{ color: "var(--border-strong)" }}>·</span>
                            <span>{genre}</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

