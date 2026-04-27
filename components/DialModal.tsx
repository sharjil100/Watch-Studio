"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Positions tuned for a 200vmin watch container (dial-only close-up).
// On a 16:9 desktop the viewport shows roughly the center 88% × 50% of the
// container, so all points land inside ~6–94% x and ~25–75% y.
const ANNOTATIONS = [
  { id: "bracelet", text: "The President Bracelet", x: "64%", y: "30%", dir: "right" as const, delay: 0.80 },
  { id: "case",     text: "Oyster Architecture",    x: "29%", y: "42%", dir: "left"  as const, delay: 0.95 },
  { id: "calibre",  text: "Calibre 3255",           x: "27%", y: "57%", dir: "left"  as const, delay: 1.10 },
  { id: "dial",     text: "24 Karat Gold Dial",      x: "33%", y: "70%", dir: "left"  as const, delay: 1.25 },
  { id: "date",     text: "Live Date Window",        x: "71%", y: "50%", dir: "right" as const, delay: 1.40 },
  { id: "finish",   text: "Brilliant Like No Other", x: "66%", y: "70%", dir: "right" as const, delay: 1.55 },
];

interface Props {
  open: boolean;
  onClose: () => void;
  imageSrc?: string;
}

export default function DialModal({ open, onClose, imageSrc = "/hero-watch.png" }: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="dial-modal"
          className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Solid dark base — prevents blurred page content from bleeding through */}
          <div className="absolute inset-0 bg-neutral-900" />

          {/* ── Zoom scene ─────────────────────────────────────────────────────
              Starts at scale ≈ 0.30 which matches --watch-size / 200vmin
              (the watch's apparent size in ModelsSection).  Scaling to 1
              simulates the camera pushing straight toward the dial.
          ──────────────────────────────────────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.30, y: "-12vmin" }}
            animate={{ scale: 1,    y: "10vmin" }}
            exit={{ scale: 0.30,    y: "-8vmin" }}
            style={{ transformOrigin: "50% 50%" }}
            transition={{ type: "spring", stiffness: 75, damping: 19 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Reference div — 200vmin square; no CSS transform here.
                Vertical offset is handled by the Framer Motion y above so
                scale always zooms from the corrected centre. */}
            <div className="relative" style={{ width: "200vmin", height: "200vmin" }}>

              {/* Pillow — scaled to cover the entire viewport so its dark velvet
                  texture forms the background; object-cover fills the container. */}
              <div
                className="absolute z-0"
                style={{
                  width: "320vmin",
                  height: "320vmin",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Image
                  src="/pillow2.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="320vmin"
                />
              </div>

              {/* Watch — fills the 200vmin container; viewport clips to dial */}
              <div className="absolute inset-0 z-10">
                <Image
                  src={imageSrc}
                  alt="Watch dial close-up"
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="200vmin"
                />
              </div>

              {/* Annotations — stagger in after the spring has settled */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {ANNOTATIONS.map((a) => (
                  <Annotation key={a.id} {...a} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* UI layer — fades in separately so it doesn't wobble with the spring */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <p className="absolute top-8 left-8 text-[9px] tracking-[0.5em] uppercase text-cream/50 select-none">
              The Anatomy
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="pointer-events-auto absolute top-5 right-6 text-cream/50 hover:text-cream transition-colors text-4xl leading-none w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
        transform: dir === "left" ? "translate(-100%, -50%)" : "translateY(-50%)",
      }}
    >
      <div className="w-[6px] h-[6px] rounded-full bg-cream/80 shrink-0" />
      <div className="w-10 md:w-16 h-px bg-cream/45 shrink-0" />
      <span
        className={`text-[11px] md:text-[13px] tracking-[0.18em] uppercase text-cream/90 font-light whitespace-nowrap ${
          dir === "right" ? "ml-2" : "mr-2"
        }`}
      >
        {text}
      </span>
    </motion.div>
  );
}
