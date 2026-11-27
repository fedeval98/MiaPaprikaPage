import { useRef, useState } from "react";
import { CaretDown, CaretLeft, CaretRight, MagnifyingGlassPlus, Play } from "@phosphor-icons/react";
import { Navigation, ContactCTA, Footer, MyWork, ImageLightbox, SectionDots } from "./shared.jsx";
import { consts } from "./Consts.js";

const GALLERY_ITEMS = consts.gallery();
const GALLERY_IMAGES = GALLERY_ITEMS.filter((item) => item.type === "image");
const GALLERY_LIGHTBOX_ITEMS = GALLERY_IMAGES.map((item) => ({ src: item.src, alt: item.label }));

const CLIENTS = consts.clients();
const INITIAL_CLIENT_COUNT = 15;
const CLIENT_LIGHTBOX_ITEMS = CLIENTS.map((c) => ({
  src: consts.media(`clients-hd/${c.file}.webp`),
  alt: c.name ? `${c.name} full model` : "Client full model",
  caption: c.name,
}));

function Gallery() {
  const [slide, setSlide] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const trackRef = useRef(null);
  const videoRefs = useRef([]);

  const pauseAllVideos = (exceptIdx = -1) => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== exceptIdx && !video.paused) {
        video.pause();
      }
    });
  };

  const scrollToSlide = (index) => {
    const wrapped = ((index % GALLERY_ITEMS.length) + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSlide(wrapped);
    pauseAllVideos(wrapped);
    const el = trackRef.current;
    if (el) {
      el.scrollTo({ left: wrapped * el.clientWidth, behavior: "smooth" });
    }
  };

  const navBtn =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-11 rounded-full border border-[#efe8e9]/25 bg-[#20090c]/85 backdrop-blur-sm text-[#efe8e9] cursor-pointer hover:bg-[#5c1a23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dd3fc] transition-colors shadow-lg";

  const activeItem = GALLERY_ITEMS[slide];

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden bg-linear-to-b from-[#2e090f] via-[#21060a] to-[#160306] min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),920px)] flex flex-col justify-center py-4 md:py-5 lg:py-6"
    >
      <img
        alt=""
        width={1024}
        height={1024}
        fetchPriority="low"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-20 pointer-events-none"
        src={consts.media("figma/noise-texture.webp")}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(138,34,48,0.28),transparent_65%)] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-330 2xl:max-w-380 mx-auto px-4 sm:px-6 md:px-14 lg:px-18 flex flex-col items-center gap-3 md:gap-4">
        <header className="flex flex-col items-center text-center gap-1">
          <p className="font-raleway uppercase tracking-[0.22em] text-[#efe8e9]/70 text-[10.5px] sm:text-[11px] m-0">
            Live2D Showcase &amp; Featured Art
          </p>
          <h1 className="font-cormorant font-normal leading-[1.06] text-[#efe8e9] text-[34px] sm:text-[38px] lg:text-[44px] m-0">
            Portfolio
          </h1>
          <div aria-hidden="true" className="flex items-center gap-3 w-32 mt-0.5">
            <span className="h-px flex-1 bg-[#efe8e9]/35" />
            <span className="size-1.5 rotate-45 bg-[#efe8e9]/70 shrink-0" />
            <span className="h-px flex-1 bg-[#efe8e9]/35" />
          </div>
        </header>

        <div className="relative w-full max-w-[min(100%,calc((100dvh-285px)*16/9),960px)] mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[#efe8e9]/15 bg-[#0d0d0d] shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <div
              aria-live="polite"
              className="pointer-events-none absolute top-3 left-3 z-10 hidden sm:inline-flex items-center gap-2 rounded-full bg-[#1a0508]/80 backdrop-blur-sm border border-[#efe8e9]/15 px-3 py-1 font-raleway text-[12px] text-[#efe8e9]/90"
            >
              <span className="font-cormorant italic text-[14px] text-[#9be0ff]">
                {String(slide + 1).padStart(2, "0")}
              </span>
              <span className="text-[#efe8e9]/40">/</span>
              <span>{String(GALLERY_ITEMS.length).padStart(2, "0")}</span>
              <span className="text-[#efe8e9]/40">·</span>
              <span>{activeItem?.type === "video" ? "Showcase Reel" : "Illustration"}</span>
            </div>

            <div
              ref={trackRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                if (el.clientWidth > 0) {
                  const next = Math.round(el.scrollLeft / el.clientWidth);
                  if (next !== slide) {
                    setSlide(next);
                    pauseAllVideos(next);
                  }
                }
              }}
              className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden"
            >
              {GALLERY_ITEMS.map((item, i) => (
                <div key={item.label} className="w-full shrink-0 snap-center flex items-center justify-center bg-[#0d0d0d]">
                  {item.type === "video" ? (
                    <video
                      ref={(el) => (videoRefs.current[i] = el)}
                      aria-label={item.label}
                      className="w-full aspect-video bg-[#0d0d0d] object-contain"
                      src={item.src}
                      poster={item.poster}
                      controls
                      playsInline
                      preload="none"
                    >
                      <track kind="captions" label="Visual showcase (no dialogue)" />
                    </video>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLightboxIdx(GALLERY_IMAGES.indexOf(item))}
                      aria-label={`Open ${item.label} in full view`}
                      className="group relative block w-full border-0 bg-transparent p-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dd3fc]"
                    >
                      <img
                        alt={item.label}
                        width={item.width}
                        height={item.height}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="w-full aspect-video object-contain"
                        src={item.src}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#1a0508]/80 backdrop-blur-sm border border-[#efe8e9]/20 px-3 py-1 font-raleway text-[12px] text-[#efe8e9]/90 opacity-85 group-hover:opacity-100 transition-opacity"
                      >
                        <MagnifyingGlassPlus size={14} weight="bold" />
                        <span>Expand</span>
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="button" aria-label="Previous portfolio item" onClick={() => scrollToSlide(slide - 1)} className={`${navBtn} left-2 md:-left-13`}>
            <CaretLeft size={22} weight="bold" />
          </button>
          <button type="button" aria-label="Next portfolio item" onClick={() => scrollToSlide(slide + 1)} className={`${navBtn} right-2 md:-right-13`}>
            <CaretRight size={22} weight="bold" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-72 sm:max-w-none sm:w-auto sm:flex sm:items-center sm:justify-center sm:gap-2.5 py-1">
          {GALLERY_ITEMS.map((item, idx) => {
            const isActive = slide === idx;
            const thumbSrc = item.type === "video" ? item.poster : item.src;
            return (
              <button
                key={item.label}
                type="button"
                aria-label={`View ${item.label}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToSlide(idx)}
                className={`relative shrink-0 w-full min-h-11 sm:w-22 aspect-video rounded-lg overflow-hidden border-2 border-solid p-0 bg-[#0d0d0d] cursor-pointer transition-[opacity,border-color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dd3fc] ${
                  isActive
                    ? "border-[#9be0ff] opacity-100 shadow-[0_0_12px_rgba(125,211,252,0.45)]"
                    : "border-[#efe8e9]/20 opacity-55 hover:opacity-90"
                }`}
              >
                <img alt="" width={item.width} height={item.height} loading="lazy" className="size-full object-cover" src={thumbSrc} />
                {item.type === "video" && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-black/35 text-white"
                  >
                    <Play size={14} weight="fill" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {lightboxIdx !== null && (
        <ImageLightbox
          items={GALLERY_LIGHTBOX_ITEMS}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={setLightboxIdx}
        />
      )}
    </section>
  );
}

function ClientCard({ file, name, zoom = "h-[400%]", onClick }) {
  const hasCustomX = /\bleft-/u.test(zoom);
  const dims = consts.clientDimensions(file);
  const maskStyle = { maskImage: `url("${consts.media("figma/client-card-mask.svg")}")` };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={name ? `View ${name}'s full model` : "View full model"}
      className="group client-card-btn relative w-39 h-33.5 sm:w-60 sm:h-51.75 shrink-0 border-0 bg-transparent p-0 cursor-pointer drop-shadow-[0_10px_22px_rgba(32,9,12,0.22)] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5c1a23]"
    >
      {/* Desktop-only offset celeste fluor shadow frame that peeks out behind the card on hover */}
      <div
        aria-hidden="true"
        className="client-card-shadow hidden md:block pointer-events-none absolute inset-0 bg-linear-to-br from-[#e0f4ff] via-[#7dd3fc] to-[#38bdf8] mask-alpha mask-no-repeat mask-size-[100%_100%]"
        style={maskStyle}
      />

      {/* Keep exact 240x207 internal geometry scaled cleanly on mobile so per-client zoom crops stay centered */}
      <div className="relative w-60 h-51.75 origin-top-left scale-65 sm:scale-100">
        {/* Base dark card backplate masked cleanly to SVG corners */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#20090c] mask-alpha mask-no-repeat mask-size-[100%_100%] pointer-events-none"
          style={maskStyle}
        />

        {/* Character stage: SVG-masked on mobile/touch, expanding upward on desktop hover */}
        <div
          className="client-card-stage pointer-events-none absolute inset-0 overflow-hidden md:overflow-visible"
          style={{ "--card-mask": `url("${consts.media("figma/client-card-mask.svg")}")` }}
        >
          <div className="client-card-pop relative size-full">
            <img
              alt={name ? `${name} character art` : "Client character art"}
              width={dims?.[0]}
              height={dims?.[1]}
              loading="lazy"
              className={`absolute top-0 w-auto max-w-none ${
                hasCustomX ? "" : "left-1/2 -translate-x-1/2"
              } ${zoom}`}
              src={consts.media(`clients/${file}.webp`)}
            />
          </div>
        </div>

        {/* Name bar stays clipped strictly to the front SVG card silhouette */}
        {name && (
          <div
            className="pointer-events-none absolute inset-0 mask-alpha mask-no-repeat mask-size-[100%_100%]"
            style={maskStyle}
          >
            <div className="absolute bottom-0 left-11 right-0 min-h-11.75 flex items-center justify-center bg-linear-to-t from-[#20090c] via-[#20090c]/80 to-transparent py-1.5 pl-4 pr-2.5">
              <p className="font-cormorant italic font-bold leading-[1.15] text-[#efe8e9] text-[20px] text-center m-0 truncate max-w-full">
                {name}
              </p>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

function Clients() {
  const [openIdx, setOpenIdx] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const visibleClients = expanded ? CLIENTS : CLIENTS.slice(0, INITIAL_CLIENT_COUNT);

  return (
    <section
      id="clients"
      className="relative w-full py-10 md:py-14 overflow-x-clip"
      style={{
        backgroundImage: `url("${consts.media("figma/terms-body-bg.webp")}")`,
        backgroundSize: "max(100%, 1024px) auto",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
      }}
    >
      <div className="max-w-340 mx-auto px-3 sm:px-6 md:px-10 flex flex-col items-center gap-7 md:gap-9">
        <header className="flex flex-col items-center text-center gap-2 max-w-xl">
          <p className="font-raleway uppercase tracking-[0.2em] text-[#5c1a23]/80 text-[11px] m-0">
            Commission Archive · {CLIENTS.length} Models
          </p>
          <h2 className="font-cormorant font-normal leading-[1.1] text-[#20090c] text-[36px] md:text-[46px] m-0">
            Clients
          </h2>
          <div aria-hidden="true" className="flex items-center gap-3 w-40 my-0.5">
            <span className="h-px flex-1 bg-[#5c1a23]/40" />
            <span className="size-1.5 rotate-45 bg-[#5c1a23]/75 shrink-0" />
            <span className="h-px flex-1 bg-[#5c1a23]/40" />
          </div>
          <p className="font-raleway leading-[1.45] text-[#3a2124] text-[14.5px] sm:text-[15.5px] m-0">
            Select any portrait to inspect the full character sheet in high resolution.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-start justify-center justify-items-center gap-x-2 gap-y-5 sm:gap-x-3 sm:gap-y-7 md:gap-x-4 md:gap-y-8 w-full">
          {visibleClients.map((c, idx) => (
            <ClientCard key={c.file} {...c} onClick={() => setOpenIdx(idx)} />
          ))}
        </div>

        {CLIENTS.length > INITIAL_CLIENT_COUNT && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center justify-center gap-2 min-h-11 rounded-full border border-[#5c1a23]/35 bg-white/85 hover:bg-[#5c1a23] text-[#45141a] hover:text-[#efe8e9] px-6 py-2.5 font-raleway font-medium text-[14px] sm:text-[15px] cursor-pointer shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c1a23]"
          >
            <span>
              {expanded
                ? "Show fewer clients"
                : `Show all ${CLIENTS.length} clients (${CLIENTS.length - INITIAL_CLIENT_COUNT} more)`}
            </span>
            <CaretDown
              size={16}
              weight="bold"
              aria-hidden="true"
              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {openIdx !== null && (
        <ImageLightbox
          items={CLIENT_LIGHTBOX_ITEMS}
          index={openIdx}
          onClose={() => setOpenIdx(null)}
          onNav={setOpenIdx}
        />
      )}
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="relative">
      <Navigation />
      <SectionDots sections={consts.sections("portfolio")} snap={false} />
      <main id="main-content">
        <Gallery />
        <Clients />
        <MyWork />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
