"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { smoothScrollTo } from "@/components/v2/SmoothScroll";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Sucursales", href: "#sucursales" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    smoothScrollTo(href);
  };

  // Arriba del todo: barra transparente sobre el hero (links blancos).
  // Al hacer scroll: "burbuja" flotante con vidrio esmerilado (links navy).
  const linkColor = scrolled ? "#1A3A6B" : "#FFFFFF";
  const linkShadow = scrolled ? "none" : "0 1px 10px rgba(10,22,45,0.55)";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-500 ease-out ${
          scrolled ? "px-3 sm:px-6 pt-3" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ease-out ${
            scrolled
              ? "max-w-5xl rounded-full bg-white/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(26,58,107,0.16)] border border-white/60 px-5 sm:px-7"
              : "max-w-[1600px] bg-transparent border border-transparent px-4 sm:px-6 lg:px-8"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out ${
              scrolled ? "h-14" : "h-16 md:h-20"
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#inicio")}
              className="font-barlow text-2xl md:text-3xl font-bold tracking-tight focus:outline-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <span style={{ color: "#E8600A" }}>Jerez</span>
              <span
                style={{
                  color: "#1A3A6B",
                  textShadow: scrolled ? "none" : "0 0 14px rgba(255,255,255,0.55)",
                }}
              >
                Cons
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium transition-colors duration-300 hover:!text-orange-600 focus:outline-none"
                  style={{
                    color: linkColor,
                    textShadow: linkShadow,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#contacto")}
                className={`ml-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 active:scale-95 focus:outline-none ${
                  scrolled ? "px-5 py-2" : "px-6 py-2.5 shadow-lg"
                }`}
                style={{ backgroundColor: "#E8600A", fontFamily: "'Inter', sans-serif" }}
              >
                Contáctanos
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 rounded focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span
                className="block w-6 h-0.5 mb-1.5 transition-all duration-300"
                style={{ backgroundColor: scrolled || menuOpen ? "#1A3A6B" : "#FFFFFF" }}
              ></span>
              <span
                className="block w-6 h-0.5 mb-1.5 transition-all duration-300"
                style={{ backgroundColor: scrolled || menuOpen ? "#1A3A6B" : "#FFFFFF" }}
              ></span>
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{ backgroundColor: scrolled || menuOpen ? "#1A3A6B" : "#FFFFFF" }}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu — panel flotante bajo la barra */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mx-3 mt-2 rounded-2xl bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(26,58,107,0.18)] border border-white/60 px-4 pb-4 pt-1 overflow-hidden"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left py-3 text-base font-medium border-b last:border-b-0 focus:outline-none hover:text-orange-600 transition-colors"
                  style={{
                    color: "#1A3A6B",
                    borderColor: "#f0f0f0",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#contacto")}
                className="mt-3 w-full py-2.5 rounded-full text-sm font-semibold text-white focus:outline-none"
                style={{ backgroundColor: "#E8600A", fontFamily: "'Inter', sans-serif" }}
              >
                Contáctanos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
