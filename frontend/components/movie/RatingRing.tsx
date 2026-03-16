"use client";

import { useEffect, useState } from "react";

interface RatingRingProps {
  rating: string; // e.g. "8.4" or "N/A"
  size?: number;  // diameter in px, default 88
}

function getColor(score: number): string {
  if (score >= 7.5) return "var(--positive)";
  if (score >= 5.5) return "var(--mixed)";
  return "var(--negative)";
}

export default function RatingRing({ rating, size = 88 }: RatingRingProps) {
  const score = parseFloat(rating);
  const isNA = isNaN(score);

  const radius = (size - 10) / 2;        // ring radius (leaves 5px stroke padding)
  const circumference = 2 * Math.PI * radius;
  const fraction = isNA ? 0 : score / 10; // 0–1

  // Animate the ring fill on mount
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  const strokeDashoffset = animated
    ? circumference * (1 - fraction)
    : circumference;

  const color = isNA ? "var(--text-muted)" : getColor(score);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      className="flex flex-col items-center gap-1 select-none"
      title={isNA ? "Rating unavailable" : `IMDb Rating: ${rating}/10`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }} // start arc from top
        aria-hidden="true"
      >
        {/* Track (background circle) */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={5}
        />
        {/* Progress arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 900ms cubic-bezier(0.4, 0, 0.2, 1)",
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>

      {/* Score label — rotated back to upright, overlaid on the SVG */}
      <div
        style={{
          marginTop: `-${size + 6}px`, // pull up, overlap the SVG
          width: size,
          height: size,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <span
          className="font-bold leading-none"
          style={{
            fontSize: size * 0.27,
            color,
          }}
        >
          {isNA ? "N/A" : rating}
        </span>
        {!isNA && (
          <span
            className="leading-none"
            style={{
              fontSize: size * 0.13,
              color: "var(--text-muted)",
              marginTop: 2,
            }}
          >
            / 10
          </span>
        )}
      </div>

      {/* IMDb label below ring */}
      <span
        className="font-semibold tracking-wide"
        style={{ fontSize: 10, color: "var(--text-muted)", marginTop: -size + 10 }}
      >
        IMDb
      </span>
    </div>
  );
}
