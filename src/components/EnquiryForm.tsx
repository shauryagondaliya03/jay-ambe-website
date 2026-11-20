"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { GRADES } from "@/site";

type Errors = Partial<Record<"studentName" | "grade" | "phone", string>>;

const field =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-royal-500 focus:bg-white focus:ring-4 focus:ring-royal-100";

export default function EnquiryForm() {
  const [medium, setMedium] = useState<"English" | "Gujarati">("English");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const studentName = String(fd.get("studentName") ?? "").trim();
    const grade = String(fd.get("grade") ?? "");
    const phone = String(fd.get("phone") ?? "").replace(/\D/g, "");

    const next: Errors = {};
    if (studentName.length < 2) next.studentName = "Please enter the student's name";
    if (!grade) next.grade = "Please select a grade";
    if (!/^[6-9]\d{9}$/.test(phone)) next.phone = "Enter a valid 10-digit mobile number";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, grade, medium, phone }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong");
      setStatus("done");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-royal-900">Thank you!</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
          Our admissions team will call you within one working day to guide you through the next steps.
        </p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-royal-700 underline underline-offset-4">
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="studentName" className="mb-1.5 block text-sm font-semibold text-royal-900">Student Name</label>
        <input id="studentName" name="studentName" autoComplete="off" placeholder="e.g. Aarav Patel" className={field}
          aria-invalid={!!errors.studentName} aria-describedby={errors.studentName ? "err-name" : undefined} />
        {errors.studentName && <p id="err-name" className="mt-1.5 text-xs font-medium text-red-600">{errors.studentName}</p>}
      </div>

      <div>
        <label htmlFor="grade" className="mb-1.5 block text-sm font-semibold text-royal-900">Grade Seeking Admission</label>
        <select id="grade" name="grade" defaultValue="" className={field} aria-invalid={!!errors.grade}>
          <option value="" disabled>Select grade (Nursery to 12th)</option>
          {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        {errors.grade && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.grade}</p>}
      </div>

      <fieldset>
        <legend className="mb-1.5 block text-sm font-semibold text-royal-900">Medium</legend>
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          {(["English", "Gujarati"] as const).map((m) => (
            <label key={m} className={`cursor-pointer rounded-lg py-2.5 text-center text-sm font-semibold transition ${
              medium === m ? "bg-royal-700 text-white shadow" : "text-slate-600 hover:text-royal-800"}`}>
              <input type="radio" name="medium" value={m} checked={medium === m} onChange={() => setMedium(m)} className="sr-only" />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-royal-900">Parent Phone</label>
        <div className="flex">
          <span className="grid place-items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-3.5 text-sm font-semibold text-slate-600">+91</span>
          <input id="phone" name="phone" type="tel" inputMode="numeric" maxLength={10} placeholder="98765 43210"
            className={`${field} rounded-l-none`} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
        </div>
        {errors.phone && <p id="err-phone" className="mt-1.5 text-xs font-medium text-red-600">{errors.phone}</p>}
      </div>

      {status === "error" && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>}

      <button type="submit" disabled={status === "loading"}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3.5 text-[15px] font-bold text-royal-950 shadow-[0_10px_24px_-8px_rgba(224,168,28,0.9)] transition hover:-translate-y-0.5 disabled:opacity-70">
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : <>Request a Call Back <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></>}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Your details are safe. No spam, ever.
      </p>
    </form>
  );
}
