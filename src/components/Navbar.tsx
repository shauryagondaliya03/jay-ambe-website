"use client";

import { useEffect, useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { label: "Academics", href: "#academics" },
  { label: "Campus Life", href: "#campus-life" },
  { label: "Mandatory Disclosure", href: "#disclosure" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled
          ? "border-royal-100 bg-white/90 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-white"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <a href="#top" aria-label="Jay Ambe International School, Surat — home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          <li>
            <a
              href="#enquiry"
              className="mr-2 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-3.5 py-1.5 text-sm font-semibold text-royal-900 transition hover:bg-gold-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Admissions 2026-27 Open
            </a>
          </li>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-royal-50 hover:text-royal-700">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#visit"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-5 py-2.5 text-sm font-bold text-royal-950 shadow-[0_6px_18px_-6px_rgba(224,168,28,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-6px_rgba(224,168,28,1)] sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden />
            Book Campus Visit
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-royal-100 text-royal-800 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-royal-100 bg-white px-4 pb-5 pt-3 lg:hidden">
          <a
            href="#enquiry"
            onClick={() => setOpen(false)}
            className="mb-2 flex items-center gap-2 rounded-xl bg-gold-50 px-4 py-3 text-sm font-semibold text-royal-900"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Admissions 2026-27 Open
          </a>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-royal-50">
              {l.label}
            </a>
          ))}
          <a
            href="#visit"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-5 py-3.5 text-sm font-bold text-royal-950"
          >
            <CalendarCheck className="h-4 w-4" /> Book Campus Visit
          </a>
        </div>
      )}
    </header>
  );
}
