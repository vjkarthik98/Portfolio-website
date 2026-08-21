"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/vjkarthik98", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/vijaya-karthik-517353357", icon: Linkedin, label: "LinkedIn" },
  { href: "https://mail.google.com/mail/?view=cm&to=karthikvj398@gmail.com", icon: Mail, label: "Email" },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-indigo-400 font-mono text-sm font-medium mb-2 tracking-widest uppercase">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto leading-relaxed">
            I&apos;m actively seeking full-time opportunities in Generative AI Engineering,
            MLOps, and LLM-driven product development. Whether it&apos;s a role, a
            collaboration, or just a conversation — reach out.
          </p>
        </motion.div>

        {/* Connect */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center mt-10"
        >
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
