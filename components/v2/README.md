# JerezCons — Versión 2.0 (componentes premium)

Componentes V2 **aislados**. NO reemplazan nada automáticamente: los originales siguen
intactos en `components/`. Aquí solo hay propuestas listas para producción que tú activas
manualmente cuando quieras.

- ✅ Cero dependencias nuevas (solo `framer-motion`, ya instalado).
- ✅ Misma paleta (#E8600A / #1A3A6B / #FFFFFF), mismas fuentes (Barlow Condensed / Inter).
- ✅ Respeta las reglas de `CLAUDE.md`: SIN dark mode real, SIN tienda/carrito/pagos.
- ✅ Mobile-first, scroll suave, WhatsApp siempre presente.

---

## Componentes incluidos

| Archivo | Reemplaza a | Qué mejora |
|---|---|---|
| `HeroV2.tsx` | `Hero.tsx` | Parallax scroll-driven, overlay dinámico, título con reveal por palabra. |
| `BentoStats.tsx` | bloque de stats dentro de `QuienesSomos.tsx` | Bento grid, glassmorphism, gradient border, conteo animado. |
| `SucursalesV2.tsx` | `Sucursales.tsx` | Tabs de alto impacto, badge "Casa Matriz", mapa que cambia por pestaña. |
| `GaleriaV2.tsx` | `Galeria.tsx` | Masonry + lightbox premium (zoom, flechas, teclado ← → Esc). |
| `FooterV2.tsx` | `Footer.tsx` | Banda CTA, mejor contraste, acentos naranja. Solo azul oscuro, sin dark mode. |
| `TiendaOnlineBadge.tsx` | (nuevo) | Aviso pequeño "Tienda online en construcción" → WhatsApp. Sin carrito. |

---

## Cómo activar (todo en `app/page.tsx`)

Cambia solo los imports que quieras probar. Ejemplo activando TODO:

```tsx
import Navbar from "@/components/Navbar";
import HeroV2 from "@/components/v2/HeroV2";
import QuienesSomos from "@/components/QuienesSomos"; // ver nota de BentoStats abajo
import SucursalesV2 from "@/components/v2/SucursalesV2";
import GaleriaV2 from "@/components/v2/GaleriaV2";
import Contacto from "@/components/Contacto";
import FooterV2 from "@/components/v2/FooterV2";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import TiendaOnlineBadge from "@/components/v2/TiendaOnlineBadge";

export default function Home() {
  return (
    <>
      <TiendaOnlineBadge />   {/* barra fina arriba del navbar */}
      <Navbar />
      <main>
        <HeroV2 />
        <QuienesSomos />
        <SucursalesV2 />
        <GaleriaV2 />
        <Contacto />
      </main>
      <FooterV2 />
      <WhatsAppFloat />
    </>
  );
}
```

Puedes activarlos **uno por uno** para comparar (ej. solo `HeroV2` y dejar el resto igual).

---

## Nota sobre `BentoStats`

`BentoStats` es solo el **bloque de métricas**, no toda la sección "Quiénes Somos".
Para integrarlo, dentro de `QuienesSomos.tsx` reemplaza el bloque final:

```tsx
{/* Stats Row — versión actual */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
  {stats.map((stat, i) => <StatCard key={i} {...stat} delay={0.1 * i} />)}
</div>
```

por:

```tsx
import BentoStats from "@/components/v2/BentoStats";
// ...
<div className="mt-16">
  <BentoStats />
</div>
```

(Las stats viejas dentro de `QuienesSomos.tsx` quedarían sin usar; puedes borrarlas luego.)

---

## Sobre la "Tienda online"

Por tu regla `Sin tienda online, sin carrito, sin pagos`, `TiendaOnlineBadge` **no** es una
tienda: es un aviso minimalista que empuja a cotizar por WhatsApp. Dos modos:

- `<TiendaOnlineBadge />` → barra fina full-width (recomendado, arriba del navbar).
- `<TiendaOnlineBadge inline />` → chip pequeño para insertar al lado de cualquier texto
  (por ejemplo, dentro del Navbar junto al logo).

---

## Reversión

Para volver al sitio original: deja `app/page.tsx` como estaba (imports a `components/*`
sin `/v2`). Nada en esta carpeta afecta producción hasta que cambies esos imports.
```
