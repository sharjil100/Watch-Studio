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

  // Phase 1 (0 → 0.30): watch holds at hero position while it straightens.
  // Phase 2 (0.30 → 0.65): watch slides down to the pillow.
  // Phase 3 (0.65 → 1): watch held on pillow.
  const docY = useTransform(
    smoothProgress,
    [0, 0.30, 0.65, 1],
    isMobile
      ? ["50vh", "50vh", "133vh", "133vh"]
      : ["52vh", "52vh", "163vh", "163vh"]
  );

  const x = useTransform(
    smoothProgress,
    [0, 0.30, 0.65, 1],
    isMobile ? ["0vw", "0vw", "0vw", "0vw"] : ["0vw", "0vw", "-25vw", "-25vw"]
  );

  // Straightens the watch during phase 1 (scroll offsets the entry tilt),
  // then holds straight so the watch settles flat on the pillow.
  const rotateOffset = useTransform(
    smoothProgress,
    [0, 0.30, 0.65, 1],
    [0, -7, -7, -7]
  );

  const entry = useAnimation();
  useEffect(() => {
    const t = setTimeout(() => {
      entry.start({
        scale: 1,
        rotate: 7,
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
                  style={{ y: "-12%" }}
                >
                  <WatchPlaceholder src={imageSrc} alt="Featured watch" />
                </motion.div>
              </AnimatePresence>
              <div className="invisible">
                <WatchPlaceholder src={imageSrc} alt="" />
              </div>
            </button>
            {/* Shadow sits below the dial, not the bracelet tip — shift up to match image offset */}
            <div
              className="watch-shadow absolute left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-full"
              style={{ bottom: "calc(12% - 1.5rem)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
