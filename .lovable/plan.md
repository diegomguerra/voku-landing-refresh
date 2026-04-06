

# Tornar a Landing Page 100% Responsiva para Smartphone

## Problemas identificados

Após análise dos componentes, os principais pontos que precisam de ajuste mobile:

1. **Hero** — O `text-display` usa `text-5xl` no mobile, que pode ser grande demais em telas < 375px. O grid split (light/dark) empilha corretamente mas o lado escuro fica muito longo.
2. **Portfolio** — Grid `auto-rows-[260px]` com spans `md:col-span-2` colapsa para 1 coluna no mobile, mas a altura fixa de 260px pode cortar imagens em telas pequenas.
3. **Pricing** — 4 cards em coluna única ficam muito longos no scroll mobile. Os credit packs também.
4. **Process** — Stats `flex gap-8` pode transbordar em telas estreitas (< 360px).
5. **Navbar** — Menu mobile funciona, mas o seletor de idioma (PT/EN/ES) aparece apenas no desktop.
6. **Footer** — Grid 4 colunas colapsa para 1, mas a coluna vazia desperdiça espaço.
7. **Marquee** — OK, funciona bem em qualquer largura.
8. **Guarantee** — OK, já é centralizado e responsivo.

## Alterações planejadas

### Hero.tsx
- Reduzir `text-display` no mobile: `text-4xl` → `md:text-7xl` → `lg:text-8xl`
- Reduzir padding vertical mobile: `py-12` em vez de `py-20`
- Lado escuro: reduzir tamanho do "minutos" para `text-5xl` no mobile

### Portfolio.tsx
- Ajustar `auto-rows-[200px]` no mobile (menor altura)
- Garantir que badges não transbordem em telas < 375px

### Pricing.tsx
- Manter grid 1 coluna no mobile (já funciona)
- Reduzir padding dos cards no mobile: `p-5` em vez de `p-6`

### Process.tsx
- Stats: mudar para `flex flex-wrap gap-6` para evitar overflow
- Reduzir tamanho dos valores stat no mobile

### Navbar.tsx
- Adicionar seletor de idioma no menu mobile

### Footer.tsx
- Mudar grid para `grid-cols-2` no mobile em vez de `grid-cols-1` (brand full width, restante em 2 colunas)

### index.css
- Ajustar `.text-display` para começar menor: `text-4xl` base

## Resultado
Todas as seções terão layout otimizado para telas de 320px a 414px, sem overflow horizontal, texto legível e CTAs acessíveis com o polegar.

