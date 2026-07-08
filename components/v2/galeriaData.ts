/**
 * Datos de la galería de fotos, compartidos entre:
 *  - GaleriaV2 (PC/laptop: sección de galería en dos columnas)
 *  - FotosLocalMovil (teléfono: fotos debajo de la tarjeta de cada local)
 *
 * `srcs`: normalmente 1 foto. Si tiene varias, la tarjeta las rota entre sí
 * (mismo espacio, misma categoría).
 *
 * 👉 Convención del dueño: el número en el nombre del archivo original indica
 *    la tarjeta donde va la foto (1 = primera, 2 = la del medio, 3 = tercera).
 *    Fotos sin número o con otro número NO se suben. Los archivos optimizados
 *    viven en /public/galeria.
 */

export type Foto = { srcs: string[]; alt: string; categoria: string };
export type GaleriaSucursal = { sucursal: string; badge: string; fotos: Foto[] };

export const galerias: GaleriaSucursal[] = [
  {
    sucursal: "Matriz Pucará",
    badge: "Casa Matriz",
    fotos: [
      {
        srcs: ["/galeria-cemento.jpg", "/galeria-camion-materiales.jpg"],
        alt: "Cemento y materiales",
        categoria: "Materiales",
      },
      {
        srcs: [
          "/galeria/matriz-2a.jpg",
          "/galeria/matriz-2b.jpg",
          "/galeria/matriz-2c.jpg",
          "/galeria/matriz-2d.jpg",
        ],
        alt: "Cemento, eternit, perfilería y tubos",
        categoria: "Construcción",
      },
      { srcs: ["/galeria-interior.jpg"], alt: "Interior de la ferretería", categoria: "Tienda" },
    ],
  },
  {
    sucursal: "Sucursal Rumicucho",
    badge: "Norte",
    fotos: [
      {
        srcs: [
          "/galeria/rumicucho-1a.jpg",
          "/galeria/rumicucho-1b.jpg",
          "/galeria/rumicucho-1c.jpg",
          "/galeria/rumicucho-1d.jpg",
        ],
        alt: "Cemento, perfilería y bodega",
        categoria: "Materiales",
      },
      {
        srcs: ["/galeria/rumicucho-2a.jpg", "/galeria/rumicucho-2b.jpg"],
        alt: "Tubería, tanques y planchas",
        categoria: "Exterior",
      },
      {
        srcs: [
          "/galeria/rumicucho-3a.jpg",
          "/galeria/rumicucho-3b.jpg",
          "/galeria/rumicucho-3c.jpg",
          "/galeria/rumicucho-3d.jpg",
          "/galeria/rumicucho-3e.jpg",
        ],
        alt: "Interior de la sucursal",
        categoria: "Tienda",
      },
    ],
  },
];
