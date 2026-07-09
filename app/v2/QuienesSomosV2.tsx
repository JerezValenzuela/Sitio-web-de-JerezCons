"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import useIsMobile from "@/components/v2/useIsMobile";

/**
 * QuienesSomosV2 — solo para la ruta de previsualización /v2.
 * Igual que el original pero usando BentoStats en lugar de las StatCards planas.
 * NO toca el QuienesSomos de producción.
 */
export default function QuienesSomosV2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  // Sin animaciones de entrada en el teléfono (solo PC/laptop).
  const isMobile = useIsMobile();

  return (
    <section id="quienes-somos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView || isMobile ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: isMobile ? 0 : 0.7, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}>
              Nuestra Historia
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "#1A3A6B", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Más de 30 años al servicio de Quito
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              <p>
                Somos una empresa apasionada por la construcción. Nuestro mayor objetivo es ayudarte a hacer realidad cada uno de tus proyectos, con los mejores materiales y el mejor servicio.
              </p>
              <p>
                Nos dedicamos a la <strong>venta y distribución de materiales de construcción</strong>, comprometidos con brindar productos de la más alta calidad a constructores, arquitectos y familias de Quito.
              </p>
            </div>
            {/* "Conócenos más" oculto en móvil (el dueño lo quitó, jul 2026). */}
            <div className="mt-8 hidden lg:block">
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
            animate={isInView || isMobile ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: isMobile ? 0 : 0.7, delay: isMobile ? 0 : 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/drone.jpg" alt="Vista aérea JerezCons — San Antonio de Pichincha" className="w-full h-full object-cover" />
              <div className="absolute inset-0 opacity-10" style={{ background: "linear-gradient(135deg, #E8600A, #1A3A6B)" }} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl opacity-20 -z-10" style={{ backgroundColor: "#E8600A" }} />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl opacity-10 -z-10" style={{ backgroundColor: "#1A3A6B" }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
