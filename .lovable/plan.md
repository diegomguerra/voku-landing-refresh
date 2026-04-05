

# Edge Function: `gerar-landing-page`

## O que será criado

Uma Edge Function que recebe dados de marca (nome, cores, público-alvo, tom de voz, copy e URLs de imagens) e retorna o HTML completo de uma landing page responsiva. A VOKU no Vercel chamará este endpoint via `fetch()`.

## Arquitetura

```text
VOKU (Vercel)                    Lovable Cloud
─────────────                    ─────────────
POST /functions/v1/              Edge Function
  gerar-landing-page  ──────►   gerar-landing-page/index.ts
  { brand, copy,                     │
    images, style }                  │ Lovable AI Gateway
                                     │ (Gemini 3 Flash)
                                     ▼
                              Gera HTML completo
                              com Tailwind inline
                                     │
                     ◄───────────────┘
                  Response: { html, metadata }
```

## Input esperado (JSON body)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `brand_name` | string | Nome da marca |
| `primary_color` | string | Cor principal (hex) |
| `secondary_color` | string | Cor secundária (hex) |
| `tone` | string | Tom de voz (ex: "profissional", "descontraído") |
| `audience` | string | Público-alvo |
| `headline` | string | Título principal |
| `subheadline` | string | Subtítulo |
| `cta_text` | string | Texto do botão CTA |
| `sections` | array | Seções extras (benefícios, depoimentos, etc.) |
| `images` | array | URLs de imagens já geradas (Fal.ai/Ideogram) |

## Output (JSON response)

```json
{
  "html": "<!DOCTYPE html>...",
  "metadata": {
    "sections_count": 5,
    "estimated_load_time": "< 2s",
    "responsive": true
  }
}
```

## Implementação técnica

1. **Criar** `supabase/functions/gerar-landing-page/index.ts`
   - CORS headers para chamadas cross-origin (Vercel → Lovable)
   - Validação do body com checagem de campos obrigatórios
   - System prompt especializado em gerar HTML de landing pages com CSS inline/Tailwind CDN
   - Chamada ao Lovable AI Gateway (`google/gemini-3-flash-preview`) com os dados da marca
   - Parse da resposta e extração do HTML
   - Tratamento de erros 429 (rate limit) e 402 (créditos)

2. **Deploy** automático da função

3. **Teste** via `curl_edge_functions` para validar o endpoint

## Como a VOKU consumirá

```javascript
// No código da VOKU (Vercel/Next.js)
const res = await fetch(
  "https://ivflzjzmsynijynuphnr.supabase.co/functions/v1/gerar-landing-page",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brand_name: "...", ... })
  }
);
const { html } = await res.json();
```

