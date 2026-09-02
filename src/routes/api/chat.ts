import { createFileRoute } from "@tanstack/react-router";

const CALENDLY_URL = "https://calendly.com/ainhoalfsmile/30min";

const SYSTEM_PROMPT = `Eres el asistente virtual de Vesta, una agencia de marketing inmobiliario.
Respondes SIEMPRE en español, de forma breve (máximo 4 frases), cercana y profesional.

Información de la agencia:
- Vesta ayuda a inmobiliarias a captar más clientes con marketing digital, contenido y anuncios.
- Packs de servicios:
  * Low ticket: 250 € + 75 €/mes de mantenimiento.
  * Medium ticket: 500 € + 150 €/mes (el más elegido).
  * High ticket: 1000 € + 300 €/mes.
- Servicios: optimización y gestión de Instagram, creación de contenido, campañas de anuncios,
  página web, CRM y seguimiento de leads según el pack.
- Contacto: hola@vestamarketing.com e Instagram @vesta.inmobiliario.

Si el usuario quiere una cita, una llamada, una demo o hablar con el equipo,
invítale a reservar en este enlace de Calendly y muéstralo tal cual: ${CALENDLY_URL}
Si no sabes algo, dilo y propón agendar una llamada.`;

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
