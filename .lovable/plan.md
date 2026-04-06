

# Plano: Expandir Edge Function para aceitar briefing completo

## Problema

O caller (voku.one) coleta dados ricos no briefing (paleta completa, tagline, tipografia, produto, estilo, keywords, resumo) mas a Edge Function só aceita e injeta no prompt: `brand_name`, `headline`, `primary_color`, `secondary_color`, `tone`, `audience`, `cta_text`, `sections`, `images`.

Resultado: dados como `text_color`, `tagline`, `produto`, `estilo`, `keywords`, `resumo`, `tipografia` são perdidos ou mapeados incorretamente.

## Solução

### 1. Expandir os campos aceitos pela Edge Function

Novos campos opcionais no body:

| Campo | Tipo | Exemplo | Uso |
|-------|------|---------|-----|
| `product_name` | string | `"Cascara Spritz"` | Nome do produto (separado da marca) |
| `tagline` | string | `"O lado mais leve do café"` | Tagline da marca |
| `text_color` | string | `"#2B1A10"` | Cor do texto principal |
| `accent_color` | string | `"#C9A49A"` | Cor de destaque/accent |
| `background_color` | string | `"#FFFFFF"` | Cor de fundo |
| `style` | string | `"luxury"` | Estilo visual geral |
| `keywords` | string | `"cascara, café, premium"` | Palavras-chave SEO |
| `description` | string | `"Bebida não alcoólica..."` | Resumo/descrição do produto |
| `typography` | object | `{logo: "Serif elegante...", body: "Sans-serif"}` | Diretrizes tipográficas |

### 2. Enriquecer o prompt enviado à IA

Injetar todos os novos campos no `userPrompt`, adicionando seções como:

```
PRODUTO: Cascara Spritz
TAGLINE: "O lado mais leve do café"

PALETA COMPLETA:
- Primária: #C4622D (âmbar alaranjado)
- Secundária: #C9A49A (rosa acinzentado)
- Texto: #2B1A10 (marrom escuro)
- Fundo: #FFFFFF (branco puro)

ESTILO VISUAL: luxury
TIPOGRAFIA: Serif elegante para logo, sans-serif para corpo

DESCRIÇÃO: Bebida não alcoólica gaseificada à base de polpa de café...
PALAVRAS-CHAVE SEO: cascara, café, bebida natural, alternativa saudável
```

### 3. Logar o body completo

Mudar o `console.log` para logar **todos** os campos recebidos (`JSON.stringify(body)`) para debug futuro.

### 4. Schema JSON para o caller (voku.one)

Payload esperado que a voku deve enviar:

```json
{
  "brand_name": "VÉRIA",
  "product_name": "Cascara Spritz",
  "tagline": "O lado mais leve do café",
  "headline": "VÉRIA Cascara Spritz - O lado mais leve do café. Primeiro Cascara Spritz do Brasil.",
  "subheadline": "Bebida não alcoólica gaseificada à base de polpa de café",
  "cta_text": "Saiba onde encontrar",
  "tone": "premium + inspiracional",
  "audience": "pessoas que buscam alternativas saudáveis, amantes de café",
  "style": "luxury",
  "primary_color": "#C4622D",
  "secondary_color": "#C9A49A",
  "text_color": "#2B1A10",
  "background_color": "#FFFFFF",
  "accent_color": "#C9A49A",
  "keywords": "cascara, café, bebida natural, alternativa saudável, spritz",
  "description": "VÉRIA Cascara Spritz - bebida não alcoólica gaseificada à base de polpa de café com posicionamento premium",
  "typography": {
    "logo": "Serif elegante, caixa alta, com acento",
    "product": "Serif regular, peso médio",
    "tagline": "Serif itálico, delicado",
    "body": "Sans-serif leve"
  },
  "sections": ["Hero", "Benefícios", "Como Funciona", "Prova Social", "CTA final"],
  "images": ["https://...ref-0.png"]
}
```

### Mapeamento que a voku.one precisa corrigir

```
structured_data.nome_marca       → brand_name
structured_data.produto          → product_name  (NOVO)
structured_data.resumo           → headline + description
structured_data.cor_primaria     → primary_color  (DEVE ser #C4622D, não #2B1A10)
structured_data.cor_secundaria   → secondary_color
structured_data.cor_texto        → text_color (NOVO)
structured_data.estilo           → style (NOVO)
structured_data.tom              → tone
structured_data.palavras_chave   → keywords (NOVO)
structured_data.cta_texto        → cta_text
tagline do chat                  → tagline (NOVO)
tipografia do chat               → typography (NOVO)
```

### Arquivos modificados

- `supabase/functions/gerar-landing-page/index.ts` — aceitar novos campos, enriquecer prompt, logar body completo

