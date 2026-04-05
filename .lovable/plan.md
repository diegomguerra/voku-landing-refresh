

# Gerar arquivo HTML standalone da VOKU Landing Page

## Objetivo
Converter todos os componentes React deste projeto (Navbar, Hero, Marquee, Portfolio, Pricing, Process, Guarantee, Footer) em um **único arquivo HTML** com Tailwind CDN, pronto para colar em qualquer outro projeto.

## O que será feito

1. Ler todos os componentes restantes (Hero.tsx, Portfolio.tsx, Pricing.tsx) para capturar o conteúdo completo
2. Gerar `/mnt/documents/voku-landing.html` contendo:
   - Tailwind CDN com config customizado (cores lime, surface-dark, tipografia Inter)
   - Todas as 8 seções em HTML semântico puro
   - Animações CSS (marquee, hovers) sem Framer Motion
   - Design responsivo (mobile-first)
   - Comentários indicando onde trocar imagens/links

## Entrega
Um arquivo HTML único que o usuário baixa e integra no projeto VOKU no Vercel/GitHub.

