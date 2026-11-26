import { useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Navigation, ContactCTA, Footer, TitleBand, MyWork, ImageLightbox } from "./shared.jsx";
import { consts } from "./Consts.js";

const GALLERY_ITEMS = consts.gallery();
const GALLERY_IMAGES = GALLERY_ITEMS.filter((item) => item.type === "image");
const GALLERY_LIGHTBOX_ITEMS = GALLERY_IMAGES.map((item) => ({ src: item.src, alt: item.label }));

const CLIENT_LIGHTBOX_ITEMS = consts.clients().map((c) => ({
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
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-[40px] sm:size-[48px] rounded-full border border-solid border-[#5c1a23]/20 bg-[rgba(32,9,12,0.75)] md:bg-white md:border-[#5c1a23] text-[#efe8e9] md:text-[#5c1a23] cursor-pointer hover:bg-[#5c1a23] hover:text-white transition-colors shadow-sm";

  return (
    <div className="bg-[#f2f2f2] w-full flex-1 flex flex-col justify-center pt-[24px] md:pt-[44px] pb-[20px] md:pb-[28px]">
      <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-[8px] sm:px-[16px] md:px-[56px] lg:px-[64px]">
        <div className="relative">
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
            className="flex w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[10px]"
          >
            {GALLERY_ITEMS.map((item, i) => (
              <div key={item.label} className="w-full shrink-0 snap-center flex items-center justify-center">
                {item.type === "video" ? (
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    aria-label={item.label}
                    className="w-full aspect-video max-h-[calc(100dvh-140px)] md:max-h-[calc(100dvh-168px)] rounded-[10px] bg-[#0d0d0d] object-contain"
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
                    className="block w-full border-0 bg-transparent p-0 cursor-zoom-in"
                  >
                    <img
                      alt={item.label}
                      className="w-full aspect-video max-h-[calc(100dvh-140px)] md:max-h-[calc(100dvh-168px)] rounded-[10px] object-contain"
                      src={item.src}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" aria-label="Previous portfolio item" onClick={() => scrollToSlide(slide - 1)} className={`${navBtn} left-[8px] md:-left-[48px] lg:-left-[56px]`}>
            <CaretLeft size={24} />
          </button>
          <button type="button" aria-label="Next portfolio item" onClick={() => scrollToSlide(slide + 1)} className={`${navBtn} right-[8px] md:-right-[48px] lg:-right-[56px]`}>
            <CaretRight size={24} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-[8px] mt-[14px] md:mt-[18px]">
          {GALLERY_ITEMS.map((item, idx) => (
            <button
              key={item.label}
              type="button"
              aria-label={`View ${item.label}`}
              aria-current={slide === idx ? "true" : undefined}
              onClick={() => scrollToSlide(idx)}
              className={`h-[8px] rounded-full border-0 p-0 cursor-pointer transition-all ${
                slide === idx ? "w-[24px] bg-[#5c1a23]" : "w-[8px] bg-[#5c1a23]/30 hover:bg-[#5c1a23]/60"
              }`}
            />
          ))}
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
    </div>
  );
}

function ClientCard({ file, name, zoom = "h-[400%]", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={name ? `View ${name}'s full model` : "View full model"}
      className="group relative h-[207px] w-[240px] shrink-0 overflow-hidden mask-alpha mask-no-repeat mask-size-[100%_100%] border-0 bg-transparent p-0 cursor-pointer"
      style={{ maskImage: `url("${consts.media("figma/client-card-mask.svg")}")` }}
    >
      <div className="absolute inset-0 bg-[#20090c]" />
      <img
        alt={name ? `${name} character art` : "Client character art"}
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-auto max-w-none transition-[scale,filter] duration-300 group-hover:scale-105 group-hover:brightness-110 ${zoom}`}
        src={consts.media(`clients/${file}.webp`)}
      />
      {name && (
        <div className="absolute bottom-0 left-[44px] right-0 min-h-[47px] flex items-center justify-center bg-gradient-to-t from-[#20090c] to-[rgba(32,9,12,0.5)] py-[6px] pl-[16px] pr-[10px]">
          <p className="font-cormorant italic font-bold leading-[1.15] text-[#efe8e9] text-[18px] sm:text-[20px] text-center m-0 truncate max-w-full">{name}</p>
        </div>
      )}
    </button>
  );
}

function Clients() {
  const [openIdx, setOpenIdx] = useState(null);
  const clients = consts.clients();

  return (
    <section className="bg-[#45141a] w-full py-[24px] md:py-[32px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[24px] flex flex-wrap items-start justify-center gap-y-[24px] md:gap-y-[32px]">
        {clients.map((c, idx) => (
          <ClientCard key={c.file} {...c} onClick={() => setOpenIdx(idx)} />
        ))}
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
      <main>
        <section className="min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-76px)] bg-[#f2f2f2] flex flex-col">
          <h1 className="sr-only">Portfolio</h1>
          <Gallery />
        </section>
        <section className="min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-76px)]">
          <TitleBand>Clients</TitleBand>
          <Clients />
        </section>
        <MyWork />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
