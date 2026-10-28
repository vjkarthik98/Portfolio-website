"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink, ChevronDown, Info } from "lucide-react";

// Source of truth: public/magik-measured-evaluation.pdf (release v1.0.4, measured 27 Oct 2026).
// Keep every figure below identical to that PDF — if it is re-measured, update this file and the PDF together.
const EVAL_PDF_URL = "/magik-measured-evaluation.pdf";

const headlineStats = [
  {
    value: "93%",
    label: "Right facts found",
    note: "Share of the facts needed for a correct answer that the system retrieved.",
    basis: "30 questions",
    color: "text-indigo-400",
  },
  {
    value: "100%",
    label: "Citations accurate",
    note: "Every citation pointed to a source the system actually retrieved (automated check).",
    basis: "16 cited answers",
    color: "text-cyan-400",
  },
  {
    value: "90%",
    label: "Figures match source",
    note: "Numbers quoted in answers match the source text (within a 0.5% tolerance).",
    basis: "30 questions",
    color: "text-emerald-400",
  },
  {
    value: "12.6 s",
    label: "Typical answer time",
    note: "Median time for a complete answer. 95% of answers finished within 24.7 s.",
    basis: "46 answers",
    color: "text-purple-400",
  },
];

const reliabilityStats = [
  { value: "46 of 48", text: "questions answered — 2 declined, 0 errors" },
  { value: "0 of 30", text: "answers leaked internal prompt text" },
  { value: "7 types", text: "of files, 7 finance documents, 1,236 searchable chunks" },
];

const readingNotes = [
  "This is a first measurement on the live system — 30 quality questions and 48 speed questions. It is not a benchmark.",
  "The quality run covered text, PDF and Word files only. Spreadsheet, image, audio and video answers were not scored in it.",
  "Answers were scored by a small open-source AI model, not by people. It could grade only 11 of the 30 answers for faithfulness (84%), so treat that figure as partial.",
  "Time to first word includes checking the answer before it is shown, which is why it is not instant.",
  "An automated check flagged 10 of 30 answers as possible hallucinations. That check is rule-based, not a confirmed error rate, and the flagged answers are still being reviewed.",
];

const qualityRows = [
  { measure: "Context recall", result: "93%", basis: "30 questions", note: "Facts needed for the answer were found in retrieved text.", partial: false },
  { measure: "Citation accuracy", result: "100%", basis: "16 answers with citations", note: "Citations point to retrieved sources (automated check).", partial: false },
  { measure: "Prompt text leaked", result: "0%", basis: "30 questions", note: "No internal instructions appeared in any answer. Lower is better.", partial: false },
  { measure: "Finance figure fidelity", result: "90%", basis: "30 questions", note: "Figures in answers match the source text (within a 0.5% tolerance).", partial: false },
  { measure: "Answer relevancy", result: "73%", basis: "Up to 30 questions", note: "Answer addresses the question. The judge could not score some rows, so fewer than 30 may count.", partial: true },
  { measure: "Faithfulness", result: "84%", basis: "11 of 30 answers", note: "Statements supported by retrieved text. 19 answers could not be graded and are excluded.", partial: true },
  { measure: "Possible-hallucination flag", result: "33%", basis: "10 of 30 flagged", note: "Rule-based check, under review. Lower is better.", partial: true },
];

const speedRows = [
  { type: "All questions", count: "46", median: "11.55 s", p95: "23.70 s", full: "12.61 s", fullP95: "24.69 s" },
];

const speedByType = [
  { type: "Text", count: "8", median: "9.05 s", p95: "19.41 s" },
  { type: "PDF", count: "8", median: "12.50 s", p95: "31.81 s" },
  { type: "Excel", count: "6", median: "15.19 s", p95: "18.34 s" },
  { type: "Word", count: "8", median: "11.52 s", p95: "14.26 s" },
  { type: "Image", count: "8", median: "8.40 s", p95: "12.18 s" },
  { type: "Audio", count: "4", median: "11.79 s", p95: "15.11 s" },
  { type: "Video", count: "4", median: "18.75 s", p95: "23.28 s" },
];

const secondCheckRows = [
  { measure: "Answer relevancy", result: "40%", note: "Low — answers only partly address the question." },
  { measure: "Faithfulness", result: "59%", note: "Scored on 7 of 10 questions." },
  { measure: "Contextual recall", result: "100%", note: "Scored on 9 of 10 questions." },
  { measure: "Hallucination, bias, toxicity", result: "Not reliable", note: "The small judge model returned unusable output, so these are left unreported." },
];

const th = "py-2 pr-4 text-left text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] whitespace-nowrap";
const td = "py-2.5 pr-4 text-sm text-[var(--text-secondary)] align-top";
const tdStrong = "py-2.5 pr-4 text-sm font-semibold text-[var(--text-primary)] align-top whitespace-nowrap";

