import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Guarantee from "@/components/Guarantee";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <Portfolio />
      <Pricing />
      <Process />
      <Guarantee />
      <Footer />
    </div>
  );
};

export default Index;
