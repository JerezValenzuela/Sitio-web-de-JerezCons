"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — scroll suave premium con Lenis (estilo showcase).
 *
 * - Interpola el scroll para eliminar el "trabado" del scroll nativo.
 * - Se sincroniza con el rAF de Framer Motion, así todas las animaciones
 *   ligadas al scroll (hero, sucursales) quedan igual de suaves.
 * - Expone la instancia en window.__lenis para que Navbar/Hero puedan
 *   hacer scroll suave a las secciones (lenis.scrollTo).
 * - Respeta "prefers-reduced-motion": si el usuario lo pide, no se activa.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.45,
      // Frenado tipo "carro": arranca con respuesta y luego va soltando el
      // freno cada vez más despacio (ease-out cuártico) — sin golpe final.
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });

    // Exponer para navegación suave desde otros componentes.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}

/** Helper de navegación suave a una sección (usa Lenis si está activo). */
export function smoothScrollTo(target: string) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.25 });
    return;
  }
  const el = document.querySelector(target);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
