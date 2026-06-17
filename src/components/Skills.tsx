"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "Programming",
    color: "border-indigo-500/40 bg-indigo-500/5",
    accent: "text-indigo-400",
    skills: ["Python"],
  },
  {
    category: "Generative AI & ML",
    color: "border-purple-500/40 bg-purple-500/5",
    accent: "text-purple-400",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "LangChain",
      "LlamaIndex",
      "Sentence Transformers",
    ],
  },
  {
    category: "Cloud & MLOps",
    color: "border-cyan-500/40 bg-cyan-500/5",
    accent: "text-cyan-400",
    skills: [
      "AWS Bedrock",
      "AWS SageMaker",
      "Docker",
      "MLflow",
      "GitHub Actions",
    ],
  },
  {
    category: "Core Competencies",
    color: "border-emerald-500/40 bg-emerald-500/5",
    accent: "text-emerald-400",
    skills: [
      "RAG Pipelines",
      "LLM Fine-Tuning",
      "Responsible AI",
      "Data Structures & Algorithms",
      "Agentic Systems",
    ],
  },
  {
    category: "Developer Tools",
    color: "border-amber-500/40 bg-amber-500/5",
    accent: "text-amber-400",
    skills: ["FastAPI", "Qdrant", "Pandas", "NumPy", "Git", "PyMuPDF", "OpenCV", "Whisper"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm font-medium mb-2 tracking-widest uppercase">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            A curated set of tools and frameworks I use to build production AI systems.
          </p>
        </motion.div>

        {/* Skill grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-6 rounded-2xl border ${cat.color} transition-all hover:-translate-y-1`}
            >
              <h3 className={`font-semibold text-sm font-mono mb-4 ${cat.accent} tracking-wider uppercase`}>
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-indigo-500/60 transition-colors cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="p-6 rounded-2xl border border-rose-500/40 bg-rose-500/5 sm:col-span-2 lg:col-span-1"
          >
            <h3 className="font-semibold text-sm font-mono mb-4 text-rose-400 tracking-wider uppercase">
              Analytical Foundation
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text-primary)]">MA English</span>
                <span className="text-xs text-[var(--text-secondary)]">Bishop Heber College · 2021</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--text-primary)]">UPSC Preparation</span>
                <span className="text-xs text-[var(--text-secondary)]">Advanced research & synthesis · 2021–2024</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2 border-t border-[var(--border-color)] pt-3">
                Rigorous analytical training that sharpens complex information synthesis
                and structured problem-solving.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
