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
  ExternalLink,
  KeyRound,
} from "lucide-react";
import ModelCard, { REPO_URL } from "./ModelCard";

const LIVE_DEMO_URL = "https://launch.vk-ai.online";
const DEMO_EMAIL = "magikaiassistant@gmail.com";
const DEMO_PASSWORD = "Demo@2026";

const tagline =
  "A fully open-source, self-hosted agentic RAG system spanning 7 data modalities for finance-domain Q&A — every model runs on open weights (no proprietary API dependency), deployed on an AWS GPU with enforced tenant isolation, guardrails, and a CI-gated eval harness.";

const featureBadges = [
  { icon: Package, text: "18 Open-Weight Models" },
  { icon: Cloud, text: "Self-Hosted on AWS · L40S GPU" },
  { icon: Lock, text: "No Proprietary API Dependency" },
  { icon: BarChart3, text: "CI-Gated Evaluations" },
];

const repoSignals = [
  { icon: GitCommitHorizontal, text: "43 tagged releases" },
  { icon: Scale, text: "MIT licensed" },
  { icon: FileCode, text: "9 GitHub Actions workflows" },
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
  { name: "Grafana", color: "bg-violet-500/15 text-violet-400 border-violet-500/30" },
  { name: "OpenTelemetry", color: "bg-sky-500/15 text-sky-400 border-sky-500/30" },
];

const highlights = [
  "Built a multimodal assistant that answers questions across 7 data types — text, PDF, Word, Excel, images, audio, and video — each handled by its own isolated pipeline, so a problem in one can't break the others.",
  "Built an intelligent query router that automatically picks the right way to answer each question — searching internal documents, searching the web, or a blend of both — rather than relying on one fixed approach.",
  "Combined keyword and semantic search with a re-ranking step to surface the most relevant results, tuned for fast, sub-second responses.",
  "Secured the system for multiple users with proper account authentication (including Google sign-in and multi-factor authentication) and strict data isolation between accounts.",
  "Built a dedicated safety layer that screens every request for prompt injection, jailbreak attempts, and personal data exposure, tested against a large simulated-attack suite.",
  "Added full production observability — live dashboards, distributed tracing, and centralized logs — so any request can be traced end-to-end.",
  "Built an automated testing and evaluation pipeline that blocks any code change from shipping if it makes accuracy or safety worse. Full methodology and results are in the linked System Card.",
  "Runs 18 open-weight AI models entirely on self-hosted infrastructure, with no dependency on any third-party AI API, and automatic integrity checks that once caught a corrupted model file before it reached production.",
  "Deployed on AWS with automated CI/CD and a cost-saving design that shuts the GPU down when idle, cutting hosting costs roughly 100x (from ~$1,340/month to ~$12/month) versus running it continuously.",
];

const DEMO_VIDEO_URL =
  "https://1oqjmnwzoo7lxnab.public.blob.vercel-storage.com/Demo.mp4";

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
        <source src={DEMO_VIDEO_URL} type="video/mp4" />
        Your browser doesn&apos;t support embedded video.{" "}
        <a href={DEMO_VIDEO_URL} className="underline">Download the demo</a> instead.
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
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs font-mono text-[var(--text-secondary)] hover:text-indigo-400 transition-colors break-all"
                >
                  <Github size={12} className="shrink-0" />
                  vjkarthik98/MULTIMODAL-AGENTIC-RAG-INTEGRATED-KNOWLEDGE-AI-ASSISTANT
                </a>
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
                <div className="text-right rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2">
                  <p className="flex items-center justify-end gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-indigo-400 mb-1">
                    <KeyRound size={11} />
                    Demo Login
                  </p>
                  <p className="text-[11px] font-mono text-[var(--text-primary)] whitespace-nowrap">
                    {DEMO_EMAIL}
                  </p>
                  <p className="text-[11px] font-mono text-[var(--text-primary)] whitespace-nowrap">
                    {DEMO_PASSWORD}
                  </p>
                  <p className="text-[10px] text-[var(--text-secondary)] opacity-75 mt-1 whitespace-nowrap">
                    Pre-loaded with sample files &amp; chat history
                  </p>
                </div>
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
                System Card
              </h4>
              <ModelCard />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
