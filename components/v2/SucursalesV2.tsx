"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * SucursalesV2 — 4.0. AMBAS sucursales visibles a la vez (sin tabs ni clicks).
 *
 * Por qué: un maestro/cliente común no descubre que hay que presionar.
 * Por eso las DOS salen siempre, cada una con su info + galería + mapa.
 *
 * Cambio 4.0 (más fluido + galería de fotos):
 *  - GALERÍA por sucursal: cada tarjeta tiene un carrusel de varias fotos
 *    (auto-avance, puntos y flechas). Para sumar fotos basta con agregar
 *    rutas al array `fotos` de cada local.
 *  - MAPA con carga diferida (facade): antes se cargaban 2 iframes de Google
 *    Maps al abrir la página → eso "trababa" el scroll. Ahora se muestra una
 *    vista previa liviana y el mapa real se carga solo al hacer clic.
 *  - Animaciones más suaves (hover y entrada) para que se sienta premium.
 *
 * Mantiene tus datos reales. Cero dependencias nuevas.
 */

const NAVY = "#1A3A6B";
const ORANGE = "#E8600A";

/** Tramo horario en minutos desde medianoche; null = cerrado ese día. */
type Tramo = { abre: number; cierra: number } | null;

type Sucursal = {
  id: string;
  nombre: string;
  esMatriz: boolean;
  badge: string;
  zona: string;
  direccion: string;
  horarioLineas: string[];
  /** Índice 0=Dom … 6=Sáb */
  horario: Tramo[];
  telefono: string;
  whatsapp: string;
  mapsEmbed: string;
  mapsLink: string;
  /** Galería: agrega aquí todas las fotos de esta sucursal. */
  fotos: string[];
};

const h = (abre: number, cierra: number): Tramo => ({ abre, cierra });

const sucursales: Sucursal[] = [
  {
    id: "matriz",
    nombre: "Sucursal Matriz",
    esMatriz: true,
    badge: "Casa Matriz · Principal",
    zona: "San Antonio de Pichincha",
    direccion: "Calle Pucará N1-203 y Av. Equinoccial, Quito, Pichincha",
    horarioLineas: [
      "Lun – Vie: 7:00 AM – 5:00 PM",
      "Sábado: 7:00 AM – 1:00 PM",
      "Domingo: 8:00 AM – 12:00 PM",
    ],
    // Dom, Lun, Mar, Mié, Jue, Vie, Sáb
    horario: [h(480, 720), h(420, 1020), h(420, 1020), h(420, 1020), h(420, 1020), h(420, 1020), h(420, 780)],
    telefono: "098-406-7799",
    whatsapp: "593984067799",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2!2d-78.4470559!3d-0.0057584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d589cd43ca7daf%3A0x46951cfc485b2e3d!2sJerezcons!5e0!3m2!1ses!2sec!4v1700000000001",
    mapsLink: "https://maps.google.com/?q=Jerezcons+Pucara+N1-203+Quito",
    // 👉 Sucursal Matriz: agrega aquí sus fotos (en /public).
    fotos: ["/hero.jpeg", "/drone.jpg", "/galeria-cemento.jpg"],
  },
  {
    id: "norte",
    nombre: "Sucursal Reino de Quito",
    esMatriz: false,
    badge: "Sucursal · Norte",
    zona: "Reino de Quito",
    direccion: "Reino de Quito, Quito, Pichincha",
    horarioLineas: [
      "Lun – Vie: 7:00 AM – 5:00 PM",
      "Sábado: 7:00 AM – 1:00 PM",
      "Domingo: Cerrado",
    ],
    horario: [null, h(420, 1020), h(420, 1020), h(420, 1020), h(420, 1020), h(420, 1020), h(420, 780)],
    telefono: "098-357-4550",
    whatsapp: "593983574550",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3988.5!2d-78.439827!3d0.0128754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1700000000002",
    mapsLink: "https://maps.google.com/?q=0.0128754,-78.439827",
    // 👉 Sucursal Rumicucho (Reino de Quito): agrega aquí sus fotos (en /public).
    fotos: ["/galeria-interior.jpg", "/cemento.jpg"],
  },
];

/** Formatea minutos desde medianoche → "5:00 PM". */
function fmtHora(min: number): string {
  let hr = Math.floor(min / 60);
  const m = min % 60;
  const ampm = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12;
  return `${hr}:${m.toString().padStart(2, "0")} ${ampm}`;
}

type Estado = { abierto: boolean; texto: string };

