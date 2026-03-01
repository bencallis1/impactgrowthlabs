"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutGrid,
  FileText,
  Newspaper,
  BarChart2,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/portal", label: "Portfolio", icon: LayoutGrid, exact: true },
  { href: "/portal/impact", label: "Impact", icon: BarChart2, exact: false },
  { href: "/portal/news", label: "News", icon: Newspaper, exact: false },
  { href: "/portal/reports", label: "Reports", icon: FileText, exact: false },
];

export function PortalNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[#0F1A14] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#52B788] text-[#0F1A14] text-sm font-bold">
            IG
          </span>
          <span className="text-white font-serif text-base">
            Investor Portal
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#52B788]/20 text-[#95D5B2]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="px-4 py-6 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
