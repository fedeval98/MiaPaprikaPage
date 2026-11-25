import { useEffect, useState } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import portfolio1 from "./assets/figma/portfolio-1.webp";
import portfolio2 from "./assets/figma/portfolio-2.webp";
import portfolio3 from "./assets/figma/portfolio-3.webp";
import portfolio4 from "./assets/figma/portfolio-4.webp";
import clientCardMask from "./assets/figma/client-card-mask.svg";
import showcaseVideo1 from "./assets/videos/showcase-1.mp4";
import showcaseVideo1Poster from "./assets/videos/showcase-1-poster.webp";
import showcaseVideo2 from "./assets/videos/showcase-2.mp4";
import showcaseVideo2Poster from "./assets/videos/showcase-2-poster.webp";
import { Navigation, ContactCTA, Footer, TitleBand, CommunityReviews } from "./shared.jsx";

const GALLERY_VIDEOS = [
  { src: showcaseVideo1, poster: showcaseVideo1Poster },
  { src: showcaseVideo2, poster: showcaseVideo2Poster },
];

const GALLERY = [portfolio1, portfolio2, portfolio3, portfolio4];

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

function Gallery() {
  return (
    <section className="bg-[#f2f2f2] w-full">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[24px] px-[24px] md:px-[127px] pb-[49px]">
        {GALLERY_VIDEOS.map((v, i) => (
          <video
            key={i}
            className="w-full rounded-[8px]"
            src={v.src}
            poster={v.poster}
            controls
            playsInline
            preload="none"
          />
        ))}
        {GALLERY.map((src, i) => (
          <img
            key={i}
            alt={`Portfolio artwork ${i + 1}`}
            className="w-full rounded-[8px] object-cover"
            src={src}
          />
        ))}
      </div>
    </section>
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
        <div className="absolute bottom-0 left-[44px] right-0 h-[47px] flex items-center justify-center bg-gradient-to-t from-[#20090c] to-[rgba(32,9,12,0.5)] p-[8px]">
          <p className="font-cormorant italic font-bold leading-[1.2] text-[#efe8e9] text-[22px] text-center m-0">{name}</p>
        </div>
      )}
    </button>
  );
}

function Lightbox({ index, onClose, onNav }) {
  const { file, name } = CLIENTS[index];
  // null = fit to screen; {x, y} = zoomed, centered on that point (percentages)
  const [zoom, setZoom] = useState(null);

  useEffect(() => setZoom(null), [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const navBtn =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-[56px] rounded-full border-0 bg-[rgba(32,9,12,0.6)] text-[#efe8e9] cursor-pointer hover:bg-[#5c1a23] transition-colors";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name || "Client model preview"}
      className="fixed inset-0 z-50 bg-[rgba(13,13,13,0.9)] flex items-center justify-center"
      onClick={onClose}
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute top-[16px] right-[16px] z-10 flex items-center justify-center size-[48px] rounded-full border-0 bg-[rgba(32,9,12,0.6)] text-[#efe8e9] cursor-pointer hover:bg-[#5c1a23] transition-colors">
        <X size={28} />
      </button>
      <button type="button" aria-label="Previous model" onClick={(e) => { e.stopPropagation(); onNav(-1); }} className={`${navBtn} left-[16px]`}>
        <CaretLeft size={32} />
      </button>
      <figure className="m-0 flex flex-col items-center gap-[8px] max-w-[85vw]" onClick={(e) => e.stopPropagation()}>
        <div
          className="overflow-hidden"
          style={{ cursor: zoom ? "zoom-out" : "zoom-in" }}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const point = { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
            setZoom(zoom ? null : point);
          }}
          onMouseMove={(e) => {
            if (!zoom) return;
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
        >
          <img
            alt={name ? `${name} full model` : "Client full model"}
            className="max-h-[82vh] max-w-full w-auto object-contain transition-transform duration-200 block"
            style={zoom ? { transform: "scale(2.5)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            src={clientArtsHd[`./assets/clients-hd/${file}.webp`] ?? clientArts[`./assets/clients/${file}.webp`]}
          />
        </div>
        {name && (
          <figcaption className="font-cormorant italic font-bold leading-[1.2] text-[#efe8e9] text-[28px] text-center">
            {name}
          </figcaption>
        )}
      </figure>
      <button type="button" aria-label="Next model" onClick={(e) => { e.stopPropagation(); onNav(1); }} className={`${navBtn} right-[16px]`}>
        <CaretRight size={32} />
      </button>
    </div>
  );
}

function Clients() {
  const [openIdx, setOpenIdx] = useState(null);

  const rows = [];
  for (let i = 0; i < CLIENTS.length; i += 6) rows.push(CLIENTS.slice(i, i + 6));
  // Never leave a single card alone in the last row: split the final 7 as 4 + 3.
  if (rows.length > 1 && rows.at(-1).length === 1) {
    const seven = rows.at(-2).concat(rows.at(-1));
    rows.splice(-2, 2, seven.slice(0, 4), seven.slice(4));
  }
  let idx = 0;
  return (
    <section className="bg-[#45141a] w-full py-[24px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[32px]">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-wrap items-start justify-center gap-y-[32px]">
            {row.map((c) => {
              const cardIdx = idx++;
              return <ClientCard key={c.file} {...c} onClick={() => setOpenIdx(cardIdx)} />;
            })}
          </div>
        ))}
      </div>
      {openIdx !== null && (
        <Lightbox
          index={openIdx}
          onClose={() => setOpenIdx(null)}
          onNav={(d) => setOpenIdx((i) => (i + d + CLIENTS.length) % CLIENTS.length)}
        />
      )}
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="relative">
      <Navigation />
      <TitleBand as="h1">Portfolio</TitleBand>
      <Gallery />
      <TitleBand>Clients</TitleBand>
      <Clients />
      <CommunityReviews />
      <ContactCTA />
      <Footer />
    </div>
  );
}
