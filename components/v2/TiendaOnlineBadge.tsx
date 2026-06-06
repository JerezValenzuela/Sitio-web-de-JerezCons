"use client";

import { motion } from "framer-motion";

/**
 * TiendaOnlineBadge — aviso PEQUEÑO "Tienda online en construcción".
 *
 * Pensado para colocarse arriba (dentro del Navbar, o como una barra fina
 * justo encima/debajo de él). NO es una tienda, NO tiene carrito ni pagos
 * (respeta la regla "Sin tienda online, sin carrito, sin pagos").
 * Solo anuncia + empuja a cotizar por WhatsApp.
 *
 * Uso recomendado (barra fina full-width):
 *   <TiendaOnlineBadge />            // barra completa
 *   <TiendaOnlineBadge inline />     // versión chip, para meter al lado de un texto
 */
export default function TiendaOnlineBadge({ inline = false }: { inline?: boolean }) {
  if (inline) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
        style={{
          backgroundColor: "rgba(232, 96, 10, 0.12)",
          color: "#E8600A",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Dot />
        Tienda online en construcción
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      style={{ backgroundColor: "#1A3A6B" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
          <span className="inline-flex items-center gap-2">
            <Dot />
            <span
              className="text-xs sm:text-sm font-semibold text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Tienda online{" "}
              <span style={{ color: "#E8600A" }}>en construcción</span>
            </span>
          </span>
          <span className="hidden sm:inline text-white/30">·</span>
          <a
            href="https://wa.me/593984067799"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold underline-offset-2 hover:underline"
            style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
          >
            Mientras tanto, cotiza por WhatsApp →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/** Punto naranja con "ping" sutil — señal de "en progreso". */
function Dot() {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
        style={{ backgroundColor: "#E8600A" }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: "#E8600A" }}
      />
    </span>
  );
}
