"use client";

import { motion } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-glow-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[100px] animate-glow-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[80px] animate-glow-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl sm:text-7xl font-black tracking-tight mb-3 leading-tight"
        >
          Vijaya{" "}
          <span className="gradient-text">Karthik</span>
        </motion.h1>

        {/* Role — framed with hairline rules */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
          <p className="text-lg sm:text-xl text-indigo-400 font-semibold tracking-wide whitespace-nowrap">
            Generative AI Engineer
          </p>
          <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
        </motion.div>

        {/* Tagline — what it does, in plain language */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-3 leading-relaxed"
        >
          I build{" "}
          <span className="text-indigo-400 font-semibold">multimodal agentic RAG</span> —
          AI that answers questions across documents, spreadsheets, audio and video.
        </motion.p>

        {/* Differentiator — why it's rare */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Every model runs on{" "}
          <span className="text-cyan-400 font-medium">open weights</span>, self-hosted on
          a GPU I run myself — no proprietary API anywhere in the pipeline.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="/resume.pdf"
            download="Vijaya_Karthik_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} />
            Download Resume
          </motion.a>
        </motion.div>

      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 7, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.6 },
            y: { delay: 1.2, duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ChevronDown size={22} className="text-[var(--text-secondary)] opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
