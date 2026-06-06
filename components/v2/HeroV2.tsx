"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

  // Progreso de scroll de ESTA sección (0 = arriba del todo, 1 = salió de vista)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: la imagen baja un poco mientras hacemos scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  // El overlay se oscurece al bajar
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 0.92]);
  // El contenido se desvanece y sube ligeramente (sensación de profundidad)
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const titleWords = ["Tu", "ferretería", "de"];

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background con parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
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
        style={{ backgroundColor: "#1A3A6B", opacity: overlayOpacity }}
      />
      {/* Degradado inferior para fundir con la siguiente sección */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(15,34,68,0.55))" }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-sm sm:text-base font-semibold uppercase tracking-[0.25em] mb-5"
          style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
        >
          Ferretería JerezCons — San Antonio de Pichincha, Quito
        </motion.p>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6 tracking-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <span className="block overflow-hidden">
            {titleWords.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            confianza en Quito
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Más de 30 años construyendo contigo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="https://wa.me/593984067799"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(232,96,10,0.45)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md text-base font-semibold text-white shadow-lg transition-colors"
            style={{ backgroundColor: "#E8600A", fontFamily: "'Inter', sans-serif" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </motion.a>

          <motion.button
            onClick={() => handleScroll("#sucursales")}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-8 py-4 rounded-md text-base font-semibold border-2 text-white transition-colors"
            style={{ borderColor: "#ffffff", fontFamily: "'Inter', sans-serif" }}
          >
            Ver sucursales
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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
