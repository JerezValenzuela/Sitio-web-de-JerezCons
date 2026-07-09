"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { galerias } from "@/components/v2/galeriaData";
import { CarruselSucursal } from "@/components/v2/GaleriaV2";

const NAVY = "#1A3A6B";
const ORANGE = "#E8600A";

/**
 * FotosLocalMovil — SOLO teléfono: las fotos de un local justo debajo de su
 * tarjeta en "Dónde encontrarnos" (el contenedor padre lleva lg:hidden).
 * En PC/laptop la galería sigue siendo la sección GaleriaV2.
 *
 * `indice`: posición del local en `galerias` (0 = Matriz Pucará,
 * 1 = Sucursal Rumicucho). Al tocar una foto se abre a pantalla completa
 * con flechas para pasar entre las fotos de ESE local.
 */
export default function FotosLocalMovil({ indice }: { indice: number }) {
  const g = galerias[indice];
  const fotos = g.fotos.flatMap((f) => f.srcs.map((src) => ({ src, alt: f.alt })));
  const [abierta, setAbierta] = useState<number | null>(null);

  const cerrar = useCallback(() => setAbierta(null), []);
  const siguiente = useCallback(
    () => setAbierta((i) => (i === null ? i : (i + 1) % fotos.length)),
    [fotos.length]
  );
  const anterior = useCallback(
    () => setAbierta((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length)),
    [fotos.length]
  );

  // Bloquear el scroll del fondo mientras hay una foto ampliada.
  useEffect(() => {
    if (abierta === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [abierta]);

  // Sin margen propio: el gap de la grilla de la sección ya separa
  // la tarjeta del local de sus fotos.
  return (
    <div>
      <p
        className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}
      >
        Fotos · <span style={{ color: NAVY }}>{g.sucursal}</span>
      </p>

      {/* Un solo carrusel con TODAS las fotos del local, igual que en PC. */}
      <CarruselSucursal
        fotos={g.fotos}
        baseIndex={0}
        isMobile
        onAbrir={(local) => setAbierta(local)}
      />

      {/* Visor a pantalla completa. Va en un portal al <body>: la sección
          vive dentro de un contenedor `relative z-10` (y de un motion.div
          con transform), que atraparían el position:fixed y lo dejarían
          debajo del navbar. El visor solo se abre tras un toque del usuario,
          así que document siempre existe. */}
      {abierta !== null &&
        createPortal(
          <AnimatePresence>
        {abierta !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,34,68,0.92)" }}
            onClick={cerrar}
          >
            <button
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <span
              className="absolute top-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {abierta + 1} / {fotos.length}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                anterior();
              }}
              aria-label="Anterior"
              className="absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fotos[abierta].src}
              alt={fotos[abierta].alt}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                siguiente();
              }}
              aria-label="Siguiente"
              className="absolute right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
