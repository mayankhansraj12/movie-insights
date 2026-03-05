"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ModeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex items-center justify-center rounded-full transition-all"
            style={{
                width: "48px",
                height: "28px",
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-default)",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--accent-muted)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--bg-elevated)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-default)";
            }}
        >
            {theme === "dark" ? (
                <Sun
                    size={16}
                    style={{ color: "var(--accent)", transition: "transform 200ms ease" }}
                />
            ) : (
                <Moon
                    size={16}
                    style={{ color: "var(--accent)", transition: "transform 200ms ease" }}
                />
            )}
        </button>
    );
}
