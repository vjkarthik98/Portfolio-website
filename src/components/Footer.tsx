"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs text-[var(--text-secondary)]">
          © {year} Vijaya Karthik. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
