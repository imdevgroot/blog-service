"use client";

import { useState } from "react";
import Link from "next/link";

function parsePost(raw: string) {
  // Extract meta description
  let metaDesc = "";
  let body = raw;

  const metaMatch = raw.match(/\*\*Meta Description:\*\*\s*(.+?)(?:\n|$)/);
  if (metaMatch) {
    metaDesc = metaMatch[1].trim();
    body = raw.replace(metaMatch[0], "").trim();
  }

  return { metaDesc, body };
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} style={{ fontSize: "1.35rem", fontWeight: 700, color: "#10b981", marginTop: "2rem", marginBottom: "0.5rem" }}>
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} style={{ fontSize: "1.75rem", fontWeight: 800, color: "#f8fafc", marginBottom: "1rem", lineHeight: 1.25 }}>
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.trim() === "") {
      // skip
    } else {
      // Handle bold inline
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((p, j) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return <strong key={j}>{p.slice(2, -2)}</strong>;
        }
        return p;
      });
      elements.push(
        <p key={i} style={{ color: "#cbd5e1", lineHeight: 1.75, marginBottom: "1rem" }}>
          {rendered}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default function DemoPage() {
  const [form, setForm] = useState({ businessName: "", niche: "", city: "", topic: "" });
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<string | null>(null);
  const [metaDesc, setMetaDesc] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPost(null);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.post) {
        const { metaDesc, body } = parsePost(data.post);
        setMetaDesc(metaDesc);
        setPost(body);
      } else {
        setError("Failed to generate post. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const fullText = metaDesc ? `Meta Description: ${metaDesc}\n\n${post}` : post || "";
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    color: "#f8fafc",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  return (
    <main style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#f8fafc" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1e293b", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: "1.25rem", color: "#10b981", textDecoration: "none" }}>BlogFlow AI</Link>
        <Link href="/#pricing" style={{ backgroundColor: "#1e293b", color: "#f8fafc", padding: "0.5rem 1.25rem", borderRadius: "6px", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
          View Pricing
        </Link>
      </nav>

      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.75rem" }}>Generate Your Free SEO Blog Post</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Enter your business info and we&apos;ll create a 500-word locally-targeted blog post in seconds.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#111827", border: "1px solid #1e293b", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Business Name</label>
              <input
                style={inputStyle}
                placeholder="e.g. Smith Plumbing"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Niche / Industry</label>
              <input
                style={inputStyle}
                placeholder="e.g. Plumbing, HVAC, Roofing"
                value={form.niche}
                onChange={(e) => setForm({ ...form, niche: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input
                style={inputStyle}
                placeholder="e.g. Austin, TX"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Blog Topic</label>
              <input
                style={inputStyle}
                placeholder="e.g. Signs you need a new water heater"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#065f46" : "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.9rem",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "✨ Generating your post..." : "Generate SEO Blog Post →"}
          </button>
        </form>

        {error && (
          <div style={{ backgroundColor: "#450a0a", border: "1px solid #7f1d1d", borderRadius: "8px", padding: "1rem", color: "#fca5a5", marginBottom: "1.5rem" }}>
            {error}
          </div>
        )}

        {/* Result */}
        {post && (
          <div style={{ backgroundColor: "#111827", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #1e293b", backgroundColor: "#0d1f12" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.85rem" }}>✓ Post Generated</span>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  backgroundColor: copied ? "#065f46" : "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1.25rem",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                {copied ? "✓ Copied!" : "Copy Post"}
              </button>
            </div>

            {/* Meta description banner */}
            {metaDesc && (
              <div style={{ padding: "1rem 1.5rem", backgroundColor: "#0f2920", borderBottom: "1px solid #1e293b" }}>
                <span style={{ color: "#6ee7b7", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Meta Description</span>
                <p style={{ color: "#a7f3d0", fontSize: "0.9rem", margin: "0.35rem 0 0", lineHeight: 1.5 }}>{metaDesc}</p>
              </div>
            )}

            {/* Post body */}
            <div style={{ padding: "2rem 2rem" }}>
              {renderMarkdown(post)}
            </div>

            {/* Footer CTA */}
            <div style={{ borderTop: "1px solid #1e293b", padding: "1.5rem", textAlign: "center", backgroundColor: "#0d1120" }}>
              <p style={{ color: "#94a3b8", marginBottom: "1rem", fontSize: "0.95rem" }}>
                Want 4 posts like this every month? Get started for <strong style={{ color: "#10b981" }}>$199/month</strong>.
              </p>
              <Link href="/#pricing" style={{ backgroundColor: "#10b981", color: "#fff", padding: "0.7rem 1.75rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem" }}>
                Get Started →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
