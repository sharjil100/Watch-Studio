export default function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-7xl px-8 py-6 flex items-center justify-between">
        <div className="font-display text-2xl tracking-[0.25em] text-burnt">
          WATCH STUDIO
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-ink/80">
          <a href="#" className="hover:text-burnt transition">Collection</a>
          <a href="#" className="hover:text-burnt transition">Heritage</a>
          <a href="#" className="hover:text-burnt transition">Atelier</a>
          <a href="#" className="hover:text-burnt transition">Journal</a>
        </nav>
        <button className="text-sm tracking-[0.2em] uppercase border border-ink/30 px-5 py-2.5 hover:bg-ink hover:text-cream transition">
          Reserve
        </button>
      </div>
    </header>
  );
}
