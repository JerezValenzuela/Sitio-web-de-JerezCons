"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const sucursales = [
  {
    nombre: "Sucursal Matriz",
    badge: "Principal",
    direccion: "Calle Pucará N1-203 y Av. Equinoccial, Quito, Pichincha",
    horarioLineas: ["Lun – Vie: 7:00 AM – 5:00 PM", "Sábado: 7:00 AM – 1:00 PM", "Domingo: 8:00 AM – 12:00 PM"],
    telefono: "098-406-7799",
    whatsapp: "593984067799",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    nombre: "Sucursal Reino de Quito",
    badge: "Norte",
    direccion: "Reino de Quito, Quito, Pichincha",
    horarioLineas: ["Lun – Vie: 7:00 AM – 5:00 PM", "Sábado: 7:00 AM – 1:00 PM", "Domingo: Cerrado"],
    telefono: "098-357-4550",
    whatsapp: "593983574550",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

function SucursalCard({
  sucursal,
  delay,
  direction,
}: {
  sucursal: (typeof sucursales)[0];
  delay: number;
  direction: "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col gap-5 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block"
            style={{ backgroundColor: "#E8600A", color: "#fff", fontFamily: "'Inter', sans-serif" }}
          >
            {sucursal.badge}
          </span>
          <h3
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: "#1A3A6B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {sucursal.nombre}
          </h3>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#1A3A6B", color: "#E8600A" }}
        >
          {sucursal.icon}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span style={{ color: "#E8600A" }} className="mt-0.5 flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            {sucursal.direccion}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span style={{ color: "#E8600A" }} className="mt-0.5 flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </span>
          <div style={{ fontFamily: "'Inter', sans-serif" }}>
            {sucursal.horarioLineas.map((linea, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: linea.includes("Cerrado") ? "#E8600A" : "#4B5563" }}
              >
                {linea}
              </p>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span style={{ color: "#E8600A" }} className="flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
          </span>
          <a
            href={`tel:${sucursal.telefono}`}
            className="text-gray-600 text-sm hover:underline"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {sucursal.telefono}
          </a>
        </div>
      </div>

      <div className="mt-2 pt-4 border-t border-gray-100">
        <a
          href={`https://wa.me/${sucursal.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#E8600A", fontFamily: "'Inter', sans-serif" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escribir por WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

export default function Sucursales() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="sucursales" className="py-20 lg:py-28" style={{ backgroundColor: "#F8F8F8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
          >
            Dónde encontrarnos
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            style={{ color: "#1A3A6B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Nuestras Sucursales
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Dos puntos estratégicos en Quito para atenderte mejor. Visítanos o escríbenos.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {sucursales.map((s, i) => (
            <SucursalCard
              key={i}
              sucursal={s}
              delay={0.1 * i}
              direction={i === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* Maps — uno por sucursal */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-white border-b border-gray-100"
              style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
            >
              Sucursal Matriz — Pucará N1-203
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2!2d-78.4470559!3d-0.0057584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d589cd43ca7daf%3A0x46951cfc485b2e3d!2sJerezcons!5e0!3m2!1ses!2sec!4v1700000000001"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa JerezCons Matriz — Pucará N1-203, Quito"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-white border-b border-gray-100"
              style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
            >
              Sucursal Norte — Reino de Quito
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3988.5!2d-78.439818!3d0.0128333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1700000000002"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa JerezCons Norte — Reino de Quito"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
