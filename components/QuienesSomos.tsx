"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    value: "30+",
    label: "Años de experiencia",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    value: "2",
    label: "Sucursales en Quito",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    value: "5000+",
    label: "Productos disponibles",
  },
];

function StatCard({ icon, value, label, delay }: { icon: React.ReactNode; value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-md border border-gray-100"
    >
      <div style={{ color: "#E8600A" }} className="mb-3">
        {icon}
      </div>
      <p
        className="text-4xl font-bold mb-1"
        style={{ color: "#E8600A", fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {value}
      </p>
      <p
        className="text-sm font-medium text-gray-600"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function QuienesSomos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="quienes-somos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
            >
              Nuestra Historia
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: "#1A3A6B", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Más de 30 años al servicio de Quito
            </h2>
            <div
              className="space-y-4 text-gray-600 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <p>
                Somos una empresa apasionada por la construcción. Nuestro mayor objetivo es ayudarte a hacer realidad cada uno de tus proyectos, con los mejores materiales y el mejor servicio.
              </p>
              <p>
                Nos dedicamos a la <strong>venta y distribución de materiales de construcción</strong>, comprometidos con brindar productos de la más alta calidad a constructores, arquitectos y familias de Quito.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://wa.me/593984067799"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-white font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#E8600A", fontFamily: "'Inter', sans-serif" }}
              >
                Conócenos más
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/drone.jpg"
                alt="Vista aérea JerezCons — San Antonio de Pichincha"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 opacity-10"
                style={{ background: "linear-gradient(135deg, #E8600A, #1A3A6B)" }}
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl opacity-20 -z-10"
              style={{ backgroundColor: "#E8600A" }}
            />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl opacity-10 -z-10"
              style={{ backgroundColor: "#1A3A6B" }}
            />
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} delay={0.1 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
