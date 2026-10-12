import { createFileRoute } from "@tanstack/react-router";
import { AiAssistant } from "@/components/AiAssistant";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  Globe,
  Instagram,
  Mail,
  Megaphone,
  PenTool,
  Sheet,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/vesta-logo.png.asset.json";

const PAGE_TITLE = "Vesta Marketing | Webs, chatbots con IA, automatizaciones n8n, logos y redes sociales";
const PAGE_DESCRIPTION =
  "Agencia de marketing digital en Almería. Creamos páginas web, chatbots con IA, automatizaciones con n8n, logos e identidad de marca, y gestionamos tus redes sociales.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { property: "og:site_name", content: "Vesta Marketing" },
      { property: "og:url", content: "https://www.vestamarketinginmobiliario.com/" },
    ],
    links: [{ rel: "canonical", href: "https://www.vestamarketinginmobiliario.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vesta Marketing",
          url: "https://www.vestamarketinginmobiliario.com/",
          publisher: {
            "@type": "Organization",
            name: "Vesta Marketing",
            url: "https://www.vestamarketinginmobiliario.com/",
            logo: "https://www.vestamarketinginmobiliario.com/favicon.png",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const CALENDLY_URL = "https://calendly.com/vestamarketinginmobiliario/30min";
// URL base de Lovable: sirve las imágenes subidas mientras el dominio propio
// no esté conectado como dominio personalizado (eso requiere plan Pro de Lovable).
const LOVABLE_CDN = "https://vesta-web-enhancer.lovable.app";
const LOGO_URL = `${LOVABLE_CDN}${logoAsset.url}`;
const CALENDLY_EMBED = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=f7f3e9&text_color=25241f&primary_color=26317a`;
const INSTAGRAM_URL =
  "https://www.instagram.com/vestamarketing_?igsi=MWpoaWwyZTFmY3hqYw%3D%3D&utm_source=qr";
const INSTAGRAM_HANDLE = "@vestamarketing_";
const CONTACT_EMAIL = "vestamarketinginmobiliario@gmail.com";

const SERVICES = [
  {
    id: "webs",
    icon: Globe,
    title: "Páginas web",
    text: "Webs modernas, rápidas y adaptadas al móvil, pensadas para que quien te visite acabe escribiéndote o reservando.",
    items: ["Landing pages y webs corporativas", "Diseño a medida de tu marca", "SEO local para salir en Google"],
  },
  {
    id: "chatbots",
    icon: Bot,
    title: "Chatbots con IA",
    text: "Un asistente que responde a tus clientes las 24 horas, resuelve dudas frecuentes y les lleva directamente a pedir cita.",
    items: ["En tu web, WhatsApp o Instagram", "Entrenado con la información de tu negocio", "Deriva a reserva o a una persona"],
  },
  {
    id: "automatizaciones",
    icon: Workflow,
    title: "Automatizaciones con n8n",
    text: "Conectamos tus herramientas para que las tareas repetitivas se hagan solas y no se te escape ningún cliente.",
    items: ["Formularios que llegan a tu email o CRM", "Recordatorios y seguimientos automáticos", "Avisos e informes sin tocar nada"],
  },
  {
    id: "logos",
    icon: PenTool,
    title: "Logos e identidad de marca",
    text: "Diseñamos un logo y una imagen coherente para que tu negocio se reconozca a primera vista, en la web y en redes.",
    items: ["Logotipo y variantes", "Paleta de colores y tipografías", "Plantillas para redes sociales"],
  },
  {
    id: "redes",
    icon: Megaphone,
    title: "Marketing en redes sociales",
    text: "Creamos y gestionamos tu contenido en Instagram, Facebook y TikTok, y lanzamos campañas para atraer clientes nuevos.",
    items: ["Calendario y diseño de publicaciones", "Reels y contenido en vídeo", "Campañas de Meta Ads"],
  },
];

const PROCESS = [
  ["Llamada de 30 minutos", "Nos cuentas tu negocio, qué necesitas y qué quieres conseguir. Gratis y sin compromiso."],
  ["Propuesta clara", "Te enviamos por escrito qué vamos a crear, en qué plazo y por cuánto. Sin letra pequeña."],
  ["Creación", "Diseñamos y montamos tu web, chatbot, automatización, logo o contenido, y te lo enseñamos antes de publicarlo."],
  ["Lanzamiento y seguimiento", "Lo ponemos en marcha y lo mantenemos al día para que siga funcionando y dando resultados."],
];

const WORK_VALUES = [
  ["Un solo equipo para todo", "Web, chatbot, automatizaciones, logo y redes en el mismo sitio. Sin ir de proveedor en proveedor."],
  ["Sin tecnicismos", "Te lo explicamos todo con palabras normales. Tú decides, nosotros nos encargamos de la parte técnica."],
  ["Plazos claros", "Desde el principio sabes cuándo vas a tener cada cosa."],
  ["Lo ves antes de publicarlo", "Revisas cada entrega y la ajustamos contigo hasta que te convenza."],
  ["Hecho para tu negocio", "Nada de plantillas genéricas: lo adaptamos a cómo trabajas y a tus clientes."],
  ["Sin permanencia", "El mantenimiento mensual lo puedes dejar cuando quieras."],
];

const FAQS: [string, string][] = [
  [
    "Ya tengo Instagram, ¿de verdad necesito una página web?",
    "Instagram es genial para que te descubran, pero la web es tu escaparate propio: aparece en Google, transmite confianza y es donde el cliente reserva o te escribe. Además, Instagram no es tuyo; tu web sí.",
  ],
  [
    "¿Cuánto tarda en estar lista mi web?",
    "Una landing sencilla suele estar en pocos días y una web completa en unas semanas. Antes de empezar te damos un plazo concreto por escrito.",
  ],
  [
    "¿Qué es n8n y qué puedo automatizar en mi negocio?",
    "n8n es una herramienta que conecta tus aplicaciones para que trabajen solas. Por ejemplo: que cada formulario llegue a tu email y a una hoja de cálculo, que tus clientes reciban un recordatorio antes de su cita o que te llegue un aviso cuando entra un cliente nuevo.",
  ],
  [
    "¿El chatbot puede responder por WhatsApp o Instagram?",
    "Sí. Podemos ponerlo en tu web y conectarlo con WhatsApp o Instagram, para que tus clientes tengan respuesta al momento estés donde estés.",
  ],
  [
    "¿Y si el chatbot responde algo que no es correcto?",
    "Lo entrenamos solo con la información de tu negocio y le marcamos límites: si no sabe algo, no se lo inventa, sino que deriva al cliente a hablar contigo o a reservar cita. Lo probamos contigo antes de publicarlo.",
  ],
  [
    "¿Puedo contratar solo un servicio, por ejemplo un logo?",
    "Sí. Los planes juntan varios servicios, pero también hacemos trabajos sueltos. Cuéntanoslo en una llamada y te preparamos un presupuesto.",
  ],
  [
    "¿La web y todo lo que creéis será mío?",
    "Sí, lo que creamos para tu negocio es tuyo. Si quieres cambios, nos los pides, o te enseñamos a hacer los más sencillos tú mismo.",
  ],
  [
    "¿Mi negocio saldrá en Google?",
    "Optimizamos tu web y tu ficha de Google Business para que aparezcas cuando te buscan en tu zona. Nadie puede garantizar honestamente el primer puesto, pero sí dejarlo todo bien hecho para que Google te muestre.",
  ],
  [
    "¿Qué tengo que daros yo para empezar?",
    "Solo contarnos tu negocio. Si tienes fotos, logo o textos, los usamos; si no, te ayudamos a prepararlos. Te pedimos lo justo para no quitarte tiempo.",
  ],
  [
    "¿Hay permanencia? ¿Qué incluye el mantenimiento?",
    "No hay permanencia. El mantenimiento mensual mantiene tu web, chatbot y automatizaciones funcionando, incluye pequeños cambios y revisamos los resultados contigo. En los planes con redes, incluye también la gestión del contenido.",
  ],
  [
    "¿Trabajáis solo con negocios de Almería?",
    "Estamos en Almería, pero trabajamos en remoto con negocios de toda España por videollamada, email y WhatsApp.",
  ],
];

const PLANS = [
  {
    tier: "Low ticket",
    name: "Presencia esencial",
    price: "299€",
    sub: "más 49€/mes de mantenimiento",
    featured: false,
    items: [
      "Diseño de logotipo",
      "Landing page de una página adaptada al móvil",
      "Ficha de Google Business optimizada",
      "Perfil de Instagram y Facebook optimizado",
      "Botón de reserva de citas o WhatsApp",
    ],
  },
  {
    tier: "Medium ticket",
    name: "Negocio digital",
    price: "699€",
    sub: "más 149€/mes de mantenimiento",
    featured: true,
    items: [
      "Logotipo y paleta de colores de marca",
      "Web de hasta 5 páginas con SEO básico",
      "Chatbot con IA para tu web",
      "1 automatización con n8n (formularios, avisos o recordatorios)",
      "Gestión de 1 red social con 8 publicaciones al mes",
      "Informe mensual de resultados",
    ],
  },
  {
    tier: "High ticket",
    name: "Crecimiento completo",
    price: "1.499€",
    sub: "más 299€/mes de mantenimiento",
    featured: false,
    items: [
      "Identidad de marca completa (logo, colores, tipografías y plantillas)",
      "Web a medida con SEO local",
      "Chatbot con IA conectado a reservas o WhatsApp",
      "Hasta 3 automatizaciones a medida con n8n",
      "Gestión de redes sociales con reels incluidos",
      "Campañas de Meta Ads (inversión en anuncios aparte)",
      "Reunión mensual de análisis y mejora",
    ],
  },
];

const DIAG_QUESTIONS = [
  { id: "web", label: "No tengo página web (o está anticuada)", service: "Página web" },
  { id: "chat", label: "Pierdo clientes por no contestar mensajes a tiempo", service: "Chatbot con IA" },
  { id: "auto", label: "Hago a mano tareas repetitivas (citas, presupuestos, avisos)", service: "Automatizaciones con n8n" },
  { id: "logo", label: "Mi logo no representa bien mi negocio", service: "Logo e identidad de marca" },
  { id: "redes", label: "No publico en redes con regularidad", service: "Marketing en redes sociales" },
  { id: "google", label: "Mis clientes no me encuentran en Google", service: "SEO local y Google Business" },
];

function CalendlyButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* RESEÑAS                                                             */
/* ------------------------------------------------------------------ */

const REVIEWS_KEY = "vesta-reviews-v1";

type Review = {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  date: string;
};

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "default-2",
    name: "javier sanchez",
    role: "inmobiliaria",
    stars: 5,
    quote:
      "necesitaba para mi inmobiliaria , una pagina web contacte con ellos y me resolvieron el problema con justo lo que queria , gracias de verda . os lo recomiendo muchisimo ¡¡¡¡. otro dato que daria seria que son rapidos en resolverte el problema no suelen tardar muchos casi siempre te dicen lo que pueden tardar mas o menos con cada trabajo. un saludo¡¡",
    date: "",
  },
];

function initialsOf(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "VS"
  );
}

function ReviewsSection() {
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", stars: 5, quote: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(REVIEWS_KEY);
      if (raw) setLocalReviews(JSON.parse(raw) as Review[]);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: Review[]) => {
    setLocalReviews(next);
    try {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) return;
    const review: Review = {
      id: `${Date.now()}`,
      name: form.name.trim(),
      role: form.role.trim(),
      stars: form.stars,
      quote: form.quote.trim(),
      date: new Date().toLocaleDateString("es-ES"),
    };
    persist([review, ...localReviews]);
    setForm({ name: "", role: "", stars: 5, quote: "" });
    setOpen(false);
  };

  const allReviews = [...DEFAULT_REVIEWS, ...localReviews];

  return (
    <section className="bg-navy" id="resenas">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Reseñas</span>
          <h2>Lo que dicen nuestros clientes</h2>
        </div>

        <div className="review-actions">
          <button type="button" className="btn btn-ghost on-dark" onClick={() => setOpen((v) => !v)}>
            {open ? "Cerrar formulario" : "Escribir una reseña"}
          </button>
        </div>

        {open ? (
          <form className="review-form" onSubmit={submit}>
            <label>
              Nombre
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nombre y apellido"
                required
              />
            </label>
            <label>
              Negocio o ciudad
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Tu negocio, ciudad"
              />
            </label>
            <label>
              Valoración
              <select
                value={form.stars}
                onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Reseña
              <textarea
                rows={4}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="Cuéntanos tu experiencia"
                required
              />
            </label>
            <div className="review-form-actions">
              <button type="submit" className="mini-btn">
                Publicar reseña
              </button>
            </div>
          </form>
        ) : null}

        <div className="reviews-grid">
          {allReviews.map((r) => (
            <div className="review-card" key={r.id}>
              <div className="review-stars">{"★".repeat(r.stars)}</div>
              <p className="quote">{r.quote}</p>
              <div className="review-who">
                <div className="review-avatar">{initialsOf(r.name)}</div>
                <div>
                  <div className="name">{r.name}</div>
                  <div className="role">{r.role || r.date}</div>
                </div>
              </div>
              {!r.id.startsWith("default-") && (
                <button
                  type="button"
                  className="review-delete"
                  onClick={() => persist(localReviews.filter((x) => x.id !== r.id))}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* HERO: composición animada                                           */
/* ------------------------------------------------------------------ */

function HeroVisual() {
  return (
    <div className="hv" aria-hidden="true">
      <div className="hv-browser float-a">
        <div className="hv-bar">
          <i />
          <i />
          <i />
          <span>tunegocio.com</span>
        </div>
        <div className="hv-page">
          <div className="hv-logo">
            <img src={LOGO_URL} alt="" />
            <b />
          </div>
          <div className="hv-line w80" />
          <div className="hv-line w60" />
          <div className="hv-btn">Reservar cita</div>
          <div className="hv-cards">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="hv-chat float-b">
        <div className="hv-chat-head">
          <Bot size={16} /> Asistente IA · en línea
        </div>
        <p className="in">¿Tenéis cita para el sábado?</p>
        <p className="out">¡Sí! Quedan huecos a las 11:00 y a las 12:30. ¿Te reservo una?</p>
      </div>

      <div className="hv-flow float-c">
        <span className="node">Formulario</span>
        <span className="wire">
          <i />
        </span>
        <span className="node gold">n8n</span>
        <span className="wire">
          <i />
        </span>
        <span className="node">Email + CRM</span>
      </div>

      <div className="hv-social float-b">
        <div className="hv-social-head">
          <Instagram size={14} /> tunegocio
        </div>
        <div className="hv-grid">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DEMOS EN BUCLE (tipo gif)                                           */
/* ------------------------------------------------------------------ */

function DemoWeb() {
  return (
    <div className="demo-screen dw">
      <div className="hv-bar">
        <i />
        <i />
        <i />
        <span>cafelumbre.es</span>
      </div>
      <div className="dw-page">
        <div className="dw-nav">
          <b className="dw-brand">Café Lumbre</b>
          <span />
          <span />
          <span />
        </div>
        <div className="dw-hero">
          <div className="dw-copy">
            <p className="dw-title">
              <span>Desayunos de verdad.</span>
            </p>
            <div className="dw-sub" />
            <div className="dw-sub short" />
            <div className="dw-cta">Reservar mesa</div>
          </div>
          <div className="dw-img" />
        </div>
        <div className="dw-row">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="dw-cursor" />
      <div className="dw-badge">
        <Check size={13} /> Publicada
      </div>
    </div>
  );
}

function DemoFlow() {
  return (
    <div className="demo-screen df">
      <div className="df-grid">
        <div className="df-node n1">
          <Globe size={16} />
          <span>Formulario web</span>
        </div>
        <div className="df-node n2 gold">
          <Sparkles size={16} />
          <span>IA clasifica</span>
        </div>
        <div className="df-node n3">
          <Sheet size={16} />
          <span>Google Sheets</span>
        </div>
        <div className="df-node n4">
          <Mail size={16} />
          <span>Email al cliente</span>
        </div>
        <div className="df-node n5">
          <CalendarCheck size={16} />
          <span>Cita en agenda</span>
        </div>
        <svg className="df-wires" viewBox="0 0 300 200" preserveAspectRatio="none">
          <path id="w1" d="M70 100 L130 100" />
          <path id="w2" d="M170 100 C200 100 200 40 230 40" />
          <path id="w3" d="M170 100 L230 100" />
          <path id="w4" d="M170 100 C200 100 200 160 230 160" />
        </svg>
        <span className="df-dot d1" />
        <span className="df-dot d2" />
        <span className="df-dot d3" />
        <span className="df-dot d4" />
      </div>
      <div className="df-log">
        <span>
          <Zap size={12} /> Ejecución automática
        </span>
        <b className="df-ok">✓ Completado</b>
      </div>
    </div>
  );
}

function DemoChat() {
  return (
    <div className="demo-screen dc">
      <div className="dc-head">
        <span className="dc-avatar">
          <Bot size={15} />
        </span>
        <div>
          <strong>Peluquería Aura</strong>
          <small>Asistente IA · responde al momento</small>
        </div>
      </div>
      <div className="dc-body">
        <p className="dc-msg in m1">Hola, ¿tenéis hueco mañana para mechas?</p>
        <p className="dc-typing t1">
          <i />
          <i />
          <i />
        </p>
        <p className="dc-msg out m2">¡Hola! Sí 😊 Mañana tenemos libre a las 10:30 y a las 17:00. ¿Cuál prefieres?</p>
        <p className="dc-msg in m3">A las 17:00</p>
        <p className="dc-typing t2">
          <i />
          <i />
          <i />
        </p>
        <p className="dc-msg out m4">¡Hecho! Te he reservado mañana a las 17:00. Te enviaré un recordatorio ✨</p>
      </div>
    </div>
  );
}

function DemoBrand() {
  return (
    <div className="demo-screen db">
      <svg className="db-logo" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="48" />
        <path d="M38 40 L60 86 L82 40" />
        <path className="leaf" d="M30 74 C20 60 22 46 32 36" />
        <path className="leaf" d="M90 74 C100 60 98 46 88 36" />
      </svg>
      <p className="db-name">Marca Nova</p>
      <div className="db-swatches">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="db-type">
        <b>Aa</b>
        <span>Playfair · Jost</span>
      </div>
    </div>
  );
}

const DEMOS = [
  { id: "web", label: "Web", title: "Una web creándose para una cafetería", Comp: DemoWeb },
  { id: "flow", label: "Automatización", title: "Un flujo de n8n trabajando solo", Comp: DemoFlow },
  { id: "chat", label: "Chatbot", title: "Un chatbot reservando una cita", Comp: DemoChat },
  { id: "brand", label: "Marca", title: "Un logo y su identidad naciendo", Comp: DemoBrand },
];

function DemosSection() {
  return (
    <section className="demos" id="demos">
      <div className="demos-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow on-dark">Míralo en acción</span>
          <h2>Así se ve lo que creamos para tu negocio</h2>
          <p>
            Ejemplos ilustrativos de negocios inventados, para que veas en segundos cómo funciona
            cada servicio.
          </p>
        </div>
        <div className="demos-grid">
          {DEMOS.map(({ id, label, title, Comp }) => (
            <figure className="demo" key={id}>
              <Comp />
              <figcaption>
                <span className="demo-tag">{label}</span>
                {title}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="demos-cta">
          <CalendlyButton className="btn btn-light">
            Quiero algo así para mi negocio <ArrowRight size={16} />
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* DIAGNÓSTICO GRATUITO (captación)                                    */
/* ------------------------------------------------------------------ */

function DiagnosticoSection() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const selected = DIAG_QUESTIONS.filter((q) => checked[q.id]);
  const n = selected.length;
  const plan = n === 0 ? null : n <= 2 ? PLANS[0] : n <= 4 ? PLANS[1] : PLANS[2];

  return (
    <section id="diagnostico" className="diag-section">
      <div className="wrap diag">
        <div className="diag-copy">
          <span className="eyebrow">Diagnóstico gratis · 30 segundos</span>
          <h2>¿Qué le falta a tu negocio para conseguir más clientes?</h2>
          <p>
            Marca lo que te pasa y te decimos por dónde empezar. Después, en una llamada gratuita,
            te lo explicamos con ejemplos para tu sector.
          </p>
          <div className="diag-options">
            {DIAG_QUESTIONS.map((q) => (
              <label key={q.id} className={`diag-opt${checked[q.id] ? " on" : ""}`}>
                <input
                  type="checkbox"
                  checked={Boolean(checked[q.id])}
                  onChange={(e) => setChecked({ ...checked, [q.id]: e.target.checked })}
                />
                <span className="diag-box">
                  <Check size={14} />
                </span>
                {q.label}
              </label>
            ))}
          </div>
        </div>
        <div className="diag-result" aria-live="polite">
          {plan ? (
            <>
              <span className="diag-kicker">Tu recomendación</span>
              <h3>
                Plan <em>{plan.name}</em>
              </h3>
              <p className="diag-tier">{plan.tier}</p>
              <p>Prioridades para tu negocio:</p>
              <ul>
                {selected.map((q) => (
                  <li key={q.id}>{q.service}</li>
                ))}
              </ul>
              <CalendlyButton className="btn btn-primary">
                Reservar mi llamada gratuita <ArrowRight size={16} />
              </CalendlyButton>
            </>
          ) : (
            <>
              <span className="diag-kicker">Tu recomendación</span>
              <h3>Marca al menos una opción</h3>
              <p>Te diremos qué servicios te harían ganar más clientes y qué plan encaja contigo.</p>
              <div className="diag-meter">
                <span />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PÁGINA                                                              */
/* ------------------------------------------------------------------ */

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const host = window.location.hostname;
    if (host === "vesta-web-enhancer.lovable.app") {
      // Vista previa de Lovable: marcar como no indexable y redirigir al dominio real
      const meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      meta.setAttribute("content", "noindex, nofollow");
      document.head.appendChild(meta);
      window.location.replace("https://vestamarketinginmobiliario.com/");
    }
  }, []);

  return (
    <>
      <header>
        <div className="nav">
          <a href="#top" className="nav-brand">
            <img src={LOGO_URL} alt="Logotipo de Vesta" />
            <span>Vesta</span>
          </a>
          <nav className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#demos">Demos</a>
            <a href="#trabajar">Cómo trabajamos</a>
            <a href="#precios">Precios</a>
            <a href="#faq">Preguntas</a>
          </nav>
          <div className="nav-cta">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social"
              aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            >
              <Instagram size={20} />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>
            <CalendlyButton className="btn btn-primary">Agenda tu llamada</CalendlyButton>
          </div>
        </div>
      </header>

      <div id="top" />

      <section className="hero">
        <div className="hero-blobs" aria-hidden="true">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-pill">
              <Sparkles size={14} /> Agencia de marketing digital · IA y automatización
            </span>
            <h1>
              Tu negocio, <em>visible</em>, <em>automatizado</em> y vendiendo las 24 horas.
            </h1>
            <p className="lead">
              Creamos páginas web, chatbots con inteligencia artificial, automatizaciones con n8n,
              logos y marketing en redes sociales. Todo en un mismo equipo, para que tú te dediques a
              tu negocio.
            </p>
            <div className="hero-ctas">
              <CalendlyButton className="btn btn-primary">
                Reservar llamada gratuita <ArrowRight size={16} />
              </CalendlyButton>
              <a href="#diagnostico" className="btn btn-ghost">
                Diagnóstico gratis
              </a>
            </div>
            <ul className="hero-checks">
              <li>
                <Check size={15} /> Sin permanencia
              </li>
              <li>
                <Check size={15} /> Propuesta clara antes de empezar
              </li>
              <li>
                <Check size={15} /> Desde Almería para toda España
              </li>
            </ul>
          </div>
          <div className="hero-photo">
            <HeroVisual />
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="strip-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: "inline-flex", gap: 56 }}>
              <span>Páginas web</span>
              <span>✦</span>
              <span>Chatbots con IA</span>
              <span>✦</span>
              <span>Automatizaciones n8n</span>
              <span>✦</span>
              <span>Logos e identidad</span>
              <span>✦</span>
              <span>Redes sociales</span>
              <span>✦</span>
              <span>Meta Ads</span>
              <span>✦</span>
              <span>SEO local</span>
              <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      <section id="servicios">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Qué creamos</span>
            <h2>
              Cinco servicios para que tu negocio se vea, responda y <em>venda solo</em>.
            </h2>
            <p>
              Puedes contratar uno suelto o combinarlos en un plan. Todos están pensados para
              negocios que quieren más clientes sin perder horas delante del ordenador.
            </p>
          </div>
          <div className="services">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <article className="service" key={s.id} id={s.id}>
                  <span className="service-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <ul>
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
            <article className="service service-cta">
              <h3>¿No sabes por dónde empezar?</h3>
              <p>En una llamada de 30 minutos vemos qué te conviene ahora y qué puede esperar.</p>
              <CalendlyButton className="btn btn-light">
                Hablemos <ArrowRight size={16} />
              </CalendlyButton>
            </article>
          </div>
        </div>
      </section>

      <DemosSection />

      <section id="trabajar" className="bg-sage">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">¿Cómo es trabajar con nosotros?</span>
            <h2>
              Fácil, cercano y <em>sin tecnicismos</em>.
            </h2>
            <p>Así es el camino desde la primera llamada hasta tener todo funcionando.</p>
          </div>
          <ol className="timeline">
            {PROCESS.map(([t, d], i) => (
              <li key={t}>
                <span className="tl-num">0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <div className="values">
            {WORK_VALUES.map(([t, d]) => (
              <div className="value" key={t}>
                <span className="value-check">
                  <Check size={16} />
                </span>
                <div>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DiagnosticoSection />

      <section id="precios" className="bg-sage">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Planes</span>
            <h2>Tres planes, según el momento de tu negocio</h2>
            <p>
              Cada plan incluye un mantenimiento mensual para que tu web, tu chatbot y tus
              automatizaciones sigan funcionando después del lanzamiento.
            </p>
          </div>
          <div className="tickets">
            {PLANS.map((p) => (
              <div className={`ticket${p.featured ? " featured" : ""}`} key={p.tier}>
                {p.featured && <span className="badge">Más elegido</span>}
                <span className="tier">{p.tier}</span>
                <h3>{p.name}</h3>
                <p className="price">{p.price}</p>
                <p className="price-sub">{p.sub}</p>
                <ul>
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <CalendlyButton className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}>
                  Empezar con este plan
                </CalendlyButton>
              </div>
            ))}
          </div>
          <p className="plans-note">
            ¿Necesitas solo una cosa (un logo, un chatbot, una automatización)? También hacemos
            trabajos sueltos: pide tu presupuesto en una llamada.
          </p>
        </div>
      </section>

      <section id="faq">
        <div className="wrap faq-grid">
          <div className="faq-side">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2>Lo que nos preguntan antes de empezar</h2>
            <p>
              ¿Tienes otra duda? Pregúntale a nuestro asistente (abajo a la derecha) o resérvanos
              una llamada.
            </p>
            <CalendlyButton className="btn btn-primary">
              Agendar llamada <ArrowRight size={16} />
            </CalendlyButton>
          </div>
          <div className="accordion">
            {FAQS.map(([q, a], i) => (
              <div className={`accordion-item${openFaq === i ? " open" : ""}`} key={q}>
                <button className="accordion-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q}
                  <span className="plus">+</span>
                </button>
                <div className="accordion-a" style={{ maxHeight: openFaq === i ? 400 : 0 }}>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section id="agenda" style={{ paddingBottom: 110 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Reserva tu cita</span>
            <h2>Agenda una llamada gratuita de 30 minutos</h2>
          </div>
          <div className="booking-wrap">
            <div className="booking-copy">
              <h2>Hablemos de tu negocio</h2>
              <p>
                Elige el horario que te venga bien y cuéntanos qué necesitas: una web, un chatbot,
                una automatización, un logo o ayuda con tus redes.
              </p>
              <ul className="steps">
                <li>
                  <span>1.</span> Escoges día y hora en el calendario
                </li>
                <li>
                  <span>2.</span> Confirmas con tu nombre y correo
                </li>
                <li>
                  <span>3.</span> Te llamamos con ideas concretas para tu negocio
                </li>
              </ul>
              <CalendlyButton className="btn btn-primary">Indicar fecha y hora</CalendlyButton>
            </div>
            <iframe
              className="calendly-embed"
              src={CALENDLY_EMBED}
              title="Calendario de citas de Vesta"
              width="100%"
              height="700"
              frameBorder="0"
            />
          </div>
          <div className="calendly-link-box">
            <div>
              <span className="lbl">Enlace directo de reservas</span>
              <a className="url" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                {CALENDLY_URL}
              </a>
            </div>
            <CalendlyButton className="btn btn-primary">Abrir mi calendario</CalendlyButton>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <img src={LOGO_URL} alt="Logotipo de Vesta" />
                <span>Vesta</span>
              </div>
              <p>
                Agencia de marketing digital: páginas web, chatbots con IA, automatizaciones con
                n8n, logos y redes sociales.
              </p>
            </div>
            <div className="footer-col">
              <h4>Servicios</h4>
              <a href="#webs">Páginas web</a>
              <a href="#chatbots">Chatbots con IA</a>
              <a href="#automatizaciones">Automatizaciones n8n</a>
              <a href="#logos">Logos e identidad</a>
              <a href="#redes">Redes sociales</a>
            </div>
            <div className="footer-col">
              <h4>Agencia</h4>
              <a href="#demos">Demos</a>
              <a href="#trabajar">Cómo trabajamos</a>
              <a href="#diagnostico">Diagnóstico gratis</a>
              <a href="#precios">Precios</a>
              <a href="#faq">Preguntas frecuentes</a>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Agendar llamada
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-ig">
                <Instagram size={18} />
                <span>{INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© Vesta Marketing</span>
            <span>{INSTAGRAM_HANDLE}</span>
            <span>Todos los derechos reservados</span>
          </div>
        </div>
      </footer>
      <AiAssistant />
    </>
  );
}
