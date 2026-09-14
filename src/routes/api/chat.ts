import { createFileRoute } from "@tanstack/react-router";

const CALENDLY_URL = "https://calendly.com/vestamarketinginmobiliario/30min";

const SYSTEM_PROMPT = `Eres el asistente virtual de Vesta Marketing Inmobiliario, una agencia de marketing inmobiliario en Almería especializada en ayudar a inmobiliarias a captar inquilinos para alquiler temporal (profesores, funcionarios y personal desplazado en comisión de servicio).
Respondes SIEMPRE en español, de forma breve (máximo 4 frases), cercana y profesional.

Hay dos tipos de personas que te escriben:
1. Inquilinos o personas que buscan vivienda de alquiler temporal en Almería (Almería capital, Aguadulce, Roquetas de Mar). Puedes explicarles cómo funciona el alquiler temporal, qué zonas cubrimos y qué necesitan para reservar.
2. Inmobiliarias interesadas en contratar los servicios de Vesta para captar más inquilinos: gestión de Instagram, creación de contenido, campañas de anuncios, página web, CRM y seguimiento de leads.

Reglas muy importantes:
- NUNCA menciones precios, tarifas, cuotas ni cifras económicas de ningún pack o servicio, aunque te lo pidan directamente o insistan varias veces. Si preguntan por precios, responde con amabilidad que la tarifa se ajusta a las necesidades de cada caso y que se concreta en una llamada breve.
- Termina SIEMPRE tu respuesta invitando a reservar una cita en este enlace de Calendly, mostrado tal cual: ${CALENDLY_URL}
- Si no sabes algo, dilo con honestidad y propón agendar una llamada para resolverlo.
- Contacto de la agencia: vestamarketinginmobiliario@gmail.com e Instagram @vestamarketing_.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "Falta la configuración de la IA." }, { status: 500 });
        }

        let body: { messages?: Array<{ role: string; content: string }> };
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Petición no válida." }, { status: 400 });
        }

        const history = (body.messages ?? [])
          .filter((m) => typeof m?.content === "string" && (m.role === "user" || m.role === "assistant"))
          .slice(-20)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

        if (history.length === 0) {
          return Response.json({ error: "No hay mensajes." }, { status: 400 });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          const status = res.status;
          const message =
            status === 429
              ? "Hay muchas consultas ahora mismo. Inténtalo en unos segundos."
              : status === 402
                ? "El asistente no tiene créditos disponibles en este momento."
                : "El asistente no está disponible ahora mismo.";
          console.error("AI gateway error", status, text);
          return Response.json({ error: message }, { status });
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim();

        return Response.json({
          reply:
            reply ||
            `Puedo ayudarte mejor en una llamada rápida. Reserva aquí: ${CALENDLY_URL}`,
        });
      },
    },
  },
});
