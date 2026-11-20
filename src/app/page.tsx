import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Streams from "@/components/Streams";
import Facilities from "@/components/Facilities";
import Campus from "@/components/Campus";
import Contact from "@/components/Contact";
import Sathi from "@/components/Sathi";
import AppPreview from "@/components/AppPreview";
import VisitCTA from "@/components/VisitCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Streams />
        <Facilities />
        <Campus />
        <AppPreview />
        <Contact />
        <VisitCTA />
      </main>
      <Footer />
      <Sathi />
    </>
  );
}
