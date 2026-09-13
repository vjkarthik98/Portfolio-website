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
  Database,
  ExternalLink,
} from "lucide-react";

// Single source of truth for the repo link — also used by Projects.tsx's GitHub button.
export const REPO_URL =
  "https://github.com/vjkarthik98/MULTIMODAL-AGENTIC-RAG-INTEGRATED-KNOWLEDGE-AI-ASSISTANT";

const modelDetails = [
  { label: "Version", value: "v1.0.2 · released 12 Sep 2026" },
  { label: "System", value: "Retrieval-augmented generation, agentic multi-modal, finance-domain — a compound system, not one trained model" },
  { label: "Core LLM", value: "Qwen2.5-14B-Instruct (GGUF, Q4_K_M quantized) via llama.cpp" },
  { label: "Models", value: "18 open-weight checkpoints · ~42GB on disk · 0 fine-tuned — each pinned to a commit hash, SHA-256 verified on every run" },
  { label: "Retrieval", value: "BGE embeddings + BGE cross-encoder reranker + Qdrant hybrid search (BM25 + dense) + MMR" },
  { label: "License", value: "MIT — fully open-weights stack, no proprietary API dependency" },
  { label: "Deployment", value: "Self-hosted on AWS (NVIDIA L40S 48GB GPU) · Lambda wake gateway, scale-to-zero · Terraform · Docker" },
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

const sampleDatasets = [
  { icon: Type, modality: "Text", file: "fomc_dec2024.txt", url: "https://drive.google.com/file/d/181j30UcDvNRMGgmszXdOYO37UC1zLgA5/view?usp=sharing", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  { icon: FileText, modality: "PDF", file: "apple_10k.pdf", url: "https://drive.google.com/file/d/18Fd9xpShWO0ImpI3DXYRf7d4Q9tZRyWL/view?usp=sharing", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { icon: File, modality: "DOCX", file: "apple_investment_research_report.docx", url: "https://docs.google.com/document/d/1H18YoI6_bZfQsDsUnxgWg5SZ9WjO_1HP/edit?usp=sharing&ouid=104916607768697811729&rtpof=true&sd=true", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { icon: FileSpreadsheet, modality: "XLSX", file: "ctryprem.xlsx", url: "https://docs.google.com/spreadsheets/d/1pdisvz4LdNwebyk8t-uiYocfY26vyRzc/edit?usp=sharing&ouid=104916607768697811729&rtpof=true&sd=true", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { icon: Image, modality: "Image", file: "aapl-20240928_g2.jpg", url: "https://drive.google.com/file/d/1wZWFltwfRnEAG7NonnucSbXXgnzRoXCh/view?usp=sharing", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { icon: Mic, modality: "Audio", file: "FOMC Press Conference September 18, 2024.mp3", url: "https://drive.google.com/file/d/1dJVngEUd30NmaODmgEfZBGQhaRLKc_vq/view?usp=sharing", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  { icon: Video, modality: "Video", file: "Q4 2025 Earnings Call.mp4", url: "https://drive.google.com/file/d/1thyLZz_ziN8TI8mm2xm1oQwfK8wICNek/view?usp=sharing", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
];

const limitations = [
  "Built and evaluated specifically for finance-document Q&A — not a general-purpose open-domain chatbot.",
  "Retrieval quality is currently under active investigation on one internal benchmark; not yet where it needs to be, and being worked on before the next release. Full detail in the System Card.",
  "A rare, root-caused hallucination on dense audio transcripts is still open — the model can occasionally mix up two similar numbers from the same document.",
  "Audio and video answer quality currently trails text, PDF, and spreadsheet inputs, and is the active focus of the next hardening pass.",
  "Executes one tool call per query (classify → route → execute) — a bounded action, not an open-ended autonomous agent.",
  "Runs as a single-region demo deployment with no horizontal scaling or failover, a deliberate cost tradeoff (~100x cheaper) for a portfolio project rather than production-scale infrastructure.",
];

const ethics = [
  "No external inference provider — document and query content never leaves the deployment boundary for a third-party LLM API. This is the system's single largest privacy property.",
  "Guardrail layer treats all ingested content (documents, audio, web results) as untrusted data, never as instructions — PII detection (Presidio) and toxicity screening (Detoxify) run across ingestion and output.",
  "No user data crosses tenant boundaries at any storage layer — enforced independently at Qdrant, Redis, MongoDB, and BM25, never delegated upstream to a shared filter.",
  "Every guardrail violation is written to a persistent audit log, and every cited number is traced back to source text via a finance-fidelity check rather than trusted on the model's word.",
];

export default function ModelCard() {
  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
      {/* HuggingFace-style header */}
      <div className="px-6 py-5 border-b border-[var(--border-color)] bg-gradient-to-r from-indigo-500/5 to-cyan-500/5">
        <a
          href="/magik-system-card.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the MAGIK System Card, PDF, 15 pages, in a new tab"
          title="Open the System Card (PDF)"
          className="group flex items-center gap-3 min-w-0"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
            🤗
          </div>
          <div className="min-w-0">
            <p className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-tight group-hover:text-indigo-400 transition-colors">
              Model Card
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-indigo-400 group-hover:text-cyan-400 transition-colors">
              <FileText size={11} className="shrink-0" />
              System Card v1.0.2 (PDF, 15pp)
              <ExternalLink size={9} className="shrink-0" />
            </span>
          </div>
        </a>
      </div>

      {/* Model Details */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          Model Details
        </p>
        <dl className="space-y-2.5">
          {modelDetails.map(({ label, value }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:gap-3 min-w-0">
              <dt className="text-xs font-mono font-semibold text-indigo-400 shrink-0 w-20">{label}</dt>
              <dd className="text-xs text-[var(--text-secondary)] leading-relaxed min-w-0 break-words">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Input modalities */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          Input Modalities <span className="opacity-70">· 7</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 justify-items-stretch">
          {modalities.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium ${color}`}
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Sample Datasets */}
      <div className="px-6 py-4 border-b border-[var(--border-color)]">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest flex items-center gap-2">
          <Database size={12} className="text-cyan-400 shrink-0" />
          <span className="min-w-0">
            Sample Datasets <span className="opacity-70 normal-case">· real-world test data, 7 modalities</span>
          </span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleDatasets.map(({ icon: Icon, modality, file, url, color }) => (
            <a
              key={file}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={file}
              className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors min-w-0 hover:brightness-110 ${color}`}
            >
              <Icon size={13} className="shrink-0" />
              <span className="flex flex-col min-w-0 leading-tight">
                <span className="truncate">{file}</span>
                <span className="text-[10px] font-mono opacity-60 uppercase tracking-wide">{modality}</span>
              </span>
              <ExternalLink size={13} className="shrink-0 ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] opacity-75 mt-2 italic leading-relaxed">
          Hosted on Google Drive — each card opens its file directly in a new tab.
        </p>
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
