import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Film } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
            <Navbar />
            <main className="flex items-center justify-center min-h-[80vh] px-4">
                <div
                    className="text-center rounded-2xl p-10 max-w-[420px] w-full animate-fade-in"
                    style={{
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        boxShadow: "var(--shadow-card)",
                    }}
                >
                    <Film size={48} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                    <h1 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                        Page Not Found
                    </h1>
                    <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                        The page you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
                    >
                        ← Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
