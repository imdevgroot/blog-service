'use client';
import Link from "next/link";

const features = [
  { icon: '🎯', title: 'Locally Targeted', desc: 'Written for your city and niche — mentions local landmarks, neighborhoods, and geo-keywords that rank.' },
  { icon: '🔍', title: 'SEO Optimized', desc: 'Proper H1/H2 structure, meta descriptions, keyword density, and internal linking baked in automatically.' },
  { icon: '⚡', title: 'Delivered Monthly', desc: '4 fresh blog posts per month, delivered to your inbox ready to publish. No editing needed.' },
  { icon: '🤖', title: 'AI-Powered', desc: 'GPT-4o writes naturally — avoids robotic AI tone. Posts sound human, engaging, and authoritative.' },
  { icon: '📈', title: 'Results in 90 Days', desc: 'Most clients see measurable organic traffic growth within 3 months. We play the long game right.' },
  { icon: '✏️', title: 'Fully Editable', desc: 'Delivered in Google Docs or plain text. Publish as-is or customize — total flexibility.' },
];

const includes = [
  '4 SEO blog posts per month',
  'Locally targeted content',
  'H1/H2 structure + meta description',
  'Delivered in 5 business days',
  'Unlimited revisions (first pass)',
  'Cancel anytime',
];

const niches = ['Plumbing', 'HVAC', 'Roofing', 'Landscaping', 'Law Firms', 'Dental', 'Restaurants'];

