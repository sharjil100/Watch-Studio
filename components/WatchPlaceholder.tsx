import Image from "next/image";

interface Props {
  src?: string;
  alt?: string;
}

export default function WatchPlaceholder({
  src = "/hero-watch.png",
  alt = "Gold luxury wristwatch with deep orange dial",
}: Props = {}) {
  const hasImage = true;

  if (hasImage) {
    return (
      <div className="relative w-full aspect-square">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width:1280px) 760px, (min-width:768px) 46vw, 72vw"
          className="object-contain scale-[1.05]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="Hero watch image placeholder"
      className="relative w-full aspect-square rotate-[-2deg] rounded-[28px] border border-burnt/40 placeholder-grid flex flex-col items-center justify-center text-burnt-deep"
    >
      <div className="absolute inset-3 rounded-[22px] border border-dashed border-burnt/50" />
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <span className="text-[10px] tracking-[0.4em] uppercase opacity-70">
          Hero Asset
        </span>
        <span className="font-display text-2xl leading-tight">
          Watch Image
        </span>
        <span className="text-[11px] tracking-[0.2em] uppercase opacity-60">
          Drop /public/hero-watch.png
        </span>
      </div>
    </div>
  );
}