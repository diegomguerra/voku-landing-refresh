

# Atualizar `prompt-claude-code.md` com integração da Edge Function

## Problema identificado

O prompt anterior instrui o Claude apenas a copiar componentes visuais entre repos. Falta a parte principal: como o Claude Code na VOKU deve **chamar a Edge Function `gerar-landing-page`** hospedada no Lovable Cloud para gerar landing pages via IA.

## O que será adicionado

Uma nova seção no prompt com:

1. **URL da Edge Function**: `https://ivflzjzmsynijynuphnr.supabase.co/functions/v1/gerar-landing-page`
2. **Payload completo** com todos os campos aceitos (`brand_name`, `headline`, `cta_text`, `primary_color`, `secondary_color`, `tone`, `audience`, `subheadline`, `sections`, `images`)
3. **Exemplo de curl** pronto para testar no terminal
4. **Exemplo de integração Next.js** (API route ou server action no repo VOKU que chama a edge function)
5. **Tratamento de erros** (400, 402, 429, 500)
6. **Resposta esperada**: `{ html, metadata }` com o HTML completo gerado

## Estrutura do prompt atualizado

O arquivo `/mnt/documents/prompt-claude-code.md` será reescrito com:

- Seção 1: Arquitetura dual-repo (mantida)
- Seção 2: **NOVA — API de Geração de Landing Pages** (endpoint, payload, exemplos, integração no Next.js)
- Seção 3: Componentes visuais da home (mantida)
- Seção 4: Design system (mantida)
- Seção 5: Manobra Stripe (mantida)
- Seção 6: Workflow de sync (mantida)
- Seção 7: Checklist (atualizada com item da API)

## Exemplo de chamada que será incluído

```bash
curl -X POST \
  https://ivflzjzmsynijynuphnr.supabase.co/functions/v1/gerar-landing-page \
  -H "Content-Type: application/json" \
  -d '{
    "brand_name": "Minha Marca",
    "headline": "Transforme seu negócio",
    "cta_text": "Começar agora",
    "primary_color": "#6C3AED",
    "tone": "profissional e moderno",
    "audience": "empresas",
    "sections": ["Hero", "Benefícios", "Depoimentos", "CTA"]
  }'
```

Resposta:
```json
{
  "html": "<!DOCTYPE html>...",
  "metadata": {
    "sections_count": 4,
    "responsive": true,
    "brand": "Minha Marca"
  }
}
```

## Entrega

Arquivo atualizado em `/mnt/documents/prompt-claude-code.md` (versão v2), pronto para copiar e colar no Claude Code.

