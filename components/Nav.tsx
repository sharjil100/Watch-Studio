"use client";

import { useState } from "react";

const LINKS = ["Collection", "Heritage", "Atelier", "Journal"];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-5 md:py-6 flex items-center justify-between">
        <div className="font-display text-lg md:text-2xl tracking-[0.2em] md:tracking-[0.25em] text-burnt">
          WATCH STUDIO
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-ink/80">
          {LINKS.map((l) => (
            <a key={l} href="#" className="hover:text-burnt transition">
              {l}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="hidden md:block text-sm tracking-[0.2em] uppercase border border-ink/30 px-5 py-2.5 hover:bg-ink hover:text-cream transition">
          Reserve
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center gap-[5px] p-1"
        >
          <span
            className={`block w-6 h-[1.5px] bg-ink origin-center transition-transform duration-200 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-ink origin-center transition-transform duration-200 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-cream/95 backdrop-blur-sm border-t border-burnt/10 px-6 py-8 flex flex-col gap-6">
          {LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm tracking-[0.25em] uppercase text-ink/80 hover:text-burnt transition"
            >
              {l}
            </a>
          ))}
          <button className="self-start mt-2 text-xs tracking-[0.3em] uppercase border border-ink/30 px-5 py-3 hover:bg-ink hover:text-cream transition">
            Reserve
          </button>
        </div>
      )}
    </header>
  );
}
