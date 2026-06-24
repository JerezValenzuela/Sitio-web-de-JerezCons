"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * BentoStats — reemplazo premium del bloque de estadísticas (30+, 2, 5000+).
 *
 * Mejoras:
 *  - Bento Grid asimétrico (la métrica estrella ocupa más espacio).
 *  - Gradient border (naranja→navy) con efecto glow al hover.
 *  - Conteo numérico animado al entrar en viewport.
 *  - Glassmorphism sutil sobre fondo navy, manteniendo la regla de blanco
 *    como base: este bloque se monta sobre una franja navy contenida, no
 *    cambia el fondo global del sitio.
 *
 * Cero dependencias nuevas.
 */

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  span: "wide" | "normal";
  bg: string;
};

const stats: Stat[] = [
  {
    value: 2,
    label: "Sucursales en Quito",
    sub: "Matriz + Norte para atenderte mejor.",
    span: "normal",
    bg: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    value: 5000,
    suffix: "+",
    label: "Productos disponibles",
    sub: "Materiales y herramientas en stock real.",
    span: "normal",
    bg: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=900&auto=format&fit=crop",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
];

/** Número que cuenta de 0 → value cuando entra en viewport. */
function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("es-EC"));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function BentoCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-2xl p-[1.5px] ${
        stat.span === "wide" ? "sm:col-span-2" : ""
      }`}
      style={{
        // Gradient border
        background: "linear-gradient(135deg, rgba(232,96,10,0.7), rgba(255,255,255,0.08) 40%, rgba(232,96,10,0.35))",
      }}
    >
      {/* Glow al hover */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-[1.4rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(232,96,10,0.35), transparent 70%)" }}
      />

      {/* Interior con imagen de fondo + overlay de marca */}
      <div className="relative h-full overflow-hidden rounded-2xl p-7">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${stat.bg})` }}
        />
        {/* Overlay navy para legibilidad + identidad */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,58,107,0.55) 0%, rgba(15,34,68,0.88) 100%)",
          }}
        />
        {/* Tinte naranja sutil al hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "linear-gradient(180deg, rgba(232,96,10,0.12), transparent 60%)" }}
        />

        <div className="relative">
          <div
            className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl backdrop-blur-sm"
            style={{ backgroundColor: "rgba(232,96,10,0.25)", color: "#fff" }}
          >
            {stat.icon}
          </div>

          <p
            className="text-5xl sm:text-6xl font-bold leading-none mb-2 drop-shadow"
            style={{ color: "#E8600A", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p
            className="text-lg font-semibold text-white mb-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {stat.label}
          </p>
          <p className="text-sm text-white/75" style={{ fontFamily: "'Inter', sans-serif" }}>
            {stat.sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoStats() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {stats.map((s, i) => (
          <BentoCard key={s.label} stat={s} delay={0.1 * i} />
        ))}
      </div>
    </div>
  );
}
