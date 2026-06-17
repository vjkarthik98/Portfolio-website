"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Calendar,
  Tag,
} from "lucide-react";
import ModelCard from "./ModelCard";

const techStack = [
  { name: "Python", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  { name: "LangChain", color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30" },
  { name: "Qdrant", color: "bg-rose-500/15 text-rose-400 border-rose-500/30" },
  { name: "Hugging Face", color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  { name: "FastAPI", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { name: "Docker", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" },
];

const highlights = [
  "Architected a production-ready Multimodal RAG pipeline to ingest and process diverse data formats (text, PDFs, images, audio) using PyMuPDF, OpenCV, and Whisper.",
  "Engineered semantic search and vector indexing by generating embeddings with Sentence Transformers and storing 1,000+ document chunks in a Qdrant vector database, achieving sub-second latency.",
  "Integrated open-source Hugging Face LLMs via LangChain to synthesize retrieved context, developing a custom evaluation pipeline that validated 85–90% relevant context retrieval accuracy.",
  "Enforced software engineering best practices by structuring the system with a clean modular architecture (config, ingestion, and testing modules) and deploying via FastAPI and Docker.",
];

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
      {/* Video element — replace /demo.mp4 with your actual video path */}
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
          <span className="text-white/70 text-xs font-mono ml-2">
            Multimodal AGENTIC RAG · Demo
          </span>
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
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                    <Calendar size={12} />
                    March 2026
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
                  <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <Tag size={12} />
                    AI / RAG / Multimodal
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">
                  Multimodal AGENTIC RAG{" "}
                  <br className="hidden sm:block" />
                  Integrated Knowledge AI Assistant
                </h3>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  href="https://github.com/YOUR_GITHUB/multimodal-rag"
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
                      transition={{ delay: i * 0.1 }}
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
        </motion.div>
      </div>
    </section>
  );
}
