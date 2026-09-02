"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Mathematics — Basics to Advanced for Data Science and GenAI",
    issuer: "Udemy",
    icon: "📐",
    color: "from-amber-600 to-orange-700",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    tags: ["Linear Algebra", "Statistics", "Calculus", "Data Science", "GenAI"],
    link: "https://ude.my/UC-962275cb-1791-4d73-8de9-2ee4b0af4dc0",
  },
  {
    title: "IBM Generative AI Engineering Professional Certificate",
    issuer: "IBM · Coursera",
    icon: "🏆",
    color: "from-blue-600 to-blue-800",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    tags: ["Generative AI", "LLMs", "Transformers", "RAG", "LangChain", "Hugging Face"],
    link: "https://coursera.org/share/4f1c75c7573b5c979bea64822dfad645",
  },
  {
    title: "MLOps | Machine Learning Operations Specialization",
    issuer: "Duke University · Coursera",
    icon: "🎓",
    color: "from-indigo-600 to-purple-700",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    tags: ["MLOps", "AWS", "MLflow"],
    link: "https://coursera.org/share/b05877676eb9d2bf72e4081c5861529a",
  },
  {
    title: "Responsible AI for Developers: Privacy & Safety",
    issuer: "Google Cloud · Coursera",
    icon: "🌐",
    color: "from-green-600 to-teal-700",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    tags: ["Responsible AI", "Privacy", "Safety", "Ethics"],
    link: "https://coursera.org/share/6c9415afd47f6b880c5016e5fc88bdf7",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

        </div>
      </div>
    </section>
  );
}
