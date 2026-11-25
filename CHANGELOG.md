# Changelog

## 25-11-2026

### General y Navegación (`src/shared.jsx`, `src/index.css`, `src/App.jsx`, `vite.config.js`)
- **Barra de navegación fija (`Navigation`)**: ahora es sticky (`60px` en mobile, `76px` en `md+`) con menú hamburguesa en mobile, logo sobresaliendo en escritorio, ruta activa resaltada en cian (`#9be0ff` / `#7dd3fc`) y botones unificados como `Contact`.
- **Navegación lateral por secciones (`SectionDots`)**: agregada en escritorio (`md+`) para `Home` y `Commissions`, junto con `html.deck-snap` (`scroll-snap-type: y proximity` solo desde `768px`).
- **Scroll y experiencia visual**: ocultada la barra de scroll vertical en `html` y `body` manteniendo el desplazamiento y ajustando `scroll-padding-top`; removido el cursor personalizado (`src/CustomCursor.jsx` eliminado).
- **Protección de imágenes y medios**: bloqueado el menú contextual (`contextmenu`) y el arrastre (`dragstart`) sobre `img`, `video` y `a` en `src/App.jsx`, además de reglas CSS (`-webkit-user-drag: none`, `user-select: none`, `-webkit-touch-callout: none`) en `src/index.css`.
- **Footer y CTA (`Footer`, `ContactCTA`)**: pie de página compactado y adaptado a todas las resoluciones; ilustración chibi (`chibiMia`) mostrada también en mobile dentro de `ContactCTA`.
- **Red local (`vite.config.js`)**: habilitado `host: true` para `server` y `preview`.

### Inicio (`src/Home.jsx`)
- **Fecha de actualización**: actualizada de `09-08-2025` a `25-11-2026` (`Page updated 25-11-2026`).
- **Hero y Status responsive**: tipografía e ilustración principal ampliadas en mobile, escalado para `2xl+`, lápida de estado (`statusTombstone`) visible también en mobile y puntos de sección (`SectionDots`).

### Galería, Portfolio y Visor (`src/shared.jsx`, `src/Portfolio.jsx`)
- **Sección `MyWork`**:
  - Mobile: carrusel horizontal deslizable (1 retrato o 2 paisajes apilados por slide).
  - Escritorio (`md+` / `lg+`): grilla bento de 3 columnas (`2` retratos altos + `2` paisajes apilados) con transición escalonada por columnas (`animateWorkColumns` con Web Animations API), flechas reubicadas hacia el interior para no chocar con `SectionDots` y altura ajustada para evitar recortes excesivos.
- **Página `Portfolio`**:
  - `Gallery` rediseñada como carrusel horizontal a ancho completo (`2` videos con pausa automática al cambiar de slide + `4` ilustraciones) con barra de puntos y sin `TitleBand` arriba.
  - Corregido el truncado de nombres largos en `ClientCard`.
- **Visor modal reutilizable (`ImageLightbox`)**:
  - Extraído en `src/shared.jsx` y conectado a las imágenes de `MyWork`, `Portfolio` `Gallery` y `Clients`.
  - Al hacer clic izquierdo sobre cualquier ilustración, se abre completa (`object-contain`), con zoom al clic y paneo con el cursor, flechas / teclado (`ArrowLeft`, `ArrowRight`) y cierre con `Escape`, botón `X` o clic fuera de la imagen.

### Comisiones (`src/Commissions.jsx`)
- **Vtuber Models**:
  - Lista de precios en 2 columnas para las 3 pestañas (`Art only`, `Rig only`, `Art + Rig`) y marco completo sin recorte para `commMiaFull`.
  - Estabilizado el tamaño entre las 3 pestañas superponiendo sus bloques en CSS Grid (`col-start-1 row-start-1`) para evitar saltos de párrafos o listas al cambiar de pestaña.
  - Eliminados los encabezados repetidos dentro de cada pestaña y agregado el botón `Contact` fijo debajo en las tres vistas.
  - Crédito actualizado debajo del modelo según pestaña: `Provided by Mia Paprika` (`Art only`), `Provided by SrCalabazaVT` (`Rig only`) y `Provided by Mia Paprika and SrCalabazaVT` (`Art + Rig`).
- **Illustrations**:
  - Unificado en un único marco ovalado limpio y alineado (`objectPosition: "50% 18%"`, `transformOrigin: "55.3% 12%"`) para `Full-Body` (`scale(1)`), `Half-Body` (`scale(1.65)`) y `Portrait` (`scale(2.3)`).
- **Navegación**: agregados `SectionDots` por sección.

### Términos y Condiciones (`src/Terms.jsx`)
- Agregada tabla de contenidos colapsable (`<details>`) para mobile, ajuste responsive del layout en escritorio y `scroll-mt-[84px]` para compensar el header fijo.
