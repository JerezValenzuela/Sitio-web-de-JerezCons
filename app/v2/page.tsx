import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import HeroV2 from "@/components/v2/HeroV2";
import LogosMarquee from "@/components/v2/LogosMarquee";
import SucursalesV2 from "@/components/v2/SucursalesV2";
import GaleriaV2 from "@/components/v2/GaleriaV2";
import ContactoV2 from "@/components/v2/ContactoV2";
import FooterV2 from "@/components/v2/FooterV2";
import TiendaOnlineBadge from "@/components/v2/TiendaOnlineBadge";
import QuienesSomosV2 from "./QuienesSomosV2";

/**
 * Ruta de previsualización SOLO para revisar la V2.0 completa en local.
 * No afecta la home (/). Para verla: http://localhost:3000/v2
 */
export const metadata = {
  title: "JerezCons — Preview V2.0",
  robots: { index: false, follow: false },
};

export default function PreviewV2() {
  return (
    <>
      <TiendaOnlineBadge />
      <Navbar />
      <main>
        <HeroV2 />
        <LogosMarquee />
        <QuienesSomosV2 />
        <SucursalesV2 />
        <GaleriaV2 />
        <ContactoV2 />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
    </>
  );
}
