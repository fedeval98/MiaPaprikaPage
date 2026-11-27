# Changelog

## 25-11-2026

### General y Navegación (`src/shared.jsx`, `src/index.css`, `src/App.jsx`, `vite.config.js`)
- **Barra de navegación fija (`Navigation`)**: ahora es sticky (`60px` en mobile, `76px` en `md+`) con menú hamburguesa en mobile, logo sobresaliendo en escritorio, ruta activa resaltada en cian (`#9be0ff` / `#7dd3fc`) y botones unificados como `Contact`.
- **Navegación lateral por secciones (`SectionDots`) y scroll snap**: agregada en escritorio (`md+`) para `Home` y `Commissions`, junto con `html.deck-snap` (`scroll-snap-type: y mandatory`) y `snap-start`/`snap-end` activos tanto en desktop como en mobile; textos, tabs y botones centrados en mobile (`< 768px`) en `Hero`, `#status`, `VtuberModels`, `Illustrations`, `ReviewCard` y banner de `Terms`.
- **Página `Commissions` (`src/Commissions.jsx`)**: reducido el aire superior e intermedio en `#vtuber-models` (`items-start md:items-center`, `pt-3.5`, `gap-2` y altura natural por pestaña activa en mobile para evitar el hueco extra sobre el botón `Contact`) y en `#illustrations` (`pt-5 md:pt-7`, `mb-4 md:mb-6` y `gap-5` en mobile) para que título, precios/imagen y botón entren cómodos en la vista mobile y escritorio.
- **Auditoría UI y Tailwind CSS v4 (`web-design-guidelines`, `design-taste-frontend`, `tailwindcss-intellisense`)**: corregido typo `"Comissions"` → `"Commissions"` en `Navigation`; resuelto conflicto CSS (`block` + `flex`) en `ImageLightbox`; normalizadas **342** clases utilitarias a su forma canónica de Tailwind v4 (`max-w-360`, `px-*`, `gap-*`, `scrollbar-none`, `bg-linear-to-t`, `wrap-break-word`, etc.); agregado `<meta name="theme-color">`, `color-scheme: dark`, `touch-action: manipulation` y reglas de `prefers-reduced-motion` (incluido el video de `Hero`); foco visible (`focus-visible:ring`) en campos del formulario, `autoComplete`/`spellCheck` y `aria-live="polite"`; retorno de foco y `overscroll-contain` en `ImageLightbox`; `loading="lazy"` en tarjetas de `Portfolio` e ilustraciones de `Commissions`; áreas táctiles `>= 24px` en paginación de `Gallery`; y reemplazo de `transition-all` por propiedades explícitas.
- **Scroll, SEO, Accesibilidad y Rendimiento (`index.html`, `vite.config.js`, `App.jsx`, `Home.jsx`, `Commissions.jsx`, `Portfolio.jsx`, `Terms.jsx`, `shared.jsx`, `Consts.js`)**:
  - Agregada `<meta name="description">`, carga diferida de Google Fonts, `preconnect` sin CORS y `<link rel="preload" as="image" fetchpriority="high">` de `hero-background.webp` inyectados dinámicamente en build desde `VITE_MEDIA_URL`.
  - Lazy-loading por ruta (`Commissions`, `Portfolio`, `Terms`) en `App.jsx`, carga diferida del video de fondo en `Hero` (`load` + idle en escritorio; primera interacción en móvil), fondos de `ContactCTA` diferidos vía `IntersectionObserver`, `fetchPriority="high"` en Hero, `loading="lazy"` y dimensiones explícitas (`width`/`height`) en `MyWork`, `ReviewCard` e imágenes clave.
  - Correcciones de accesibilidad (`100` objetivo): landmark `<main>` en las 4 vistas, `<label>` asociado a `textarea` e `<input type="file">`, etiqueta `sr-only` en reseñas de estrellas, áreas táctiles `>= 24px` en controles móviles y mayor contraste WCAG AA (`#595959`) en textos auxiliares del formulario.
