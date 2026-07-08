"use client";

/**
 * FooterV2 — versión premium y completa.
 *
 * Respeta la decisión: SOLO azul oscuro corporativo (#0F2244), limpio y claro.
 * NO es dark mode (no hay toggle de tema, el resto del sitio sigue blanco).
 *
 * Estructura:
 *  - Banda superior con CTA de WhatsApp.
 *  - 4 columnas: Marca + social / Links rápidos / Horarios / Contacto.
 *  - Barra inferior con copyright + botón "volver arriba".
 *  - Conserva el "easter egg" del logo (código 1304 → ERP) intacto.
 */

const NAVY = "#1A3A6B";
const NAVY_DEEP = "#0F2244";
const ORANGE = "#E8600A";

const quickLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Locales", href: "#sucursales" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

const horarios = [
  { dia: "Lunes – Viernes", hora: "7:00 AM – 5:00 PM" },
  { dia: "Sábado", hora: "7:00 AM – 1:00 PM" },
  { dia: "Domingo", hora: "8:00 AM – 12:00 PM" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/JEREZCONSFERRETERIA/?locale=es_LA",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jerezcons_ferreteria_quito/?hl=es",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/593984067799",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="relative text-white font-semibold text-sm uppercase tracking-wider mb-5 pb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
      {children}
      <span className="absolute left-0 bottom-0 h-0.5 w-8 rounded-full" style={{ backgroundColor: ORANGE }} />
    </h4>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" className="mt-0.5 flex-shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function FooterV2() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = () => {
    const code = window.prompt("Ingresa el código de acceso:");
    if (code === "1304") {
      window.open("https://jerezcons-erp-mini.vercel.app/", "_blank");
    }
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, #16315C 0%, ${NAVY_DEEP} 55%)` }}>
      {/* Acento superior naranja full-width */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, rgba(232,96,10,0.15) 45%, transparent 75%)` }} />

      {/* Patrón sutil + glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: ORANGE }} />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full opacity-[0.07] blur-3xl" style={{ backgroundColor: ORANGE }} />

      {/* CTA elevado tipo tarjeta */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div
          className="relative overflow-hidden rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
          style={{
            background: `linear-gradient(120deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
            border: "1px solid rgba(232,96,10,0.35)",
          }}
        >
          {/* glow interno */}
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl" style={{ backgroundColor: ORANGE }} />
          {/* textura blueprint interna muy tenue */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 70% 100% at 30% 50%, #000 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 30% 50%, #000 20%, transparent 75%)",
            }}
          />
          <div className="relative text-center md:text-left">
            <span className="inline-flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
              <span className="h-px w-6" style={{ backgroundColor: ORANGE }} />
              Presupuesto sin compromiso
            </span>
            <h3 className="text-white text-2xl sm:text-4xl font-bold leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              ¿Tienes un proyecto en mente? <span style={{ color: ORANGE }}>Cotiza hoy mismo.</span>
            </h3>
            <p className="text-white/70 text-sm sm:text-base mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              Materiales, herramientas y asesoría. Te respondemos al instante por WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/593984067799"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-7 py-4 rounded-xl text-white font-semibold transition-transform hover:scale-105 active:scale-95 whitespace-nowrap flex-shrink-0"
            style={{ backgroundColor: ORANGE, fontFamily: "'Inter', sans-serif", boxShadow: "0 14px 34px rgba(232,96,10,0.40)" }}
          >
            {socialLinks[2].icon}
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* Cuerpo del footer */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <button onClick={handleLogoClick} className="font-bold text-3xl mb-4 focus:outline-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              <span style={{ color: ORANGE }}>Jerez</span>
              <span className="text-white">Cons</span>
            </button>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              Tu ferretería de confianza en Quito. Más de 30 años al servicio de la comunidad ecuatoriana con calidad y compromiso.
            </p>

            {/* Mini badges de confianza */}
            <div className="flex flex-wrap gap-2 mt-5">
              {["+30 años", "2 locales", "Atención L–D"].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full text-xs font-medium text-white/80"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Inter', sans-serif" }}
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/70 transition-all duration-200 hover:text-white hover:-translate-y-0.5 hover:bg-[rgba(232,96,10,0.85)]"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <SectionTitle>Navegación</SectionTitle>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors duration-200 focus:outline-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="h-px w-2 group-hover:w-4 transition-all duration-200" style={{ backgroundColor: ORANGE }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios */}
          <div className="lg:col-span-3">
            <SectionTitle>Horarios</SectionTitle>
            <ul className="space-y-3">
              {horarios.map((h) => (
                <li key={h.dia} className="flex items-center justify-between gap-4 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="text-white/70">{h.dia}</span>
                  <span className="text-white font-medium whitespace-nowrap">{h.hora}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ backgroundColor: "#16A34A" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#16A34A" }} />
              </span>
              Atención todos los días
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <SectionTitle>Contáctanos</SectionTitle>
            <div className="space-y-3 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,96,10,0.4)]" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-start gap-3">
                <PinIcon />
                <p className="text-white/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Calle Pucará N1-203 y Av. Equinoccial, Quito
                </p>
              </div>
              <div className="flex items-start gap-3">
                <PinIcon />
                <p className="text-white/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Ruta Tanlagua y Rumihurco 2, Rumicucho
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" className="flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                <a href="tel:+593984067799" className="text-white/70 text-sm hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  098-406-7799
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" className="flex-shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:jrmegacons@hotmail.com" className="text-white/70 text-sm hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  jrmegacons@hotmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2026 JerezCons. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-white/50 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              Quito, Ecuador
            </p>
            <button
              onClick={scrollTop}
              aria-label="Volver arriba"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold transition-colors group"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Volver arriba
              <span className="flex h-7 w-7 items-center justify-center rounded-full transition-all group-hover:-translate-y-0.5" style={{ backgroundColor: "rgba(232,96,10,0.85)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
