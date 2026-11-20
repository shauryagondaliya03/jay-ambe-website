import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE } from "@/site";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata: Metadata = {
  title: "Jay Ambe International School, Surat | Admissions 2026-27 Open",
  description:
    "Jay Ambe International School, Surat — CBSE school (Affiliation No. 430247) from Nursery to 12th, Science & Commerce, English & Gujarati medium. Robotics, sports, GPS transport. Book a campus visit today.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: SITE.name,
  alternateName: SITE.campus,
  description: `${SITE.board} school in ${SITE.city}, Nursery to Class 12.`,
  telephone: SITE.phones[0].label,
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: SITE.address, addressLocality: SITE.city, addressRegion: "Gujarat", addressCountry: "IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
