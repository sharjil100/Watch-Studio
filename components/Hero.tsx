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
    // Full-viewport hero — watch lives in <ScrollWatch>, not here, so it can
    // travel into the next section as the user scrolls.
    <section className="relative w-full h-[100svh] min-h-[720px] bg-cream overflow-hidden">

      <div className="absolute inset-x-0 top-0 bottom-[16vh] flex items-center justify-center">

        {/* Static centering wrapper — owns the -translate-y-1/2 so it doesn't
            collide with motion.h1's transform animation (clip-path + scale). */}
        <div className="absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 flex justify-center">
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
        </div>
      </div>

      {/* Bottom-corner metadata */}
      <div className="absolute bottom-8 left-8 text-[11px] uppercase tracking-[0.3em] text-ink/60">
        Ref. 24K-013
      </div>
      <div className="absolute bottom-8 right-8 text-[11px] uppercase tracking-[0.3em] text-ink/60">
        Édition · MMXXVI
      </div>
    </section>
  );
}
