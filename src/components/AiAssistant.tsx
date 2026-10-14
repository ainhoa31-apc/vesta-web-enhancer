import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/vestamarketingautiva/30min";
const CONTACT_EMAIL = "vestamarketinginmobiliario@gmail.com";

type Msg = { role: "user" | "assistant"; content: string };

const BOOK = `\n\n¿Lo vemos para tu negocio? Reserva una llamada gratuita de 30 minutos aquí: ${CALENDLY_URL}`;

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy el asistente de Vesta 👋 Te ayudo con dudas sobre páginas web, chatbots con IA, automatizaciones con n8n, logos y redes sociales. ¿Qué necesita tu negocio?",
};

const SUGGESTIONS = [
  "¿Qué servicios ofrecéis?",
  "¿Cuánto tarda una web?",
  "¿Qué puedo automatizar con n8n?",
  "¿El chatbot puede contestar por WhatsApp?",
  "¿Hay permanencia?",
  "Quiero pedir cita",
];

/**
 * Base de conocimiento del asistente. Cada tema tiene palabras clave (sin tildes,
 * en minúsculas) y una respuesta. Las respuestas NUNCA dan cifras de precios:
 * remiten a la sección de planes o a una llamada.
 */
const KNOWLEDGE: { keys: string[]; answer: string; noBook?: boolean; weight?: number }[] = [
  {
    keys: ["cita", "llamada", "reunion", "agendar", "agenda", "reservar", "hablar con", "contactar", "contacto", "calendly", "llamar", "telefono"],
    answer: `¡Genial! Puedes elegir el día y la hora que mejor te venga en nuestro calendario: ${CALENDLY_URL}\n\nEs una llamada gratuita de 30 minutos, sin compromiso. Si lo prefieres, también puedes escribirnos a ${CONTACT_EMAIL}.`,
    noBook: true,
  },
  {
    keys: ["precio", "precios", "cuesta", "cuanto vale", "cuanto cobr", "tarifa", "presupuesto", "caro", "barato", "coste", "costo", "pack", "plan"],
    answer:
      "Tenemos tres planes (Low, Medium y High ticket) que combinan varios servicios, y también hacemos trabajos sueltos. Puedes ver qué incluye cada plan en la sección «Planes» de esta web. Para darte un presupuesto exacto necesitamos saber qué necesita tu negocio, y eso lo vemos en una llamada corta.",
  },
  {
    keys: ["servicio", "ofreceis", "haceis", "que hac", "a que os dedic", "que ofrec"],
    answer:
      "Creamos cinco cosas:\n• Páginas web modernas y adaptadas al móvil\n• Chatbots con IA que atienden a tus clientes 24/7\n• Automatizaciones con n8n para quitarte tareas repetitivas\n• Logos e identidad de marca\n• Marketing en redes sociales y campañas de Meta Ads\n\nPuedes contratar uno suelto o combinarlos en un plan.",
  },
  {
    keys: ["chatbot", "chat bot", " bot ", "asistente", "inteligencia artificial", " ia", "whatsapp", "atender", "responder mensajes", "mensajes"],
    answer:
      "Creamos chatbots con inteligencia artificial que responden a tus clientes al momento, a cualquier hora. Los entrenamos con la información de tu negocio (servicios, horarios, preguntas frecuentes) para que respondan en tu nombre. Pueden estar en tu web y conectarse con WhatsApp o Instagram, y cuando hace falta derivan al cliente a reservar cita o a hablar contigo.",
  },
  {
    keys: ["equivoc", "error", "invent", " mal ", "fiable", "seguro que responde"],
    answer:
      "Es una duda muy razonable. Configuramos el chatbot solo con la información de tu negocio y le marcamos límites claros: si le preguntan algo que no sabe, no se lo inventa, sino que deriva al cliente a hablar contigo o a reservar cita. Además lo probamos contigo antes de publicarlo y lo revisamos en el mantenimiento.",
  },
  {
    keys: ["n8n", "automatiz", "automat", "zapier", "make", "flujo", "tareas repetitivas", "crm", "excel", "hoja de calculo", "recordatorio"],
    answer:
      "Con n8n conectamos tus herramientas para que las tareas repetitivas se hagan solas. Algunos ejemplos:\n• Cada formulario de tu web llega a tu email y a una hoja de cálculo o CRM\n• Recordatorios automáticos de citas a tus clientes\n• Avisos cuando entra un cliente nuevo\n• Respuestas automáticas y seguimiento de presupuestos\n\nEn la llamada vemos qué tareas te quitan más tiempo y cuáles se pueden automatizar.",
  },
  {
    keys: ["web", "pagina", "landing", "tienda online", "wordpress", "sitio"],
    answer:
      "Hacemos páginas web modernas, rápidas y adaptadas al móvil: desde una landing de una sola página hasta una web completa con varias secciones. Las pensamos para que quien entra acabe escribiéndote o reservando, e incluyen botón de cita o WhatsApp y optimización para Google.",
  },
  {
    keys: ["tarda", "plazo", "cuanto tiempo", "cuando estar", "rapido", "dias", "semanas", "urgente"],
    answer:
      "Depende de lo que necesites. Una landing sencilla o un logo suelen estar en pocos días, y una web completa con chatbot y automatizaciones lleva unas semanas. Antes de empezar te damos un plazo concreto por escrito, para que sepas desde el principio cuándo lo tendrás.",
  },
  {
    keys: ["logo", "logotipo", "marca", "identidad", "branding", "colores", "tipografia"],
    answer:
      "Diseñamos tu logotipo y la identidad de tu marca: colores, tipografías y plantillas para redes, para que tu negocio se reconozca a primera vista y todo se vea coherente en la web y en redes. Te presentamos propuestas y las ajustamos contigo hasta que te encanten.",
  },
  {
    keys: ["redes", "instagram", "facebook", "tiktok", "community", "publicacion", "reels", "contenido", "seguidores", "posts"],
    answer:
      "Gestionamos tus redes sociales: planificamos el calendario de publicaciones, diseñamos los posts, creamos reels y lo alineamos todo con la estrategia de tu negocio. Si quieres llegar a clientes nuevos más rápido, también lanzamos campañas de anuncios en Meta (Instagram y Facebook).",
  },
  {
    keys: ["anuncio", "meta ads", "publicidad", "campana", "facebook ads", " ads "],
    answer:
      "Creamos y gestionamos campañas de Meta Ads (Instagram y Facebook) para atraer clientes nuevos a tu negocio. Nosotros nos encargamos de los anuncios, la segmentación y el seguimiento; la inversión en publicidad la decides tú y va aparte.",
  },
  {
    keys: ["seo", "google", "buscador", "posicion", "aparecer", "primer"],
    answer:
      "Optimizamos tu web para Google (SEO) y tu ficha de Google Business para que tu negocio aparezca cuando te buscan en tu zona. Nadie puede garantizar honestamente el primer puesto, pero sí dejarlo todo bien hecho para que Google te entienda y te muestre.",
  },
  {
    keys: ["permanencia", "contrato", "cancelar", "baja", "atado", "compromiso"],
    answer:
      "No hay permanencia. Trabajamos con una propuesta clara desde el principio y el mantenimiento mensual lo puedes dejar cuando quieras.",
  },
  {
    keys: ["mantenimiento", "mensual", "cuota", "al mes", "despues"],
    answer:
      "El mantenimiento mensual sirve para que tu web, tu chatbot y tus automatizaciones sigan funcionando: hacemos pequeños cambios, revisamos que todo vaya bien y vemos los resultados contigo. En los planes con redes sociales incluye también la gestión del contenido.",
  },
  {
    keys: ["dominio", "hosting", "alojamiento", "correo profesional", "email profesional"],
    answer:
      "Te ayudamos con todo lo técnico: dominio, alojamiento de la web y correo con tu dominio. Lo dejamos configurado para que tú no tengas que pelearte con nada.",
  },
  {
    keys: [" mia ", " mio ", "propiedad", "propietario", "acceso", "editar yo", "cambiar yo", "modificar"],
    answer:
      "Sí, lo que creamos para tu negocio es tuyo. Y si quieres hacer cambios, nos los pides y los hacemos nosotros, o te enseñamos a hacer los más sencillos tú mismo.",
  },
  {
    keys: ["fotos", "textos", "contenido de la web", "que necesitais", "que tengo que dar", "que necesito"],
    answer:
      "Solo necesitamos que nos cuentes tu negocio. Si tienes fotos, logo o textos, los usamos; si no, te ayudamos a prepararlos. Te pedimos lo justo para que no te quite tiempo.",
  },
  {
    keys: ["almeria", "donde", "ubicacion", "remoto", "espana", "ciudad", "presencial", "oficina", "roquetas"],
    answer:
      "Estamos en Almería, pero trabajamos en remoto con negocios de toda España: todo se puede hacer por videollamada, email y WhatsApp.",
  },
  {
    keys: ["como trabaj", "proceso", "empezar", "pasos", "funciona trabajar", "como es"],
    answer:
      "Trabajar con nosotros es sencillo:\n1. Llamada de 30 minutos para conocer tu negocio\n2. Te enviamos una propuesta clara (qué, cuándo y cuánto)\n3. Lo creamos y te lo enseñamos antes de publicarlo\n4. Lo lanzamos y lo mantenemos al día",
  },
  {
    keys: ["ejemplo", "trabajos", "portfolio", "portafolio", "clientes", "referencias"],
    answer:
      "En esta misma web tienes demos de cómo creamos una web, una automatización y un chatbot. En la llamada te enseñamos ejemplos más parecidos a tu sector.",
  },
  {
    keys: ["pago", "pagar", "factura", "transferencia", "tarjeta", "fraccion"],
    answer:
      "Las condiciones de pago te las detallamos por escrito en la propuesta antes de empezar, para que no haya sorpresas.",
  },
  {
    keys: ["sector", "restaurante", "peluqueria", "estetica", "clinica", "tienda", "inmobiliaria", "gimnasio", "abogado", "negocio pequeno", "autonomo"],
    weight: 0.3,
    answer:
      "Trabajamos con todo tipo de negocios: restaurantes, peluquerías y centros de estética, clínicas, tiendas, inmobiliarias, gimnasios, autónomos… Adaptamos la web, el chatbot y las automatizaciones a cómo funciona tu negocio en concreto.",
  },
  {
    keys: ["gracias", "genial", "perfecto", "vale"],
    weight: 0.5,
    answer: "¡A ti! Si te surge cualquier otra duda, aquí estoy.",
  },
  {
    keys: ["hola", "buenas", "buenos dias", "buenas tardes", "hey"],
    answer:
      "¡Hola! ¿En qué te puedo ayudar? Puedo contarte cómo trabajamos webs, chatbots, automatizaciones con n8n, logos y redes sociales.",
    noBook: true,
  },
];

