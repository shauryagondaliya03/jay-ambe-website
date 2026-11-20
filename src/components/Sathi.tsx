"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleHeart, X, Send, Phone, CalendarCheck, Sparkles } from "lucide-react";
import { GRADES, MEDIUMS, SITE, MAP_DIRECTIONS } from "@/site";

/* ---------- The 5 standard questions ---------- */
type Faq = { id: string; chip: string; q: string; a: string; keywords: string[] };

const FAQS: Faq[] = [
  {
    id: "classes",
    chip: "Classes & medium",
    q: "Which classes and mediums do you offer?",
    a: "We teach from Nursery to Class 12 in both English and Gujarati medium.\n\n• Pre-Primary: Nursery, Jr. KG, Sr. KG\n• Primary: Class 1–5\n• Secondary: Class 6–10\n• Higher Secondary: Class 11–12 in Science and Commerce",
    keywords: ["class", "grade", "medium", "english", "gujarati", "nursery", "kg", "science", "commerce", "std", "standard", "stream"],
  },
  {
    id: "board",
    chip: "Board & affiliation",
    q: "Is the school CBSE affiliated?",
    a: `Yes. ${SITE.name} (${SITE.campus}) is a CBSE school.\n\n• Affiliation No.: ${SITE.affiliationNo}\n• School Code: ${SITE.schoolCode}\n• Managed by: ${SITE.trust}`,
    keywords: ["cbse", "board", "affiliat", "recogni", "gseb", "code", "trust"],
  },
  {
    id: "admission",
    chip: "Admission & fees",
    q: "How do I apply, and what are the fees?",
    a: `Admissions for ${SITE.session} are open from Nursery to Class 12.\n\nFees differ by class, so our admissions team will share the exact fee structure, the documents list and the next steps for your child. Tap “Book a callback” below and we’ll call you, or ring our helpline: ${SITE.phones[0].label}.`,
    keywords: ["fee", "fees", "admission", "apply", "document", "form", "cost", "price", "seat", "age", "eligib"],
  },
  {
    id: "facilities",
    chip: "Facilities & activities",
    q: "What facilities and activities do you have?",
    a: "• Smart classrooms\n• Science & computer labs\n• Sports: cricket academy nets, outdoor games, play area\n• Indoor activities, Robotics and Vedic Maths\n• Celebrations & competitions\n• GPS-tracked school transport\n• Parent app with auto-attendance SMS alerts",
    keywords: ["facilit", "lab", "sport", "cricket", "robot", "vedic", "activity", "activities", "transport", "bus", "gps", "app", "sms", "playground", "smart", "computer"],
  },
  {
    id: "visit",
    chip: "Location & visit",
    q: "Where is the school, and can I visit?",
    a: `📍 ${SITE.address}\n\n🕖 ${SITE.hours}\n📞 ${SITE.phones[0].label} · ${SITE.phones[1].label}\n\nParents are welcome to see the campus. Tap “Book a callback” and we’ll fix a visit time that suits you.`,
    keywords: ["where", "location", "address", "map", "visit", "timing", "time", "hour", "open", "reach", "direction", "contact", "phone", "call", "number"],
  },
];

function matchFaq(text: string): Faq | undefined {
  const t = text.toLowerCase();
  let best: Faq | undefined;
  let bestScore = 0;
  for (const f of FAQS) {
    const score = f.keywords.filter((k) => t.includes(k)).length;
    if (score > bestScore) { best = f; bestScore = score; }
  }
  return best;
}

/* ---------- Chat state ---------- */
type Msg = { id: number; from: "bot" | "user"; text: string };
type Step = "name" | "phone" | "menu" | "child" | "grade" | "medium" | "done";

const nameOk = (s: string) => s.trim().length >= 2 && s.trim().length <= 80;
const phoneClean = (s: string) => s.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
const phoneOk = (s: string) => /^[6-9]\d{9}$/.test(s);

