"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/#waitlist", label: "Early Access" },
];

export function SiteNav({ activePage }: { activePage?: "about" | "blog" | "home" }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-[15px] text-gray-900">DentaFlow</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-500">
          {NAV_LINKS.map((link) => {
            const isActive =
              (activePage === "about" && link.href === "/about") ||
              (activePage === "blog" && link.href === "/blog");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-gray-900 transition-colors ${isActive ? "text-emerald-700 font-medium" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link href="/#waitlist" className="hidden md:block">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] h-9 px-4 rounded-lg font-semibold active:scale-[0.98] transition-all">
              Get early access
            </button>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? (
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileNavOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileNavOpen(false)}
              className="block py-2.5 text-[15px] text-gray-700 hover:text-emerald-700 transition-colors border-b border-gray-50 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link href="/#waitlist" onClick={() => setMobileNavOpen(false)}>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-lg text-[15px] font-semibold transition-all active:scale-[0.98]">
                Get early access →
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
