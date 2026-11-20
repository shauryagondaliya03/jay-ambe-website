import { FileText, Download, MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/site";

const DOCS = [
  "General Information",
  "Documents & Information",
  "Result & Academics",
  "Staff (Teaching)",
  "School Infrastructure",
];

const GLANCE: [string, string][] = [
  ["Name of the School", `${SITE.name}, ${SITE.city}`],
  ["Campus", SITE.campus],
  ["Board", `${SITE.board} (Central Board of Secondary Education)`],
  ["Affiliation No.", SITE.affiliationNo],
  ["School Code", SITE.schoolCode],
  ["Managed by", SITE.trust],
  ["Classes", "Nursery to Class 12 (Science & Commerce in Class 11–12)"],
  ["Medium of Instruction", "English & Gujarati"],
  ["Address", SITE.address],
  ["Phone", SITE.phones.map((p) => p.label).join(" / ")],
  ["Email", SITE.email],
  ["Admissions Open for", `Session ${SITE.session}`],
];

export default function Footer() {
  return (
    <>
      <section id="disclosure" className="border-y border-royal-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Transparency</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-royal-900 sm:text-4xl">Mandatory Disclosure</h2>
          <p className="mt-2 max-w-xl text-slate-600">Public information about our school, as required by the education board.</p>

          <dl className="mt-8 grid overflow-hidden rounded-3xl border border-royal-100 sm:grid-cols-2">
            {GLANCE.map(([k, v], i) => (
              <div key={k} className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-4 ${i % 2 === 0 ? "bg-royal-50/60" : "bg-white"} border-b border-royal-100/70`}>
                <dt className="text-sm font-bold text-royal-900 sm:w-40 sm:shrink-0">{k}</dt>
                <dd className="text-sm leading-relaxed text-slate-700">{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-12 text-lg font-bold text-royal-900">Documents</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {DOCS.map((d) => (
              <li key={d}>
                {/* TODO: link each to the real PDF / page */}
                <a href="#disclosure" className="flex h-full items-center gap-3 rounded-2xl border border-royal-100 bg-white p-4 transition hover:border-royal-300 hover:shadow-md">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal-50 text-royal-700"><FileText className="h-5 w-5" /></span>
                  <span className="flex-1 text-sm font-semibold leading-snug text-royal-900">{d}</span>
                  <Download className="h-4 w-4 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="bg-royal-950 text-royal-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1.3fr] lg:px-8">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-royal-200/80">{SITE.tagline}. Nurturing confident, capable and caring learners in Surat, from Nursery to Class 12.</p>
            <p className="mt-4 text-xs text-royal-300/70">Managed by {SITE.trust}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold-300">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[["Admissions", "#enquiry"], ["Academics", "#academics"], ["Campus Life", "#campus-life"], ["Our Campus", "#campus"], ["Parent App", "#parent-app"], ["Contact", "#contact"], ["Mandatory Disclosure", "#disclosure"]].map(([l, h]) => (
                <li key={l}><a href={h} className="text-royal-200/80 transition hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold-300">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-royal-200/80">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />{SITE.address}</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /><span>{SITE.phones.map((p, i) => <span key={p.href}>{i > 0 && " · "}<a href={p.href} className="hover:text-white">{p.label}</a></span>)}</span></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" /><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />{SITE.hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 pb-24 text-center text-xs text-royal-300/70 sm:pb-5">
          © {new Date().getFullYear()} {SITE.name}, {SITE.city}. All rights reserved.
        </div>
      </footer>
    </>
  );
}