- **Protección de imágenes y medios**: bloqueado el menú contextual (`contextmenu`) y el arrastre (`dragstart`) sobre `img`, `video` y `a` en `src/App.jsx`, además de reglas CSS (`-webkit-user-drag: none`, `user-select: none`, `-webkit-touch-callout: none`) en `src/index.css`.
- **Footer y CTA (`Footer`, `ContactCTA`)**: pie de página simplificado dejando únicamente redes sociales, registro (`© 2025 Mia Paprika`) y enlace a términos y condiciones (eliminando enlaces de navegación redundantes con el header fijo); ilustración chibi (`chibiMia`) mostrada también en mobile dentro de `ContactCTA`.
- **Redes sociales (`SocialLinks`)**: reemplazado PayPal por **VGen** (`https://vgen.co/MiaPaprika`) usando el isotipo SVG oficial extraído de `vgen.co/img/logo-dark.svg`, y agregado enlace de correo (`mailto:miapaprikacontact@gmail.com`).
- **Contenedor de constantes y Cloudflare R2 (`src/Consts.js`, `.env.example`)**: centralizadas todas las constantes estáticas (precios, secciones, redes, tipos de comisión, reseñas, galería, obras, clientes y términos) expuestas mediante funciones en `consts`; todas las imágenes y videos (`159` archivos) fueron subidos al bucket R2 `miapaprika` y conectados exclusivamente vía `consts.media()` / `VITE_MEDIA_URL` (con CORS `GET`/`HEAD` configurado), eliminando `src/assets/` del repositorio.
- **Red local (`vite.config.js`)**: habilitado `host: true` para `server` y `preview`.
- **Favicon personalizado (`public/favicon.svg`)**: reemplazado el ícono por defecto de Vite por un isotipo SVG de marca con monograma serif `M`, destellos celeste/dorado y fondo bordo.

### Inicio (`src/Home.jsx`, `src/shared.jsx`)
- **Fecha de actualización**: actualizada de `09-08-2025` a `25-11-2026` (`Page updated 25-11-2026`).
- **Hero editorial con video de fondo en loop**: reemplazada la ilustración estática anterior por `showcase-1.mp4` con máscara radial y halftone encima, degradado de legibilidad en el tercio izquierdo, eyebrow (*Live2D Artist & Character Illustrator*), divisor ornamental, botones de acción (`View Commissions` / `Explore Portfolio`) y dock translúcido para `SocialLinks`.
- **Status (`#status`)**: convertida la nueva ilustración `status-tombstone.png` a `figma/status-tombstone.webp` (`1220×960`, ~116 KiB) en R2 eliminando el `.png` original; composición editorial con badge dinámico de estado (`Waitlist & Form Status` / `Commissions Open`), `StatusOrnament`, tarjeta translúcida con CTA `Contact` y lápida adaptativa (`dvh`) que entra en una sola vista desde `390×844` y `1280×620` hasta escritorio amplio, centrando etiquetas y `Open`/`Closed` desde `consts.status()`.
- **Comunidad (`CommunityReviews`) y `MyWork` (`src/shared.jsx`)**: unificada la sección de reseñas sobre textura marmolada clara con tarjetas translúcidas y halo en avatares, ocupando una vista limpia sin cortes en escritorio; agregada cabecera editorial con divisor en `MyWork` y tarjetas bento con bordes sutiles y zoom suave al hover.

### Galería, Portfolio y Visor (`src/shared.jsx`, `src/Portfolio.jsx`)
- **Sección `MyWork`**:
  - Mobile: carrusel horizontal deslizable (1 retrato o 2 paisajes apilados por slide).
  - Escritorio (`md+` / `lg+`): grilla bento de 3 columnas (`2` retratos altos + `2` paisajes apilados) con transición escalonada por columnas (`animateWorkColumns` con Web Animations API), flechas reubicadas hacia el interior para no chocar con `SectionDots` y altura ajustada para evitar recortes excesivos.
  - Integrada también dentro de la página `Portfolio`.
