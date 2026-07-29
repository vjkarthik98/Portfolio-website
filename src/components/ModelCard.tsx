"use client";

import {
  Type,
  FileText,
  FileSpreadsheet,
  File,
  Image,
  Mic,
  Video,
  ShieldCheck,
  AlertTriangle,
  Target,
} from "lucide-react";

const modelDetails = [
  { label: "System", value: "Retrieval-augmented generation, agentic multi-modal, finance-domain" },
  { label: "Core LLM", value: "Mistral-7B-Instruct (GGUF, Q4_K_M quantized) via llama.cpp" },
  { label: "Retrieval", value: "BGE-large-en-v1.5 embeddings + BGE-reranker-large + Qdrant + BM25" },
  { label: "License", value: "Fully open-source / open-weights stack — no proprietary API dependency" },
  { label: "Deployment", value: "Self-hosted on AWS (A10G 24GB GPU) · llama.cpp · Docker" },
];

const modalities = [
  { icon: Type, label: "Text", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  { icon: FileText, label: "PDF", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { icon: File, label: "DOCX", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { icon: FileSpreadsheet, label: "XLSX", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { icon: Image, label: "Images", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { icon: Mic, label: "Audio", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  { icon: Video, label: "Video", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
];

const limitations = [
  "Not a general-purpose open-domain chatbot — tuned and evaluated specifically for finance-document retrieval and numeric fidelity.",
  "Audio and video pipelines currently perform below the text/PDF/XLSX baseline (see Evaluation Results) and are actively being hardened.",
  "Single-dispatch agent (classify → route → execute) — not yet an iterative multi-step tool-chaining loop.",
];

const ethics = [
  "Guardrail layer treats all ingested content (documents, audio, web results) as untrusted data, never as instructions — mitigates prompt injection from uploaded files.",
  "No user data crosses tenant boundaries at any storage layer (enforced, not just assumed, at Qdrant / Redis / MongoDB / BM25).",
  "Every guardrail violation is written to an audit log.",
];

export default function ModelCard() {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
      {/* HuggingFace-style header */}
      <div className="px-6 py-4 border-b border-[var(--border-color)] bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
        <div className="flex flex-col items-end gap-1">
          <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
            production-ready
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 font-mono">
            open-weights
          </span>
        </div>
      </div>

      {/* Model Details */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          Model Details
        </p>
        <dl className="space-y-2.5">
          {modelDetails.map(({ label, value }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:gap-3">
              <dt className="text-xs font-mono font-semibold text-indigo-400 shrink-0 w-20">{label}</dt>
              <dd className="text-xs text-[var(--text-secondary)] leading-relaxed">{value}</dd>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <dt className="text-xs font-mono font-semibold text-indigo-400 shrink-0 w-20">Repo</dt>
            <dd>
              <code className="model-card-tag">vijaya-karthik/multimodal-agentic-rag</code>
            </dd>
          </div>
        </dl>
      </div>

      {/* Input modalities */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          Input Modalities <span className="text-[var(--text-secondary)]/60">· 7</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {modalities.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${color}`}
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Intended Use */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest flex items-center gap-2">
          <Target size={12} className="text-cyan-400" />
          Intended Use
        </p>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Finance-domain document Q&amp;A over uploaded text, PDF, DOCX, XLSX, images, audio, and video
          (e.g., earnings calls, 10-Ks, financial spreadsheets, chart images). Designed for
          multi-tenant deployment with strict per-user data isolation.
        </p>
      </div>

      {/* Out of Scope / Limitations */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest flex items-center gap-2">
          <AlertTriangle size={12} className="text-amber-400" />
          Out of Scope / Limitations
        </p>
        <ul className="space-y-2">
          {limitations.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Ethical Considerations */}
      <div className="px-6 py-4">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck size={12} className="text-emerald-400" />
          Ethical Considerations
        </p>
        <ul className="space-y-2">
          {ethics.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
