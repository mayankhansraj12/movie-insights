interface SentimentBadgeProps {
    classification: "POSITIVE" | "MIXED" | "NEGATIVE";
}

const badgeStyles = {
    POSITIVE: {
        bg: "var(--positive-bg)",
        color: "var(--positive)",
        border: "var(--positive-border)",
        icon: "↑",
    },
    MIXED: {
        bg: "var(--mixed-bg)",
        color: "var(--mixed)",
        border: "var(--mixed-border)",
        icon: "~",
    },
    NEGATIVE: {
        bg: "var(--negative-bg)",
        color: "var(--negative)",
        border: "var(--negative-border)",
        icon: "↓",
    },
};

export default function SentimentBadge({ classification }: SentimentBadgeProps) {
    const style = badgeStyles[classification];

    return (
        <span
            className="animate-badge-pop inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{
                backgroundColor: style.bg,
                color: style.color,
                border: `1px solid ${style.border}`,
                letterSpacing: "0.04em",
                animationDelay: "350ms",
            }}
        >
            <span>{style.icon}</span>
            {classification}
        </span>
    );
}
