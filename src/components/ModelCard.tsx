"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Activity, Database, Layers, Zap, FileText, Image, Mic, Type } from "lucide-react";

const tags = [
  "RAG", "multimodal", "NLP", "question-answering",
  "langchain", "qdrant", "huggingface", "fastapi",
];

const metrics = [
  { label: "Context Retrieval Accuracy", value: "85–90%", icon: Activity, color: "text-emerald-400" },
  { label: "Vector Search Latency", value: "< 1s", icon: Zap, color: "text-cyan-400" },
  { label: "Document Chunks Indexed", value: "1,000+", icon: Database, color: "text-indigo-400" },
  { label: "Architecture Layers", value: "Modular", icon: Layers, color: "text-purple-400" },
];

const modalities = [
  { icon: Type, label: "Text", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  { icon: FileText, label: "PDF", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { icon: Image, label: "Images", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { icon: Mic, label: "Audio", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
];

const pipeline = [
  { step: "01", name: "Ingestion", detail: "PyMuPDF · OpenCV · Whisper" },
  { step: "02", name: "Embedding", detail: "Sentence Transformers" },
  { step: "03", name: "Indexing", detail: "Qdrant Vector DB" },
  { step: "04", name: "Retrieval", detail: "Semantic Search · ANN" },
  { step: "05", name: "Synthesis", detail: "HuggingFace LLMs via LangChain" },
  { step: "06", name: "Serving", detail: "FastAPI · Docker" },
];

export default function ModelCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
      {/* HuggingFace-style header */}
      <div className="px-6 py-4 border-b border-[var(--border-color)] bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* HF Logo styled */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-md">
            🤗
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] font-mono">Model Card</p>
            <p className="text-sm font-mono font-semibold text-[var(--text-primary)]">
              vijaya-karthik/<span className="text-indigo-400">multimodal-agentic-rag</span>
            </p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
          production-ready
        </span>
      </div>

      {/* Tags */}
      <div className="px-6 py-4 flex flex-wrap gap-2 border-b border-[var(--border-color)]">
        {tags.map((tag) => (
          <span key={tag} className="model-card-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Input modalities */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          Input Modalities
        </p>
        <div className="flex flex-wrap gap-3">
          {modalities.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${color}`}
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          Evaluation Metrics
        </p>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]"
            >
              <Icon size={16} className={`${color} mt-0.5 shrink-0`} />
              <div>
                <p className={`text-sm font-bold font-mono ${color}`}>{value}</p>
                <p className="text-xs text-[var(--text-secondary)] leading-snug mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline — expandable */}
      <div className="px-6 py-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-widest hover:text-[var(--text-primary)] transition-colors"
        >
          <span>Pipeline Architecture</span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={15} />
          </motion.span>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-2">
                {pipeline.map(({ step, name, detail }) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)]"
                  >
                    <span className="text-xs font-mono font-bold text-indigo-400 w-6 shrink-0">
                      {step}
                    </span>
                    <span className="text-sm font-medium text-[var(--text-primary)] w-24 shrink-0">
                      {name}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] font-mono">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