- **Página `Portfolio` y reseñas (`src/Portfolio.jsx`)**:
  - `Gallery` rediseñada como escenario oscuro editorial en bordo (`#gallery`) con cabecera centrada, visor `16:9` ajustado a `100dvh - 285px` para entrar completo con la barra inferior de `6` miniaturas incluso en notebooks bajas (`1280×620`), contador en vivo, controles `Prev`/`Next` y pista *Expand* sobre ilustraciones.
  - Sección `Clients` renovada sobre textura marmolada clara con cabecera editorial (*Commission Archive · 49 Models*), tarjetas inclinadas proporcionales a `2` columnas en mobile (`scale-65` sobre geometría `240×207`), encuadre recalibrado en miniaturas específicas (`CryoLadyx`, `Fabitoh`, `Halo`, `Itsfirekeeperqa`, `Remmychu`, `Träce`, `Muimina`, `LunarElsa`), efecto hover solo en escritorio (`@media (min-width: 768px) and (hover: hover)`) con marco sombra bordo desplazado detrás y *pop-out* superior del personaje sobre el encuadre (`clip-path` interpolado + `scale`), muestra inicial curada de `15` modelos expandible a los `49` completos y visor `ImageLightbox` integrado.
  - Agregado `SectionDots` en escritorio (`Showcase`, `Clients`, `My Work`, `Contact`) con `snap={false}` para navegar rápido entre secciones sin trabar el scroll libre sobre el archivo largo de clientes.
  - Removida la sección `CommunityReviews` de `Portfolio` y `Commissions` para dejarla exclusivamente en `Home`.
- **Visor modal reutilizable (`ImageLightbox`)**:
  - Extraído en `src/shared.jsx` y conectado a las imágenes de `MyWork`, `Portfolio` `Gallery` y `Clients`.
  - Al hacer clic izquierdo sobre cualquier ilustración, se abre completa (`object-contain`), con zoom al clic y paneo con el cursor, flechas / teclado (`ArrowLeft`, `ArrowRight`) y cierre con `Escape`, botón `X` o clic fuera de la imagen.

### Comisiones (`src/Commissions.jsx`)
- **Vtuber Models (rediseño editorial)**:
  - Cabecera con eyebrow (*Live2D Artwork & Rigging*) y divisor ornamental sobre la textura marmolada.
  - Pestañas y detalle encapsulados en tarjeta translúcida (`bg-white/80`) con chips destacados para los tiers principales (`Fullbody`/`Halfbody` o paquete `Art + Rig`), extras en 2 columnas con viñetas romboidales y pie unificado con botón `Contact` + fecha `Last price update 25/11/2026`.
  - Visor derecho (`comm-mia-full.webp`) mejorado con iluminación radial bordo, pista *Expand* conectada a `ImageLightbox` y placa tipo pill para el crédito (`Provided by...`).
- **Illustrations (rediseño editorial)**:
  - Fondo bordo radial alineado con el visor de `Portfolio`, cabecera centrada con divisor ornamental, marco ovalado con halo sutil y tarjeta translúcida oscura con pestañas (`Full-Body`, `Half-Body`, `Portrait`), precios en filas destacadas (`label` / monto en `#9be0ff`) y botón `Contact`.
  - Mantiene el encuadre en una sola vista tanto en escritorio como en mobile (`artStyle` al 230% sin pixelado).
- **Navegación**: agregados `SectionDots` por sección.

### Términos y Condiciones (`src/Terms.jsx`)
- **Hero de pantalla completa en escritorio**: ampliada la primera vista de `#terms-hero` a `md:min-h-[calc(100dvh-76px)]` (en mobile ya ocupa `calc(100dvh-60px)`), centrada con divisor ornamental, tarjeta translúcida para el *Important Disclaimer* y botón ancla `#terms-content` hacia las secciones.
- **Rediseño editorial de cláusulas y Tabla de Contenidos**: tarjetas translúcidas numeradas (`01`–`12`) sobre el fondo marmolado con énfasis visual en *Final Agreement*, viñetas romboidales uniformes y sub-listas indentadas con borde izquierdo (reemplazando el glifo `❥`), enlaces en `#5c1a23` con foco visible, tarjeta sticky de contenidos numerada en escritorio con accesos rápidos (*Back to top* / *Contact form*) y acordeón `<details>` refinado en mobile con `scroll-mt-4 md:scroll-mt-6` alineado a `scroll-padding-top`.
