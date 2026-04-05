import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import wellnessImg1 from "@/assets/portfolio-wellness-1.jpg";
import wellnessImg2 from "@/assets/portfolio-wellness-2.jpg";
import wellnessImg3 from "@/assets/portfolio-wellness-3.jpg";
import wellnessImg4 from "@/assets/portfolio-wellness-4.jpg";
import techImg1 from "@/assets/portfolio-tech-1.jpg";
import techImg2 from "@/assets/portfolio-tech-2.jpg";
import techImg3 from "@/assets/portfolio-tech-3.jpg";
import interiorImg1 from "@/assets/portfolio-interior-1.jpg";
import interiorImg2 from "@/assets/portfolio-interior-2.jpg";
import interiorImg3 from "@/assets/portfolio-interior-3.jpg";
import interiorImg4 from "@/assets/portfolio-interior-4.jpg";

const categories = ["Wellness & Beleza", "Tech & Serviços"] as const;

type PortfolioItem = {
  type: string;
  title: string;
  subtitle: string;
  image: string;
  span: string;
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

const interiorProjects: PortfolioItem[] = [
  {
    type: "DESIGN DE INTERIORES",
    title: "Escritório corporativo premium com iluminação natural e madeira.",
    subtitle: "CORPORATIVO · OPEN SPACE",
    image: interiorImg1,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    type: "SALA EXECUTIVA",
    title: "Sala executiva com vista panorâmica e acabamentos em mármore.",
    subtitle: "EXECUTIVO · PREMIUM",
    image: interiorImg2,
    span: "md:col-span-1 md:row-span-2",
  },
  {
    type: "SALA DE REUNIÃO",
    title: "Sala de reunião criativa para agência de design.",
    subtitle: "CRIATIVO · COLABORATIVO",
    image: interiorImg3,
    span: "md:col-span-1 md:row-span-1",
  },
  {
    type: "COWORKING",
    title: "Coworking industrial chic com tijolos aparentes e iluminação quente.",
    subtitle: "STARTUP · COWORKING",
    image: interiorImg4,
    span: "md:col-span-2 md:row-span-1",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [showMore, setShowMore] = useState(false);
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
            <PortfolioCard key={i} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom tagline */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Gerado com <span className="text-foreground font-medium">Fal.ai</span> + <span className="text-foreground font-medium">Ideogram</span> · Revisado pela equipe VOKU
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-xs font-semibold text-foreground hover:text-accent transition-colors flex items-center gap-1.5 group"
        >
          {showMore ? "Fechar projetos" : "Ver mais projetos"}
          <span className={`transition-transform ${showMore ? "rotate-90" : "group-hover:translate-x-1"}`}>
            {showMore ? "×" : "→"}
          </span>
        </button>
      </div>

      {/* Expanded interior design section */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-16 mb-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
                <div>
                  <span className="text-[10px] bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                    Case · Design de Interiores
                  </span>
                  <h3 className="text-heading mt-4 max-w-2xl">
                    ESCRITÓRIOS QUE INSPIRAM PRODUTIVIDADE.
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 max-w-xl">
                    Projeto criado para um cliente do ramo de arquitetura corporativa. Da identidade visual ao conteúdo de lançamento — tudo gerado pela VOKU.
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-3 mt-8"
              >
                {interiorProjects.map((item, i) => (
                  <PortfolioCard key={i} item={item} index={i} />
                ))}
              </motion.div>

              {/* Sample notice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Isto é apenas uma amostra
                </p>
                <h4 className="text-lg md:text-xl font-bold text-foreground max-w-xl mx-auto leading-tight">
                  O que você vê aqui é uma fração do que podemos criar para o seu negócio.
                </h4>
                <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
                  Cada projeto é único. Criamos conteúdo visual sob medida para qualquer segmento — do wellness ao tech, do varejo à arquitetura.
                </p>
                <a
                  href="#comecar"
                  className="inline-flex items-center gap-2 mt-6 bg-foreground text-background text-xs font-semibold px-6 py-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  Quero um projeto assim
                  <span>→</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PortfolioCard = ({ item, index }: { item: PortfolioItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.08, duration: 0.4 }}
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
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-4 left-4 z-10">
      <span className="text-[10px] bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
        {item.type}
      </span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
      <p className="text-[10px] uppercase tracking-[0.2em] text-background/50 mb-1.5">
        {item.subtitle}
      </p>
      <h3 className="text-sm md:text-base font-bold leading-tight text-background">
        {item.title}
      </h3>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent pointer-events-none" />
  </motion.div>
);

export default Portfolio;
