"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/**
 * GaleriaV2 — masonry dinámico + lightbox premium hecho a mano.
 *
 * Mejoras:
 *  - Masonry con reveal escalonado al scroll.
 *  - Click → lightbox a pantalla completa con navegación (flechas + teclado
 *    ← → Esc), contador y transición suave entre fotos.
 *  - Overlay de marca naranja al hover (coherente con tu estilo actual).
 *
 * Cero dependencias nuevas. Mantiene tus rutas de imagen reales.
 */

const ORANGE = "#E8600A";

const photos = [
  { src: "/galeria-cemento.jpg", alt: "Cemento y materiales", categoria: "Materiales" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format&fit=crop", alt: "Materiales de construcción", categoria: "Construcción" },
  { src: "/galeria-interior.jpg", alt: "Interior de la ferretería", categoria: "Tienda" },
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&auto=format&fit=crop", alt: "Pinturas y acabados", categoria: "Acabados" },
  { src: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=900&auto=format&fit=crop", alt: "Proyectos completados", categoria: "Proyectos" },
  { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop", alt: "Ferretería y construcción", categoria: "Herramientas" },
];

// Layout bento: la primera foto es la destacada (más grande).
const bentoSpans = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "sm:col-span-1",
  "sm:col-span-1",
  "sm:col-span-2",
  "sm:col-span-2",
];

export default function GaleriaV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    []
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    []
  );

  // Teclado + bloqueo de scroll mientras el lightbox está abierto
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, next, prev]);

  return (
    <section id="galeria" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Detalles decorativos sutiles de marca */}
      <div className="pointer-events-none absolute -top-20 -left-24 h-80 w-80 rounded-full blur-3xl opacity-[0.06]" style={{ backgroundColor: ORANGE }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-[0.05]" style={{ backgroundColor: "#1A3A6B" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: ORANGE, backgroundColor: "rgba(232,96,10,0.10)", fontFamily: "'Inter', sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
            </svg>
            Nuestro Trabajo
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: "#1A3A6B", fontFamily: "'Barlow Condensed', sans-serif" }}>
            Galería
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full" style={{ background: `linear-gradient(90deg, ${ORANGE}, #1A3A6B)` }} />
          <p className="mt-5 text-gray-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Un vistazo a nuestros productos, proyectos y la pasión que ponemos en cada atención.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 auto-rows-[180px] sm:auto-rows-[210px] gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative block overflow-hidden rounded-2xl group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-xl transition-shadow ${bentoSpans[i] ?? ""}`}
              style={{ ["--tw-ring-color" as string]: ORANGE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Degradado base permanente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2244]/65 via-transparent to-transparent" />

              {/* Etiqueta de categoría (siempre visible) */}
              <span
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-md"
                style={{ backgroundColor: ORANGE, fontFamily: "'Inter', sans-serif" }}
              >
                {photo.categoria}
              </span>

              {/* Título abajo */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                <p className="text-white text-sm sm:text-base font-semibold drop-shadow translate-y-1 opacity-90 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {photo.alt}
                </p>
              </div>

              {/* Icono lupa al hover */}
              <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1A3A6B] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
                </svg>
              </span>
            </motion.button>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
            ¿Buscas algo en especial? Escríbenos y te enviamos fotos y precios al instante.
          </p>
          <a
            href="https://wa.me/593984067799"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-transform active:scale-95 hover:opacity-90 shadow-md"
            style={{ backgroundColor: ORANGE, fontFamily: "'Inter', sans-serif" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pídelo por WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: "rgba(15,34,68,0.92)" }}
            onClick={close}
          >
            {/* Cerrar */}
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            {/* Contador */}
            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
              {openIndex + 1} / {photos.length}
            </span>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Anterior"
              className="absolute left-3 sm:left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            {/* Imagen */}
            <AnimatePresence mode="wait">
              <motion.figure
                key={photos[openIndex].src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-5xl max-h-[82vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos[openIndex].src}
                  alt={photos[openIndex].alt}
                  className="max-h-[74vh] w-auto rounded-lg object-contain shadow-2xl"
                />
                <figcaption className="mt-4 text-center text-white/80 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {photos[openIndex].alt}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Siguiente"
              className="absolute right-3 sm:right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
