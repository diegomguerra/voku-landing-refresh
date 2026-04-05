

# Gerar `prompt-claude-code.md`

## O que será criado

Um arquivo Markdown em `/mnt/documents/prompt-claude-code.md` com o prompt completo para colar no Claude Code (terminal). O prompt instruirá o Claude a:

1. **Usar o repo `voku-landing-refresh`** como source dos componentes visuais da home (`/`) no domínio `voku.one`
2. **Manter o repo `Voku`** como source de toda a plataforma (dashboard, auth, briefing, Stripe)
3. **Mapear os links Stripe** dos planos e credit packs do repo VOKU para os botões da Pricing

## Conteúdo do prompt

O prompt incluirá:

- **Contexto da arquitetura dual-repo** com diagrama ASCII
- **Lista completa dos 8 componentes** (Navbar, Hero, Marquee, Portfolio, Pricing, Process, Guarantee, Footer) com instruções de conversão React/Vite → Next.js App Router
- **Design system completo**: CSS variables, utilitários (`text-display`, `surface-dark`, `surface-lime`, `btn-primary`), keyframes do marquee, Tailwind config com cores
- **Dependências necessárias**: `framer-motion`, `lucide-react`
- **Instrução Stripe**: localizar os checkout links existentes no repo VOKU e mapeá-los nos botões "Começar agora" (4 planos) e "COMPRAR" (3 credit packs)
- **Workflow de sync**: quando o layout mudar no Lovable → push para `voku-landing-refresh` → Claude re-sincroniza no repo VOKU

## Passos de implementação

1. Gerar o arquivo `/mnt/documents/prompt-claude-code.md` com todo o conteúdo estruturado
2. Validar que o arquivo foi criado corretamente

## Entrega

Arquivo pronto para copiar e colar no terminal do Claude Code.

