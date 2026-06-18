"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    color: "text-cyan-400",
    dotColor: "bg-cyan-400",
    label: "Education",
    name: "Master of Arts in English",
    sub: "Bishop Heber College · 2021",
  },
  {
    icon: Briefcase,
    color: "text-indigo-400",
    dotColor: "bg-indigo-400",
    label: "Professional Development",
    name: "UPSC Examination Preparation",
    sub: "Advanced research & analytical synthesis · 2021 – 2024",
  },
  {
    icon: Briefcase,
    color: "text-indigo-400",
    dotColor: "bg-indigo-400",
    label: "Professional Development",
    name: "Independent Generative AI Engineering",
    sub: "Full-time self-directed mastery · June 2025 – Present",
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

          <div className="p-8 sm:p-10">


            {/* Alternating Timeline */}
            <div className="relative">
              {/* Centre vertical line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[var(--border-color)]" />

              <div className="space-y-10">
                {timeline.map(({ icon: Icon, color, dotColor, label, name, sub }, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative grid grid-cols-2 gap-8 items-center"
                    >
                      {/* Left side content */}
                      <div className={isLeft ? "text-right" : ""}>
                        {isLeft && (
                          <>
                            <span className={`inline-flex items-center justify-end gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest mb-1 ${color}`}>
                              {label}
                              <Icon size={11} />
                            </span>
                            <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{name}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{sub}</p>
                          </>
                        )}
                      </div>

                      {/* Centre dot */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${dotColor} ring-4 ring-[var(--bg-card)] z-10`} />

                      {/* Right side content */}
                      <div className={!isLeft ? "text-left" : ""}>
                        {!isLeft && (
                          <>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest mb-1 ${color}`}>
                              <Icon size={11} />
                              {label}
                            </span>
                            <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{name}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{sub}</p>
                          </>
                        )}
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
