import { useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import portfolio1 from "./assets/figma/portfolio-1.webp";
import portfolio2 from "./assets/figma/portfolio-2.webp";
import portfolio3 from "./assets/figma/portfolio-3.webp";
import portfolio4 from "./assets/figma/portfolio-4.webp";
import clientCardMask from "./assets/figma/client-card-mask.svg";
import showcaseVideo1 from "./assets/videos/showcase-1.mp4";
import showcaseVideo1Poster from "./assets/videos/showcase-1-poster.webp";
import showcaseVideo2 from "./assets/videos/showcase-2.mp4";
import showcaseVideo2Poster from "./assets/videos/showcase-2-poster.webp";
import { Navigation, ContactCTA, Footer, TitleBand, CommunityReviews, ImageLightbox } from "./shared.jsx";

const GALLERY_ITEMS = [
  { type: "video", src: showcaseVideo1, poster: showcaseVideo1Poster, label: "Showcase video 1" },
  { type: "video", src: showcaseVideo2, poster: showcaseVideo2Poster, label: "Showcase video 2" },
  { type: "image", src: portfolio1, label: "Portfolio artwork 1" },
  { type: "image", src: portfolio2, label: "Portfolio artwork 2" },
  { type: "image", src: portfolio3, label: "Portfolio artwork 3" },
  { type: "image", src: portfolio4, label: "Portfolio artwork 4" },
];
const GALLERY_IMAGES = GALLERY_ITEMS.filter((item) => item.type === "image");
const GALLERY_LIGHTBOX_ITEMS = GALLERY_IMAGES.map((item) => ({ src: item.src, alt: item.label }));

const clientArts = import.meta.glob("./assets/clients/*.webp", { eager: true, import: "default" });
// Full-res variants, only fetched when the lightbox shows them.
const clientArtsHd = import.meta.glob("./assets/clients-hd/*.webp", { eager: true, import: "default" });

// Newest commissions first (Drive folders 2026 -> 2022). `zoom` overrides the
// default head crop for arts whose framing needs it.
const CLIENTS = [
  { file: "besarexia-s", name: "Besaxeria" },
  { file: "vexoria", name: "Vexoria" },
  { file: "luca-lullaby", name: "LucaLullaby" },
  { file: "reo-techiya", name: "Reo Techiya" },
  { file: "moomi", name: "Moomi" },
  { file: "coventryy", name: "Coventryy" },
  { file: "megan", name: "Megan" },
  { file: "glitchy", name: "Glitchy" },
  { file: "ludo", name: "Ludo" },
  { file: "sordidj", name: "Sordidj" },
  { file: "mochi-braids", name: "Mirune Mochi" },
  { file: "lunar-elsa-v2", name: "LunarElsa" },
  { file: "may-kitsune", name: "May Kitsune" },
  { file: "vivi-fellow", name: "Vivi Fellow" },
  { file: "kabuki", name: "Kabuki" },
  { file: "octo", name: "Octo" },
  { file: "koara", name: "Koara" },
  { file: "psycho-veee", name: "Psycho Veee" },
  { file: "taiga-pipe", name: "Taiga" },
  { file: "demythical", name: "Demythical" },
  { file: "azu-ryuna", name: "AzuRyuna" },
  { file: "muimina", name: "Muimina", zoom: "h-[420%] mt-[-190px]" },
  { file: "zavalr", name: "Zavalr" },
  { file: "lunar-elsa", name: "LunarElsa", zoom: "h-[300%]" },
  { file: "demize", name: "Demize" },
  { file: "eremes-ng", name: "Eremes" },
  { file: "cuchu-nemurin", name: "CuchuNemurin" },
  { file: "galaxy", name: "Galaxy" },
  { file: "alyss-sourscream", name: "Alyss Sourscream" },
  { file: "cindyrockssch", name: "Cindyrocks" },
  { file: "coventryywt", name: "Coventryy" },
  { file: "cryoladyx", name: "CryoLadyx", zoom: "h-[420%] mt-[-180px]" },
  { file: "demythical-2022", name: "Demythical" },
  { file: "fabitoh", name: "Fabitoh", zoom: "h-[400%] mt-[-90px]" },
  { file: "girlofnox", name: "GirlOfNox" },
  { file: "grin", name: "Grin" },
  { file: "halo", name: "Halo", zoom: "h-[400%] mt-[-195px]" },
  { file: "itsfirekeeperqa", name: "Itsfirekeeperqa", zoom: "h-[300%] mt-[-95px]" },
  { file: "maevey", name: "Maevey" },
  { file: "remmychu", name: "Remmychu" },
  { file: "skatinmonkgu", name: "SkatinmonkGU" },
  { file: "soreyya", name: "Soreyya" },
  { file: "trace", name: "Träce" },
  { file: "zayaorejas", name: "Zayaorejas" },
  // 2021
  { file: "y2021-1", name: "Yasashi" },
  { file: "y2021-2", name: "Meizu" },
  { file: "y2021-3", name: "Moon" },
  { file: "y2021-4", name: "Maaka" },
  { file: "y2021-5", name: "Prelettis" },
];

const CLIENT_LIGHTBOX_ITEMS = CLIENTS.map((c) => ({
  src: clientArtsHd[`./assets/clients-hd/${c.file}.webp`] ?? clientArts[`./assets/clients/${c.file}.webp`],
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
              <div key={i} className="w-full shrink-0 snap-center flex items-center justify-center">
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
                  />
                ) : (
                  <img
                    alt={item.label}
                    onClick={() => setLightboxIdx(GALLERY_IMAGES.indexOf(item))}
                    className="w-full aspect-video max-h-[calc(100dvh-140px)] md:max-h-[calc(100dvh-168px)] rounded-[10px] object-contain cursor-zoom-in"
                    src={item.src}
                  />
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
              key={idx}
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
      style={{ maskImage: `url("${clientCardMask}")` }}
    >
      <div className="absolute inset-0 bg-[#20090c]" />
      <img
        alt={name ? `${name} character art` : "Client character art"}
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-auto max-w-none transition-[scale,filter] duration-300 group-hover:scale-105 group-hover:brightness-110 ${zoom}`}
        src={clientArts[`./assets/clients/${file}.webp`]}
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

  return (
    <section className="bg-[#45141a] w-full py-[24px] md:py-[32px]">
      <div className="max-w-[1440px] mx-auto px-[16px] md:px-[24px] flex flex-wrap items-start justify-center gap-y-[24px] md:gap-y-[32px]">
        {CLIENTS.map((c, idx) => (
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
      <section className="min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-76px)] bg-[#f2f2f2] flex flex-col">
        <h1 className="sr-only">Portfolio</h1>
        <Gallery />
      </section>
      <section className="min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-76px)]">
        <TitleBand>Clients</TitleBand>
        <Clients />
      </section>
      <CommunityReviews />
      <ContactCTA />
      <Footer />
    </div>
  );
}
