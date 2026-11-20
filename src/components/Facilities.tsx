import Image from "next/image";
import { MonitorPlay, FlaskConical, Cpu, Trophy, Bus, MapPin, Wifi, Check } from "lucide-react";

const card = "group relative overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl";

export default function Facilities() {
  return (
    <section id="campus-life" className="bg-royal-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Campus Life</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-royal-900 sm:text-5xl">Facilities that make learning come alive</h2>
          <p className="mt-4 text-lg text-slate-600">From the classroom to the playground to the school bus — every part of the day is designed around your child.</p>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(250px,auto)] gap-5 md:grid-cols-6 lg:grid-cols-12">
          {/* Smart classrooms */}
          <article className={`${card} bg-royal-900 text-white md:col-span-6 lg:col-span-8`}>
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-royal-500/40 blur-3xl" />
            <div className="relative grid h-full gap-6 sm:grid-cols-[1fr_1.05fr]">
              <div className="flex flex-col">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-400 text-royal-950"><MonitorPlay className="h-6 w-6" /></span>
                <h3 className="mt-5 font-display text-2xl font-semibold">Smart Classrooms</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-royal-100/85">Interactive digital boards, visual lessons and well-lit, ventilated rooms that keep every student engaged.</p>
              </div>
              {/* mock board */}
              <div aria-hidden className="relative self-center rounded-2xl border border-white/15 bg-royal-950/70 p-3 shadow-xl">
                <div className="rounded-lg bg-gradient-to-br from-royal-600 to-royal-800 p-4">
                  <div className="h-2 w-1/3 rounded bg-gold-300" />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((i) => <div key={i} className="aspect-[4/3] rounded-md bg-white/15" />)}
                  </div>
                  <div className="mt-3 space-y-1.5"><div className="h-1.5 w-full rounded bg-white/25" /><div className="h-1.5 w-4/5 rounded bg-white/25" /></div>
                </div>
                <div className="mx-auto mt-2 h-1.5 w-1/3 rounded-full bg-white/20" />
              </div>
            </div>
          </article>

          {/* Sports */}
          <article className={`${card} min-h-[260px] bg-royal-950 text-white md:col-span-3 lg:col-span-4`}>
            <Image src="/images/cricket-nets.jpg" alt="Jay Ambe Cricket Academy practice nets" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-royal-950 via-royal-950/55 to-royal-950/10" />
            <div className="relative flex h-full flex-col justify-end">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gold-400 text-royal-950"><Trophy className="h-6 w-6" /></span>
              <h3 className="font-display text-2xl font-semibold">Sports Complex</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-royal-100/90">Cricket academy nets, outdoor games with certified coaches, a play area and open ground.</p>
            </div>
          </article>

          {/* Labs - tall */}
          <article className={`${card} border border-royal-100 bg-white md:col-span-3 lg:col-span-5`}>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal-700 text-white"><FlaskConical className="h-6 w-6" /></span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-royal-900">Science &amp; Computer Labs</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">Physics, Chemistry and Biology labs plus a modern computer lab — so ideas are tested, not just memorised.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: FlaskConical, t: "Physics" }, { icon: FlaskConical, t: "Chemistry" },
                { icon: FlaskConical, t: "Biology" }, { icon: Cpu, t: "Computers" },
              ].map(({ icon: I, t }, idx) => (
                <div key={t} className={`flex items-center gap-3 rounded-2xl p-4 ${idx === 3 ? "bg-gold-100" : "bg-royal-50"}`}>
                  <I className={`h-5 w-5 ${idx === 3 ? "text-gold-700" : "text-royal-600"}`} />
                  <span className="text-sm font-semibold text-royal-900">{t}</span>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
              {["Practical-based learning", "Supervised lab sessions", "Coding & digital literacy"].map((x) => (
                <li key={x} className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-600" strokeWidth={3} />{x}</li>
              ))}
            </ul>
          </article>

          {/* GPS transport */}
          <article className={`${card} border border-royal-100 bg-white md:col-span-6 lg:col-span-7`}>
            <div className="grid gap-6 sm:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal-700 text-white"><Bus className="h-6 w-6" /></span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-royal-900">GPS Transport</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">Every school bus is GPS-tracked, so parents know exactly where their child is on the route.</p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"><Wifi className="h-3.5 w-3.5" /> Live location for parents</p>
              </div>
              {/* mini map */}
              <div aria-hidden className="relative h-52 overflow-hidden rounded-2xl bg-royal-50 sm:h-full sm:min-h-[16rem] ring-1 ring-royal-100">
                <svg viewBox="0 0 300 176" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                  <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#bccdff" strokeWidth="0.6" /></pattern></defs>
                  <rect width="300" height="176" fill="url(#g)" />
                  <path id="route" d="M20 140 C70 140 70 70 130 70 S200 130 250 40" fill="none" stroke="#2644b3" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 10" />
                  <circle cx="20" cy="140" r="7" fill="#fff" stroke="#2644b3" strokeWidth="3" />
                  <circle cx="250" cy="40" r="9" fill="#f5c542" stroke="#8f650f" strokeWidth="2" />
                  <circle r="9" fill="#2644b3"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#route" /></animateMotion></circle>
                  <circle r="4" fill="#f5c542"><animateMotion dur="6s" repeatCount="indefinite"><mpath href="#route" /></animateMotion></circle>
                </svg>
                <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-royal-800 shadow"><MapPin className="h-3 w-3 text-gold-600" /> School</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
