"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useIsMobile from "@/components/v2/useIsMobile";
import { galerias, type Foto } from "@/components/v2/galeriaData";

/**
 * GaleriaV2 — galería dividida por sucursal en DOS columnas verticales.
 *
 * SOLO PC/laptop: en el teléfono esta sección se oculta y las fotos salen
 * debajo de la tarjeta de cada local (FotosLocalMovil, dentro de la sección
 * "Dónde encontrarnos").
 *
 * El lightbox sigue funcionando sobre TODAS las fotos juntas (flechas + teclado
 * ← → Esc), y en el pie muestra a qué sucursal pertenece cada foto.
 *
 * 👉 Para sumar fotos a una sucursal, agrega objetos al array `fotos` de esa
 *    sucursal en `galeriaData.ts`. Cero dependencias nuevas.
 */

const NAVY = "#1A3A6B";
const ORANGE = "#E8600A";

// Lista plana de todas las fotos (con su sucursal) para navegar el lightbox.
// Una tarjeta con varias `srcs` aporta varias entradas seguidas al lightbox.
const allPhotos = galerias.flatMap((g) =>
  g.fotos.flatMap((f) => f.srcs.map((src) => ({ src, alt: f.alt, categoria: f.categoria, sucursal: g.sucursal })))
);
// Índice global de la primera foto de cada columna, para mapear el clic.
const offsets = galerias.reduce<number[]>((acc, _g, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + galerias[i - 1].fotos.flatMap((f) => f.srcs).length);
  return acc;
}, []);

function Pin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/**
 * Tarjeta de una foto (o varias que comparten el mismo espacio/categoría,
 * rotando entre sí con cross-fade automático cada pocos segundos).
 * Se exporta para reutilizarla en FotosLocalMovil (teléfono).
 */
export function TarjetaFoto({
  photo,
  delay,
  isMobile,
  onAbrir,
}: {
  photo: Foto;
  delay: number;
  isMobile: boolean;
  onAbrir: (sub: number) => void;
}) {
  const [sub, setSub] = useState(0);
  const varias = photo.srcs.length > 1;

  useEffect(() => {
    if (!varias) return;
    const id = setInterval(() => setSub((s) => (s + 1) % photo.srcs.length), 4200);
    return () => clearInterval(id);
  }, [varias, photo.srcs.length]);

  return (
    <motion.button
      onClick={() => onAbrir(sub)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative block w-full overflow-hidden rounded-2xl group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-xl transition-shadow"
      style={{ ["--tw-ring-color" as string]: ORANGE }}
    >
      <div className="relative h-64 sm:h-72 w-full">
        {photo.srcs.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={photo.alt}
            loading="lazy"
            aria-hidden={i !== sub}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out group-hover:scale-110"
            style={{ opacity: i === sub ? 1 : 0, transitionProperty: "opacity, transform" }}
          />
        ))}
      </div>

      {/* Degradado base permanente para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2244]/65 via-transparent to-transparent" />

      {/* Etiqueta de categoría (siempre visible) */}
      <span
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-md"
        style={{ backgroundColor: ORANGE, fontFamily: "'Inter', sans-serif" }}
      >
        {photo.categoria}
      </span>

      {/* Puntos (solo si hay más de una foto compartiendo el espacio) */}
      {varias && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {photo.srcs.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === sub ? 16 : 6, backgroundColor: i === sub ? "#fff" : "rgba(255,255,255,0.5)" }}
            />
          ))}
        </div>
      )}

      {/* Título abajo */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
        <p className="text-white text-sm sm:text-base font-semibold drop-shadow translate-y-1 opacity-90 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>
          {photo.alt}
        </p>
      </div>

      {/* Icono lupa al hover (oculto cuando ya se muestran los puntos, para no chocar) */}
      {!varias && (
        <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1A3A6B] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" />
          </svg>
        </span>
      )}
    </motion.button>
  );
}

/**
 * CarruselSucursal — un ÚNICO recuadro grande por sucursal (PC) que contiene
 * TODAS sus fotos. Se pasa de una a otra con las flechas ‹ ›; al hacer clic en
 * la imagen se abre el lightbox a pantalla completa en esa foto.
 */
