"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

        <div className="flex justify-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-2xl"
          >
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              I&apos;m a{" "}
              <span className="text-[var(--text-primary)] font-semibold">
                Generative AI Engineer
              </span>{" "}
              focused on building AI systems that hold up under real evaluation, not
              just demos. I care as much about how a system is measured and deployed
              as how it&apos;s designed.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              I came to engineering from an unusual direction, and it turned out to be
              an advantage. Four years preparing for the UPSC civil services
              examination is four years of{" "}
              <span className="text-[var(--text-primary)] font-medium">
                synthesizing vast, unstructured source material under evaluation
                pressure
              </span>{" "}
              — a discipline that maps directly onto AI engineering, where an answer
              is only as good as the source it can be traced back to.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              My MA in English shows up in the work too: I document systems clearly
              and report results honestly, including{" "}
              <span className="text-indigo-400 font-medium">where they fall short</span>.
              I&apos;d rather ship a measured weakness than an unmeasured claim.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
