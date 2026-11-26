# Changelog

## 25-11-2026

### General y Navegación (`src/shared.jsx`, `src/index.css`, `src/App.jsx`, `vite.config.js`)
- **Barra de navegación fija (`Navigation`)**: ahora es sticky (`60px` en mobile, `76px` en `md+`) con menú hamburguesa en mobile, logo sobresaliendo en escritorio, ruta activa resaltada en cian (`#9be0ff` / `#7dd3fc`) y botones unificados como `Contact`.
- **Navegación lateral por secciones (`SectionDots`)**: agregada en escritorio (`md+`) para `Home` y `Commissions`, junto con `html.deck-snap` (`scroll-snap-type: y proximity` solo desde `768px`).
- **Scroll, SEO, Accesibilidad y Rendimiento (`index.html`, `vite.config.js`, `App.jsx`, `Home.jsx`, `shared.jsx`, `Consts.js`)**:
  - Agregada `<meta name="description">`, carga diferida de Google Fonts y `preconnect` automático al origen de `VITE_MEDIA_URL` en build.
  - Lazy-loading por ruta (`Commissions`, `Portfolio`, `Terms`) en `App.jsx`, carga diferida (`load` + idle) del video de fondo en `Hero`, `fetchPriority="high"` en Hero, `loading="lazy"` y dimensiones explícitas (`width`/`height`) en `MyWork`, `ReviewCard` e imágenes clave.
  - Correcciones de accesibilidad: `<label>` asociado a `textarea` e `<input type="file">`, etiqueta `sr-only` en reseñas de estrellas, áreas táctiles `>= 24px` en controles móviles y mayor contraste WCAG AA (`#595959`) en textos auxiliares del formulario.
- **Protección de imágenes y medios**: bloqueado el menú contextual (`contextmenu`) y el arrastre (`dragstart`) sobre `img`, `video` y `a` en `src/App.jsx`, además de reglas CSS (`-webkit-user-drag: none`, `user-select: none`, `-webkit-touch-callout: none`) en `src/index.css`.
- **Footer y CTA (`Footer`, `ContactCTA`)**: pie de página simplificado dejando únicamente redes sociales, registro (`© 2025 Mia Paprika`) y enlace a términos y condiciones (eliminando enlaces de navegación redundantes con el header fijo); ilustración chibi (`chibiMia`) mostrada también en mobile dentro de `ContactCTA`.
- **Redes sociales (`SocialLinks`)**: reemplazado PayPal por **VGen** (`https://vgen.co/MiaPaprika`) usando el isotipo SVG oficial extraído de `vgen.co/img/logo-dark.svg`, y agregado enlace de correo (`mailto:miapaprikacontact@gmail.com`).
- **Contenedor de constantes y Cloudflare R2 (`src/Consts.js`, `.env.example`)**: centralizadas todas las constantes estáticas (precios, secciones, redes, tipos de comisión, reseñas, galería, obras, clientes y términos) expuestas mediante funciones en `consts`; todas las imágenes y videos (`159` archivos) fueron subidos al bucket R2 `miapaprika` y conectados exclusivamente vía `consts.media()` / `VITE_MEDIA_URL` (con CORS `GET`/`HEAD` configurado), eliminando `src/assets/` del repositorio.
- **Red local (`vite.config.js`)**: habilitado `host: true` para `server` y `preview`.
- **Favicon personalizado (`public/favicon.svg`)**: reemplazado el ícono por defecto de Vite por un isotipo SVG de marca con monograma serif `M`, destellos celeste/dorado y fondo bordo.

