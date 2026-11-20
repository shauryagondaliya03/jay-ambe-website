import { NextResponse } from "next/server";
import { GRADES, MEDIUMS } from "@/site";
import { isValidPhone, saveLead } from "@/lib/leads";

// Used by the "Your Sathi" chat assistant. Called twice per visitor:
//  stage "contact"  -> as soon as name + phone are captured (so a lead is never lost)
//  stage "complete" -> after child's name, class and medium are collected
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parentName = String(b.parentName ?? "").trim();
  const phone = String(b.phone ?? "").replace(/\D/g, "");
  const stage = b.stage === "complete" ? "complete" : "contact";
  if (parentName.length < 2 || parentName.length > 80) return NextResponse.json({ error: "Enter a valid name" }, { status: 422 });
  if (!isValidPhone(phone)) return NextResponse.json({ error: "Enter a valid 10-digit mobile number" }, { status: 422 });

  let studentName: string | undefined, grade: string | undefined, medium: string | undefined;
  if (stage === "complete") {
    studentName = String(b.studentName ?? "").trim();
    grade = String(b.grade ?? "");
    medium = String(b.medium ?? "");
    if (studentName.length < 2 || studentName.length > 80) return NextResponse.json({ error: "Enter a valid student name" }, { status: 422 });
    if (!GRADES.includes(grade)) return NextResponse.json({ error: "Select a valid grade" }, { status: 422 });
    if (!(MEDIUMS as readonly string[]).includes(medium)) return NextResponse.json({ error: "Select a medium" }, { status: 422 });
  }

  const questions = Array.isArray(b.questions)
    ? b.questions.slice(0, 12).map((q) => String(q).slice(0, 200))
    : [];

  await saveLead({ source: "your-sathi", stage, parentName, phone, studentName, grade, medium, questions });
  return NextResponse.json({ ok: true });
}
