"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, BookOpen, Target } from "lucide-react";

// Most recent first — mirrors the LinkedIn Experience ordering.
const timeline = [
  {
    icon: Briefcase,
    color: "text-indigo-400",
    dotColor: "bg-indigo-400",
    label: "Engineering",
    name: "Generative AI Engineer",
    sub: "MAGIK AI Assistant (Independent Project) · March 2026 – August 2026",
  },
  {
    icon: BookOpen,
    color: "text-indigo-400",
    dotColor: "bg-indigo-400",
    label: "Professional Development",
    name: "Generative AI Engineering Professional Development",
    sub: "Full-time foundation in ML, deep learning, transformer architectures, and MLOps — three professional certificates, carried straight into production work · June 2025 – March 2026",
  },
  {
    icon: Target,
    color: "text-indigo-400",
    dotColor: "bg-indigo-400",
    label: "Analytical Foundation",
    name: "Personal Goal Pursuit",
    sub: "UPSC Civil Services Examination — four years synthesizing large volumes of unstructured source material under evaluation pressure · June 2021 – May 2025",
  },
  {
    icon: GraduationCap,
    color: "text-cyan-400",
    dotColor: "bg-cyan-400",
    label: "Education",
    name: "Master of Arts in English",
    sub: "Bishop Heber College · 2021",
  },
];

export default function Resume() {
  return (
    <section id="resume" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Professional{" "}
            <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        {/* Resume preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden"
        >
          {/* Gradient stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500" />

          <div className="p-6 sm:p-10">
            {/* Alternating Timeline */}
            <div className="relative">
              {/* Vertical line — left rail on mobile, centred from md up */}
              <div className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-[var(--border-color)]" />

              <div className="space-y-8 md:space-y-10">
                {timeline.map(({ icon: Icon, color, dotColor, label, name, sub }, i) => {
                  const isLeft = i % 2 === 0;
                  const entry = (
                    <>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest mb-1 ${color} ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <Icon size={11} />
                        {label}
                      </span>
                      <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                        {name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        {sub}
                      </p>
                    </>
                  );

                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative grid grid-cols-1 md:grid-cols-2 md:gap-8 md:items-center pl-8 md:pl-0"
                    >
                      {/* Dot — sits on the rail at both breakpoints */}
                      <div
                        className={`absolute left-0 top-1 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full ${dotColor} ring-4 ring-[var(--bg-card)] z-10`}
                      />

                      {/* Left slot */}
                      <div className={isLeft ? "md:text-right" : "hidden md:block"}>
                        {isLeft && entry}
                      </div>

                      {/* Right slot */}
                      <div className={!isLeft ? "" : "hidden md:block"}>
                        {!isLeft && entry}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
