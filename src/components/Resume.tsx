"use client";

import { motion } from "framer-motion";
import {
  Download,
  Eye,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
  FileText,
} from "lucide-react";

const resumeSections = [
  {
    icon: Briefcase,
    color: "text-indigo-400",
    borderColor: "border-indigo-500/30",
    title: "Professional Development",
    items: [
      {
        name: "Independent Generative AI Engineering",
        sub: "Full-time self-directed mastery · June 2025 – Present",
      },
      {
        name: "UPSC Examination Preparation",
        sub: "Advanced research & analytical synthesis · 2021 – 2024",
      },
    ],
  },
  {
    icon: GraduationCap,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    title: "Education",
    items: [
      {
        name: "Master of Arts in English",
        sub: "Bishop Heber College · 2021",
      },
    ],
  },
  {
    icon: Code2,
    color: "text-purple-400",
    borderColor: "border-purple-500/30",
    title: "Featured Project",
    items: [
      {
        name: "Multimodal AGENTIC RAG Knowledge AI Assistant",
        sub: "Python · LangChain · Qdrant · HuggingFace · FastAPI · Docker · March 2026",
      },
    ],
  },
  {
    icon: Award,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    title: "Certifications",
    items: [
      { name: "IBM Generative AI Engineering Professional Certificate", sub: "Coursera" },
      { name: "MLOps Specialization", sub: "Duke University · Coursera" },
      { name: "Responsible AI for Developers", sub: "Google Cloud · Coursera" },

    ],
  },
];

const techSkills = [
  "Python", "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex",
  "Docker", "MLflow", "GitHub Actions",
  "RAG Pipelines", "Responsible AI",
  "FastAPI", "Qdrant", "Pandas", "NumPy", "Git",
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
          <p className="text-indigo-400 font-mono text-sm font-medium mb-2 tracking-widest uppercase">
            Resume
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Professional{" "}
            <span className="gradient-text">Background</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            A complete overview of my experience, education, and technical credentials.
          </p>
        </motion.div>

        {/* Download / View buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 font-semibold text-sm transition-all"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Eye size={16} />
            View PDF
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download="Vijaya_Karthik_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/25 transition-all"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} />
            Download Resume
          </motion.a>
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
            {/* Name header */}
            <div className="text-center mb-10 pb-8 border-b border-[var(--border-color)]">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-black tracking-wider text-[var(--text-primary)]"
              >
                VIJAYA KARTHIK
              </motion.h3>
              <p className="text-[var(--text-secondary)] mt-2 text-sm font-mono">
                karthikvj398@gmail.com &nbsp;·&nbsp; +91 9363615606
              </p>
              <p className="text-indigo-400 text-sm font-medium mt-1">
                Generative AI Engineer · LLM / RAG / MLOps
              </p>

              {/* Summary */}
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl mx-auto mt-4">
                Highly disciplined Generative AI Engineer with a robust foundation in machine learning
                operations, responsible AI frameworks, and advanced mathematics. Builds and deploys
                scalable LLM applications bridging complex technical architectures with
                ethically grounded, production-ready AI solutions.
              </p>
            </div>

            {/* Tech skills strip */}
            <div className="mb-10">
              <p className="text-xs font-mono font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText size={12} />
                Technical Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {techSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-indigo-500/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume sections grid */}
            <div className="grid sm:grid-cols-2 gap-8">
              {resumeSections.map(({ icon: Icon, color, borderColor, title, items }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-5 rounded-2xl border ${borderColor} bg-[var(--bg-primary)]`}
                >
                  <h4 className={`text-xs font-mono font-semibold uppercase tracking-widest mb-4 flex items-center gap-2 ${color}`}>
                    <Icon size={13} />
                    {title}
                  </h4>
                  <ul className="space-y-3">
                    {items.map(({ name, sub }) => (
                      <li key={name}>
                        <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                          {name}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{sub}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
              <p className="text-xs text-[var(--text-secondary)]">
                Download the full PDF for complete project highlights, bullet-point achievements, and technical specifications.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
