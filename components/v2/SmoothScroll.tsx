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
      // Interpolación continua (lerp) en vez de tween de duración fija:
      // cada frame se acerca un % de la distancia restante al objetivo.
      // Esto es lo que da la sensación de "inercia" tipo Apple con la
      // rueda del mouse — un tween de duración fija reinicia su curva en
      // cada evento de rueda y se siente "rústico"/a saltos al scrollear
      // seguido, que es justo lo que se quiere evitar.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
    // Frenado tipo "carro" solo para clics de navegación (ir a una sección):
    // arranca con respuesta y suelta el freno cada vez más despacio.
    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.25,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }
  const el = document.querySelector(target);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
