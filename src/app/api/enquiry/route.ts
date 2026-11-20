import { NextResponse } from "next/server";
import { GRADES, MEDIUMS } from "@/site";
import { isValidPhone, saveLead } from "@/lib/leads";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const studentName = String(body.studentName ?? "").trim();
  const grade = String(body.grade ?? "");
  const medium = String(body.medium ?? "");
  const phone = String(body.phone ?? "").replace(/\D/g, "");

  if (studentName.length < 2 || studentName.length > 80) return NextResponse.json({ error: "Enter a valid student name" }, { status: 422 });
  if (!GRADES.includes(grade)) return NextResponse.json({ error: "Select a valid grade" }, { status: 422 });
  if (!(MEDIUMS as readonly string[]).includes(medium)) return NextResponse.json({ error: "Select a medium" }, { status: 422 });
  if (!isValidPhone(phone)) return NextResponse.json({ error: "Enter a valid 10-digit mobile number" }, { status: 422 });

  await saveLead({ source: "hero-form", stage: "complete", studentName, grade, medium, phone });
  return NextResponse.json({ ok: true });
}
