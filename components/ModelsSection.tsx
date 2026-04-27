"use client";

import Image from "next/image";
import { useRef, type ButtonHTMLAttributes } from "react";
import { motion, type MotionValue } from "framer-motion";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface Props {
  progress?: MotionValue<number>;
  products: Product[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ModelsSection({ products, selectedId, onSelect }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const CARD_STEP = 220;

  const scrollByDelta = (delta: number) =>
    carouselRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <section className="relative w-full h-[100svh] bg-cream overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 grid-rows-[45%_55%] lg:grid-rows-1">

        {/* Pillow — top 45% on mobile, full left column on desktop */}
        <div className="relative h-full">
          <div
            className="absolute left-1/2 top-1/2 lg:top-[54%] -translate-x-1/2 -translate-y-1/2"
            style={{ width: "calc(var(--watch-size) * 1.5)" }}
          >
            <div className="relative aspect-[5/4]">
              <Image
                src="/pillow2.png"
                alt="Velvet display pillow"
                fill
                priority
                sizes="(min-width:1024px) 50vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content — bottom 55% on mobile, full right column on desktop */}
        <div className="relative flex flex-col justify-center px-6 md:px-10 lg:px-[6vw] py-4 md:py-6 lg:py-8 gap-4 lg:gap-6">

          <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-ink/55">
            Our models
          </p>

          <h2
            className="hero-type leading-[0.82]"
            style={{ fontSize: "clamp(2.2rem, 7vw, 7rem)" }}
          >
            <span className="block">PURE</span>
            <span className="block" style={{ marginTop: "-0.04em" }}>
              BRILLIANCE
            </span>
          </h2>

          {/* Brief description */}
          <p className="text-xs md:text-sm text-ink/60 leading-relaxed max-w-xs">
            Five movements. One obsession. Each piece hand-finished over six
            weeks in our Geneva atelier.
          </p>

          {/* Carousel */}
          <div className="flex items-center gap-3 md:gap-4">
            <div
              ref={carouselRef}
              className="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {products.map((product, idx) => (
                <ModelCard
                  key={product.id}
                  product={product}
                  isSelected={product.id === selectedId}
                  onClick={() => onSelect(product.id)}
                  index={idx}
                />
              ))}
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <CarouselButton onClick={() => scrollByDelta(-CARD_STEP)} aria-label="Previous model">←</CarouselButton>
              <CarouselButton onClick={() => scrollByDelta(CARD_STEP)} aria-label="Next model">→</CarouselButton>
            </div>
          </div>

          {/* Footer row: price range + CTA */}
          <div className="flex items-center justify-between pt-1 border-t border-ink/10">
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-ink/45">
              From $1,149
            </span>
            <a
              href="#"
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-burnt hover:underline underline-offset-4"
            >
              View collection →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

function CarouselButton({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-burnt/40 text-burnt hover:bg-burnt hover:text-cream transition flex items-center justify-center text-sm md:text-base"
    >
      {children}
    </button>
  );
}

interface ModelCardProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function ModelCard({ product, isSelected, onClick, index }: ModelCardProps) {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      aria-label={`Select ${product.name}`}
      aria-pressed={isSelected}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="snap-start shrink-0 w-[150px] md:w-[200px] flex flex-col gap-2 md:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-burnt rounded-md"
    >
      <div
        className={`relative aspect-[3/4] rounded-md overflow-hidden border transition-colors ${
          isSelected ? "border-burnt" : "border-burnt/20 group-hover:border-burnt/50"
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 767px) 150px, 200px"
          className="object-contain p-3"
        />
      </div>
      <div>
        <p className="text-xs md:text-sm text-ink">{product.name}</p>
        <p className="text-xs md:text-sm text-ink/55">{product.price}</p>
      </div>
    </motion.button>
  );
}
