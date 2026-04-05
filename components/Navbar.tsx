"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#inicio")}
            className="font-barlow text-2xl md:text-3xl font-bold tracking-tight focus:outline-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <span style={{ color: "#E8600A" }}>Jerez</span>
            <span style={{ color: "#1A3A6B" }}>Cons</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none"
                style={{ color: "#1A3A6B", fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contacto")}
              className="ml-2 px-5 py-2 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 focus:outline-none"
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
            <span className="block w-6 h-0.5 mb-1.5 transition-all" style={{ backgroundColor: "#1A3A6B" }}></span>
            <span className="block w-6 h-0.5 mb-1.5 transition-all" style={{ backgroundColor: "#1A3A6B" }}></span>
            <span className="block w-6 h-0.5 transition-all" style={{ backgroundColor: "#1A3A6B" }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t px-4 pb-4"
            style={{ borderColor: "#E8600A" }}
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
              className="mt-3 w-full py-2.5 rounded-md text-sm font-semibold text-white focus:outline-none"
              style={{ backgroundColor: "#E8600A", fontFamily: "'Inter', sans-serif" }}
            >
              Contáctanos
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
