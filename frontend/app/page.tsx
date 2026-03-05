import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/home/SearchBar";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      {/* Hero section */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        {/* Subtle radial glow behind the search area */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 800px 500px at 50% 40%, rgba(232,184,75,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative w-full max-w-2xl text-center">
          {/* Headline */}
          <h1
            className="font-bold mb-4 animate-fade-in-up"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              lineHeight: 1.15,
            }}
          >
            AI Movie{" "}
            <span style={{ color: "var(--accent)" }}>Insights</span>
          </h1>

          {/* Subtext */}
          <p
            className="mb-10 animate-fade-in-up"
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.7,
              animationDelay: "80ms",
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
            }}
          >
            Paste an IMDb ID and get AI-powered movie details, cast info,
            and audience sentiment — instantly.
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in-up" style={{ animationDelay: "160ms" }}>
            <SearchBar />
          </div>
        </div>
      </div>
    </main>
  );
}
