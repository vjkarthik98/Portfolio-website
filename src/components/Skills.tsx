"use client";

import { motion } from "framer-motion";

// Sourced from MAGIK's own dependency manifests and CI/CD pipelines — every
// chip here maps to a tool actually used in the project, not a generic list.
const skillCategories = [
  {
    category: "Generative AI & LLMs",
    color: "border-indigo-500/40 bg-indigo-500/5",
    accent: "text-indigo-400",
    skills: [
      "RAG",
      "Agentic AI",
      "LLM Inference (llama.cpp)",
      "Prompt Engineering",
      "LangChain",
      "Hugging Face Transformers",
      "GGUF Quantization",
    ],
  },
  {
    category: "Retrieval & Vector Search",
    color: "border-purple-500/40 bg-purple-500/5",
    accent: "text-purple-400",
    skills: [
      "Qdrant",
      "Hybrid Search (BM25 + Dense)",
      "Cross-Encoder Reranking",
      "BGE Embeddings",
      "Maximal Marginal Relevance (MMR)",
    ],
  },
  {
    category: "Multimodal & Applied ML",
    color: "border-cyan-500/40 bg-cyan-500/5",
    accent: "text-cyan-400",
    skills: [
      "PyTorch",
      "Vision-Language Models (Qwen2-VL)",
      "Whisper ASR",
      "OCR (Tesseract / EasyOCR)",
      "CUDA / GPU Inference",
    ],
  },
  // Pulled together from safety-relevant items that were previously scattered
  // across other categories (Hallucination Detection, PII Detection) — this
  // is what actually backs the guardrail/ethics claims made in the Model Card.
  {
    category: "Responsible AI & Safety",
    color: "border-rose-500/40 bg-rose-500/5",
    accent: "text-rose-400",
    skills: [
      "Prompt Injection Defense",
      "Hallucination Detection",
      "Groundedness / Citation Verification",
      "PII Detection & Redaction (Presidio)",
      "Toxicity / Jailbreak Detection",
      "Multi-Tenant Data Isolation",
      "OWASP LLM Top 10",
    ],
  },
  {
    category: "Backend & APIs",
    color: "border-emerald-500/40 bg-emerald-500/5",
    accent: "text-emerald-400",
    skills: [
      "FastAPI",
      "REST APIs",
      "Pydantic v2",
      "Async Python",
      "JWT Auth",
      "OAuth 2.0",
      "MongoDB",
      "Redis",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    color: "border-amber-500/40 bg-amber-500/5",
    accent: "text-amber-400",
    skills: [
      "AWS (EC2 GPU, Lambda, SSM)",
      "Docker",
      "Docker Compose",
      "Terraform",
      "GitHub Actions CI/CD",
      "Scale-to-Zero Architecture",
    ],
  },
  {
    category: "Observability & MLOps",
    color: "border-sky-500/40 bg-sky-500/5",
    accent: "text-sky-400",
    skills: ["Prometheus", "Grafana", "MLflow", "RAGAS", "DeepEval", "LLM-as-a-Judge"],
  },
  {
    category: "Languages & Tools",
    color: "border-violet-500/40 bg-violet-500/5",
    accent: "text-violet-400",
    skills: ["Python", "SQL", "Git", "YAML", "System Design", "API Design"],
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
            The stack behind MAGIK — from LLM inference to production infrastructure.
          </p>
        </motion.div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        </div>
      </div>
    </section>
  );
}
