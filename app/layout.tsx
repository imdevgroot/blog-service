import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlogFlow AI — SEO Blog Posts for Local Businesses",
  description: "Automated SEO blog content for local businesses. Rank higher, attract more customers, and grow your business with AI-powered blog posts.",

  openGraph: {
    title: 'AI Blog Service',
    description: 'Recurring AI blog content for your business',
    url: 'https://blog-service-nupeeks.vercel.app',
    siteName: 'AI Blog Service',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'AI Blog Service' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Blog Service',
    description: 'Recurring AI blog content for your business',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0f0f0f', color: '#f1f5f9', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
