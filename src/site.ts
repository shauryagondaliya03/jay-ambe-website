// Central place for school details (taken from the school brochure + Google listing).
// Please re-verify anything marked VERIFY before launch.
export const SITE = {
  name: "Jay Ambe International School",
  city: "Surat",
  campus: "N.C. Thakar Education Campus",
  tagline: "Where Child Excel",
  trust: "Shree Sai Praful Charitable Trust",
  board: "CBSE",
  affiliationNo: "430247",
  schoolCode: "10223",
  session: "2026-27",
  phones: [
    { label: "+91 99247 22275", href: "tel:+919924722275" },
    { label: "+91 99247 22276", href: "tel:+919924722276" },
  ],
  email: "jaissurat2@gmail.com",
  // VERIFY: brochure says PIN 395006, Google Maps says 395013.
  address: "Block No. 50, Nr. C.H. Park, Kathodara Road, Sarthana Jakatnaka, Surat – 395006",
  hours: "7:00 am – 7:00 pm", // VERIFY: from Google listing ("closes 7 pm, opens 7 am")
  google: { rating: 4.8, reviews: 83 }, // from Google Maps listing — update periodically
  mapQuery: "Jay Ambe International School, Sarthana Jakat Naka, Surat",
};

export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;
export const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapQuery)}`;

export const GRADES = [
  "Nursery",
  "Jr. KG",
  "Sr. KG",
  ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
];
export const MEDIUMS = ["English", "Gujarati"] as const;