/** Calcula si el local está abierto ahora mismo. */
function calcularEstado(horario: Tramo[]): Estado {
  const ahora = new Date();
  const dia = ahora.getDay();
  const min = ahora.getHours() * 60 + ahora.getMinutes();
  const hoy = horario[dia];

  if (hoy && min >= hoy.abre && min < hoy.cierra) {
    return { abierto: true, texto: `Abierto · cierra ${fmtHora(hoy.cierra)}` };
  }
  if (hoy && min < hoy.abre) {
    return { abierto: false, texto: `Abre hoy ${fmtHora(hoy.abre)}` };
  }
  // Buscar el próximo día con atención
  for (let i = 1; i <= 7; i++) {
    const t = horario[(dia + i) % 7];
    if (t) {
      const dias = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
      const etiqueta = i === 1 ? "mañana" : dias[(dia + i) % 7];
      return { abierto: false, texto: `Abre ${etiqueta} ${fmtHora(t.abre)}` };
    }
  }
  return { abierto: false, texto: "Cerrado" };
}

function Pin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function Clock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
function Phone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  );
}
function WhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

/** Pastilla de estado abierto/cerrado con punto. */
function EstadoPill({ estado }: { estado: Estado | null }) {
  if (!estado) return null;
  const verde = "#16A34A";
  const color = estado.abierto ? verde : ORANGE;
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm"
      style={{ backgroundColor: "rgba(255,255,255,0.95)", color: NAVY, fontFamily: "'Inter', sans-serif" }}
    >
      <span className="relative flex h-2 w-2">
        {estado.abierto && (
          <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ backgroundColor: color }} />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      </span>
      {estado.texto}
    </div>
  );
}

/**
 * Carrusel de fotos del banner. Liviano: imágenes apiladas con cross-fade.
 * Auto-avanza, se pausa al pasar el mouse y trae flechas + puntos.
 */
