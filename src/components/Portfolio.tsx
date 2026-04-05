import { motion } from "framer-motion";
import { useState } from "react";
import wellnessImg1 from "@/assets/portfolio-wellness-1.jpg";
import wellnessImg2 from "@/assets/portfolio-wellness-2.jpg";
import techImg1 from "@/assets/portfolio-tech-1.jpg";

const categories = ["Wellness & Beleza", "Tech & Serviços"];

type PortfolioItem = {
  type: string;
  title: string;
  subtitle: string;
  image: string;
};

const portfolioData: Record<string, PortfolioItem[]> = {
  "Wellness & Beleza": [
    {
      type: "CARROSSEL",
      title: "Sua pele merece ingredientes que você consiga pronunciar.",
      subtitle: "SUA MARCA · SKINCARE",
      image: wellnessImg1,
    },
    {
      type: "STORIES",
      title: "Dra. Camila explica: o que realmente funciona contra o envelhecimento.",
      subtitle: "SUA MARCA · DERMATOLOGIA",
      image: wellnessImg2,
    },
    {
      type: "LANDING PAGE",
      title: "5 erros que você comete na sua rotina de beleza. Slide 1 →",
      subtitle: "SUA MARCA · WELLNESS",
      image: wellnessImg1,
    },
  ],
  "Tech & Serviços": [
    {
      type: "CARROSSEL",
      title: "O futuro da saúde está no seu dedo. Smart Ring chegou.",
      subtitle: "SUA MARCA · WEARABLES",
      image: techImg1,
    },
    {
      type: "STORIES",
      title: "Monitoramento 24h sem tirar do dedo. Conheça o smart ring.",
      subtitle: "SUA MARCA · TECH",
      image: techImg1,
    },
    {
      type: "LANDING PAGE",
      title: "Dados de saúde em tempo real. Sem app, sem complicação.",
      subtitle: "SUA MARCA · IOT",
      image: techImg1,
    },
  ],
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const currentItems = portfolioData[categories[activeCategory]];

  return (
    <section id="portfolio" className="py-24 px-6 md:px-16 lg:px-20 max-w-7xl mx-auto">
      <p className="text-subheading mb-4">PORTFÓLIO</p>
      <h2 className="text-heading mb-4 max-w-3xl">
        VOCÊ JÁ VIU ESSE TIPO DE CONTEÚDO POR AÍ.
      </h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Posts, copy e e-mails com identidade visual real da sua marca.
      </p>

      <div className="flex gap-4 mb-10">
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(i)}
            className={`text-xs px-4 py-2 rounded-full border transition-all ${
              i === activeCategory
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentItems.map((item, i) => (
          <motion.div
            key={`${activeCategory}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-sm overflow-hidden border border-border group relative aspect-[4/5]"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              width={768}
              height={960}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-sm w-fit font-medium uppercase tracking-wider">
                {item.type}
              </span>
              <div>
                <p className="text-subheading text-background/60 mb-2">{item.subtitle}</p>
                <h3 className="text-lg font-bold leading-tight text-background">{item.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