export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#f1f5f9' }}>

      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid #1a1a1a',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        background: 'rgba(15,15,15,0.95)',
        backdropFilter: 'blur(12px)',
        zIndex: 50,
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#10b981', letterSpacing: '-0.02em' }}>
          BlogFlow<span style={{ color: '#fff' }}> AI</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#pricing" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.color = '#94a3b8')}
            onMouseOut={e => (e.currentTarget.style.color = '#64748b')}>
            Pricing
          </a>
          <a href="#features" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.color = '#94a3b8')}
            onMouseOut={e => (e.currentTarget.style.color = '#64748b')}>
            Features
          </a>
          <Link href="/demo" style={{
            backgroundColor: '#10b981', color: '#fff',
            padding: '0.55rem 1.25rem', borderRadius: '8px',
            textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem',
            transition: 'all 0.2s',
          }}>
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 2rem 5rem', textAlign: 'center' }}>
        <div className="animate-fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          backgroundColor: 'rgba(16,185,129,0.08)', color: '#10b981',
          padding: '0.4rem 1.1rem', borderRadius: '999px',
          fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.75rem',
          border: '1px solid rgba(16,185,129,0.2)', letterSpacing: '0.02em',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          🚀 AI-Powered SEO Content
        </div>

        <h1 className="animate-fade-up delay-100" style={{
          fontSize: 'clamp(2rem, 5.5vw, 3.75rem)',
          fontWeight: 800, lineHeight: 1.1,
          marginBottom: '1.5rem', letterSpacing: '-0.03em',
        }}>
          SEO Blog Posts for Local Businesses —{' '}
          <span style={{ color: '#10b981' }}>Done For You</span>
        </h1>

        <p className="animate-fade-up delay-200" style={{
          fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.75,
          marginBottom: '2.75rem', maxWidth: '620px', margin: '0 auto 2.75rem',
        }}>
          Stop losing customers to competitors who rank higher. Get fresh, optimized blog content every month that drives real organic traffic.
        </p>

        <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/demo" style={{
            backgroundColor: '#10b981', color: '#fff',
            padding: '0.9rem 2rem', borderRadius: '10px',
            textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
            display: 'inline-block', transition: 'all 0.2s',
            boxShadow: '0 4px 24px rgba(16,185,129,0.25)',
          }}>
            Generate Free Sample Post →
          </Link>
          <a href="#pricing" style={{
            backgroundColor: '#1a1a1a', color: '#f1f5f9',
            padding: '0.9rem 2rem', borderRadius: '10px',
            textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
            display: 'inline-block', border: '1px solid #2a2a2a', transition: 'all 0.2s',
          }}>
            View Pricing
          </a>
        </div>

        <p className="animate-fade-up delay-400" style={{ marginTop: '2rem', fontSize: '0.82rem', color: '#4b5563' }}>
          ✓ No signup required &nbsp;·&nbsp; ✓ Free sample post in 30 seconds &nbsp;·&nbsp; ✓ Cancel anytime
        </p>
      </section>

      {/* Social Proof Bar */}
      <div style={{
        borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a',
        padding: '1.5rem 2rem', textAlign: 'center', backgroundColor: '#111',
      }}>
        <p style={{ color: '#4b5563', fontSize: '0.78rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
          Trusted by local businesses in
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {niches.map((n, i) => (
            <span key={n} style={{ color: '#374151', fontWeight: 600, fontSize: '0.85rem' }}>
              {i > 0 && <span style={{ marginRight: '0.75rem', color: '#1f2937' }}>·</span>}
              {n}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" style={{ maxWidth: '1100px', margin: '0 auto', padding: '6rem 2rem' }}>
        <h2 className="animate-fade-up" style={{ textAlign: 'center', fontSize: 'clamp(1.6rem,4vw,2.25rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Everything You Need to Rank
        </h2>
        <p className="animate-fade-up delay-100" style={{ textAlign: 'center', color: '#64748b', marginBottom: '3.5rem', fontSize: '1rem' }}>
          Each post is crafted for Google — and for real customers
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {features.map((f, i) => (
            <div key={f.title} className={`animate-fade-up delay-${(i % 4 + 1) * 100}`} style={{
              backgroundColor: '#1a1a1a', border: '1px solid #222',
              borderRadius: '14px', padding: '1.75rem',
              transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
            }}
              onMouseOver={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(16,185,129,0.3)';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
              }}
              onMouseOut={e => {
                const el = e.currentTarget;
                el.style.borderColor = '#222';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', letterSpacing: '-0.01em' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ backgroundColor: '#111', padding: '6rem 2rem', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="animate-fade-up" style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Simple, Flat Pricing
          </h2>
          <p className="animate-fade-up delay-100" style={{ color: '#64748b', marginBottom: '2.75rem' }}>One plan. No surprises. Cancel anytime.</p>

          <div className="animate-scale-in delay-200" style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(16,185,129,0.4)',
            borderRadius: '18px', padding: '2.5rem',
            boxShadow: '0 0 40px rgba(16,185,129,0.06)',
          }}>
            <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
              Growth Plan
            </div>
            <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.25rem', letterSpacing: '-0.03em', lineHeight: 1 }}>$199</div>
            <div style={{ color: '#4b5563', marginBottom: '2.25rem', fontSize: '0.9rem' }}>per month</div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.25rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {includes.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.925rem' }}>
                  <span style={{
                    color: '#10b981', fontWeight: 700, fontSize: '0.75rem',
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/demo" style={{
              display: 'block', backgroundColor: '#10b981', color: '#fff',
              padding: '0.95rem', borderRadius: '10px', textDecoration: 'none',
              fontWeight: 700, fontSize: '1rem', textAlign: 'center',
              transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(16,185,129,0.25)',
            }}>
              Get Started — Try Free Demo First
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
        <h2 className="animate-fade-up" style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          See It in Action
        </h2>
        <p className="animate-fade-up delay-100" style={{ color: '#64748b', marginBottom: '2.25rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Generate a free sample blog post for your business in under 30 seconds. No signup required.
        </p>
        <Link href="/demo" className="animate-fade-up delay-200" style={{
          backgroundColor: '#10b981', color: '#fff',
          padding: '0.95rem 2.5rem', borderRadius: '10px',
          textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem',
          display: 'inline-block', boxShadow: '0 4px 24px rgba(16,185,129,0.25)',
          transition: 'all 0.2s',
        }}>
          Generate My Free Post →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '2rem', textAlign: 'center', color: '#374151', fontSize: '0.8rem' }}>
        © 2026 BlogFlow AI · All rights reserved · <a href="mailto:hello@nupeeks.com" style={{ color: '#4b5563', textDecoration: 'none' }}>hello@nupeeks.com</a>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </main>
  );
}
