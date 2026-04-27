"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import Hero from "./Hero";
import ModelsSection, { type Product } from "./ModelsSection";
import ScrollWatch from "./ScrollWatch";
import DialModal from "./DialModal";

const PRODUCTS: Product[] = [
  { id: "origin",   name: "Aurum Origin",            price: "$2,199.00", image: "/hero-watch.png" },
  { id: "classic",  name: "Classic Gold",            price: "$1,599.00", image: "/watch-2.png" },
  { id: "heritage", name: "Heritage Edition",        price: "$1,749.00", image: "/watch-3.png" },
  { id: "leather",  name: "Leather & Diamonds",      price: "$1,899.00", image: "/watch-4.png" },
  { id: "yellow",   name: "Yellow Gold & Diamonds",  price: "$1,149.00", image: "/watch-5.png" },
];

export default function ScrollScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string>(PRODUCTS[0].id);
  const [dialOpen, setDialOpen] = useState(false);

  // Lazy init reads window immediately — safe because this component has ssr:false
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );

  const selected = PRODUCTS.find((p) => p.id === selectedId) ?? PRODUCTS[0];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Main scroll scene (200svh) — ScrollWatch travels hero → pillow */}
      <div ref={ref} className="relative">
        <ScrollWatch
          key={isMobile ? "mobile" : "desktop"}
          progress={scrollYProgress}
          imageSrc={selected.image}
          isMobile={isMobile}
          onWatchClick={() => setDialOpen(true)}
        />
        <Hero />
        <ModelsSection
          progress={scrollYProgress}
          products={PRODUCTS}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Dial anatomy modal — click-triggered, pops watch off pillow */}
      <DialModal
        open={dialOpen}
        onClose={() => setDialOpen(false)}
        imageSrc={selected.image}
      />
    </>
  );
}
