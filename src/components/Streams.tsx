"use client";

import { useState } from "react";
import { Baby, Shapes, BookOpen, Atom, GraduationCap, Check, ArrowRight, FlaskConical, LineChart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Stage = {
  id: string;
  label: string;
  classes: string;
  icon: LucideIcon;
  tagline: string;
  blurb: string;
  points: string[];
  tint: string;
};

const STAGES: Stage[] = [
  {
    id: "pre",
    label: "Pre-Primary",
    classes: "Nursery · Jr. KG · Sr. KG",
    icon: Baby,
    tagline: "Joyful first steps into learning",
    blurb: "Play-based, activity-led classrooms where curiosity comes first — building language, motor skills, and confidence in a warm, safe environment.",
    points: ["Play-way & activity-based learning", "Phonics, early numeracy & storytelling", "Art, music & movement", "Bilingual support in English & Gujarati"],
    tint: "from-amber-100 to-gold-200",
  },
  {
    id: "primary",
    label: "Primary",
    classes: "Class 1 – 5",
    icon: Shapes,
    tagline: "Strong foundations, big imagination",
    blurb: "A balanced curriculum that makes reading, math and science feel like discovery — with regular assessments and plenty of room for creativity.",
    points: ["Reading, writing & number fluency", "Hands-on EVS & intro computer skills", "Sports, art & life-skills periods", "Regular parent–teacher connect"],
    tint: "from-sky-100 to-royal-200",
  },
  {
    id: "secondary",
    label: "Secondary",
    classes: "Class 6 – 10",
    icon: BookOpen,
    tagline: "Building thinkers and problem solvers",
    blurb: "Concept-first teaching in Maths, Science, Languages and Social Science, backed by lab practice and focused board-exam preparation.",
    points: ["Science & computer lab practicals", "Concept clarity with periodic tests", "Olympiads & competitive-exam foundation", "Career guidance & counselling"],
    tint: "from-indigo-100 to-royal-300",
  },
  {
    id: "hs",
    label: "Higher Secondary",
    classes: "Class 11 – 12",
    icon: GraduationCap,
    tagline: "Science & Commerce, taken seriously",
    blurb: "Choose the stream that fits your goals. Experienced faculty, structured practice and mentoring to prepare students for boards and beyond.",
    points: [],
    tint: "from-royal-200 to-royal-400",
  },
];

const HS = {
  science: {
    label: "Science",
    icon: FlaskConical,
    subjects: ["Physics", "Chemistry", "Mathematics / Biology", "English", "Computer Science"],
    note: "Prepares for engineering, medical and pure-science pathways with lab-backed learning.",
  },
  commerce: {
    label: "Commerce",
    icon: LineChart,
    subjects: ["Accountancy", "Business Studies", "Economics", "English", "Mathematics / Computer Applications"],
    note: "Builds a base for CA, CS, BBA, B.Com and management careers.",
  },
} as const;

export default function Streams() {
  const [active, setActive] = useState(0);
  const [hs, setHs] = useState<keyof typeof HS>("science");
  const stage = STAGES[active];
  const Icon = stage.icon;

  return (
    <section id="academics" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Academics</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-royal-900 sm:text-5xl">A clear path from Nursery to Class 12</h2>
          <p className="mt-4 text-lg text-slate-600">Choose a stage to see how learning grows with your child — in English or Gujarati medium.</p>
        </div>

        {/* tabs */}
        <div role="tablist" aria-label="Academic stages" className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-2 rounded-2xl bg-royal-50 p-2 sm:grid-cols-4">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${s.id}`}
              onClick={() => setActive(i)}
              className={`rounded-xl px-3 py-3 text-sm font-semibold transition sm:text-[15px] ${
                i === active ? "bg-royal-800 text-white shadow-lg" : "text-royal-800 hover:bg-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* panel */}
        <div
          role="tabpanel"
          id={`panel-${stage.id}`}
          aria-labelledby={`tab-${stage.id}`}
          key={stage.id}
          className="mx-auto mt-8 grid max-w-6xl animate-fade-up gap-8 overflow-hidden rounded-[2rem] border border-royal-100 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(23,42,114,0.35)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className={`relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${stage.tint} p-8`}>
            <Icon aria-hidden className="absolute -right-6 -top-6 h-48 w-48 text-white/40" strokeWidth={1.2} />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white text-royal-700 shadow-md">
              <Icon className="h-7 w-7" />
            </span>
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-royal-800/70">{stage.classes}</p>
              <p className="mt-2 font-display text-3xl font-semibold leading-tight text-royal-950">{stage.tagline}</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-3xl font-semibold text-royal-900">{stage.label}</h3>
            <p className="mt-3 leading-relaxed text-slate-600">{stage.blurb}</p>

            {stage.id === "hs" ? (
              <div className="mt-6">
                <div className="inline-flex rounded-xl bg-slate-100 p-1" role="group" aria-label="Stream">
                  {(Object.keys(HS) as (keyof typeof HS)[]).map((k) => {
                    const SIcon = HS[k].icon;
                    return (
                      <button key={k} onClick={() => setHs(k)} aria-pressed={hs === k}
                        className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${hs === k ? "bg-gold-400 text-royal-950 shadow" : "text-slate-600 hover:text-royal-800"}`}>
                        <SIcon className="h-4 w-4" /> {HS[k].label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-slate-600">{HS[hs].note}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {HS[hs].subjects.map((s) => (
                    <li key={s} className="rounded-full border border-royal-100 bg-royal-50 px-4 py-1.5 text-sm font-medium text-royal-800">{s}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {stage.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 text-[15px] text-slate-700">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-400 text-royal-950"><Check className="h-3 w-3" strokeWidth={3} /></span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <a href="#enquiry" className="mt-8 inline-flex items-center gap-2 font-semibold text-royal-700 hover:text-royal-900">
              Enquire for {stage.label} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
