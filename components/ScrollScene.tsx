"use client";

import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Hero from "./Hero";
import ModelsSection, { type Product } from "./ModelsSection";
import ScrollWatch from "./ScrollWatch";

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
  const selected = PRODUCTS.find((p) => p.id === selectedId) ?? PRODUCTS[0];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="relative">
      <ScrollWatch progress={scrollYProgress} imageSrc={selected.image} />
      <Hero />
      <ModelsSection
        progress={scrollYProgress}
        products={PRODUCTS}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </div>
  );
}
