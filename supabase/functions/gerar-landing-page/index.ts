import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é um gerador de landing pages profissionais da VOKU.
Você recebe dados de uma marca e retorna APENAS o HTML completo de uma landing page responsiva.

REGRAS OBRIGATÓRIAS:
1. Retorne SOMENTE o código HTML, começando com <!DOCTYPE html> e terminando com </html>. Sem markdown, sem explicações.
2. Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
3. A página DEVE ser 100% responsiva (mobile-first).
4. Use as cores da marca fornecidas via inline styles ou Tailwind config customizado.
5. Inclua todas as seções solicitadas com layout profissional.
6. As imagens devem usar as URLs fornecidas com object-fit: cover e lazy loading.
7. O CTA deve ser proeminente e usar a cor primária da marca.
8. Inclua meta tags de SEO (title, description, viewport, charset).
9. Use fontes do Google Fonts que combinem com o tom da marca.
10. Adicione animações sutis com CSS (fade-in, hover effects).
11. O HTML deve ser production-ready, limpo e semântico.
12. Inclua um header/nav com o nome da marca e um footer simples.
13. NUNCA use placeholder — use apenas as imagens fornecidas ou omita se não houver.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validação
    const required = ["brand_name", "headline", "cta_text"];
    const missing = required.filter((f) => !body[f]);
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({ error: `Campos obrigatórios faltando: ${missing.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const {
      brand_name,
      primary_color = "#6C3AED",
      secondary_color = "#1E1B4B",
      tone = "profissional e moderno",
      audience = "empresas e profissionais",
      headline,
      subheadline = "",
      cta_text,
      sections = [],
      images = [],
    } = body;

    const userPrompt = `Crie uma landing page completa para:

MARCA: ${brand_name}
COR PRIMÁRIA: ${primary_color}
COR SECUNDÁRIA: ${secondary_color}
TOM DE VOZ: ${tone}
PÚBLICO-ALVO: ${audience}

HEADLINE: ${headline}
${subheadline ? `SUBHEADLINE: ${subheadline}` : ""}
CTA: ${cta_text}

${sections.length > 0 ? `SEÇÕES SOLICITADAS:\n${sections.map((s: string, i: number) => `${i + 1}. ${s}`).join("\n")}` : "Inclua: Hero, Benefícios, Como Funciona, CTA final."}

${images.length > 0 ? `IMAGENS DISPONÍVEIS (use todas):\n${images.map((url: string, i: number) => `${i + 1}. ${url}`).join("\n")}` : "Não há imagens — use backgrounds com gradientes e ícones SVG inline."}

Retorne APENAS o HTML completo.`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", status, errorText);

      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit excedido. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos ao workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Erro ao gerar landing page" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    let html = aiData.choices?.[0]?.message?.content || "";

    // Limpar markdown wrapper se presente
    html = html.replace(/^```html\s*/i, "").replace(/```\s*$/i, "").trim();

    const sectionsCount = (html.match(/<section/gi) || []).length;

    return new Response(
      JSON.stringify({
        html,
        metadata: {
          sections_count: sectionsCount,
          estimated_load_time: "< 2s",
          responsive: true,
          brand: brand_name,
          model: "google/gemini-3-flash-preview",
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("gerar-landing-page error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
