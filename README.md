# Jay Ambe International School, Surat — Homepage

Next.js (App Router) + Tailwind CSS v4 + lucide-react.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

- `src/site.ts` — phone, email, address, grade list (**replace the TODO placeholders**).
- `src/app/api/enquiry/route.ts` — validates the enquiry form; currently logs to console. Hook up your CRM / email / WhatsApp there.
- `src/components/Footer.tsx` — Mandatory Disclosure links are placeholders; point each to the real PDF.
- Theme tokens (royal blue / gold) live in `src/app/globals.css`.

## Your Sathi (chat assistant) & leads
- Component: `src/components/Sathi.tsx` — asks parent name + mobile first, answers 5 standard questions
  (classes, board, admission/fees, facilities, location/visit) and then collects child's name, class and medium.
- Leads are saved by `src/lib/leads.ts` via `/api/lead` (chat) and `/api/enquiry` (hero form):
  - printed in the server console,
  - appended to `data/leads.jsonl` when you run on your own server,
  - sent as JSON to `LEADS_WEBHOOK_URL` if you set that environment variable
    (use this on Vercel, e.g. a Google Sheets Apps Script / Zapier / Make webhook).
- Edit answers in the `FAQS` list at the top of `Sathi.tsx`. School details live in `src/site.ts`.
