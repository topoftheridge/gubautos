import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import BrowseByStyle from "@/components/BrowseByStyle";
import FeaturedInventory from "@/components/FeaturedInventory";
import Financing from "@/components/Financing";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <PromoBanner />
      <Hero />
      <Stats />
      <BrowseByStyle />
      <FeaturedInventory />
      <Financing />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}