const FALLBACK = `No estoy seguro de haber entendido tu pregunta. Puedo ayudarte con páginas web, chatbots con IA, automatizaciones con n8n, logos y redes sociales. Si lo prefieres, lo hablamos directamente en una llamada gratuita: ${CALENDLY_URL}`;

function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?¡!.,;:()]/g, " ")
    .replace(/\s+/g, " ")} `;
}

function answerFor(question: string): string {
  const q = normalize(question);
  let best: (typeof KNOWLEDGE)[number] | null = null;
  let bestScore = 0;
  for (const item of KNOWLEDGE) {
    const score =
      item.keys.reduce((acc, k) => (q.includes(k) ? acc + k.length : acc), 0) * (item.weight ?? 1);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  if (!best) return FALLBACK;
  return best.noBook ? best.answer : best.answer + BOOK;
}

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
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    setMessages((prev) => [...prev, { role: "user", content: clean }]);
    setInput("");
    setLoading(true);
    const reply = answerFor(clean);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    }, 650);
  }

  return (
    <>
      <button
        type="button"
        className="ai-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
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
            <a className="ai-cta" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
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
          </div>

          <div className="ai-suggestions-toggle">
            <button
              type="button"
              className="ai-suggestions-toggle-btn"
              onClick={() => setShowSuggestions((v) => !v)}
            >
              {showSuggestions ? "Ocultar preguntas ▲" : "Ver preguntas sugeridas ▼"}
            </button>
          </div>

          {showSuggestions && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setShowSuggestions(false);
                    send(s);
                  }}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

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
