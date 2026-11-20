import Image from "next/image";
import { Calculator, Bot, Puzzle, Medal, PartyPopper, NotebookPen, ClipboardCheck, Target } from "lucide-react";

const PHOTOS = [
  { src: "/images/campus-entrance.jpg", alt: "Main entrance of N.C. Thakar Education Campus, Jay Ambe International School, Surat", cap: "N.C. Thakar Education Campus", span: "md:col-span-2 md:row-span-2", w: 1160, h: 542 },
  { src: "/images/playground.jpg", alt: "Children's play area and open green ground on the school campus", cap: "Play area & open ground", span: "", w: 1504, h: 810 },
  { src: "/images/cricket-nets.jpg", alt: "Jay Ambe Cricket Academy practice nets on campus", cap: "Jay Ambe Cricket Academy nets", span: "", w: 1504, h: 810 },
];

const PROGRAMS = [
  { icon: Calculator, t: "Vedic Maths", d: "Mental-maths techniques that cut mistakes and sharpen memory and concentration." },
  { icon: Bot, t: "Robotics", d: "Hands-on building and coding that grows problem-solving and logical thinking." },
  { icon: Puzzle, t: "Indoor Activities", d: "Games that build balance, focus, flexibility and stress management." },
  { icon: Medal, t: "Outdoor Games", d: "Coaching in cricket, football, volleyball, basketball and more." },
  { icon: NotebookPen, t: "Worksheet-based Learning", d: "Regular practice that builds exam readiness and independent thinking." },
  { icon: ClipboardCheck, t: "Centralised Exams", d: "A uniform, syllabus-wide assessment system with fair, quality evaluation." },
  { icon: PartyPopper, t: "Celebrations & Competitions", d: "Events that build teamwork, confidence and a sense of belonging." },
  { icon: Target, t: "Sunday Foundation Classes", d: "Early preparation for competitive exams such as JEE, NEET, GPSC and UPSC." },
];

export default function Campus() {
  return (
    <section id="campus" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Our Campus</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-royal-900 sm:text-5xl">A green, safe place to grow</h2>
          <p className="mt-4 text-lg text-slate-600">Open grounds, sports nets and a welcoming campus in Sarthana, Surat.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {PHOTOS.map((p) => (
            <figure key={p.src} className={`group relative overflow-hidden rounded-3xl bg-royal-100 ${p.span}`}>
              <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width:768px) 50vw, 100vw"
                className="h-full min-h-[220px] w-full object-cover transition duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-royal-950/85 to-transparent p-5 pt-14 text-sm font-semibold text-white">{p.cap}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-display text-3xl font-semibold text-royal-900 sm:text-4xl">Beyond the classroom</h3>
            <p className="mt-3 text-slate-600">Programmes that build skills, character and confidence alongside academics.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map(({ icon: Icon, t, d }) => (
              <li key={t} className="rounded-3xl border border-royal-100 bg-gradient-to-b from-white to-royal-50/60 p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-royal-900/10">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-700 text-gold-300"><Icon className="h-6 w-6" /></span>
                <h4 className="mt-4 text-lg font-bold text-royal-900">{t}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
