"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "IBM Generative AI Engineering Professional Certificate",
    issuer: "IBM · Coursera",
    icon: "🏆",
    color: "from-blue-600 to-blue-800",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    tags: ["Generative AI", "LLMs", "Prompt Engineering"],
    link: "#",
  },
  {
    title: "MLOps (Machine Learning Operations) Specialization",
    issuer: "Duke University · Coursera",
    icon: "🎓",
    color: "from-indigo-600 to-purple-700",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    tags: ["MLOps", "CI/CD", "Model Deployment"],
    link: "#",
  },
  {
    title: "Responsible AI for Developers",
    issuer: "Google Cloud · Coursera",
    icon: "🌐",
    color: "from-green-600 to-teal-700",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    tags: ["Responsible AI", "Ethics", "Bias Mitigation"],
    link: "#",
  },
  {
    title: "Mathematics for Generative AI",
    issuer: "Udemy · Krish Naik",
    icon: "📐",
    color: "from-purple-600 to-pink-700",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    tags: ["Linear Algebra", "Calculus", "Statistics"],
    link: "#",
  },
  {
    title: "Data Structures and Algorithms",
    issuer: "Udemy · Elshad Karimov",
    icon: "⚙️",
    color: "from-amber-600 to-orange-700",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    tags: ["DSA", "Problem Solving", "Python"],
    link: "#",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm font-medium mb-2 tracking-widest uppercase">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Advanced{" "}
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            Enterprise-grade certifications validating expertise in the modern AI stack.
          </p>
        </motion.div>

        {/* Certs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden hover:-translate-y-1 transition-transform"
              whileHover={{ y: -4 }}
            >
              {/* Gradient top stripe */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${cert.color}`} />

              <div className="p-6">
                {/* Icon + issuer */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cert.icon}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${cert.badgeColor}`}>
                    {cert.issuer.split(" · ")[1] || cert.issuer}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[var(--text-primary)] leading-snug mb-1 text-sm">
                  {cert.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-4">{cert.issuer}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                >
                  <Award size={12} />
                  View Certificate
                  <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          ))}

          {/* Professional Development card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="rounded-2xl border border-dashed border-indigo-500/40 bg-indigo-500/5 p-6 flex flex-col justify-center sm:col-span-2 lg:col-span-1"
          >
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              Independent AI Engineering
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              June 2025 – Present. Dedicated full-time focus to mastering the modern AI stack —
              culminating in enterprise-grade certifications and production-ready LLM pipelines.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