export default function Sathi() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [lead, setLead] = useState({ parent: "", phone: "", child: "", grade: "", medium: "" });
  const [asked, setAsked] = useState<string[]>([]);

  const idRef = useRef(0);
  const started = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const say = (text: string, delay = 550) => {
    setTyping(true);
    const t = setTimeout(() => {
      setMsgs((m) => [...m, { id: ++idRef.current, from: "bot", text }]);
      setTyping(false);
    }, delay);
    timers.current.push(t);
  };
  const userSay = (text: string) => setMsgs((m) => [...m, { id: ++idRef.current, from: "user", text }]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // teaser bubble
  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem("sathi-teaser") === "1"; } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setTeaser(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // greet on first open
  useEffect(() => {
    if (open && !started.current) {
      started.current = true;
      setTeaser(false);
      say(`Namaste! 🙏 I’m Your Sathi, the admissions assistant of ${SITE.name}, ${SITE.city}.`, 300);
      const t = setTimeout(() => say("May I know your name, please?", 700), 900);
      timers.current.push(t);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, typing, step]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function post(payload: Record<string, unknown>) {
    const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error("save failed");
  }

  function dismissTeaser() {
    setTeaser(false);
    try { sessionStorage.setItem("sathi-teaser", "1"); } catch {}
  }

  /* ---- typed input ---- */
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || typing) return;

    if (step === "name") {
      if (!nameOk(raw)) { userSay(raw); setInput(""); say("Could you type your full name, please? (at least 2 letters)"); return; }
      userSay(raw); setInput("");
      setLead((l) => ({ ...l, parent: raw }));
      setStep("phone");
      say(`Nice to meet you, ${raw.split(" ")[0]}! 😊 What’s your mobile number? Our team will use it only to share admission information.`);
    } else if (step === "phone") {
      const p = phoneClean(raw);
      userSay(raw); setInput("");
      if (!phoneOk(p)) { say("That doesn’t look like a valid 10-digit Indian mobile number. Please try again (e.g. 98765 43210)."); return; }
      setLead((l) => ({ ...l, phone: p }));
      setStep("menu");
      post({ stage: "contact", parentName: lead.parent, phone: p }).catch(() => {});
      say("Thank you! 🙏 Here are the questions parents ask us most. Tap one, or type your own question.", 700);
    } else if (step === "menu") {
      userSay(raw); setInput("");
      const f = matchFaq(raw);
      if (f) answer(f, false);
      else {
        setAsked((a) => [...a, raw.slice(0, 200)]);
        say(`Good question! I’d like our admissions team to answer that personally. Tap “Book a callback” and they’ll call you, or ring ${SITE.phones[0].label}.`);
      }
    } else if (step === "child") {
      if (!nameOk(raw)) { userSay(raw); setInput(""); say("Please type your child’s name."); return; }
      userSay(raw); setInput("");
      setLead((l) => ({ ...l, child: raw }));
      setStep("grade");
      say(`Which class is ${raw.split(" ")[0]} seeking admission for?`);
    }
  }

  /* ---- chip actions ---- */
  function answer(f: Faq, echo = true) {
    if (echo) userSay(f.q);
    setAsked((a) => (a.includes(f.q) ? a : [...a, f.q]));
    say(f.a, 800);
    const t = setTimeout(() => {
      setMsgs((m) => [...m, {
        id: ++idRef.current, from: "bot",
        text: asked.length >= 1 ? "Would you like our team to call you with the exact details for your child? Tap “Book a callback” 👇" : "Anything else you’d like to know?",
      }]);
    }, 1900);
    timers.current.push(t);
  }

  function startCallback() {
    userSay("Book a callback / campus visit");
    setStep("child");
    say("Wonderful! Just 3 quick details. What is your child’s name?");
  }

  function pickGrade(g: string) {
    userSay(g);
    setLead((l) => ({ ...l, grade: g }));
    setStep("medium");
    say("English or Gujarati medium?");
  }

  async function pickMedium(m: string) {
    userSay(m);
    const full = { ...lead, medium: m };
    setLead(full);
    setStep("done");
    try {
      await post({ stage: "complete", parentName: full.parent, phone: full.phone, studentName: full.child, grade: full.grade, medium: m, questions: asked });
      say(`Thank you, ${full.parent.split(" ")[0]}! ✅ Our admissions team will call you on +91 ${full.phone} within one working day to discuss ${full.child.split(" ")[0]}’s admission and arrange a campus visit.`, 900);
    } catch {
      say(`Sorry, I couldn’t save your details just now. Please call us on ${SITE.phones[0].label} and we’ll help right away.`, 700);
    }
  }

  function askMore() {
    setStep("menu");
    say("Sure! Which question would you like answered?", 400);
  }

  const showInput = step === "name" || step === "phone" || step === "menu" || step === "child";
  const placeholder = { name: "Type your name…", phone: "10-digit mobile number", menu: "Type your question…", child: "Child’s name…" } as Record<string, string>;
  const remaining = FAQS.filter((f) => !asked.includes(f.q));

  const chip = "rounded-full border border-royal-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-royal-800 transition hover:border-royal-500 hover:bg-royal-50";

  return (
    <>
      {/* launcher */}
      <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {teaser && !open && (
          <div className="relative max-w-[240px] animate-fade-up rounded-2xl rounded-br-sm bg-white p-4 pr-8 text-sm font-medium text-royal-900 shadow-2xl ring-1 ring-royal-100">
            👋 Questions about admissions? Ask <b>Your Sathi</b>!
            <button onClick={dismissTeaser} aria-label="Dismiss" className="absolute right-2 top-2 rounded-full p-1 text-slate-400 hover:text-slate-700"><X className="h-3.5 w-3.5" /></button>
          </div>
        )}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open Your Sathi, the admissions assistant"
            className="group flex items-center gap-2.5 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 py-3 pl-4 pr-5 font-bold text-royal-950 shadow-[0_14px_34px_-8px_rgba(224,168,28,1)] transition hover:-translate-y-0.5"
          >
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-royal-900 text-gold-300">
              <MessageCircleHeart className="h-[18px] w-[18px]" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-gold-400" />
            </span>
            Your Sathi
          </button>
        )}
      </div>

      {/* panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Your Sathi — admissions assistant"
          className="fixed inset-x-3 bottom-3 z-[70] flex h-[min(640px,calc(100dvh-1.5rem))] animate-fade-up flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-10px_rgba(10,18,54,0.6)] ring-1 ring-royal-100 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[400px]"
        >
          <header className="flex items-center gap-3 bg-gradient-to-br from-royal-700 to-royal-950 px-4 py-3.5 text-white">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400 text-royal-950 ring-2 ring-white/30"><Sparkles className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold leading-tight">Your Sathi</p>
              <p className="flex items-center gap-1.5 truncate text-[11.5px] text-royal-100"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Admissions assistant · Jay Ambe School</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"><X className="h-5 w-5" /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-royal-50/50 px-4 py-4" role="log" aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                  m.from === "user" ? "rounded-br-sm bg-royal-700 text-white" : "rounded-bl-sm bg-white text-slate-700 shadow-sm ring-1 ring-royal-100"}`}>
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start" aria-label="Your Sathi is typing">
                <span className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3.5 shadow-sm ring-1 ring-royal-100">
                  {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-royal-300" style={{ animationDelay: `${i * 140}ms` }} />)}
                </span>
              </div>
            )}

            {/* quick replies */}
            {!typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {step === "menu" && (
                  <>
                    {remaining.map((f) => <button key={f.id} onClick={() => answer(f)} className={chip}>{f.chip}</button>)}
                    <button onClick={startCallback} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-4 py-2 text-[13px] font-bold text-royal-950 shadow">
                      <CalendarCheck className="h-3.5 w-3.5" /> Book a callback
                    </button>
                  </>
                )}
                {step === "grade" && GRADES.map((g) => <button key={g} onClick={() => pickGrade(g)} className={chip}>{g}</button>)}
                {step === "medium" && MEDIUMS.map((m) => <button key={m} onClick={() => pickMedium(m)} className={chip}>{m}</button>)}
                {step === "done" && (
                  <>
                    <button onClick={askMore} className={chip}>Ask another question</button>
                    <a href={MAP_DIRECTIONS} target="_blank" rel="noreferrer" className={chip}>Get directions</a>
                    <a href={SITE.phones[0].href} className={`${chip} inline-flex items-center gap-1.5`}><Phone className="h-3.5 w-3.5" /> Call us</a>
                  </>
                )}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {showInput ? (
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-royal-100 bg-white p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                inputMode={step === "phone" ? "tel" : "text"}
                maxLength={step === "phone" ? 16 : 200}
                placeholder={placeholder[step]}
                aria-label={placeholder[step]}
                className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-[14px] outline-none focus:border-royal-500 focus:bg-white focus:ring-4 focus:ring-royal-100"
              />
              <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-royal-700 text-white transition hover:bg-royal-800 disabled:opacity-40">
                <Send className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <p className="border-t border-royal-100 bg-white px-4 py-3 text-center text-xs text-slate-500">Tap an option above to continue</p>
          )}
        </div>
      )}
    </>
  );
}
