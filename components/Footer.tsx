export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-cream border-t border-burnt/15">
      <div className="mx-auto max-w-7xl px-8 py-16 grid grid-cols-1 gap-12 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="font-display text-2xl tracking-[0.25em] text-burnt">
            WATCH STUDIO
          </div>
          <p className="text-sm text-ink/70 leading-relaxed max-w-xs">
            Crafted in gold. Measured in legacy. A house of timepieces forged
            for those who keep their own time.
          </p>
        </div>

        {/* Collection */}
        <FooterColumn title="Collection">
          <FooterLink href="#">Day-Date</FooterLink>
          <FooterLink href="#">Heritage</FooterLink>
          <FooterLink href="#">Atelier</FooterLink>
          <FooterLink href="#">Limited Edition</FooterLink>
        </FooterColumn>

        {/* House */}
        <FooterColumn title="House">
          <FooterLink href="#">Our Story</FooterLink>
          <FooterLink href="#">Craftsmanship</FooterLink>
          <FooterLink href="#">Journal</FooterLink>
          <FooterLink href="#">Press</FooterLink>
        </FooterColumn>

        {/* Contact */}
        <FooterColumn title="Contact">
          <FooterLink href="#">Boutiques</FooterLink>
          <FooterLink href="#">Concierge</FooterLink>
          <FooterLink href="#">Servicing</FooterLink>
          <FooterLink href="#">Reserve a Viewing</FooterLink>
        </FooterColumn>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-burnt/10">
        <div className="mx-auto max-w-7xl px-8 py-6 flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center justify-between text-[11px] tracking-[0.25em] uppercase text-ink/50">
          <span>© {year} Watch Studio · Geneva</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-burnt transition">Privacy</a>
            <a href="#" className="hover:text-burnt transition">Terms</a>
            <a href="#" className="hover:text-burnt transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[11px] tracking-[0.3em] uppercase text-burnt">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-ink/70 hover:text-burnt transition"
      >
        {children}
      </a>
    </li>
  );
}
