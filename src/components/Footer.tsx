"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/vjkarthik98", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/vijaya-karthik-517353357", icon: Linkedin, label: "LinkedIn" },
  { href: "https://mail.google.com/mail/?view=cm&to=karthikvj398@gmail.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] pt-12 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Connect */}
        <div className="flex flex-col items-center mb-10">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-4">
            Connect
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border-color)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-secondary)]">
            © {year} Vijaya Karthik. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Generative AI Engineer · Open to opportunities
          </p>
          <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
            Built with <Heart size={11} className="text-rose-500 fill-rose-500" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