export function CarruselSucursal({
  fotos,
  baseIndex,
  isMobile,
  onAbrir,
}: {
  fotos: Foto[];
  baseIndex: number;
  isMobile: boolean;
  onAbrir: (globalIndex: number) => void;
}) {
  // Aplanamos todas las fotos de la sucursal en una sola lista navegable.
  const items = fotos.flatMap((f) => f.srcs.map((src) => ({ src, alt: f.alt, categoria: f.categoria })));
  const [i, setI] = useState(0);
  const go = useCallback(
    (d: number) => setI((prev) => (prev + d + items.length) % items.length),
    [items.length]
  );
  const item = items[i];

  // Cambio automático de foto cada 4 s (en todas las vistas). Depende de `i`,
  // así que cada vez que el usuario pasa una foto a mano, el contador de 4 s
  // se reinicia desde esa foto.
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setI((prev) => (prev + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length, i]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: isMobile ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow group"
    >
      {/* Imagen (clic = abrir a pantalla completa) */}
      <button
        onClick={() => onAbrir(baseIndex + i)}
        className="relative block w-full cursor-zoom-in focus:outline-none"
        aria-label={`Ampliar foto: ${item.alt}`}
      >
        {/* Móvil: formato rectangular horizontal (16:10). PC/laptop: alto fijo como antes. */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[26rem] xl:h-[30rem] w-full">
          {items.map((it, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={it.src}
              src={it.src}
              alt={it.alt}
              loading="lazy"
              aria-hidden={idx !== i}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: idx === i ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2244]/70 via-transparent to-transparent" />
        </div>

        {/* Etiqueta de categoría */}
        <span
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-md"
          style={{ backgroundColor: ORANGE, fontFamily: "'Inter', sans-serif" }}
        >
          {item.categoria}
        </span>

        {/* Título + contador */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
          <p className="text-white text-base font-semibold drop-shadow" style={{ fontFamily: "'Inter', sans-serif" }}>
            {item.alt}
          </p>
          <span className="text-white/85 text-sm font-semibold flex-shrink-0" style={{ fontFamily: "'Inter', sans-serif" }}>
            {i + 1} / {items.length}
          </span>
        </div>
      </button>

      {/* Flecha anterior */}
      <button
        onClick={() => go(-1)}
        aria-label="Foto anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1A3A6B] shadow-lg hover:bg-white transition-colors active:scale-95"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
      </button>

      {/* Flecha siguiente */}
      <button
        onClick={() => go(1)}
        aria-label="Foto siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1A3A6B] shadow-lg hover:bg-white transition-colors active:scale-95"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      {/* Puntos indicadores */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Ir a la foto ${idx + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: idx === i ? 18 : 6, backgroundColor: idx === i ? "#fff" : "rgba(255,255,255,0.55)" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function GaleriaV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Sin animaciones de entrada en el teléfono (solo PC/laptop).
  const isMobile = useIsMobile();

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % allPhotos.length)),
    []
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + allPhotos.length) % allPhotos.length)),
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
    // Oculta en el teléfono: ahí las fotos van debajo de cada local (FotosLocalMovil).
    <section id="galeria" className="hidden lg:block relative pt-8 pb-20 lg:pt-12 lg:pb-28 bg-white overflow-hidden">
      {/* Detalles decorativos sutiles de marca */}
      <div className="pointer-events-none absolute -top-20 -left-24 h-80 w-80 rounded-full blur-3xl opacity-[0.06]" style={{ backgroundColor: ORANGE }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-[0.05]" style={{ backgroundColor: NAVY }} />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dos columnas verticales: una galería por sucursal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {galerias.map((g, gi) => (
            <div key={g.sucursal} className="flex flex-col">
              {/* Header de la sucursal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: isMobile ? 0 : 0.5 }}
                className="mb-5 flex items-center gap-3"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0"
                  style={{ backgroundColor: NAVY, color: ORANGE }}
                >
                  <Pin />
                </span>
                <div>
                  <span
                    className="block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}
                  >
                    {g.badge}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-bold leading-tight"
                    style={{ color: NAVY, fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {g.sucursal}
                  </h3>
                </div>
              </motion.div>

              {/* Un solo recuadro grande con TODAS las fotos de la sucursal */}
              <CarruselSucursal
                fotos={g.fotos}
                baseIndex={offsets[gi]}
                isMobile={isMobile}
                onAbrir={(globalIndex) => setOpenIndex(globalIndex)}
              />
            </div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: isMobile ? 0 : 0.5 }}
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
              {openIndex + 1} / {allPhotos.length}
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
                key={allPhotos[openIndex].src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-5xl max-h-[82vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={allPhotos[openIndex].src}
                  alt={allPhotos[openIndex].alt}
                  className="max-h-[74vh] w-auto rounded-lg object-contain shadow-2xl"
                />
                <figcaption className="mt-4 text-center text-white/80 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="font-semibold" style={{ color: "#fff" }}>{allPhotos[openIndex].sucursal}</span>
                  {" · "}
                  {allPhotos[openIndex].alt}
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
