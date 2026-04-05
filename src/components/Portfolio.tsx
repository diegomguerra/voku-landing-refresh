import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import wellnessImg1 from "@/assets/portfolio-wellness-1.jpg";
import wellnessImg2 from "@/assets/portfolio-wellness-2.jpg";
import wellnessImg3 from "@/assets/portfolio-wellness-3.jpg";
import wellnessImg4 from "@/assets/portfolio-wellness-4.jpg";
import techImg1 from "@/assets/portfolio-tech-1.jpg";
import techImg2 from "@/assets/portfolio-tech-2.jpg";
import techImg3 from "@/assets/portfolio-tech-3.jpg";

const categories = ["Wellness & Beleza", "Tech & Serviços"] as const;

type PortfolioItem = {
  type: string;
  title: string;
  subtitle: string;
  image: string;
  span: string; // grid span classes
};

const portfolioData: Record<string, PortfolioItem[]> = {
  "Wellness & Beleza": [
    {
      type: "CARROSSEL",
      title: "Sua pele merece ingredientes que você consiga pronunciar.",
      subtitle: "SKINCARE · ANTI-AGING",
      image: wellnessImg1,
      span: "md:col-span-2 md:row-span-2",
    },
    {
      type: "STORIES",
      title: "Dra. Camila explica: rotina de skincare em 3 passos.",
      subtitle: "DERMATOLOGIA · AUTORIDADE",
      image: wellnessImg2,
      span: "md:col-span-1 md:row-span-1",
    },
    {
      type: "POST INSTAGRAM",
      title: "Sérum anti-aging com vitamina C. Resultados em 14 dias.",
      subtitle: "SOCIAL MEDIA · PRODUTO",
      image: wellnessImg3,
      span: "md:col-span-1 md:row-span-1",
    },
    {
      type: "EMAIL NURTURE",
      title: "Campanha de e-mail para lançamento de linha premium.",
      subtitle: "EMAIL MARKETING · LUXO",
      image: wellnessImg4,
      span: "md:col-span-2 md:row-span-1",
    },
  ],
  "Tech & Serviços": [
    {
      type: "CARROSSEL",
      title: "O futuro da saúde está no seu dedo. Smart Ring chegou.",
      subtitle: "WEARABLES · PRODUTO",
      image: techImg1,
      span: "md:col-span-1 md:row-span-2",
    },
    {
      type: "LANDING PAGE",
      title: "Landing page SaaS com conversão acima de 8%.",
      subtitle: "TECH · CONVERSÃO",
      image: techImg3,
      span: "md:col-span-2 md:row-span-1",
    },
    {
      type: "PRODUCT SHOT",
      title: "Smart ring: fotografia de produto para campanha de lançamento.",
      subtitle: "TECH · LANÇAMENTO",
      image: techImg2,
      span: "md:col-span-1 md:row-span-1",
    },
  ],
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const currentItems = portfolioData[categories[activeCategory]];

  return (
    <section id="portfolio" className="py-24 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-subheading mb-4">PORTFÓLIO</p>
          <h2 className="text-heading max-w-3xl">
            VOCÊ JÁ VIU ESSE TIPO DE CONTEÚDO POR AÍ.
          </h2>
          <p className="text-sm text-muted-foreground mt-4 max-w-lg">
            Posts, copy e e-mails com identidade visual real da sua marca. Gerado com IA. Revisado por humanos.
          </p>
        </div>

        <div className="flex gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`text-xs px-5 py-2.5 rounded-full border transition-all duration-300 ${
                i === activeCategory
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-3"
        >
          {currentItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`${item.span} relative rounded-lg overflow-hidden group cursor-pointer`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width={864}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badge always visible */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                  {item.type}
                </span>
              </div>

              {/* Text on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-background/50 mb-1.5">
                  {item.subtitle}
                </p>
                <h3 className="text-sm md:text-base font-bold leading-tight text-background">
                  {item.title}
                </h3>
              </div>

              {/* Subtle dark base gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom tagline */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Gerado com <span className="text-foreground font-medium">Fal.ai</span> + <span className="text-foreground font-medium">Ideogram</span> · Revisado pela equipe VOKU
        </p>
        <a href="#comecar" className="text-xs font-semibold text-foreground hover:text-accent transition-colors flex items-center gap-1.5 group">
          Ver mais projetos
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
