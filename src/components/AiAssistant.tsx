import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/vestamarketinginmobiliario/30min";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy el asistente de Vesta. Puedo resolver tus dudas sobre nuestros packs y servicios, o ayudarte a reservar una llamada.",
};

const SUGGESTIONS = [
  "¿Qué incluye cada pack?",
  "¿Cuánto cuesta el servicio?",
  "Quiero pedir cita",
];

function renderContent(text: string) {
  const parts = text.split(/(https?:\/\/\S+)/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== WELCOME) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        setError(data.error ?? "No he podido responder. Prueba de nuevo.");
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
      }
    } catch {
      setError("No hay conexión con el asistente. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="ai-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente de IA"}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <section className="ai-panel" aria-label="Asistente de Vesta">
          <header className="ai-header">
            <div>
              <strong>Asistente Vesta</strong>
              <span>Resuelve dudas y agenda tu cita</span>
            </div>
            <a
              className="ai-cta"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir cita
            </a>
          </header>

          <div className="ai-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                {renderContent(m.content)}
              </div>
            ))}
            {loading && <div className="ai-msg ai-msg-assistant ai-typing">Escribiendo…</div>}
            {error && <div className="ai-error">{error}</div>}
          </div>

          <div className="ai-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)} disabled={loading}>
                {s}
              </button>
            ))}
          </div>

          <form
            className="ai-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              aria-label="Escribe tu pregunta"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Enviar
            </button>
          </form>
        </section>
      )}
    </>
  );
}
