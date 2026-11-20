export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-royal-600 to-royal-900 shadow-md ring-2 ring-gold-400">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 9l10-5 10 5-10 5L2 9z" />
          <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
          <path d="M22 9v6" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[17px] font-semibold tracking-tight ${light ? "text-white" : "text-royal-900"}`}>
          Jay Ambe
        </span>
        <span className={`block text-[10.5px] font-semibold uppercase tracking-[0.18em] ${light ? "text-gold-300" : "text-royal-600"}`}>
          International School · Surat
        </span>
      </span>
    </span>
  );
}
