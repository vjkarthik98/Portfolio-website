import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vijaya Karthik | Generative AI Engineer",
  description:
    "Portfolio of Vijaya Karthik — Generative AI Engineer specializing in RAG pipelines, agentic systems, and MLOps.",
  keywords: [
    "Generative AI",
    "RAG",
    "LLM",
    "MLOps",
    "Python",
    "LangChain",
    "Portfolio",
  ],
  authors: [{ name: "Vijaya Karthik" }],
  openGraph: {
    title: "Vijaya Karthik | Generative AI Engineer",
    description:
      "Generative AI Engineer specializing in RAG pipelines, agentic systems, and production AI systems.",
    type: "website",
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
      </body>
    </html>
  );
}
