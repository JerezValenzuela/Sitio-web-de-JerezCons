import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JerezCons — Construimos Juntos",
  description: "JerezCons: ferretería en Quito con más de 30 años de experiencia. Venta y distribución de materiales de construcción, herramientas y acabados. Sucursales en San Antonio de Pichincha y Reino de Quito. Llámanos: 098-406-7799.",
  keywords: "ferretería, JerezCons, ferretería en Quito, ferretería San Antonio de Pichincha, ferretería San Antonio, materiales de construcción Quito, herramientas Quito, ferretería Ecuador, Jerezcons Quito, ferretería Pucará, ferretería Reino de Quito, construcción Quito",
  authors: [{ name: "JerezCons" }],
  verification: {
    google: "wZEQxGtDOfoiajw45YUcyw2TZgTOjxP4byvoa4pzblw",
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "JerezCons — Construimos Juntos",
    description: "Más de 30 años construyendo contigo. Materiales de construcción, herramientas y acabados. Dos sucursales en Quito: San Antonio de Pichincha y Reino de Quito.",
    type: "website",
    locale: "es_EC",
    siteName: "JerezCons",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
