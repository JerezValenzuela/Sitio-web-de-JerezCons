"use client";

import { motion } from "framer-motion";

const photos = [
  {
    src: "/galeria-cemento.jpg",
    alt: "Cemento y materiales",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop",
    alt: "Materiales de construcción",
  },
  {
    src: "/galeria-interior.jpg",
    alt: "Interior de la ferretería",
  },
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
    alt: "Pinturas y acabados",
  },
  {
    src: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=600&auto=format&fit=crop",
    alt: "Proyectos completados",
  },
  {
    src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop",
    alt: "Ferretería y construcción",
  },
];

export default function Galeria() {
  return (
    <section id="galeria" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#E8600A", fontFamily: "'Inter', sans-serif" }}
          >
            Nuestro Trabajo
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            style={{ color: "#1A3A6B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Galería
          </h2>
          <p
            className="mt-4 text-gray-500 max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Un vistazo a nuestros productos, proyectos y la pasión que ponemos en cada atención.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-xl group cursor-pointer"
              >
                <motion.img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-xl flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(232, 96, 10, 0.5)" }}
                >
                  <p
                    className="text-white text-sm font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {photo.alt}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
