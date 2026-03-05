interface PlotSummaryProps {
    plot: string;
}

export default function PlotSummary({ plot }: PlotSummaryProps) {
    return (
        <div>
            <h3
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-muted)" }}
            >
                Plot
            </h3>
            <p
                className="leading-relaxed"
                style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.7" }}
            >
                {plot}
            </p>
        </div>
    );
}
