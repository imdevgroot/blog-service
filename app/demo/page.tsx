"use client";

import { useState } from "react";
import Link from "next/link";

const TOPIC_SUGGESTIONS: Record<string, string[]> = {
  Plumbing: [
    "Signs you need a new water heater",
    "How to prevent frozen pipes in winter",
    "Why your drain keeps clogging",
    "When to call a plumber vs DIY",
  ],
  HVAC: [
    "How often to change your air filter",
    "Signs your AC needs servicing before summer",
    "Heat pump vs furnace — which is right for you",
    "Why your energy bill is so high",
  ],
  Roofing: [
    "Signs your roof needs replacing",
    "How to prepare your roof for storm season",
    "Metal vs asphalt shingles compared",
    "How long does a roof replacement take",
  ],
  "Law Firms": [
    "What to do after a car accident",
    "How to choose a personal injury attorney",
    "Understanding your rights during a traffic stop",
    "When you need an estate planning attorney",
  ],
  Dental: [
    "How to prevent gum disease",
    "Teeth whitening options compared",
    "What to expect at your first dental visit",
    "Signs you need a root canal",
  ],
  Landscaping: [
    "Best plants for low-maintenance yards",
    "When to seed your lawn in spring",
    "How to prevent lawn disease",
    "Hardscaping vs softscaping — what you need",
  ],
  Restaurant: [
    "Our farm-to-table sourcing story",
    "Best dishes for date night",
    "Behind the scenes of our kitchen",
    "How we create our seasonal menu",
  ],
};

function parsePost(raw: string) {
  let metaDesc = "";
  let body = raw;
  const metaMatch = raw.match(/\*\*Meta Description:\*\*\s*(.+?)(?:\n|$)/);
  if (metaMatch) {
    metaDesc = metaMatch[1].trim();
    body = raw.replace(metaMatch[0], "").trim();
  }
  return { metaDesc, body };
}

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} style={{ fontSize: "1.3rem", fontWeight: 700, color: "#10b981", marginTop: "2rem", marginBottom: "0.6rem", lineHeight: 1.3 }}>
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} style={{ fontSize: "1.65rem", fontWeight: 800, color: "#f8fafc", marginBottom: "1rem", lineHeight: 1.2 }}>
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(<li key={i} style={{ color: "#cbd5e1", lineHeight: 1.7, marginBottom: "0.25rem" }}>{lines[i].replace(/^[-*]\s/, "")}</li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} style={{ paddingLeft: "1.25rem", marginBottom: "1rem" }}>{items}</ul>);
      continue;
    } else if (line.trim() === "") {
      // skip
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((p, j) => {
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={j}>{p.slice(2, -2)}</strong>;
        return p;
      });
      elements.push(
        <p key={i} style={{ color: "#cbd5e1", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.975rem" }}>
          {rendered}
        </p>
      );
    }
    i++;
  }
  return elements;
}

