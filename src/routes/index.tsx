import { createFileRoute } from "@tanstack/react-router";
import { AiAssistant } from "@/components/AiAssistant";
import { Instagram } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import logoAsset from "@/assets/logo-vesta.jpg.asset.json";
import home1 from "@/assets/home-1.png.asset.json";
import home2 from "@/assets/home-2.png.asset.json";
import home3 from "@/assets/home-3.png.asset.json";
import home4 from "@/assets/home-4.png.asset.json";
import home5 from "@/assets/home-5.png.asset.json";
import home6 from "@/assets/home-6.png.asset.json";
import home7 from "@/assets/home-7.png.asset.json";
import home8 from "@/assets/home-8.avif.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vesta — Marketing inmobiliario para alquileres temporales" },
      {
        name: "description",
        content:
          "Vesta conecta inmobiliarias con inquilinos de alquiler temporal: profesores, funcionarios y personal en movilidad. Auditorías, posicionamiento y garantías jurídicas.",
      },
      { property: "og:title", content: "Vesta — Marketing inmobiliario para alquileres temporales" },
      {
        property: "og:description",
        content:
          "Optimizamos anuncios de alquiler de temporada para profesores y funcionarios en movilidad. Agenda una llamada de 30 minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CALENDLY_URL = "https://calendly.com/vestamarketinginmobiliario/30min";
const CALENDLY_EMBED = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=f7f3e9&text_color=25241f&primary_color=26317a`;
const INSTAGRAM_URL =
  "https://www.instagram.com/vestamarketing_?igsi=MWpoaWwyZTFmY3hqYw%3D%3D&utm_source=qr";
const INSTAGRAM_HANDLE = "@vestamarketing_";
const STORAGE_KEY = "vesta-photos-v1";
const INFO_KEY = "vesta-info-v1";
const EXTRA_KEY = "vesta-extra-cards-v1";

type CardDef = {
  id: string;
  tag: string;
  title: string;
  text: string;
  link: string;
  photo: string;
};

type CardInfo = {
  calle?: string;
  piso?: string;
  zona?: string;
  provincia?: string;
  precio?: string;
  notas?: string;
  enlace?: string;
};

const INFO_FIELDS: { key: keyof CardInfo; label: string }[] = [
  { key: "calle", label: "Calle" },
  { key: "piso", label: "Piso / puerta" },
  { key: "zona", label: "Zona / barrio" },
  { key: "provincia", label: "Provincia" },
  { key: "precio", label: "Precio" },
  { key: "notas", label: "Notas" },
  { key: "enlace", label: "Enlace de la publicación" },
];


const CARDS: CardDef[] = [
  {
    id: "c1",
    tag: "Muy solicitado",
    title: "Estudio para docente",
    text: "Piso pequeño y funcional cerca de centros educativos, ideal para un curso académico completo.",
    link: "Ver anuncio en Idealista",
    photo: home1.url,
  },
  {
    id: "c2",
    tag: "Con estudio",
    title: "Vivienda con zona de escritorio",
    text: "Espacio diferenciado para preparar clases o estudiar, la primera objeción que resuelve un docente.",
    link: "Ver anuncio en Fotocasa",
    photo: home2.url,
  },
  {
    id: "c3",
    tag: "Fibra certificada",
    title: "Piso con internet de alta velocidad",
    text: "Fibra verificada y router incluido, imprescindible para teletrabajo y videollamadas de oposición.",
    link: "Ver anuncio en Idealista",
    photo: home3.url,
  },
  {
    id: "c4",
    tag: "Amueblado",
    title: "Amueblado y equipado para mudanza ligera",
    text: "Listo desde el primer día: menaje, textiles y electrodomésticos, sin inversión inicial del inquilino.",
    link: "Ver anuncio en Fotocasa",
    photo: home4.url,
  },
  {
    id: "c5",
    tag: "Buena conexión",
    title: "Cerca de estación o parada principal",
    text: "Para quien prioriza moverse rápido por la ciudad frente a vivir pegado al centro de trabajo.",
    link: "Ver anuncio en Idealista",
    photo: home5.url,
  },
  {
    id: "c6",
    tag: "6-9 meses",
    title: "Temporada de curso académico",
    text: "Contrato ajustado a calendario escolar, con condiciones de salida claras desde el inicio.",
    link: "Ver anuncio en Idealista",
    photo: home6.url,
  },
  {
    id: "c7",
    tag: "Barrio tranquilo",
    title: "Zona residencial orientada al recién llegado",
    text: "Ficha de barrio incluida para quien no conoce la ciudad: servicios, seguridad y ambiente.",
    link: "Ver anuncio en Fotocasa",
    photo: home7.url,
  },
  {
    id: "c8",
    tag: "Sin aval",
    title: "Flexible con justificación de ingresos",
    text: "Alternativas a la nómina tradicional para interinos y opositores recién aprobados.",
    link: "Ver anuncio en Idealista",
    photo: home8.url,
  },
];

const HERO_DEFAULT = home6.url;

const FAQS: [string, string][] = [
  [
    "¿Qué pasa si me dan el destino definitivo pero el contrato expira en un año académico?",
    "Explicamos con claridad en el anuncio y en la ficha del inmueble las condiciones de renovación y de salida anticipada, para que el inquilino sepa exactamente a qué atenerse desde el primer día.",
  ],
  [
    "¿Puedo rescindir el contrato antes de tiempo?",
    "Redactamos cláusulas de desistimiento claras y visibles, alineadas con la Ley de Arrendamientos Urbanos, que evitan la incertidumbre que hoy frena la reserva.",
  ],
  [
    "¿Cómo justifico ingresos si acabo de aprobar la oposición o soy interino?",
    "Proponemos a la inmobiliaria alternativas de solvencia (nombramiento, resolución de plaza, avales específicos) que sustituyen a la nómina tradicional y se comunican de forma proactiva en el anuncio.",
  ],
  [
    "¿Qué costes por adelantado debo asumir?",
    "Detallamos fianza, mes de adelanto y gastos de gestión en la propia ficha, para que no aparezcan como sorpresa en la última conversación antes de firmar.",
  ],
  [
    "¿Cómo elijo el barrio adecuado sin conocer la ciudad?",
    "Añadimos una mini guía de zona a cada anuncio: seguridad, servicios cercanos y tiempo real hasta el centro de trabajo.",
  ],
  [
    "¿Es mejor vivir cerca del centro de trabajo o con buenas conexiones?",
    "Comparamos ambas opciones en la descripción del inmueble con tiempos reales de trayecto, dejando que el inquilino decida con datos y no con suposiciones.",
  ],
  [
    "¿Qué tipo de internet llega a la vivienda?",
    "Verificamos y destacamos la cobertura de fibra antes de publicar, un dato que hoy falta en la mayoría de anuncios de temporada.",
  ],
  [
    "¿El piso está amueblado y equipado para teletrabajar?",
    "Incluimos un checklist visual de equipamiento (escritorio, silla, iluminación, electrodomésticos) directamente en las fotos del anuncio.",
  ],
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

const REVIEWS_KEY = "vesta-reviews-v1";
const GOOGLE_LINK_KEY = "vesta-google-review-url-v1";
const DEFAULT_GOOGLE_URL = "https://search.google.com/local/writereview?placeid=";

type Review = {
  id: string;
  name: string;
  role: string;
  stars: number;
  quote: string;
  date: string;
};

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [googleUrl, setGoogleUrl] = useState(DEFAULT_GOOGLE_URL);
  const [editingLink, setEditingLink] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", stars: 5, quote: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(REVIEWS_KEY);
      if (raw) setReviews(JSON.parse(raw) as Review[]);
      const link = localStorage.getItem(GOOGLE_LINK_KEY);
      if (link) setGoogleUrl(link);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: Review[]) => {
    setReviews(next);
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
    persist([review, ...reviews]);
    setForm({ name: "", role: "", stars: 5, quote: "" });
    setOpen(false);
  };

  const googleReady = googleUrl.trim().length > DEFAULT_GOOGLE_URL.length;

  return (
    <section className="bg-navy" id="resenas">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Reseñas</span>
          <h2>Lo que dicen las inmobiliarias que ya trabajan con nosotros</h2>
        </div>

        <div className="review-actions">
          <button type="button" className="btn btn-ghost on-dark" onClick={() => setOpen((v) => !v)}>
            {open ? "Cerrar formulario" : "Escribir una reseña"}
          </button>
          {googleReady ? (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost on-dark"
            >
              Publicar reseña en Google
            </a>
          ) : null}
          <button
            type="button"
            className="review-link-edit"
            onClick={() => setEditingLink((v) => !v)}
          >
            {editingLink ? "Ocultar enlace de Google" : "Configurar enlace de Google"}
          </button>
        </div>

        {editingLink ? (
          <div className="review-form" style={{ marginBottom: 24 }}>
            <label>
              Enlace de reseñas de Google (perfil de empresa)
              <input
                value={googleUrl}
                onChange={(e) => setGoogleUrl(e.target.value)}
                placeholder="https://g.page/r/…/review"
              />
            </label>
            <div className="review-form-actions">
              <button
                type="button"
                className="mini-btn"
                onClick={() => {
                  try {
                    localStorage.setItem(GOOGLE_LINK_KEY, googleUrl);
                  } catch {
                    /* ignore */
                  }
                  setEditingLink(false);
                }}
              >
                Guardar enlace
              </button>
            </div>
          </div>
        ) : null}

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
              Empresa o ciudad
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Inmobiliaria, ciudad"
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
              {googleReady ? (
                <a
                  className="mini-btn"
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Publicarla también en Google
                </a>
              ) : null}
            </div>
          </form>
        ) : null}

        <div className="reviews-grid">
          {reviews.length === 0 ? (
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="quote">
                Aún no hay reseñas publicadas. Sé el primero en compartir tu experiencia con Vesta.
              </p>
              <div className="review-who">
                <div className="review-avatar">VS</div>
                <div>
                  <div className="name">Vesta</div>
                  <div className="role">Marketing inmobiliario</div>
                </div>
              </div>
            </div>
          ) : (
            reviews.map((r) => (
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
                <button type="button" className="review-delete" onClick={() => persist(reviews.filter((x) => x.id !== r.id))}>
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        <p className="reviews-note">
          Las reseñas escritas aquí se guardan en este navegador. Para que aparezcan en tu ficha de
          Google, pega tu enlace de reseñas de Google y usa el botón «Publicar reseña en Google».
        </p>
      </div>
    </section>
  );
}


function Index() {
  const [overrides, setOverrides] = useState<Record<string, string | null>>({});
  const [infos, setInfos] = useState<Record<string, CardInfo>>({});
  const [extraCards, setExtraCards] = useState<CardDef[]>([]);
  const [managing, setManaging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setOverrides(JSON.parse(raw));
      const rawInfo = window.localStorage.getItem(INFO_KEY);
      if (rawInfo) setInfos(JSON.parse(rawInfo));
      const rawExtra = window.localStorage.getItem(EXTRA_KEY);
      if (rawExtra) setExtraCards(JSON.parse(rawExtra));
    } catch {
      /* ignore */
    }
  }, []);

  const save = (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      window.alert("No se pudo guardar: el navegador se ha quedado sin espacio.");
    }
  };

  const persist = useCallback((next: Record<string, string | null>) => {
    setOverrides(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      window.alert("No se pudo guardar la foto: el navegador se ha quedado sin espacio.");
    }
  }, []);

  const setField = (id: string, key: keyof CardInfo, value: string) => {
    const next = { ...infos, [id]: { ...(infos[id] ?? {}), [key]: value } };
    setInfos(next);
    save(INFO_KEY, next);
  };

  const clearInfo = (id: string) => {
    const next = { ...infos };
    delete next[id];
    setInfos(next);
    save(INFO_KEY, next);
  };

  const addCard = () => {
    const card: CardDef = {
      id: `x${Date.now()}`,
      tag: "Nueva vivienda",
      title: "Vivienda sin título",
      text: "Añade la información de esta vivienda desde el modo de edición.",
      link: "Ver anuncio",
      photo: "",
    };
    const next = [...extraCards, card];
    setExtraCards(next);
    save(EXTRA_KEY, next);
    setManaging(true);
  };

  const deleteCard = (id: string) => {
    const next = extraCards.filter((c) => c.id !== id);
    setExtraCards(next);
    save(EXTRA_KEY, next);
    clearInfo(id);
  };

  const photoFor = (id: string, fallback: string) =>
    id in overrides ? overrides[id] : fallback;

  const onPick = (id: string, file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => persist({ ...overrides, [id]: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const removePhoto = (id: string) => persist({ ...overrides, [id]: null });

  const restoreAll = () => {
    persist({});
    setInfos({});
    save(INFO_KEY, {});
    setExtraCards([]);
    save(EXTRA_KEY, []);
  };

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 322, behavior: "smooth" });
  };

  const PhotoTools = ({ id }: { id: string }) => (
    <div className="photo-tools">
      <input
        type="file"
        accept="image/*"
        hidden
        ref={(el) => {
          fileInputs.current[id] = el;
        }}
        onChange={(e) => {
          onPick(id, e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <button type="button" className="mini-btn" onClick={() => fileInputs.current[id]?.click()}>
        Adjuntar foto
      </button>
      <button type="button" className="mini-btn danger" onClick={() => removePhoto(id)}>
        Quitar
      </button>
    </div>
  );

  const renderInfoView = (id: string) => {
    const info = infos[id];
    if (!info) return null;
    const rows = INFO_FIELDS.filter((f) => (info[f.key] ?? "").trim() !== "");
    if (rows.length === 0) return null;
    return (
      <ul className="p-card-info">
        {rows.map((f) => (
          <li key={f.key}>
            <span>{f.label}</span>
            <strong>{info[f.key]}</strong>
          </li>
        ))}
      </ul>
    );
  };

  const renderInfoForm = (id: string, removable: boolean) => (
    <div className="p-card-form">
      {INFO_FIELDS.map((f) => (
        <label key={f.key}>
          {f.label}
          <input
            type="text"
            value={infos[id]?.[f.key] ?? ""}
            placeholder={f.label}
            maxLength={120}
            onChange={(e) => setField(id, f.key, e.target.value)}
          />
        </label>
      ))}
      <div className="p-card-form-actions">
        <button type="button" className="mini-btn danger" onClick={() => clearInfo(id)}>
          Quitar información
        </button>
        {removable && (
          <button type="button" className="mini-btn danger" onClick={() => deleteCard(id)}>
            Eliminar vivienda
          </button>
        )}
      </div>
    </div>
  );

  const allCards = [...CARDS, ...extraCards];

  const heroPhoto = photoFor("hero", HERO_DEFAULT);


  return (
    <>
      <header>
        <div className="nav">
          <a href="#top" className="nav-brand">
            <img src={logoAsset.url} alt="Logotipo de Vesta" />
            <span>Vesta</span>
          </a>
          <nav className="nav-links">
            <a href="#servicios">Servicios</a>
            <a href="#avatar">Inquilino ideal</a>
            <a href="#precios">Precios</a>
            <a href="#resenas">Reseñas</a>
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

      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Agencia de marketing inmobiliario</span>
            <h1>
              Llenamos tus alquileres temporales con <em>el inquilino correcto</em>, antes de que se
              anuncien en otro portal.
            </h1>
            <p className="lead">
              Trabajamos con inmobiliarias que gestionan alquileres de temporada para profesores,
              funcionarios y personal en movilidad. Optimizamos cada anuncio, resolvemos las
              objeciones de este inquilino y protegemos jurídicamente al propietario.
            </p>
            <div className="hero-ctas">
              <CalendlyButton className="btn btn-primary">
                Reservar auditoría gratuita
              </CalendlyButton>
              <a href="#servicios" className="btn btn-ghost">
                Ver servicios para inmobiliarias
              </a>
            </div>
            <p className="hero-note">
              Sin permanencia · Informe entregado en 48h · Enfocado en el nicho de movilidad
              funcionarial y docente
            </p>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-frame">
              {heroPhoto ? (
                <img src={heroPhoto} alt="Vivienda preparada para alquiler de temporada" />
              ) : (
                <div
                  className="p-card-photo-empty"
                  style={{
                    height: 560,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--sage-pale)",
                  }}
                >
                  Sin foto
                </div>
              )}
            </div>
            {managing && <PhotoTools id="hero" />}
            <div className="hero-photo-tag">
              <strong>Nicho especializado</strong>Traducimos lo que un inquilino en movilidad
              necesita saber antes de firmar.
            </div>
          </div>
        </div>
        <div className="hero-bottom-space" />
      </section>

      <div className="strip">
        <div className="strip-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: "inline-flex", gap: 56 }}>
              <span>Alquiler de temporada</span>
              <span>·</span>
              <span>Profesores en comisión de servicio</span>
              <span>·</span>
              <span>Funcionarios interinos</span>
              <span>·</span>
              <span>Personal desplazado</span>
              <span>·</span>
              <span>Ley LAU</span>
              <span>·</span>
              <span>Idealista</span>
              <span>·</span>
              <span>Fotocasa</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      <section className="carousel-section">
        <div className="wrap">
          <div className="carousel-head">
            <h2>Tipos de vivienda que posicionamos para este perfil</h2>
            <div className="carousel-arrows">
              <button className="arrow-btn" aria-label="Anterior" onClick={() => scrollBy(-1)}>
                ←
              </button>
              <button className="arrow-btn" aria-label="Siguiente" onClick={() => scrollBy(1)}>
                →
              </button>
            </div>
          </div>
          <div className="manage-bar">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setManaging((v) => !v)}
              style={{ padding: "10px 20px" }}
            >
              {managing ? "Terminar edición" : "Gestionar viviendas (fotos e información)"}
            </button>
            {managing && (
              <>
                <button type="button" className="mini-btn" onClick={addCard}>
                  Añadir vivienda
                </button>
                <button type="button" className="mini-btn" onClick={restoreAll}>
                  Restaurar todo
                </button>
              </>
            )}
            <span className="hint">
              Puedes adjuntar o quitar la foto y editar la información (calle, piso, zona,
              provincia, precio…) de cada vivienda; los cambios se guardan en este navegador.
            </span>
          </div>
        </div>
        <div className="carousel-viewport">
          <div className="carousel-track" ref={trackRef}>
            {allCards.map((card) => {
              const photo = photoFor(card.id, card.photo);
              const isExtra = card.id.startsWith("x");
              return (
                <div className="p-card" key={card.id}>
                  <div className="p-card-top">
                    <span className="tag">{card.tag}</span>
                    {photo ? (
                      <img src={photo} alt={card.title} loading="lazy" />
                    ) : (
                      <span className="p-card-photo-empty">Sin foto</span>
                    )}
                  </div>
                  {managing && <PhotoTools id={card.id} />}
                  <div className="p-card-body">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    {renderInfoView(card.id)}
                    {managing && renderInfoForm(card.id, isExtra)}
                    <div className="p-card-link">
                      {card.link} <span>↗</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sage" id="servicios">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Qué hacemos</span>
            <h2>
              Marketing inmobiliario centrado en un solo nicho: la movilidad funcionarial y docente.
            </h2>
            <p>
              No competimos por cualquier alquiler. Ayudamos a inmobiliarias a captar y convertir al
              inquilino que se muda por trabajo, no por elección, y que necesita decidir rápido y a
              distancia.
            </p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <span className="num">I.</span>
              <h3>Captación de inmobiliarias</h3>
              <p>
                Buscamos y activamos inmobiliarias que ya gestionan viviendas para alquileres
                temporales y necesitan llenar su cartera con inquilinos de perfil estable.
              </p>
            </div>
            <div className="pillar">
              <span className="num">II.</span>
              <h3>Optimización del anuncio</h3>
              <p>
                Revisamos cada publicación en Idealista y Fotocasa desde la mirada de un profesor o
                funcionario que llega sin conocer la ciudad.
              </p>
            </div>
            <div className="pillar">
              <span className="num">III.</span>
              <h3>Seguridad jurídica para el propietario</h3>
              <p>
                Formamos a la inmobiliaria y al casero en la Ley de Arrendamientos Urbanos aplicada
                al alquiler de temporada, para alquilar sin miedo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="avatar">
        <div className="wrap avatar-grid">
          <div className="avatar-card">
            <span className="eyebrow on-dark">El inquilino que sabemos convertir</span>
            <p className="role">El profesor o funcionario en movilidad</p>
            <p style={{ fontSize: 14, color: "#D7DCC7" }}>
              Ha aprobado una oposición, ha obtenido plaza o comisión de servicio en una ciudad que
              no conoce. Decide rápido, a distancia, y necesita que alguien le resuelva las dudas
              antes de preguntar.
            </p>
            <ul>
              <li>Busca certeza sobre plazos y salida del contrato</li>
              <li>Necesita justificar solvencia sin nómina consolidada</li>
              <li>Prioriza conexión a internet y espacio de trabajo</li>
              <li>Desconoce la ciudad y pide orientación de barrio</li>
            </ul>
          </div>
          <div className="avatar-objections">
            <span className="eyebrow">Objeciones frecuentes</span>
            <h2 style={{ fontSize: 30, color: "var(--navy-deep)", marginBottom: 8 }}>
              Las preguntas que hay que responder antes de que las hagan
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 14.8, marginBottom: 10 }}>
              Convertimos cada objeción en un contenido del anuncio, no en una llamada perdida.
            </p>
            <div className="accordion">
              {FAQS.map(([q, a], i) => (
                <div className={`accordion-item${openFaq === i ? " open" : ""}`} key={q}>
                  <button
                    className="accordion-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {q}
                    <span className="plus">+</span>
                  </button>
                  <div
                    className="accordion-a"
                    style={{ maxHeight: openFaq === i ? 400 : 0 }}
                  >
                    <p>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sage" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Puertas de entrada</span>
            <h2>Dos formas de empezar a trabajar con nosotros</h2>
          </div>
          <div className="hooks">
            <div className="hook-card">
              <span className="hk-eyebrow">Auditoría gratuita · Captación</span>
              <h3>El test temporal</h3>
              <span className="service-name">Auditoría y optimización express</span>
              <p>
                Analizamos gratis el anuncio actual de tu inmobiliaria en Idealista o Fotocasa —o el
                de un piso aún vacío— y te entregamos un informe de una página con lo que le falta
                para resultar irresistible a un profesor o funcionario.
              </p>
              <ul>
                <li>Falta de espacio de estudio o teletrabajo</li>
                <li>Necesidad de internet rápido y certificado</li>
                <li>Fotos que no transmiten la calidez de una estancia de 6 a 9 meses</li>
              </ul>
              <CalendlyButton className="btn btn-primary">Pedir mi test temporal</CalendlyButton>
            </div>
            <div className="hook-card">
              <span className="hk-eyebrow">Seguridad jurídica · Confianza</span>
              <h3>Pack de garantías para perfiles públicos</h3>
              <span className="service-name">Guía y plantilla</span>
              <p>
                Muchos caseros evitan el alquiler temporal porque no conocen bien la Ley de
                Arrendamientos Urbanos y temen que el inquilino se quede de forma indefinida. Les
                damos la claridad que les falta.
              </p>
              <ul>
                <li>Guía en lenguaje llano de la LAU aplicada al alquiler de temporada</li>
                <li>Plantilla de contrato con cláusulas de salida definidas</li>
                <li>Argumentario para resolver el miedo del propietario en la primera llamada</li>
              </ul>
              <CalendlyButton className="btn btn-primary">Solicitar el pack</CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      <section id="precios">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Planes para inmobiliarias</span>
            <h2>Tres formas de crecer, según lo que tu agencia necesita ahora</h2>
            <p>
              Cada plan incluye un mantenimiento mensual para que la presencia digital de tu
              inmobiliaria no se detenga después del lanzamiento.
            </p>
          </div>
<div className="tickets">
            <div className="ticket">
              <span className="tier">Low ticket</span>
              <h3>Presencia esencial</h3>
              <p className="price">
                250€
              </p>
              <p className="price-sub">más 75€/mes de mantenimiento</p>
              <ul>
                <li>Optimización de Instagram y Facebook</li>
                <li>Optimización de anuncios de inmuebles</li>
                <li>Diseño de contenido para redes</li>
                <li>Optimización de Google Business</li>
                <li>Informe mensual de resultados</li>
              </ul>
              <CalendlyButton className="btn btn-ghost">Empezar con este plan</CalendlyButton>
            </div>
            <div className="ticket featured">
              <span className="badge">Más elegido</span>
              <span className="tier">Medium ticket</span>
              <h3>Captación activa</h3>
              <p className="price">
                500€
              </p>
              <p className="price-sub">más 150€/mes de mantenimiento</p>
              <ul>
                <li>Gestión de redes sociales</li>
                <li>Creación de reels inmobiliarios</li>
                <li>Campaña de Meta Ads</li>
                <li>Optimización de propiedades</li>
                <li>Seguimiento y análisis de resultados</li>
                <li>Estrategia mensual de captación</li>
              </ul>
              <CalendlyButton className="btn btn-primary">Empezar con este plan</CalendlyButton>
            </div>
            <div className="ticket">
              <span className="tier">High ticket</span>
              <h3>Crecimiento completo</h3>
              <p className="price">
                1000€
              </p>
              <p className="price-sub">más 300€/mes de mantenimiento</p>
              <ul>
                <li>Estrategia completa de captación</li>
                <li>Contenido premium para propiedades</li>
                <li>Campañas avanzadas de publicidad</li>
                <li>SEO local para Google</li>
                <li>Chatbot inteligente para atender consultas y captar clientes 24/7</li>
                <li>Automatización del seguimiento de leads</li>
                <li>Análisis y optimización mensual</li>
              </ul>
              <CalendlyButton className="btn btn-ghost">Empezar con este plan</CalendlyButton>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />


      <section id="agenda" style={{ paddingBottom: 110 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Reserva tu cita</span>
            <h2>Agenda una llamada de 30 minutos</h2>
          </div>
          <div className="booking-wrap">
            <div className="booking-copy">
              <h2>Hablemos de tu inmobiliaria</h2>
              <p>
                Elige el horario que te venga bien y cuéntanos qué tipo de viviendas gestionas.
                Preparamos la llamada con tu test temporal ya esbozado.
              </p>
              <ul className="steps">
                <li>
                  <span>1.</span> Escoges día y hora en el calendario
                </li>
                <li>
                  <span>2.</span> Confirmas con tu nombre y correo
                </li>
                <li>
                  <span>3.</span> Te llamamos con el análisis ya preparado
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
                <img src={logoAsset.url} alt="Logotipo de Vesta" />
                <span>Vesta</span>
              </div>
              <p>
                Agencia de marketing inmobiliario especializada en alquileres temporales para
                profesores y funcionarios en movilidad.
              </p>
            </div>
            <div className="footer-col">
              <h4>Servicios</h4>
              <a href="#servicios">Captación de inmobiliarias</a>
              <a href="#servicios">El test temporal</a>
              <a href="#servicios">Pack de garantías</a>
            </div>
            <div className="footer-col">
              <h4>Agencia</h4>
              <a href="#avatar">Inquilino ideal</a>
              <a href="#precios">Precios</a>
              <a href="#resenas">Reseñas</a>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Agendar llamada
              </a>
              <a href="mailto:vestamarketinginmobiliario@gmail.com">vestamarketinginmobiliario@gmail.com</a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-ig"
              >
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
