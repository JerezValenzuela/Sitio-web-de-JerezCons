"use client";

import { motion } from "framer-motion";

/**
 * LogosMarquee — banda full-width con logos de marcas en movimiento continuo
 * de DERECHA → IZQUIERDA (loop infinito e ininterrumpido).
 *
 * La animación se hace con Framer Motion (JavaScript), NO con CSS, para que
 * SIEMPRE se mueva aunque el sistema tenga activado "reducir movimiento".
 * Los items entran por la derecha, salen por la izquierda y reaparecen,
 * sin saltos (la lista se duplica y se desplaza exactamente -50%).
 *
 * Aún no hay logos reales: se usan wordmarks de texto como placeholder.
 * Para usar imágenes reales, reemplaza el render de LogoItem por
 * <img src="/logos/xxx.png" .../>.
 */

const NAVY = "#1A3A6B";
const ORANGE = "#E8600A";

// Jerarquía visual:
//  - hero: la marca estrella (pastilla naranja). Cemento Granel — solo lo
//    vendemos nosotros en Quito, por eso resalta por encima de todo.
//  - featured: marcas que más se mueven (Armaduro y Selvalegre) — navy lleno
//    y en negrita, más notorias que el resto.
//  - special: el wordmark propio JerezCons.
type Marca = { name: string; special?: boolean; hero?: boolean; featured?: boolean };

const marcas: Marca[] = [
  { name: "Cemento Granel", hero: true },
  { name: "JerezCons", special: true },
  { name: "Cemento Armaduro", featured: true },
  { name: "Cemento Selvalegre", featured: true },
  { name: "Varilla Adelca" },
  { name: "Plastigama" },
  { name: "Intaco" },
  { name: "Rival" },
];

function Mark() {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] flex-shrink-0"
      style={{ backgroundColor: ORANGE }}
    />
  );
}

function LogoItem({ marca }: { marca: Marca }) {
  // Marca estrella: pastilla naranja con letras blancas, la que más salta.
  if (marca.hero) {
    return (
      <div className="flex items-center px-8 sm:px-10 select-none">
        <span
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 shadow-md"
          style={{ backgroundColor: ORANGE }}
        >
          <span className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white flex-shrink-0" />
          <span
            className="text-2xl sm:text-3xl font-bold whitespace-nowrap text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {marca.name}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 px-8 sm:px-10 select-none">
      <Mark />
      {marca.special ? (
        <span className="text-2xl sm:text-3xl font-bold whitespace-nowrap" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          <span style={{ color: ORANGE }}>Jerez</span>
          <span style={{ color: NAVY }}>Cons</span>
        </span>
      ) : (
        <span
          className="text-2xl sm:text-3xl whitespace-nowrap tracking-tight"
          style={{
            color: NAVY,
            fontFamily: "'Barlow Condensed', sans-serif",
            // Armaduro y Selvalegre resaltan: navy lleno y en negrita.
            fontWeight: marca.featured ? 700 : 600,
            opacity: marca.featured ? 1 : 0.75,
          }}
        >
          {marca.name}
        </span>
      )}
    </div>
  );
}

export default function LogosMarquee() {
  // Duplicamos la lista: al desplazar -50% el bucle es perfecto y sin saltos.
  const loop = [...marcas, ...marcas];

  return (
    <section
      aria-label="Marcas con las que trabajamos"
      className="relative w-full border-y bg-white py-7 sm:py-9 overflow-hidden"
      style={{ borderColor: "rgba(26,58,107,0.10)" }}
    >
      {/* Móvil: "Productos". PC: texto completo (el dueño pidió cambiarlo solo
          en el teléfono, jul 2026). */}
      <p
        className="lg:hidden text-center text-xs font-semibold uppercase tracking-[0.2em] mb-6"
        style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}
      >
        Productos
      </p>
      <p
        className="hidden lg:block text-center text-xs font-semibold uppercase tracking-[0.2em] mb-6"
        style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}
      >
        Marcas y aliados que trabajan con nosotros
      </p>

      <div className="relative w-full overflow-hidden">
        {/* Marquee animado en TODOS los tamaños (también en el teléfono) */}
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36.96, ease: "linear", repeat: Infinity }}
        >
          {loop.map((m, i) => (
            <LogoItem key={i} marca={m} />
          ))}
        </motion.div>

        {/* Fades laterales para que entren/salgan suave */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}
