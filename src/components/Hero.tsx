"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, ArrowDown, Terminal } from "lucide-react";

const ROLES = [
  "Generative AI Engineer",
  "LLM Pipeline Architect",
  "MLOps Engineer",
  "RAG Systems Builder",
  "Responsible AI Developer",
];

function useTypingEffect(
  texts: string[],
  typingSpeed = 75,
  deletingSpeed = 38,
  pauseTime = 2400
) {
  const [displayText, setDisplayText] = useState(texts[0]);
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(texts[0].length);
  const [phase, setPhase] = useState<"pause" | "delete" | "type">("pause");

  useEffect(() => {
    const currentText = texts[textIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "pause") {
      timer = setTimeout(() => setPhase("delete"), pauseTime);
    } else if (phase === "delete") {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          const next = charIdx - 1;
          setCharIdx(next);
          setDisplayText(currentText.slice(0, next));
        }, deletingSpeed);
      } else {
        const nextIdx = (textIdx + 1) % texts.length;
        setTextIdx(nextIdx);
        setCharIdx(0);
        setDisplayText("");
        setPhase("type");
      }
    } else {
      const nextText = texts[textIdx];
      if (charIdx < nextText.length) {
        timer = setTimeout(() => {
          const next = charIdx + 1;
          setCharIdx(next);
          setDisplayText(nextText.slice(0, next));
        }, typingSpeed);
      } else {
        setPhase("pause");
      }
    }

    return () => clearTimeout(timer);
  }, [phase, charIdx, textIdx, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

const socialLinks = [
  {
    href: "https://github.com/YOUR_GITHUB",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/YOUR_LINKEDIN",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

export default function Hero() {
  const role = useTypingEffect(ROLES);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

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
        {/* Typing role badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 dark:text-indigo-300 text-sm font-mono mb-8"
        >
          <Terminal size={14} />
          <span className="min-w-[220px] text-left">{role}</span>
          <span className="w-[2px] h-4 bg-indigo-400 dark:bg-indigo-300 inline-block"
            style={{ animation: "blink 1s step-end infinite" }} />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-tight"
        >
          Vijaya{" "}
          <span className="gradient-text">Karthik</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building production-ready{" "}
          <span className="text-indigo-400 font-semibold">LLM pipelines</span> and{" "}
          <span className="text-cyan-400 font-semibold">RAG systems</span> that bridge
          complex AI architectures with real-world, responsible applications.
        </motion.p>

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

          <motion.button
            onClick={() =>
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold text-sm hover:border-indigo-500 hover:text-indigo-400 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View Project
          </motion.button>
        </motion.div>

        {/* Social links + email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}

          <span className="text-[var(--text-secondary)] text-sm font-mono">
            karthikvj398@gmail.com
          </span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors animate-float"
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </motion.button>
      </div>
    </section>
  );
}
