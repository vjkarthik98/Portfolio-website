"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-mono text-sm font-medium mb-2 tracking-widest uppercase">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
            I&apos;m actively looking for opportunities in Generative AI Engineering.
            Whether it&apos;s a project, a role, or just a conversation — reach out.
          </p>
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden mb-12 p-8 sm:p-12 text-center"
        >
          {/* BG gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-cyan-600/20 border border-indigo-500/30 rounded-3xl" />
          <div className="absolute inset-0 bg-[var(--bg-card)] opacity-80" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
              Open to Generative AI Roles
            </h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8">
              Actively seeking full-time positions and collaboration opportunities
              in AI Engineering, MLOps, and LLM-driven product development.
            </p>
            <motion.a
              href="mailto:karthikvj398@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Send size={16} />
              Send an Email
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
