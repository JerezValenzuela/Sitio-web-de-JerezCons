"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * ContactoV2 — 3.0. Fondo CLARO (regla "blanco base siempre").
 * Layout en dos columnas:
 *  - Izquierda: mensaje principal en navy + CTAs + chips de confianza.
 *  - Derecha: tarjeta blanca premium con los medios de contacto.
 *
 * Sin fondo azul: textura "blueprint" navy muy tenue + glow naranja cálido.
 * El navy y el naranja quedan SOLO como acentos. Datos reales intactos.
 * Cero dependencias nuevas.
 */

const NAVY = "#1A3A6B";
const ORANGE = "#E8600A";

const contactos = [
  {
    label: "Teléfono",
    value: "098-406-7799",
    href: "tel:+593984067799",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
  {
    label: "Correo",
    value: "jrmegacons@hotmail.com",
    href: "mailto:jrmegacons@hotmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Dirección",
    value: "Calle Pucará N1-203 y Av. Equinoccial, Quito",
    href: "https://maps.google.com/?q=Calle+Pucará+N1-203+Av+Equinoccial+Quito",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const confianza = ["+30 años de trayectoria", "Atención de lunes a domingo", "Asesoría sin compromiso"];

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactoV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contacto"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F4F6FA 60%, #EEF1F6 100%)" }}
    >
      {/* Textura blueprint navy muy tenue (guiño a construcción), con desvanecido radial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,58,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(26,58,107,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 35%, #000 25%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 35%, #000 25%, transparent 80%)",
        }}
      />
      {/* Glows cálidos naranja muy suaves */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-80 w-80 rounded-full opacity-[0.10] blur-3xl" style={{ backgroundColor: ORANGE }} />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-96 w-96 rounded-full opacity-[0.07] blur-3xl" style={{ backgroundColor: NAVY }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* IZQUIERDA — mensaje + CTAs */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left min-w-0"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest"
              style={{ backgroundColor: "rgba(232,96,10,0.10)", color: ORANGE, fontFamily: "'Inter', sans-serif" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ backgroundColor: ORANGE }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: ORANGE }} />
              </span>
              Hablemos · Atención inmediata
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-[0.95]" style={{ color: NAVY, fontFamily: "'Barlow Condensed', sans-serif" }}>
              ¿Listo para tu<br />
              <span style={{ color: ORANGE }}>próximo proyecto?</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0 mb-9" style={{ fontFamily: "'Inter', sans-serif" }}>
              Cuéntanos qué necesitas y te asesoramos al instante. Materiales, herramientas y precios — todo en un solo lugar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-9">
              <motion.a
                href="https://wa.me/593984067799"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 18px 50px rgba(232,96,10,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold shadow-xl"
                style={{ backgroundColor: ORANGE, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.25rem", boxShadow: "0 12px 30px rgba(232,96,10,0.28)" }}
              >
                <WhatsAppIcon />
                Escríbenos por WhatsApp
              </motion.a>
              <motion.a
                href="tel:+593984067799"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(26,58,107,0.06)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold border-2"
                style={{ color: NAVY, borderColor: "rgba(26,58,107,0.25)", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.25rem" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                Llámanos ahora
              </motion.a>
            </div>

            {/* Señales de confianza como chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {confianza.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium shadow-sm"
                  style={{ color: NAVY, border: "1px solid rgba(26,58,107,0.10)", fontFamily: "'Inter', sans-serif" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>
          </motion.div>

          {/* DERECHA — tarjeta blanca de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl bg-white p-7 sm:p-9 ring-1 ring-black/5"
            style={{ boxShadow: "0 30px 70px -25px rgba(26,58,107,0.35), 0 8px 24px -12px rgba(26,58,107,0.18)" }}
          >
            {/* Acento naranja superior */}
            <div className="absolute inset-x-8 top-0 h-1 rounded-b-full" style={{ background: `linear-gradient(90deg, transparent, ${ORANGE}, transparent)` }} />

            {/* Badge respuesta rápida */}
            <span
              className="absolute -top-3 right-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-md"
              style={{ backgroundColor: "#16A34A", color: "#fff", fontFamily: "'Inter', sans-serif" }}
            >
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              Respondemos en minutos
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: NAVY, fontFamily: "'Barlow Condensed', sans-serif" }}>
              Contáctanos directo
            </h3>
            <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Elige el medio que prefieras. Estamos para ayudarte.
            </p>

            <div className="space-y-1">
              {contactos.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl px-3 py-3.5 -mx-1 transition-colors hover:bg-[rgba(232,96,10,0.05)]"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0 transition-all group-hover:scale-105"
                    style={{ backgroundColor: "rgba(232,96,10,0.10)", color: ORANGE }}
                  >
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {c.label}
                    </p>
                    <p className="text-sm sm:text-base font-semibold break-words" style={{ color: NAVY, fontFamily: "'Inter', sans-serif" }}>
                      {c.value}
                    </p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto flex-shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/593984067799"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-white transition-transform active:scale-95 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: ORANGE, fontFamily: "'Inter', sans-serif" }}
            >
              <WhatsAppIcon size={20} />
              Iniciar conversación
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
