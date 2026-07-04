"use client";

import { useEffect, useState } from "react";

/**
 * useIsMobile — true cuando la pantalla es de teléfono/tablet (< 1024px).
 *
 * Se usa para APAGAR las animaciones en el teléfono (regla del sitio:
 * animaciones solo en PC/laptop). Arranca en `false` (desktop) para no
 * romper la hidratación de Next.js y se corrige apenas monta en el cliente.
 */
export default function useIsMobile(breakpoint = 1024): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
