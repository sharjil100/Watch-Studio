"use client";

import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import WatchPlaceholder from "./WatchPlaceholder";

interface Props {
  progress: MotionValue<number>;
  imageSrc?: string;
  isMobile?: boolean;
  onWatchClick?: () => void;
}

export default function ScrollWatch({
  progress,
  imageSrc = "/hero-watch.png",
  isMobile = false,
  onWatchClick,
}: Props) {
  const smoothProgress = useSpring(progress, {
    stiffness: 40,
    damping: 22,
    mass: 0.7,
    restDelta: 0.001,
  });

  // Desktop: watch travels to the pillow in the left column (centered at 154vh).
  // Mobile:  pillow occupies the top 45% of ModelsSection, so its center sits at
  //          100svh + 50% × 45svh = 122.5svh ≈ 123vh.
  const docY = useTransform(
    smoothProgress,
    [0, 0.4, 0.7, 1],
    isMobile
      ? ["42vh", "58vh", "123vh", "123vh"]
      : ["44vh", "84vh", "154vh", "154vh"]
  );

  // Desktop: slide left into the two-column pillow area.
  // Mobile:  pillow is centred in the single column — no horizontal shift.
  const x = useTransform(
    smoothProgress,
    [0, 0.7, 1],
    isMobile ? ["0vw", "0vw", "0vw"] : ["0vw", "-25vw", "-25vw"]
  );

  // Subtle tilt when the watch lands on the pillow (same on both breakpoints).
  const rotateOffset = useTransform(
    smoothProgress,
    [0, 0.4, 0.7, 1],
    [0, 0, -3, -3]
  );

  const entry = useAnimation();
  useEffect(() => {
    const t = setTimeout(() => {
      entry.start({
        scale: 1,
        rotate: 3,
        transition: { duration: 5.5, ease: [0.22, 1, 0.36, 1] },
      });
    }, 300);
    return () => clearTimeout(t);
  }, [entry]);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ width: "var(--watch-size)" }}
    >
      <motion.div
        style={{
          x,
          y: docY,
          rotate: rotateOffset,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <motion.div
          initial={{ scale: 1.08, rotate: 0 }}
          animate={entry}
          style={{ transformOrigin: "center center", willChange: "transform" }}
        >
          <div className="relative">
            <button
              type="button"
              onClick={onWatchClick}
              className="pointer-events-auto relative block w-full group"
              style={{ cursor: onWatchClick ? "pointer" : "default" }}
              aria-label="Explore watch anatomy"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={imageSrc}
                  initial={{ x: "40vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-40vw", opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <WatchPlaceholder src={imageSrc} alt="Featured watch" />
                </motion.div>
              </AnimatePresence>
              <div className="invisible">
                <WatchPlaceholder src={imageSrc} alt="" />
              </div>
            </button>
            <div className="watch-shadow absolute left-1/2 -bottom-6 h-10 w-[70%] -translate-x-1/2 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