function Carrusel({ fotos, nombre }: { fotos: string[]; nombre: string }) {
  const [idx, setIdx] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = fotos.length;

  const ir = useCallback((n: number) => setIdx((n + total) % total), [total]);

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % total), 4800);
    return () => clearInterval(id);
  }, [pausado, total]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {/* Imágenes apiladas con cross-fade */}
      {fotos.map((src, i) => (
        <div
          key={src + i}
          aria-hidden={i !== idx}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? "scale(1.04)" : "scale(1)",
            transitionProperty: "opacity, transform",
          }}
        />
      ))}

      {/* Flechas (solo si hay más de una foto) */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => ir(idx - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 active:scale-95"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={() => ir(idx + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 active:scale-95"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
          >
            <Chevron dir="right" />
          </button>

          {/* Puntos */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {fotos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver foto ${i + 1} de ${nombre}`}
                onClick={() => setIdx(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === idx ? 20 : 6,
                  backgroundColor: i === idx ? ORANGE : "rgba(255,255,255,0.7)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Mapa de la sucursal: SIEMPRE visible (sin clic). Usa loading="lazy" nativo
 * para que el navegador lo cargue al acercarse a la sección y no "trabe" al
 * abrir la página de golpe.
 */
function Mapa({ s }: { s: Sucursal }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#eee" }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: "#F8F8F8" }}>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
          Ubicación
        </p>
        <a
          href={s.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
          style={{ color: NAVY, fontFamily: "'Inter', sans-serif" }}
        >
          Cómo llegar <Arrow />
        </a>
      </div>

      <iframe
        src={s.mapsEmbed}
        width="100%"
        height={260}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa ${s.nombre}`}
        className="block w-full"
      />
    </div>
  );
}

/** Fila de información con chip de icono y separador. */
function InfoRow({
  icon,
  children,
  divider = true,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3.5 py-3.5 ${divider ? "border-b" : ""}`} style={{ borderColor: "#EFEFEF" }}>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0"
        style={{ backgroundColor: "rgba(232,96,10,0.10)", color: ORANGE }}
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

/** Tarjeta de una sucursal: header + galería + info + mapa + CTA. */
function SucursalCard({ s, delay }: { s: Sucursal; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const matriz = s.esMatriz;

  // Estado abierto/cerrado: solo en cliente para evitar mismatch de hidratación.
  const [estado, setEstado] = useState<Estado | null>(null);
  useEffect(() => {
    const update = () => setEstado(calcularEstado(s.horario));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [s.horario]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white transition-shadow duration-300 will-change-transform ${
        matriz ? "ring-2 shadow-2xl" : "border border-gray-100 shadow-lg hover:shadow-2xl"
      }`}
      style={{ ["--tw-ring-color" as string]: ORANGE }}
    >
      {/* Acento naranja superior: marca la sucursal principal */}
      {matriz && (
        <div className="absolute top-0 inset-x-0 h-1.5 z-30" style={{ background: `linear-gradient(90deg, ${ORANGE}, rgba(232,96,10,0.35))` }} />
      )}

      {/* Banner con galería */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <Carrusel fotos={s.fotos} nombre={s.nombre} />

        {/* Degradado hacia blanco para fundir la foto con la tarjeta */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "linear-gradient(180deg, rgba(15,34,68,0.15) 0%, rgba(15,34,68,0.55) 60%, #ffffff 100%)" }}
        />

        {/* Estado en vivo (arriba izq) */}
        <div className="absolute top-4 left-4 z-20">
          <EstadoPill estado={estado} />
        </div>

        {/* Cinta premium (arriba der) */}
        <div
          className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm"
          style={{
            backgroundColor: matriz ? ORANGE : "rgba(255,255,255,0.92)",
            color: matriz ? "#fff" : NAVY,
          }}
        >
          {matriz ? "★ Casa Matriz" : "Sucursal"}
        </div>

        {/* Nombre sobre la foto */}
        <div className="pointer-events-none absolute bottom-4 left-6 right-6 z-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/90 drop-shadow" style={{ fontFamily: "'Inter', sans-serif" }}>
            {s.badge}
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {s.nombre}
          </h3>
        </div>
      </div>

      {/* Info */}
      <div className="px-7 sm:px-8 pt-5 pb-2">
        <p className="text-sm font-medium" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
          {s.zona}
        </p>

        <div className="mt-2">
          <InfoRow icon={<Pin />}>
            <p className="text-sm leading-relaxed text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              {s.direccion}
            </p>
          </InfoRow>

          <InfoRow icon={<Clock />}>
            <div style={{ fontFamily: "'Inter', sans-serif" }}>
              {s.horarioLineas.map((linea, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{ color: linea.includes("Cerrado") ? ORANGE : "#4B5563" }}
                >
                  {linea}
                </p>
              ))}
            </div>
          </InfoRow>

          <InfoRow icon={<Phone />} divider={false}>
            <a
              href={`tel:${s.telefono}`}
              className="text-sm font-semibold hover:underline"
              style={{ color: NAVY, fontFamily: "'Inter', sans-serif" }}
            >
              {s.telefono}
            </a>
          </InfoRow>
        </div>
      </div>

      {/* Mapa siempre visible */}
      <div className="px-4 pb-4">
        <Mapa s={s} />
      </div>

      {/* CTA */}
      <div className="px-7 sm:px-8 pb-7 sm:pb-8 mt-auto flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/${s.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-transform active:scale-95 hover:opacity-90 shadow-md"
          style={{ backgroundColor: ORANGE, fontFamily: "'Inter', sans-serif" }}
        >
          <WhatsApp />
          Escribir por WhatsApp
        </a>
        <a
          href={s.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-sm transition-colors active:scale-95"
          style={{
            border: "1.5px solid rgba(26,58,107,0.25)",
            color: NAVY,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Pin />
          Cómo llegar
        </a>
      </div>
    </motion.div>
  );
}

export default function SucursalesV2() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="sucursales" className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: "#F8F8F8" }}>
      {/* Detalles decorativos sutiles en colores de marca */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-[0.07]"
        style={{ backgroundColor: ORANGE }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full blur-3xl opacity-[0.06]"
        style={{ backgroundColor: NAVY }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: ORANGE, backgroundColor: "rgba(232,96,10,0.10)", fontFamily: "'Inter', sans-serif" }}
          >
            <Pin /> Dónde encontrarnos
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: NAVY, fontFamily: "'Barlow Condensed', sans-serif" }}>
            Nuestras Sucursales
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, ${NAVY})` }} />
          <p className="mt-5 text-gray-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Dos puntos en Quito para atenderte. Visítanos o escríbenos a la sucursal que prefieras.
          </p>
        </motion.div>

        {/* Ambas sucursales visibles, mismo ancho para una lectura clara. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <SucursalCard s={sucursales[0]} delay={0.05} />
          <SucursalCard s={sucursales[1]} delay={0.18} />
        </div>
      </div>
    </section>
  );
}
