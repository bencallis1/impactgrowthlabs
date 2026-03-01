import Link from "next/link";

const footerLinks = {
  Studio: [
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Team", href: "/#team" },
    { label: "Services", href: "/#services" },
  ],
  Founders: [
    { label: "Apply", href: "/apply" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
  ],
  Investors: [
    { label: "Investor Inquiry", href: "/invest" },
    { label: "Investor Portal", href: "/portal" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1A14] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-serif text-xl mb-4"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#52B788] text-[#0F1A14] text-sm font-bold">
                IG
              </span>
              Impact Growth Labs
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-[220px]">
              Backing founders who build a better world.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {year} Impact Growth Labs. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            hello@impactgrowthlabs.com
          </p>
        </div>
      </div>
    </footer>
  );
}
