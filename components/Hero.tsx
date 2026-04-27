"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Hero() {
  const textControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      textControls.start({
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        transition: { duration: 5.5, ease: [0.22, 1, 0.36, 1] },
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [textControls]);

  return (
    <section className="relative w-full h-[100svh] min-h-[500px] bg-cream overflow-hidden">

      {/* Main hero type — centered in upper ~80% to leave room for bottom strip */}
      <div className="absolute inset-x-0 top-0 bottom-[20vh] flex items-center justify-center">
        <div className="absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 flex flex-col items-center gap-6 md:gap-8">
          <motion.h1
            aria-hidden="true"
            initial={{ clipPath: "inset(0% 50% 0% 50%)", scale: 0.96 }}
            animate={textControls}
            className="hero-type pointer-events-none select-none flex flex-col items-center justify-center text-center"
            style={{
              transformOrigin: "center center",
              willChange: "clip-path, transform",
              fontSize: "var(--hero-type-size)",
            }}
          >
            <span className="block leading-[0.82]">OYSTERS</span>
            <span
              className="block leading-[0.82]"
              style={{ marginTop: "var(--hero-type-gap)" }}
            >
              PERPETUAL
            </span>
          </motion.h1>

          {/* Tagline — fades in after hero type animation begins */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 2, ease: "easeOut" }}
            className="text-[10px] md:text-[11px] tracking-[0.45em] uppercase text-ink/50 pointer-events-none select-none"
          >
            A house of timepieces · Geneva · Est. MCMXLVII
          </motion.p>
        </div>
      </div>

      {/* Bottom strip — spans full width above the corner labels */}
      <div className="absolute bottom-[10vh] inset-x-0 border-t border-ink/8">
        <div className="mx-auto max-w-7xl px-6 md:px-8 pt-4 flex items-center justify-between">
          <span className="text-[9px] tracking-[0.4em] uppercase text-ink/35">
            24 Karat · Swiss Made
          </span>
          {/* Scroll indicator */}
          <div className="hidden md:flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-[0.4em] uppercase text-ink/35">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-5 bg-ink/25"
            />
          </div>
          <span className="text-[9px] tracking-[0.4em] uppercase text-ink/35">
            Collection 2026
          </span>
        </div>
      </div>

      {/* Corner metadata */}
      <div className="absolute bottom-4 md:bottom-5 left-6 md:left-8 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/50">
        Ref. 24K-013
      </div>
      <div className="absolute bottom-4 md:bottom-5 right-6 md:right-8 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-ink/50">
        Édition · MMXXVI
      </div>
    </section>
  );
}
