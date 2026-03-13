"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    // Use native Web Share API on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} — AI Movie Insights`, url });
        return;
      } catch {
        // User cancelled share — do nothing
        return;
      }
    }

    // Desktop fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked — silently ignore
    }
  }

  return (
    <button
      onClick={handleShare}
      title={copied ? "Copied!" : "Share this movie"}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all"
      style={{
        backgroundColor: copied ? "var(--positive-bg)" : "var(--bg-elevated)",
        border: `1px solid ${copied ? "var(--positive-border)" : "var(--border-default)"}`,
        color: copied ? "var(--positive)" : "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-default)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
        }
      }}
    >
      {copied ? (
        <>
          <Check size={14} />
          Copied!
        </>
      ) : navigator.share !== undefined ? (
        <>
          <Share2 size={14} />
          Share
        </>
      ) : (
        <>
          <Copy size={14} />
          Copy link
        </>
      )}
    </button>
  );
}
