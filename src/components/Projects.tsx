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
  GitCommitHorizontal,
  Scale,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import ModelCard, { REPO_URL } from "./ModelCard";

const LIVE_DEMO_URL = "https://launch.vk-ai.online";

const tagline =
  "A fully open-source, self-hosted agentic RAG system spanning 7 data modalities for finance-domain Q&A — every model runs on open weights (no proprietary API dependency), deployed on an AWS GPU with enforced tenant isolation, guardrails, and a CI-gated eval harness.";

const featureBadges = [
  { icon: Package, text: "100% Open-Source Models" },
  { icon: Cloud, text: "Self-Hosted on AWS · A10G GPU" },
  { icon: Lock, text: "No Proprietary API Dependency" },
];

const repoSignals = [
  { icon: GitCommitHorizontal, text: "201 commits" },
  { icon: Scale, text: "MIT licensed" },
  { icon: FileCode, text: "Docker · Makefile · CI" },
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

// Retrieval & routing only — generation quality, safety, and finance fidelity are
// broken out per modality below, which is a more honest view than one blended number.
const qualityMetrics = [
  { metric: "Recall@5", achieved: "0.509", threshold: "≥ 0.4835", status: "Pass", tone: "pass" },
  { metric: "MRR", achieved: "0.356", threshold: "≥ 0.3380", status: "Pass", tone: "pass" },
  { metric: "nDCG@10", achieved: "0.402", threshold: "≥ 0.3823", status: "Pass", tone: "pass" },
  { metric: "Routing accuracy", achieved: "1.000", threshold: "≥ 0.917", status: "Pass", tone: "pass" },
];

// Generation quality & safety — LLM-judged (Qwen2.5-7B), n=14 gold rows/modality, captured 2026-08-20.
const modalityQuality = [
  { modality: "Text", correctness: "0.66", correctnessTone: "partial", faithfulness: "0.45", faithfulnessTone: "risk", hallucination: "9%", hallucinationTone: "pass" },
  { modality: "PDF", correctness: "0.86", correctnessTone: "pass", faithfulness: "0.57", faithfulnessTone: "risk", hallucination: "50%", hallucinationTone: "risk" },
  { modality: "DOCX", correctness: "0.79", correctnessTone: "partial", faithfulness: "0.64", faithfulnessTone: "risk", hallucination: "43%", hallucinationTone: "risk" },
  { modality: "XLSX", correctness: "0.73", correctnessTone: "partial", faithfulness: "0.62", faithfulnessTone: "risk", hallucination: "14%", hallucinationTone: "pass" },
  { modality: "Image", correctness: "0.89", correctnessTone: "pass", faithfulness: "0.80", faithfulnessTone: "pass", hallucination: "7%", hallucinationTone: "pass" },
  { modality: "Audio", correctness: "0.68", correctnessTone: "partial", faithfulness: "0.39", faithfulnessTone: "risk", hallucination: "14%", hallucinationTone: "pass" },
  { modality: "Video", correctness: "0.79", correctnessTone: "partial", faithfulness: "0.39", faithfulnessTone: "risk", hallucination: "29%", hallucinationTone: "partial" },
];

// Finance fidelity & latency — same run as above.
const modalityFidelity = [
  { modality: "Text", fidelity: "0.91", fidelityTone: "pass", p50: "11.8s", p95: "34.1s", p95Tone: "risk" },
  { modality: "PDF", fidelity: "0.84", fidelityTone: "partial", p50: "9.7s", p95: "19.4s", p95Tone: "partial" },
  { modality: "DOCX", fidelity: "0.81", fidelityTone: "partial", p50: "6.7s", p95: "10.9s", p95Tone: "pass" },
  { modality: "XLSX", fidelity: "0.93", fidelityTone: "pass", p50: "10.2s", p95: "14.9s", p95Tone: "partial" },
  { modality: "Image", fidelity: "0.99", fidelityTone: "pass", p50: "4.3s", p95: "6.1s", p95Tone: "pass" },
  { modality: "Audio", fidelity: "0.63", fidelityTone: "risk", p50: "12.9s", p95: "19.3s", p95Tone: "partial" },
  { modality: "Video", fidelity: "0.96", fidelityTone: "pass", p50: "8.6s", p95: "11.0s", p95Tone: "pass" },
];

const toneStyles: Record<string, string> = {
  pass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  partial: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  progress: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  risk: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

const toneText: Record<string, string> = {
  pass: "text-emerald-400",
  partial: "text-amber-400",
  risk: "text-rose-400",
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
        className="w-full h-full object-contain bg-[#050810]"
        poster="/demo-poster.jpg"
        onEnded={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        preload="metadata"
        playsInline
      >
        <source src="/demo.mp4" type="video/mp4" />
        Your browser doesn&apos;t support embedded video.{" "}
        <a href="/demo.mp4" className="underline">Download the demo</a> instead.
      </video>

      {/* Click-to-play overlay — hidden once playback starts */}
      {!playing && (
        <button
          onClick={togglePlay}
          aria-label="Play demo video"
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
        >
          <span className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center mb-3 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
            <Play size={24} className="text-white ml-1" />
          </span>
          <span className="text-white text-sm font-medium drop-shadow">Watch the demo</span>
          <span className="text-xs text-white/70 mt-1">3:20 · multimodal Q&amp;A with citations</span>
        </button>
      )}

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
      <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
        Per-modality scorecard from a live run against the current codebase — n=14 gold rows per
        modality, single run (not the N=3-averaged CI gate baseline that blocks merges), LLM-judged
        via Qwen2.5-7B. Captured 2026-08-20. Reported as measured, including where it's weak.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generation Quality & Safety */}
        <div className="min-w-0">
          <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
            Generation Quality &amp; Safety
            <span className="text-[var(--text-secondary)]/60"> · per modality</span>
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-primary)] text-left">
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Modality
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Correctness
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Faithfulness
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Hallucination
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {modalityQuality.map((row) => (
                  <tr key={row.modality}>
                    <td className="px-4 py-2.5 text-[var(--text-primary)] font-medium whitespace-nowrap">
                      {row.modality}
                    </td>
                    <td className={`px-4 py-2.5 font-mono ${toneText[row.correctnessTone]}`}>
                      {row.correctness}
                    </td>
                    <td className={`px-4 py-2.5 font-mono ${toneText[row.faithfulnessTone]}`}>
                      {row.faithfulness}
                    </td>
                    <td className={`px-4 py-2.5 font-mono ${toneText[row.hallucinationTone]}`}>
                      {row.hallucination}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)]/70 mt-2 italic">
            Correctness &amp; faithfulness: 0–1, higher is better. Hallucination: share of sampled
            responses with an unsupported claim, lower is better.
          </p>
        </div>

        {/* Finance Fidelity & Latency */}
        <div className="min-w-0">
          <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
            Finance Fidelity &amp; Latency
            <span className="text-[var(--text-secondary)]/60"> · per modality</span>
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-primary)] text-left">
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Modality
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Fidelity
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Gen p50
                  </th>
                  <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                    Gen p95
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {modalityFidelity.map((row) => (
                  <tr key={row.modality}>
                    <td className="px-4 py-2.5 text-[var(--text-primary)] font-medium whitespace-nowrap">
                      {row.modality}
                    </td>
                    <td className={`px-4 py-2.5 font-mono ${toneText[row.fidelityTone]}`}>
                      {row.fidelity}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[var(--text-secondary)]">{row.p50}</td>
                    <td className={`px-4 py-2.5 font-mono ${toneText[row.p95Tone]}`}>{row.p95}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--text-secondary)]/70 mt-2 italic">
            Finance fidelity: 0–1, higher is better. Latency: end-to-end generation time, lower is
            better.
          </p>
        </div>
      </div>

      {/* Where it stands — honest, specific, no spin */}
      <div className="mt-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          Where It Stands
        </p>
        <ul className="space-y-3">
          <li className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[var(--text-primary)] font-semibold">
                Image is the strongest modality across the board
              </strong>{" "}
              — highest correctness (0.89) and faithfulness (0.80), best finance fidelity (0.99),
              and the fastest generation latency (p95 6.1s).
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
            <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[var(--text-primary)] font-semibold">
                Audio needs real improvement.
              </strong>{" "}
              Weakest citation grounding in the verification loop (0.54), lowest finance fidelity
              (0.63), and it retries almost once per query on average (0.92) — top priority for the
              next iteration.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[var(--text-primary)] font-semibold">
                Faithfulness is the weakest quality axis system-wide
              </strong>{" "}
              (0.39–0.80), not just in audio and video — most modalities have real room to reduce
              ungrounded claims.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[var(--text-primary)] font-semibold">
                PDF and DOCX show elevated hallucination rates
              </strong>{" "}
              (50% and 43% of sampled responses) despite strong correctness scores. Under
              investigation, alongside PDF&apos;s context-recall drop to 0.28 — an outlier against
              every other modality.
            </span>
          </li>
          <li className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
            <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-[var(--text-primary)] font-semibold">
                Text has unexplained tail-latency spikes
              </strong>{" "}
              (p95 34s, p99 44s) despite being the simplest modality — flagged for follow-up, not
              yet root-caused.
            </span>
          </li>
        </ul>
      </div>

      {/* CI Gate — Retrieval & Routing (secondary, de-emphasized) */}
      <div className="mt-6">
        <p className="text-xs font-mono font-medium text-[var(--text-secondary)] mb-3 uppercase tracking-widest">
          CI Gate &mdash; Retrieval &amp; Routing
          <span className="text-[var(--text-secondary)]/60"> · achieved vs. gate, blocks merges on regression</span>
        </p>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--bg-primary)] text-left">
                <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Achieved
                </th>
                <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Gate
                </th>
                <th className="px-4 py-2.5 font-mono text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {qualityMetrics.map(({ metric, achieved, threshold, status, tone }) => (
                <tr key={metric}>
                  <td className="px-4 py-2.5 text-[var(--text-primary)]">{metric}</td>
                  <td className={`px-4 py-2.5 font-mono ${toneText[tone]}`}>{achieved}</td>
                  <td className="px-4 py-2.5 font-mono text-[var(--text-secondary)]">{threshold}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] border ${toneStyles[tone]}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[var(--text-secondary)]/70 mt-2 italic">
          Production CI baseline (n=56, 2026-07-28). All figures above were captured on a
          verified-healthy server after resolving a mid-run process fault unrelated to the
          modalities under test.
        </p>
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
              <div className="max-w-2xl min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] whitespace-nowrap">
                    <Calendar size={12} />
                    March 2026 – August 2026
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] shrink-0" />
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 whitespace-nowrap">
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
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <motion.a
                    href={LIVE_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-semibold shadow-lg hover:shadow-indigo-500/25 transition-all"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 text-sm text-purple-400 hover:bg-purple-500/15 hover:border-purple-500/50 transition-all font-medium"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Github size={15} />
                    GitHub
                  </motion.a>
                </div>
                <p className="text-[10px] text-[var(--text-secondary)]/60 whitespace-nowrap">
                  Self-hosted GPU — first load may take a minute to wake
                </p>
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

            {/* Repo signals — sustained-effort evidence, not claims */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-4 border-t border-[var(--border-color)]">
              {repoSignals.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]"
                >
                  <Icon size={13} className="text-indigo-400 shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Main content — Video + Model Card side by side on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-color)]">
            {/* Left: Video + highlights */}
            <div className="p-6 sm:p-8 space-y-6 min-w-0">
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
            <div className="p-6 sm:p-8 min-w-0">
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
