import { motion } from "framer-motion";
import { useState } from "react";

const categories = ["Wellness & Beleza", "Agronegócio", "Tech & Serviços"];

const portfolioItems = [
  {
    category: "Wellness & Beleza",
    items: [
      { type: "CARROSSEL", title: "Sua pele merece ingredientes mais.", color: "bg-amber-800/20" },
      { type: "STORIES", title: "O que eu tomo toda manhã pra ter essa energia.", color: "bg-emerald-800/20" },
      { type: "CARROSSEL", title: "5 erros que você comete na sua rotina de beleza.", color: "bg-rose-800/20" },
    ],
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState(0);

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
        {portfolioItems[0].items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${item.color} rounded-sm aspect-[4/5] p-6 flex flex-col justify-between`}
          >
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-sm w-fit font-medium uppercase tracking-wider">
              {item.type}
            </span>
            <div>
              <p className="text-subheading mb-2 text-foreground/60">SUA MARCA · WELLNESS</p>
              <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
