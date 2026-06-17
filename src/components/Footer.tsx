"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold font-mono gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            VK<span className="text-[var(--text-secondary)]">.</span>
          </motion.div>

          {/* Copyright */}
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5">
            © {year} Vijaya Karthik · Built with
            <Heart size={12} className="text-rose-500 fill-rose-500 inline" />
            using Next.js
          </p>

          {/* Social */}
          <div className="flex items-center gap-2">
            {[
              { href: "https://github.com/vjkarthik98", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/YOUR_LINKEDIN", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:karthikvj398@gmail.com", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
