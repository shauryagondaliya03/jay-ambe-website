import { appendFile, mkdir } from "fs/promises";
import path from "path";

export type Lead = {
  source: "hero-form" | "your-sathi";
  stage?: "contact" | "complete";
  parentName?: string;
  studentName?: string;
  grade?: string;
  medium?: string;
  phone: string;
  questions?: string[];
};

/**
 * Saves a lead. Always logs. Optionally:
 *  - POSTs JSON to LEADS_WEBHOOK_URL (Google Sheets Apps Script, Zapier, Make, CRM …)
 *  - appends to data/leads.jsonl when running on your own server (not on Vercel)
 */
export async function saveLead(lead: Lead) {
  const record = { ...lead, at: new Date().toISOString() };
  console.log("[lead]", record);

  const hook = process.env.LEADS_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) });
    } catch (e) {
      console.error("[lead] webhook failed", e);
    }
  }

  if (!process.env.VERCEL) {
    try {
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(record) + "\n");
    } catch {
      /* read-only filesystem — ignore */
    }
  }
}

export const isValidPhone = (p: string) => /^[6-9]\d{9}$/.test(p);
