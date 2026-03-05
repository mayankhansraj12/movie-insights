"use client";

import { Film } from "lucide-react";
import Link from "next/link";
import ModeToggle from "@/components/shared/ModeToggle";

export default function Navbar() {
    return (
        <nav
            className="sticky top-0 z-50 flex items-center justify-between px-6 h-[60px]"
            style={{
                backgroundColor: "var(--bg-base)",
                borderBottom: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-[1.125rem] transition-opacity hover:opacity-80"
                style={{ color: "var(--text-primary)" }}
            >
                <Film size={22} style={{ color: "var(--accent)" }} />
                <span className="hidden sm:inline">Insight</span>
            </Link>

            {/* Mode Toggle */}
            <ModeToggle />
        </nav>
    );
}
