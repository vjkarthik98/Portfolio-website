"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin } from "lucide-react";

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

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-indigo-400 font-semibold mb-6"
        >
          Generative AI Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          I build{" "}
          <span className="text-indigo-400 font-semibold">multimodal agentic RAG</span>{" "}
          on a{" "}
          <span className="text-cyan-400 font-semibold">fully open-weights stack</span> —
          7 modalities, 10 models on one self-hosted GPU, and no proprietary API
          anywhere in the pipeline.
        </motion.p>

        {/* Proof chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {[
            "100% open-source models",
            "Self-hosted · AWS A10G",
            "CI-gated evaluations",
          ].map((chip) => (
            <span
              key={chip}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-card)]/60 backdrop-blur-sm border border-[var(--border-color)] text-[var(--text-secondary)]"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
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

          <motion.a
            href="https://github.com/vjkarthik98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={16} />
            GitHub
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/vijaya-karthik-517353357"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
