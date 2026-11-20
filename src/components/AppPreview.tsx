import { BellRing, Smartphone, CalendarCheck, BookOpenText, IndianRupee, Megaphone, MapPinned, Check, MessageSquareText } from "lucide-react";

const FEATURES = [
  { icon: BellRing, title: "Auto-Attendance SMS alerts", text: "The moment your child is marked present or absent, an SMS reaches your phone — no calls, no guesswork." },
  { icon: Smartphone, title: "One Parent Portal", text: "Attendance, homework, fee receipts, circulars and results in one simple login." },
];

const PORTAL = [
  { icon: BookOpenText, t: "Homework" },
  { icon: IndianRupee, t: "Fees" },
  { icon: Megaphone, t: "Circulars" },
  { icon: MapPinned, t: "Bus Track" },
];

export default function AppPreview() {
  return (
    <section id="parent-app" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div aria-hidden className="absolute right-0 top-10 -z-0 h-[28rem] w-[28rem] rounded-full bg-gold-200/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Stay Connected</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-royal-900 sm:text-5xl">Your child’s school day, in your pocket</h2>
          <p className="mt-4 max-w-xl text-lg text-slate-600">Know when your child reaches school and keep track of everything that matters — without ever leaving your phone.</p>

          <ul className="mt-9 space-y-5">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal-700 text-gold-300 shadow-lg shadow-royal-700/25"><Icon className="h-6 w-6" /></span>
                <div>
                  <h3 className="text-lg font-bold text-royal-900">{title}</h3>
                  <p className="mt-1 leading-relaxed text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="#enquiry" className="mt-10 inline-flex items-center rounded-full bg-royal-800 px-7 py-3.5 font-semibold text-white transition hover:bg-royal-900">
            Enquire about admissions
          </a>
        </div>

        {/* phones */}
        <div aria-hidden className="relative mx-auto h-[600px] w-full max-w-[460px]">
          {/* SMS phone (back) */}
          <div className="absolute left-0 top-14 w-[215px] -rotate-6 rounded-[2.2rem] bg-royal-950 p-2.5 shadow-2xl ring-1 ring-black/20">
            <div className="h-[420px] overflow-hidden rounded-[1.7rem] bg-slate-100 p-3">
              <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-300" />
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-slate-500"><MessageSquareText className="h-3.5 w-3.5" /> Messages</p>
              {[
                { m: "Aarav has arrived at school. Marked PRESENT.", t: "8:02 AM", ok: true },
                { m: "Aarav is marked ABSENT today. Please contact class teacher.", t: "9:10 AM", ok: false },
                { m: "Bus 07 has left school. ETA at your stop: 15 min.", t: "2:40 PM", ok: true },
              ].map((s, i) => (
                <div key={i} className="mb-2.5 rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-royal-600">Jay Ambe School</p>
                  <p className="mt-1 text-[12px] leading-snug text-slate-700">{s.m}</p>
                  <p className={`mt-1.5 text-[10px] font-semibold ${s.ok ? "text-emerald-600" : "text-red-500"}`}>{s.t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portal phone (front) */}
          <div className="absolute right-0 top-0 w-[250px] rotate-3 rounded-[2.4rem] bg-royal-950 p-2.5 shadow-[0_40px_80px_-20px_rgba(10,18,54,0.7)] ring-1 ring-black/20">
            <div className="h-[500px] overflow-hidden rounded-[1.9rem] bg-white">
              <div className="bg-gradient-to-br from-royal-700 to-royal-900 px-4 pb-5 pt-4 text-white">
                <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-white/30" />
                <p className="text-[11px] text-royal-100">Parent Portal</p>
                <p className="font-display text-lg font-semibold">Hello, Patel family 👋</p>
                <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                  <div className="relative grid h-14 w-14 place-items-center">
                    <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90"><circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="4" /><circle cx="18" cy="18" r="15" fill="none" stroke="#f5c542" strokeWidth="4" strokeLinecap="round" strokeDasharray="94" strokeDashoffset="9" /></svg>
                    <span className="absolute text-xs font-bold">90%</span>
                  </div>
                  <div><p className="text-[11px] text-royal-100">Attendance this month</p><p className="flex items-center gap-1 text-sm font-semibold"><CalendarCheck className="h-3.5 w-3.5 text-gold-300" /> Present today</p></div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 px-3 py-4">
                {PORTAL.map(({ icon: I, t }) => (
                  <div key={t} className="text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-royal-50 text-royal-700"><I className="h-5 w-5" /></span><p className="mt-1 text-[10px] font-semibold text-slate-600">{t}</p></div>
                ))}
              </div>
              <div className="space-y-2 px-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Today</p>
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-600"><Check className="h-4 w-4" strokeWidth={3} /></span><div><p className="text-xs font-semibold text-slate-800">Maths worksheet</p><p className="text-[10px] text-slate-500">Submitted</p></div></div>
                <div className="flex items-center gap-3 rounded-xl bg-gold-50 p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-200 text-gold-700"><IndianRupee className="h-4 w-4" /></span><div><p className="text-xs font-semibold text-slate-800">Term fee reminder</p><p className="text-[10px] text-slate-500">Due soon</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