function LoadingSkeleton() {
  return (
    <div style={{ backgroundColor: "#111827", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #1e293b", backgroundColor: "#0d1f12", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite" }} />
        <span style={{ color: "#6ee7b7", fontSize: "0.85rem", fontWeight: 600 }}>Generating your post...</span>
      </div>
      <div style={{ padding: "2rem" }}>
        {[180, 120, 200, 90, 160, 210, 130].map((w, i) => (
          <div key={i} style={{ height: i === 0 ? 28 : 14, marginBottom: i === 0 ? 20 : 12, width: `${w}px`, maxWidth: "100%", background: "linear-gradient(90deg, #1e293b 25%, #283548 50%, #1e293b 75%)", backgroundSize: "800px 100%", animation: `shimmer 1.8s infinite ${i * 0.1}s`, borderRadius: 6 }} />
        ))}
      </div>
    </div>
  );
}

interface Generation {
  businessName: string;
  niche: string;
  city: string;
  topic: string;
  timestamp: number;
}

function loadHistory(): Generation[] {
  try { return JSON.parse(localStorage.getItem('blogflow_history') || '[]'); } catch { return []; }
}
function saveHistory(h: Generation[]) {
  try { localStorage.setItem('blogflow_history', JSON.stringify(h.slice(0, 5))); } catch {}
}

function getSEOScore(body: string, meta: string, form: { businessName: string; city: string; niche: string; topic: string }): { score: number; tips: string[] } {
  const tips: string[] = [];
  let score = 0;
  const lower = body.toLowerCase();
  if (meta.length > 100 && meta.length <= 160) { score += 20; } else { tips.push('Meta description should be 100–160 characters'); }
  if (lower.includes(form.city.toLowerCase())) { score += 20; } else { tips.push(`Include your city (${form.city}) in the content`); }
  if (lower.includes(form.businessName.toLowerCase())) { score += 15; } else { tips.push('Mention your business name more'); }
  const wordCount = body.split(/\s+/).length;
  if (wordCount >= 400) { score += 25; } else { tips.push(`Post is ${wordCount} words — aim for 400+`); }
  if ((body.match(/## /g) || []).length >= 2) { score += 10; } else { tips.push('Add more H2 headings for structure'); }
  if (lower.includes(form.niche.toLowerCase()) || lower.includes(form.topic.toLowerCase().split(' ')[0])) { score += 10; } else { tips.push('Include niche keywords naturally'); }
  return { score, tips };
}

export default function DemoPage() {
  const [form, setForm] = useState({ businessName: "", niche: "", city: "", topic: "" });
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<string | null>(null);
  const [metaDesc, setMetaDesc] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Generation[]>([]);
  const [seoScore, setSeoScore] = useState<{ score: number; tips: string[] } | null>(null);

  // Load history on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  typeof window !== 'undefined' && !history.length && (() => { const h = loadHistory(); if (h.length) setHistory(h); })();

  const suggestedTopics = TOPIC_SUGGESTIONS[form.niche] || [];
  const wordCount = post ? countWords(post + (metaDesc || "")) : 0;

  const doGenerate = async () => {
    setLoading(true);
    setPost(null);
    setSeoScore(null);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.post) {
        const { metaDesc: md, body } = parsePost(data.post);
        setMetaDesc(md);
        setPost(body);
        setSeoScore(getSEOScore(body, md, form));
        // Save to history
        const newEntry: Generation = { ...form, timestamp: Date.now() };
        const updated = [newEntry, ...loadHistory().filter(h => h.topic !== form.topic || h.businessName !== form.businessName)].slice(0, 5);
        saveHistory(updated);
        setHistory(updated);
      } else {
        setError("Failed to generate post. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await doGenerate();
  };

  const handleCopy = () => {
    const fullText = metaDesc ? `Meta Description: ${metaDesc}\n\n${post}` : post || "";
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const fullText = [
      metaDesc ? `META DESCRIPTION:\n${metaDesc}\n\n` : "",
      post || "",
    ].join("");
    const slug = form.businessName.toLowerCase().replace(/\s+/g, "-") || "blog-post";
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-seo-post.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
    transition: "border-color 0.15s",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "0.8rem",
    fontWeight: 700 as const,
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  return (
    <main style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#f8fafc" }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes shimmer { from{background-position:-800px 0} to{background-position:800px 0} }
        input:focus, textarea:focus { border-color: #10b981 !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.1); }
      `}</style>

      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1e293b", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(15,23,42,0.97)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: "1.2rem", color: "#10b981", textDecoration: "none", letterSpacing: "-0.02em" }}>
          BlogFlow <span style={{ color: "#fff" }}>AI</span>
        </Link>
        <Link href="/#pricing" style={{ backgroundColor: "#10b981", color: "#fff", padding: "0.5rem 1.25rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem" }}>
          Get Full Access
        </Link>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "5px 14px", marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#10b981", fontSize: 12, fontWeight: 700, letterSpacing: "0.04em" }}>Free Demo — No Signup</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.75rem", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Generate Your Free SEO Blog Post
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }}>
            Enter your business info and get a 500-word locally-targeted, SEO-optimized post in seconds.
          </p>
        </div>

        {/* Recent History */}
        {history.length > 0 && (
          <div style={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Recent Generations</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {history.map((h, i) => (
                <button key={i} type="button"
                  onClick={() => setForm({ businessName: h.businessName, niche: h.niche, city: h.city, topic: h.topic })}
                  style={{
                    padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem", cursor: "pointer",
                    background: "rgba(255,255,255,0.04)", border: "1px solid #1e293b", color: "#94a3b8",
                    transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.4)"; (e.currentTarget as HTMLElement).style.color = "#10b981"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1e293b"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {h.businessName} · {h.topic.slice(0, 28)}{h.topic.length > 28 ? '…' : ''}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#111827", border: "1px solid #1e293b", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Business Name</label>
              <input style={inputStyle} placeholder="e.g. Smith Plumbing" value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Niche / Industry</label>
              <input style={inputStyle} placeholder="e.g. Plumbing, HVAC, Dental" value={form.niche}
                onChange={(e) => setForm({ ...form, niche: e.target.value })} required
                list="niche-suggestions" />
              <datalist id="niche-suggestions">
                {Object.keys(TOPIC_SUGGESTIONS).map(n => <option key={n} value={n} />)}
              </datalist>
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} placeholder="e.g. Austin, TX" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div>
              <label style={labelStyle}>Blog Topic</label>
              <input style={inputStyle} placeholder="e.g. Signs you need a new water heater" value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })} required />
            </div>
          </div>

          {/* Topic suggestion chips */}
          {suggestedTopics.length > 0 && (
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ fontSize: "0.78rem", color: "#475569", marginBottom: "0.5rem", fontWeight: 600 }}>
                SUGGESTED TOPICS FOR {form.niche.toUpperCase()}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {suggestedTopics.map(t => (
                  <button key={t} type="button"
                    onClick={() => setForm({ ...form, topic: t })}
                    style={{
                      padding: "4px 12px", borderRadius: "20px", fontSize: "0.8rem",
                      cursor: "pointer", transition: "all 0.15s",
                      background: form.topic === t ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${form.topic === t ? "rgba(16,185,129,0.4)" : "#334155"}`,
                      color: form.topic === t ? "#10b981" : "#94a3b8",
                      fontWeight: form.topic === t ? 600 : 400,
                    }}>{t}</button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{ width: "100%", backgroundColor: loading ? "#065f46" : "#10b981", color: "#fff", border: "none", borderRadius: "10px", padding: "0.95rem", fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s, transform 0.1s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                Generating your post...
              </>
            ) : "Generate SEO Blog Post →"}
          </button>
        </form>

        {error && (
          <div style={{ backgroundColor: "#450a0a", border: "1px solid #7f1d1d", borderRadius: "10px", padding: "1rem 1.25rem", color: "#fca5a5", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && <LoadingSkeleton />}

        {/* Result */}
        {post && !loading && (
          <>
          <div style={{ backgroundColor: "#111827", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden", animation: "fadeUp 0.4s ease" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #1e293b", backgroundColor: "#0d1f12", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                  Post Generated
                </span>
                <span style={{ fontSize: "0.78rem", color: "#4b5563", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: "10px", border: "1px solid #1e293b" }}>
                  ~{wordCount} words
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={handleExport}
                  style={{ backgroundColor: "transparent", color: "#94a3b8", border: "1px solid #334155", borderRadius: "7px", padding: "0.45rem 1rem", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#64748b"; (e.currentTarget as HTMLElement).style.color = "#f8fafc"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#334155"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}>
                  Export .txt
                </button>
                <button onClick={handleCopy}
                  style={{ backgroundColor: copied ? "#065f46" : "#10b981", color: "#fff", border: "none", borderRadius: "7px", padding: "0.45rem 1.1rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", transition: "background 0.2s" }}>
                  {copied ? "✓ Copied!" : "Copy Post"}
                </button>
              </div>
            </div>

            {/* Meta description */}
            {metaDesc && (
              <div style={{ padding: "1rem 1.5rem", backgroundColor: "#0f2920", borderBottom: "1px solid #1e293b" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <span style={{ color: "#6ee7b7", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Meta Description</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "#4b5563" }}>{metaDesc.length}/160 chars</span>
                </div>
                <p style={{ color: "#a7f3d0", fontSize: "0.9rem", margin: 0, lineHeight: 1.5 }}>{metaDesc}</p>
              </div>
            )}

            {/* Post body */}
            <div style={{ padding: "2rem" }}>
              {renderMarkdown(post)}
            </div>

            {/* Footer CTA */}
            <div style={{ borderTop: "1px solid #1e293b", padding: "1.5rem", textAlign: "center", backgroundColor: "#0d1120" }}>
              <p style={{ color: "#94a3b8", marginBottom: "1rem", fontSize: "0.95rem", lineHeight: 1.6 }}>
                Want <strong style={{ color: "#f8fafc" }}>4 posts like this</strong> every month — delivered, ready to publish?<br />
                <span style={{ color: "#10b981", fontWeight: 600 }}>$199/month</span> · No contracts · Cancel anytime
              </p>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/#pricing" style={{ backgroundColor: "#10b981", color: "#fff", padding: "0.8rem 2rem", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "0.975rem", display: "inline-block", boxShadow: "0 4px 20px rgba(16,185,129,0.25)" }}>
                  Start Getting Monthly Posts →
                </Link>
                <button onClick={doGenerate} style={{ backgroundColor: "transparent", color: "#94a3b8", border: "1px solid #334155", padding: "0.8rem 1.5rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.4rem" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#64748b"; (e.currentTarget as HTMLElement).style.color = "#f8fafc"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#334155"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.29"/></svg>
                  Regenerate
                </button>
              </div>
            </div>
          </div>

          {/* SEO Score */}
          {seoScore && (
            <div style={{ backgroundColor: "#111827", border: "1px solid #1e293b", borderRadius: "16px", padding: "1.5rem", marginTop: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#f8fafc", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  SEO Score
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 100, height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${seoScore.score}%`, background: seoScore.score >= 80 ? "#10b981" : seoScore.score >= 50 ? "#f59e0b" : "#ef4444", borderRadius: 3, transition: "width 1s ease" }} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: "1rem", color: seoScore.score >= 80 ? "#10b981" : seoScore.score >= 50 ? "#f59e0b" : "#ef4444" }}>{seoScore.score}/100</span>
                </div>
              </div>
              {seoScore.tips.length === 0 ? (
                <p style={{ color: "#6ee7b7", fontSize: "0.85rem" }}>✓ Excellent SEO — all checks passed!</p>
              ) : (
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {seoScore.tips.map((tip, i) => (
                    <li key={i} style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ color: "#f59e0b", marginTop: 1 }}>→</span> {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>
    </main>
  );
}