export default function MeasuredResults() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-6 sm:px-8 py-8 border-b border-[var(--border-color)]"
    >
      {/* Heading */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest font-mono">
            Measured Results
          </h4>
          <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
            Tested on the live production system (release v1.0.4) on 27 October 2026. An AWS GPU server ran the
            Qwen2.5-14B answer model, and a local open-source model scored the answers — no hosted AI APIs.
          </p>
        </div>
        <a
          href={EVAL_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-cyan-400 transition-colors"
        >
          <FileText size={12} className="shrink-0" />
          Full evaluation report (PDF)
          <ExternalLink size={10} className="shrink-0" />
        </a>
      </div>

      {/* Headline numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {headlineStats.map(({ value, label, note, basis, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5"
          >
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">{label}</p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">{note}</p>
            <p className="text-[11px] font-mono text-[var(--text-secondary)] opacity-75 mt-3">
              Based on {basis}
            </p>
          </div>
        ))}
      </div>

      {/* Reliability strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {reliabilityStats.map(({ value, text }) => (
          <div
            key={value}
            className="flex items-baseline gap-2.5 rounded-xl border border-[var(--border-color)] px-4 py-3"
          >
            <span className="text-base font-bold text-[var(--text-primary)] whitespace-nowrap">{value}</span>
            <span className="text-xs text-[var(--text-secondary)] leading-snug">{text}</span>
          </div>
        ))}
      </div>

      {/* Honest reading guide */}
      <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/5 px-5 py-4">
        <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-3">
          <Info size={13} className="shrink-0" />
          How to read these numbers
        </p>
        <ul className="space-y-2">
          {readingNotes.map((note) => (
            <li key={note} className="flex gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
              <span className="mt-2 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Full numbers */}
      <details className="group mt-6 rounded-2xl border border-[var(--border-color)]">
        <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)] [&::-webkit-details-marker]:hidden">
          See every number
          <ChevronDown size={16} className="shrink-0 text-[var(--text-secondary)] transition-transform group-open:rotate-180" />
        </summary>

        <div className="px-5 pb-6 space-y-8 border-t border-[var(--border-color)] pt-5">
          {/* Quality */}
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Answer quality</p>
            <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
              30 questions: 14 on a text file, 14 on the Apple 10-K (PDF) and 2 on a Word report.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className={th}>Measure</th>
                    <th className={th}>Result</th>
                    <th className={th}>Based on</th>
                    <th className={th}>What it means</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityRows.map(({ measure, result, basis, note, partial }) => (
                    <tr key={measure} className="border-b border-[var(--border-color)] last:border-0">
                      <td className={tdStrong}>{measure}</td>
                      <td className={tdStrong}>
                        {result}
                        {partial && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            partial
                          </span>
                        )}
                      </td>
                      <td className={`${td} whitespace-nowrap`}>{basis}</td>
                      <td className={td}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Speed */}
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Response speed</p>
            <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
              48 real questions, one at a time, through the same streaming endpoint the web app uses. 46 were answered and
              timed. Single user, warm models, no other load. &ldquo;95% within&rdquo; means 19 in 20 answers were at least this fast.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className={th}>Measure</th>
                    <th className={th}>Median</th>
                    <th className={th}>95% within</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--border-color)]">
                    <td className={tdStrong}>First word of the answer</td>
                    <td className={td}>{speedRows[0].median}</td>
                    <td className={td}>{speedRows[0].p95}</td>
                  </tr>
                  <tr>
                    <td className={tdStrong}>Complete answer</td>
                    <td className={td}>{speedRows[0].full}</td>
                    <td className={td}>{speedRows[0].fullP95}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs font-semibold text-[var(--text-primary)] mt-5 mb-2">
              Time to first word, by file type
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className={th}>File type</th>
                    <th className={th}>Questions</th>
                    <th className={th}>Median</th>
                    <th className={th}>95% within</th>
                  </tr>
                </thead>
                <tbody>
                  {speedByType.map(({ type, count, median, p95 }) => (
                    <tr key={type} className="border-b border-[var(--border-color)] last:border-0">
                      <td className={tdStrong}>{type}</td>
                      <td className={td}>{count}</td>
                      <td className={td}>{median}</td>
                      <td className={td}>{p95}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-secondary)] opacity-75 mt-2 italic">
              Each file type has only 4–8 questions, so the &ldquo;95% within&rdquo; values are indicative only.
            </p>
          </div>

          {/* Second check */}
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Second check (DeepEval, 10 questions)</p>
            <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
              A separate tool, run on the first 10 questions, all on the text file. It uses different questions and different
              scoring prompts, so it cannot be compared directly with the table above.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className={th}>Measure</th>
                    <th className={th}>Result</th>
                    <th className={th}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {secondCheckRows.map(({ measure, result, note }) => (
                    <tr key={measure} className="border-b border-[var(--border-color)] last:border-0">
                      <td className={tdStrong}>{measure}</td>
                      <td className={tdStrong}>{result}</td>
                      <td className={td}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Known weak spot: asking many questions about different documents in one long chat session led to more refusals
            (17 of 48 in an earlier run, against 2 of 48 with a fresh session per question). This is being investigated.
          </p>
        </div>
      </details>
    </motion.div>
  );
}
