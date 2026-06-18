"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cpu, FlaskConical } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    title: "Generative AI",
    desc: "RAG pipelines & agentic systems",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Cpu,
    title: "MLOps",
    desc: "Docker, MLflow, GitHub Actions & AWS deployment",
    color: "from-cyan-500 to-blue-500",
  },
{
    icon: FlaskConical,
    title: "Responsible AI",
    desc: "Ethical frameworks and evaluation pipelines",
    color: "from-emerald-500 to-cyan-500",
  },
];

function HighlightCard({
  icon: Icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col gap-3 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-indigo-500/50 transition-all group"
      whileHover={{ y: -4 }}
    >
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-[var(--bg-secondary)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm font-medium mb-2 tracking-widest uppercase">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Building AI That{" "}
            <span className="gradient-text">Actually Works</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              I&apos;m a{" "}
              <span className="text-[var(--text-primary)] font-semibold">
                highly disciplined Generative AI Engineer
              </span>{" "}
              with a robust foundation in machine learning operations, responsible AI
              frameworks, and advanced mathematics.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              I combine rigorous algorithmic problem-solving with specialized,
              enterprise-grade training to build and deploy scalable LLM applications.
              My background in analytical research — including multi-year preparation for
              one of India&apos;s most competitive examinations — gives me an edge in
              synthesizing complex information into production-ready solutions.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              From architecting multimodal RAG pipelines to deploying containerized AI
              APIs, I bridge complex technical architectures with{" "}
              <span className="text-indigo-400 font-medium">
                ethically grounded, real-world impact
              </span>
              .
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "3", label: "Certifications" },
                { value: "85–90%", label: "RAG Accuracy" },
                { value: "1K+", label: "Doc Chunks" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="text-center p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]"
                >
                  <div className="text-xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <HighlightCard key={h.title} {...h} delay={0.1 * i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
