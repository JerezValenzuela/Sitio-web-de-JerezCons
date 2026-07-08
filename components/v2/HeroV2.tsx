"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { smoothScrollTo } from "@/components/v2/SmoothScroll";
import useIsMobile from "@/components/v2/useIsMobile";

/**
 * HeroV2 — versión premium del Hero.
 *
 * Mejoras vs. el actual:
 *  - Parallax scroll-driven REAL (la foto se mueve más lento que el scroll).
 *  - El overlay navy se intensifica al hacer scroll (transición cinematográfica).
 *  - Tipografía más imponente: título escalonado con reveal por palabra.
 *  - Mantiene paleta, fuentes, WhatsApp y "scroll suave" intactos.
 *
 * Cero dependencias nuevas: solo framer-motion (ya instalado).
 */
export default function HeroV2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // En el teléfono: cero animaciones (todo estático); en PC quedan igual.
  const isMobile = useIsMobile();

  // Progreso de scroll de ESTA sección (0 = arriba del todo, 1 = salió de vista)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: la imagen baja un poco mientras hacemos scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  // El overlay se ACLARA al bajar: el texto se desvanece y la foto de la
  // ferretería queda al descubierto.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.52, 0.18]);
  const gradOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);
  // El contenido se desvanece y sube ligeramente (sensación de profundidad)
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScroll = (href: string) => smoothScrollTo(href);

  const titleWords = ["ferretería", "de"];

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background con parallax (solo PC; en móvil la foto queda fija) */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={isMobile ? { y: 0, scale: 1 } : { y: imageY, scale: imageScale }}
      >
        <Image
          src="/hero.jpeg"
          alt="Frente JerezCons"
          fill
          priority
          quality={80}
          className="object-cover object-left sm:object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Navy Overlay dinámico */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#1A3A6B", opacity: isMobile ? 0.52 : overlayOpacity }}
      />
      {/* Degradado sutil de profundidad: legibilidad sin tapar la foto */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isMobile ? 1 : gradOpacity,
          background:
            "linear-gradient(180deg, rgba(13,27,54,0.30) 0%, rgba(13,27,54,0) 28%, rgba(13,27,54,0.18) 70%, rgba(13,27,54,0.45) 100%)",
        }}
      />
      {/* Degradado inferior para fundir con la siguiente sección */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(15,34,68,0.55))" }}
      />

      {/* Content */}
      <motion.div
        style={isMobile ? { y: 0, opacity: 1 } : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0 : 0.7, ease: "easeOut" }}
          className="text-sm sm:text-base font-semibold uppercase tracking-[0.25em] mb-5"
          style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
        >
          Ferretería JerezCons — San Antonio de Pichincha, Quito
        </motion.p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6 tracking-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {/* "JerezCons," — ambas partes en blanco por legibilidad sobre la
              foto oscura del hero (el naranja/navy de marca se usa en el
              navbar y el resto del sitio). */}
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              JerezCons,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            {titleWords.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </span>
          <motion.span
            className="block"
            style={{ color: "#E8600A" }}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0 : 0.7, delay: isMobile ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            confianza en Quito
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0 : 0.7, delay: isMobile ? 0 : 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Más de 30 años construyendo contigo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0 : 0.7, delay: isMobile ? 0 : 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => handleScroll("#sucursales")}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-4 rounded-md text-base font-semibold border-2 text-white transition-colors"
            style={{ borderColor: "#ffffff", fontFamily: "'Inter', sans-serif" }}
          >
            Ver locales
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — solo PC (en móvil es pura animación, se quita) */}
      <motion.div
        className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
