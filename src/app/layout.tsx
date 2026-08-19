import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// Resolves automatically on Vercel; override with NEXT_PUBLIC_SITE_URL once a custom domain is attached.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Vijaya Karthik | Generative AI Engineer";
const description =
  "Generative AI Engineer building multimodal agentic RAG on a fully open-weights, self-hosted stack — 7 modalities, no proprietary API dependency, CI-gated evaluations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Generative AI Engineer",
    "Agentic RAG",
    "Multimodal RAG",
    "LLM",
    "MLOps",
    "Open-weights",
    "Qdrant",
    "LangChain",
    "Python",
  ],
  authors: [{ name: "Vijaya Karthik" }],
  creator: "Vijaya Karthik",
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Vijaya Karthik — Generative AI Engineer",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