### Inicio (`src/Home.jsx`)
- **Fecha de actualización**: actualizada de `09-08-2025` a `25-11-2026` (`Page updated 25-11-2026`).
- **Hero con video de fondo en loop**: reemplazada la ilustración principal (`mia-design-nb1`) y los pentágonos decorativos por `showcase-1.mp4` en reproducción continua de fondo sin controles, fundido hacia la derecha sobre el fondo bordo y con filtro punteado halftone encima.
- **Status responsive**: convertida la nueva ilustración `status-tombstone.png` a `figma/status-tombstone.webp` (`1220×960`, ~116 KiB) en R2 eliminando el `.png` original, reajustado el texto de estado dentro de la lápida en `Home.jsx`, visible también en mobile y puntos de sección (`SectionDots`).

### Galería, Portfolio y Visor (`src/shared.jsx`, `src/Portfolio.jsx`)
- **Sección `MyWork`**:
  - Mobile: carrusel horizontal deslizable (1 retrato o 2 paisajes apilados por slide).
  - Escritorio (`md+` / `lg+`): grilla bento de 3 columnas (`2` retratos altos + `2` paisajes apilados) con transición escalonada por columnas (`animateWorkColumns` con Web Animations API), flechas reubicadas hacia el interior para no chocar con `SectionDots` y altura ajustada para evitar recortes excesivos.
  - Integrada también dentro de la página `Portfolio`.
- **Página `Portfolio` y reseñas**:
  - `Gallery` rediseñada como carrusel horizontal a ancho completo (`2` videos con pausa automática al cambiar de slide + `4` ilustraciones) con barra de puntos y sin `TitleBand` arriba.
  - Corregido el truncado de nombres largos en `ClientCard`.
  - Removida la sección `CommunityReviews` de `Portfolio` y `Commissions` para dejarla exclusivamente en `Home`.
- **Visor modal reutilizable (`ImageLightbox`)**:
  - Extraído en `src/shared.jsx` y conectado a las imágenes de `MyWork`, `Portfolio` `Gallery` y `Clients`.
  - Al hacer clic izquierdo sobre cualquier ilustración, se abre completa (`object-contain`), con zoom al clic y paneo con el cursor, flechas / teclado (`ArrowLeft`, `ArrowRight`) y cierre con `Escape`, botón `X` o clic fuera de la imagen.

### Comisiones (`src/Commissions.jsx`)
- **Vtuber Models**:
  - Lista de precios en 2 columnas para las 3 pestañas (`Art only`, `Rig only`, `Art + Rig`) y marco completo sin recorte para `commMiaFull`.
  - Estabilizado el tamaño entre las 3 pestañas superponiendo sus bloques en CSS Grid (`col-start-1 row-start-1`) para evitar saltos de párrafos o listas al cambiar de pestaña.
  - Eliminados los encabezados repetidos dentro de cada pestaña y agregado el botón `Contact` fijo debajo en las tres vistas.
  - Agregada fecha independiente `Last price update 25/11/2026` debajo en `Art only` y `Rig only` (`priceUpdated` en `src/Consts.js`, omitida en `Art + Rig`).
  - Crédito actualizado debajo del modelo según pestaña: `Provided by Mia Paprika` (`Art only`), `Provided by SrCalabazaVT` (`Rig only`) y `Provided by Mia Paprika and SrCalabazaVT` (`Art + Rig`).
- **Illustrations**:
  - Unificado en un único marco ovalado limpio y alineado (`objectPosition: "50% 18%"`, `transformOrigin: "55.3% 12%"`) para `Full-Body`, `Half-Body` y `Portrait`.
  - Corregido el pixelado al hacer zoom en `Half-Body` y `Portrait`: reexportada `comm-reward4.webp` desde el PNG original a resolución `4096×2304` (antes `1200×675`) y renderizada al tamaño del zoom máximo (`230%`) para escalar hacia abajo sin pérdida por reescalado de GPU.
- **Navegación**: agregados `SectionDots` por sección.

### Términos y Condiciones (`src/Terms.jsx`)
- Agregada tabla de contenidos colapsable (`<details>`) para mobile, ajuste responsive del layout en escritorio y `scroll-mt-[84px]` para compensar el header fijo.
