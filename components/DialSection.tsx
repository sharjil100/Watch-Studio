"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ANNOTATIONS = [
  { id: "bracelet", text: "The President Bracelet", x: "71%", y: "26%", dir: "right" as const, delay: 0 },
  { id: "case",     text: "Oyster Architecture",    x: "29%", y: "42%", dir: "left"  as const, delay: 0.2 },
  { id: "calibre",  text: "Calibre 3255",           x: "27%", y: "59%", dir: "left"  as const, delay: 0.4 },
  { id: "dial",     text: "24 Karat Gold Dial",      x: "34%", y: "72%", dir: "left"  as const, delay: 0.6 },
  { id: "date",     text: "Live Date Window",        x: "72%", y: "50%", dir: "right" as const, delay: 0.8 },
  { id: "finish",   text: "Brilliant Like No Other", x: "66%", y: "74%", dir: "right" as const, delay: 1.0 },
];

export default function DialSection({ imageSrc = "/hero-watch.png" }: { imageSrc?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showLabels, setShowLabels] = useState(false);

  // Safe to read window here — this component is loaded with ssr:false via ScrollSceneClient
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ─── Transforms ────────────────────────────────────────────────────────────
  //
  // Desktop start state mirrors where ScrollWatch left off:
  //   x = -25vw  (centre of the left / pillow column)
  //   scale ≈ 0.85  (matches --watch-size relative to the 70vmin container)
  //   rotate = 0  (ScrollWatch rotateOffset –3 + entry +3 = 0 net)
  //
  // Phase 1 (0 → 0.35): watch slides from pillow column to screen centre
  // Phase 2 (0.35 → 0.65): camera push-in — watch zooms until dial fills screen
  // Phase 3 (0.65 → 1): hold zoomed, labels stagger in

  const xDesktop   = useTransform(scrollYProgress, [0, 0.35, 0.65], ["-25vw", "-8vw", "0vw"]);
  const xMobile    = useTransform(scrollYProgress, [0, 1],           ["0vw",   "0vw"]);

  const scaleD     = useTransform(scrollYProgress, [0, 0.65], [0.85, 1.75]);
  const scaleM     = useTransform(scrollYProgress, [0, 0.65], [0.70, 1.75]);

  // Cream → dark ink background
  const inkOpacity = useTransform(scrollYProgress, [0.08, 0.5], [0, 1]);

  // Pillow fades out as the watch zooms away from it
  const pillowOp   = useTransform(scrollYProgress, [0, 0.3],  [0.85, 0]);

  // Watch fades in at the very start (avoids a hard cut from ModelsSection)
  const watchOp    = useTransform(scrollYProgress, [0, 0.1],  [0, 1]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setShowLabels(v >= 0.65));
  }, [scrollYProgress]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const x     = isMobile ? xMobile : xDesktop;
  const scale = isMobile ? scaleM  : scaleD;

  return (
    <div ref={ref} style={{ height: "220svh" }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-cream">

        {/* Ink overlay — cream fades to dark as watch zooms in */}
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: inkOpacity }} />

        {/* "The Anatomy" badge */}
        {showLabels && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute top-8 left-8 z-20 text-[9px] tracking-[0.5em] uppercase text-cream/50 select-none"
          >
            The Anatomy
          </motion.p>
        )}

        {/* Watch + pillow — the core animation layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/*
            key forces remount on breakpoint cross so useTransform
            picks up the correct x / scale ranges for the new layout.
          */}
          <motion.div
            key={isMobile ? "m" : "d"}
            className="relative"
            style={{ width: "70vmin", height: "70vmin", x, scale, opacity: watchOp }}
          >
            {/* Pillow — sits behind the watch, fades as watch zooms toward viewer */}
            <motion.div
              className="absolute inset-0 scale-[1.45] z-0"
              style={{ opacity: pillowOp }}
            >
              <Image src="/pillow2.png" alt="" fill className="object-contain" sizes="70vmin" />
            </motion.div>

            {/* Watch */}
            <div className="absolute inset-0 z-10">
              <Image
                src={imageSrc}
                alt="Watch dial close-up"
                fill
                priority
                className="object-contain"
                sizes="70vmin"
              />
            </div>
          </motion.div>
        </div>

        {/* Annotation callouts */}
        {showLabels && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {ANNOTATIONS.map((a) => (
              <Annotation key={a.id} {...a} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Annotation callout ───────────────────────────────────────────────────────

interface AnnotationProps {
  text: string;
  x: string;
  y: string;
  dir: "left" | "right";
  delay: number;
}

function Annotation({ text, x, y, dir, delay }: AnnotationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute flex items-center ${dir === "left" ? "flex-row-reverse" : ""}`}
      style={{
        left: x,
        top: y,
        // Right: annotation starts at x, dot is at the left end.
        // Left:  annotation ends at x,   dot is at the right end.
        transform: dir === "left" ? "translate(-100%, -50%)" : "translateY(-50%)",
      }}
    >
      {/* Dot on watch surface */}
      <div className="w-[5px] h-[5px] rounded-full border border-cream/55 shrink-0" />
      {/* Connecting line */}
      <div className="w-8 md:w-14 h-px bg-cream/22 shrink-0" />
      {/* Label */}
      <span
        className={`text-[9px] md:text-[11px] tracking-[0.25em] uppercase text-cream/68 whitespace-nowrap ${
          dir === "right" ? "ml-2" : "mr-2"
        }`}
      >
        {text}
      </span>
    </motion.div>
  );
}
