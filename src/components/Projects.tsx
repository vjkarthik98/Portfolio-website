"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Calendar,
  Tag,
  BarChart3,
  Package,
  Cloud,
  Lock,
} from "lucide-react";
import ModelCard from "./ModelCard";

const tagline =
  "A fully open-source, self-hosted agentic RAG system spanning 7 data modalities for finance-domain Q&A — every model runs on open weights (no proprietary API dependency), deployed on an AWS GPU with enforced tenant isolation, guardrails, and a CI-gated eval harness.";

const featureBadges = [
  { icon: Package, text: "100% Open-Source Models" },
  { icon: Cloud, text: "Self-Hosted on AWS · A10G GPU" },
  { icon: Lock, text: "No Proprietary API Dependency" },
];

const techStack = [
  { name: "Python", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  { name: "LangChain", color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30" },
  { name: "Qdrant", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  { name: "BM25", color: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30" },
  { name: "Hugging Face", color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  { name: "FastAPI", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { name: "Docker", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" },
  { name: "MongoDB Atlas", color: "bg-green-500/15 text-green-400 border-green-500/30" },
  { name: "Redis", color: "bg-red-500/15 text-red-400 border-red-500/30" },
  { name: "AWS (GPU)", color: "bg-orange-500/15 text-orange-400 border-orange-500/30" },
  { name: "Prometheus", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { name: "OpenTelemetry", color: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
];

const highlights = [
  "Architected a per-modality-isolated ingestion pipeline (7 modalities: text, PDF, DOCX, XLSX, image, audio, video), each with independent ingest / chunk / embed / BM25 layers so a bug in one modality can't break another.",
  "Built an agentic query router that classifies each incoming query (RAG / web search / hybrid / direct / finance-specific) and dispatches to the correct tool via a typed ToolCall / ToolResult contract — no raw dicts cross module boundaries.",
  "Implemented hybrid retrieval: BM25 + dense vector search (Qdrant) fused, re-ranked with a cross-encoder, then diversified with MMR before generation.",
  "Enforced multi-tenant data isolation across all four storage layers (Qdrant, Redis, MongoDB, BM25 indices) with per-user JWT auth, Argon2 password hashing, Google OAuth (PKCE), and TOTP MFA.",
  "Built a consolidated guardrail layer covering prompt-injection and PII detection across all 28 modality × pipeline-layer surfaces, plus output-side response filtering before any answer reaches the client.",
  "Instrumented the full request path with Prometheus metrics, OpenTelemetry tracing, and structured JSON logging for production observability.",
  "Built a CI-gated evaluation harness (retrieval + generation quality) that blocks merges on regression — not a one-off benchmark script.",
  "Runs 10 resident ML models (LLM, embedder, reranker, vision, ASR, diarizer, OCR, NER) concurrently on a single A10G 24GB GPU through careful device / memory management.",
];

const qualityMetrics = [
  { metric: "Recall@5", threshold: "≥ 0.418 (gate)" },
  { metric: "MRR", threshold: "≥ 0.772" },
  { metric: "nDCG@10", threshold: "≥ 0.575" },
  { metric: "Faithfulness", threshold: "≥ 0.25" },
  { metric: "Finance numeric fidelity", threshold: "≥ 0.95" },
  { metric: "Routing accuracy", threshold: "≥ 0.917" },
];

const modalityBenchmarks = [
  { modality: "XLSX", score: "92.0", status: "Pass", tone: "pass" },
  { modality: "Image", score: "~95", status: "Pass", tone: "pass" },
  { modality: "PDF", score: "85.8", status: "Pass", tone: "pass" },
  {
    modality: "Audio",
    score: "78.8",
    status: "Partial — upstream pipeline scores 97/100, gap is in shared query-answering layer",
    tone: "partial",
  },
  {
    modality: "Video",
    score: "71.75",
    status: "In progress — upstream ingestion scores 100/100",
    tone: "progress",
  },
];

const toneStyles: Record<string, string> = {
  pass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  partial: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  progress: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const fullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#050810] border border-[var(--border-color)] group aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="/demo-poster.jpg"
        onEnded={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        playsInline
      >
        <source src="/demo.mp4" type="video/mp4" />
      </video>

      {/* Placeholder shown when no video loaded */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1226] via-[#111827] to-[#0d1226] pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
          <Play size={24} className="text-white ml-1" />
        </div>
        <p className="text-[var(--text-secondary)] text-sm">Demo Video</p>
        <p className="text-xs text-[var(--text-secondary)]/60 mt-1">
          Add <code className="font-mono text-indigo-400">/public/demo.mp4</code> to display
        </p>
      </div>

      {/* Video controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <span className="text-white/70 text-xs font-mono ml-2">MAGIK · Demo</span>
        </div>
        <button
          onClick={fullscreen}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}

function EvaluationResults() {
  return (
    <div className="px-6 sm:px-8 py-8 border-t border-[var(--border-color)]">
      <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest font-mono mb-1 flex items-center gap-2">
        <BarChart3 size={15} className="text-indigo-400" />
        Evaluation Results
      </h4>
      <p className="text-xs text-[var(--text-secondary)] mb-6">
        Real numbers from the CI-gated eval harness and manual per-modality audits — reported as-is,
        including where audio and video still trail.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Retrieval & Generation Quality */}
        <div>
          <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
            Retrieval &amp; Generation Quality
            <span className="text-[var(--text-secondary)]/60"> · CI-gated thresholds</span>
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-primary)] text-left">
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Threshold
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {qualityMetrics.map(({ metric, threshold }) => (
                  <tr key={metric}>
                    <td className="px-4 py-2.5 text-[var(--text-primary)]">{metric}</td>
                    <td className="px-4 py-2.5 font-mono text-indigo-400">{threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)]/70 mt-2 italic">
            Faithfulness uses a harness-specific (Ragas-style) scale, not a 0–1 accuracy percentage.
          </p>
        </div>

        {/* Per-Modality QA Benchmarks */}
        <div>
          <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
            Per-Modality QA Benchmarks
            <span className="text-[var(--text-secondary)]/60"> · manual audits /100</span>
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-primary)] text-left">
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Modality
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {modalityBenchmarks.map(({ modality, score, status, tone }) => (
                  <tr key={modality}>
                    <td className="px-4 py-2.5 text-[var(--text-primary)] font-medium">{modality}</td>
                    <td className="px-4 py-2.5 font-mono text-[var(--text-primary)]">{score}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-xs border ${toneStyles[tone]}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm font-medium mb-2 tracking-widest uppercase">
            Featured Project
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Production{" "}
            <span className="gradient-text">AI Systems</span>
          </h2>
        </motion.div>

        {/* Project card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden"
        >
          {/* Project header */}
          <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-[var(--border-color)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                    <Calendar size={12} />
                    March 2026 – July 2026
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <Tag size={12} />
                    Agentic RAG / Multimodal / Finance
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">
                  Multimodal Agentic RAG{" "}
                  <br className="hidden sm:block" />
                  Integrated Knowledge AI Assistant (MAGIK)
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                  {tagline}
                </p>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {featureBadges.map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                    >
                      <Icon size={13} />
                      {text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  href="https://github.com/vjkarthik98/multimodal-rag-assistant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all font-medium"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Github size={15} />
                  GitHub
                </motion.a>
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-5">
              {techStack.map(({ name, color }) => (
                <span
                  key={name}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border ${color}`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Main content — Video + Model Card side by side on lg */}
          <div className="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-color)]">
            {/* Left: Video + highlights */}
            <div className="p-6 sm:p-8 space-y-6">
              <VideoPlayer />

              {/* Bullet highlights */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest font-mono">
                  Key Achievements
                </h4>
                <ul className="space-y-3">
                  {highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Model Card */}
            <div className="p-6 sm:p-8">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest font-mono mb-5">
                Model Card
              </h4>
              <ModelCard />
            </div>
          </div>

          {/* Evaluation Results — full width */}
          <EvaluationResults />
        </motion.div>
      </div>
    </section>
  );
}
