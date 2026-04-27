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
  /** Currently selected watch image — swappable via product card clicks */
  imageSrc?: string;
}

export default function ScrollWatch({
  progress,
  imageSrc = "/hero-watch.png",
}: Props) {
  const smoothProgress = useSpring(progress, {
    stiffness: 40,
    damping: 22,
    mass: 0.7,
    restDelta: 0.001,
  });

  const docY = useTransform(
    smoothProgress,
    [0, 0.4, 0.7, 1],
    ["44vh", "84vh", "154vh", "154vh"]
  );

  const x = useTransform(
    smoothProgress,
    [0, 0.7, 1],
    ["0vw", "-25vw", "-25vw"]
  );

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
            {/*
              Horizontal slide swap on card click:
                outgoing watch → exits LEFT (off the pillow, fades)
                incoming watch → enters from RIGHT (cards-side), lands on pillow
              `initial={false}` skips the slide on the very first render so the
              hero's own scroll choreography handles the page-load entrance.
            */}
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
            {/* Sizing element so the relative container has the right dimensions */}
            <div className="invisible">
              <WatchPlaceholder src={imageSrc} alt="" />
            </div>
            <div className="watch-shadow absolute left-1/2 -bottom-6 h-10 w-[70%] -translate-x-1/2 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
