import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/v2/SmoothScroll";

import HeroV2 from "@/components/v2/HeroV2";
import LogosMarquee from "@/components/v2/LogosMarquee";
import SucursalesV2 from "@/components/v2/SucursalesV2";
import GaleriaV2 from "@/components/v2/GaleriaV2";
import ContactoV2 from "@/components/v2/ContactoV2";
import FooterV2 from "@/components/v2/FooterV2";
import TiendaOnlineBadge from "@/components/v2/TiendaOnlineBadge";
import QuienesSomosV2 from "./v2/QuienesSomosV2";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <HeroV2 />
        <LogosMarquee />
        <SucursalesV2 />
        <QuienesSomosV2 />
        <GaleriaV2 />
        <ContactoV2 />
      </main>
      <TiendaOnlineBadge />
      <FooterV2 />
    </>
  );
}
