import { MapPin, Phone, Mail, Clock, Navigation, Star } from "lucide-react";
import { SITE, MAP_EMBED, MAP_DIRECTIONS } from "@/site";

export default function Contact() {
  const items = [
    { icon: MapPin, label: "Address", body: <>{SITE.campus}<br />{SITE.address}</> },
    { icon: Phone, label: "Helpline", body: <>{SITE.phones.map((p, i) => <span key={p.href}>{i > 0 && " · "}<a href={p.href} className="font-semibold text-royal-700 hover:underline">{p.label}</a></span>)}</> },
    { icon: Mail, label: "Email", body: <a href={`mailto:${SITE.email}`} className="font-semibold text-royal-700 hover:underline">{SITE.email}</a> },
    { icon: Clock, label: "School office", body: SITE.hours },
  ];
  return (
    <section id="contact" className="bg-royal-50/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold-600">Visit Us</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-royal-900">Find us in Sarthana, Surat</h2>
          <a href="https://www.google.com/maps/search/?api=1&query=Jay+Ambe+International+School+Sarthana+Jakat+Naka+Surat" target="_blank" rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-4 py-2 text-sm font-semibold text-royal-900 shadow-sm">
            <span className="flex text-gold-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>
            {SITE.google.rating} on Google · {SITE.google.reviews} reviews
          </a>
          <ul className="mt-8 space-y-5">
            {items.map(({ icon: Icon, label, body }) => (
              <li key={label} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-royal-700 shadow-sm ring-1 ring-royal-100"><Icon className="h-5 w-5" /></span>
                <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-0.5 leading-relaxed text-slate-700">{body}</p></div>
              </li>
            ))}
          </ul>
          <a href={MAP_DIRECTIONS} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-royal-800 px-7 py-3.5 font-semibold text-white transition hover:bg-royal-900">
            <Navigation className="h-4 w-4" /> Get Directions
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-royal-100">
          <iframe title="Map to Jay Ambe International School, Surat" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[380px] w-full border-0" />
        </div>
      </div>
    </section>
  );
}
