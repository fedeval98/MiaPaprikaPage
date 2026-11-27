import { useState } from "react";
import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import { Navigation, GroupedTabs, ButtonPrimary, MyWork, ContactCTA, Footer, SectionDots, ImageLightbox } from "./shared.jsx";
import { consts } from "./Consts.js";

function splitPriceLabel(raw) {
  const match = raw.match(/^(.*?)\s+(\$.+)$/u);
  if (!match) return { label: raw, price: null };
  const label = match[1].charAt(0).toUpperCase() + match[1].slice(1);
  return { label, price: match[2] };
}

function VtuberModels() {
  const [tab, setTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const modelTabs = consts.prices("models");
  const active = modelTabs.content[tab];
  const showcaseArt = consts.media("figma/comm-mia-full.webp");

  return (
    <section
      id="vtuber-models"
      className="relative w-full overflow-hidden max-md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),920px)] flex items-start md:items-center"
    >
      <img alt="" width={1920} height={848} fetchPriority="high" className="absolute inset-0 size-full object-cover" src={consts.media("figma/comm-hero-bg.webp")} />
      <img alt="" width={1024} height={1024} className="absolute inset-0 size-full object-cover opacity-10 pointer-events-none" src={consts.media("figma/noise-texture.webp")} />

      <div className="relative z-10 w-full max-w-360 2xl:max-w-400 mx-auto px-4 sm:px-6 md:px-10 lg:px-14 2xl:px-18 pt-4 pb-6 md:py-4 lg:py-5 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 lg:gap-12 2xl:gap-18">
        <div className="flex flex-col gap-2.5 md:gap-3 items-center text-center md:items-start md:text-left w-full md:w-[56%] lg:max-w-162 2xl:max-w-178">
          <header className="flex flex-col gap-1 items-center md:items-start w-full">
            <p className="font-raleway uppercase tracking-[0.2em] text-[#5c1a23]/80 text-[10.5px] sm:text-[11px] m-0">
              Live2D Artwork &amp; Rigging
            </p>
            <h1 className="font-cormorant font-normal leading-[1.05] text-[#20090c] text-[36px] sm:text-[40px] lg:text-[44px] 2xl:text-[54px] m-0">
              Vtuber Models
            </h1>
            <div aria-hidden="true" className="flex items-center gap-3 w-32 mt-0.5">
              <span className="h-px flex-1 bg-[#5c1a23]/40" />
              <span className="size-1.5 rotate-45 bg-[#5c1a23]/75 shrink-0" />
              <span className="h-px flex-1 bg-[#5c1a23]/40 md:hidden" />
            </div>
          </header>

          <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-[#5c1a23]/12 p-4 sm:p-5 shadow-[0_12px_36px_rgba(32,9,12,0.07)] flex flex-col gap-2.5 md:gap-3">
            <GroupedTabs items={modelTabs.labels} active={tab} onChange={setTab} className="mx-auto md:mx-0 max-w-full sm:max-w-108" />

            {/* Overlap all 3 tabs in one grid cell per block on md+ so height stays steady across tabs */}
            <div className="grid w-full">
              {modelTabs.content.map((entry, idx) => (
                <div
                  key={entry.title}
                  aria-hidden={tab !== idx}
                  className={`col-start-1 row-start-1 font-raleway leading-[1.35] w-full text-[#3a161b] text-[13.5px] sm:text-[14px] flex flex-col gap-1 ${
                    tab === idx ? "block opacity-100" : "hidden md:block md:invisible md:opacity-0 md:pointer-events-none md:select-none"
                  }`}
                >
                  {entry.paragraphs.map((p) => (
                    <p key={p} className="m-0">{p}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="grid w-full pt-2 border-t border-[#5c1a23]/12">
              {modelTabs.content.map((entry, idx) => {
                const featured = entry.prices.filter((item) => item.bold);
                const extras = entry.prices.filter((item) => !item.bold);
                const splitIndex = Math.ceil(extras.length / 2);
                const extraCols = [extras.slice(0, splitIndex), extras.slice(splitIndex)];
                return (
                  <div
                    key={entry.title}
                    aria-hidden={tab !== idx}
                    className={`col-start-1 row-start-1 flex flex-col gap-2.5 w-full text-left ${
                      tab === idx ? "opacity-100" : "hidden md:flex md:invisible md:opacity-0 md:pointer-events-none md:select-none"
                    }`}
                  >
                    {featured.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {featured.map((item) => (
                          <span
                            key={item.text}
                            className="inline-flex items-center rounded-xl bg-[#5c1a23]/8 border border-[#5c1a23]/20 px-3 py-1 font-raleway font-bold text-[#3a1016] text-[12.5px] sm:text-[13.5px]"
                          >
                            {item.text}
                          </span>
                        ))}
                      </div>
                    )}
                    {extras.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 w-full items-start">
                        {extraCols.map((col) => (
                          <ul key={col[0]?.text ?? "empty"} className="font-raleway list-none m-0 p-0 flex flex-col gap-1 text-[#3a161b]">
                            {col.map((item) => (
                              <li key={item.text} className="flex items-start gap-2 leading-[1.3] text-[12.5px] md:text-[13px] wrap-break-word">
                                <span aria-hidden="true" className="mt-[0.42em] size-1.25 rotate-45 bg-[#5c1a23]/75 shrink-0" />
                                <span>{item.text}</span>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2.5 border-t border-[#5c1a23]/12 flex flex-col sm:flex-row items-center justify-between gap-2">
              <ButtonPrimary
                label="Contact"
                dark
                sizeClass="h-11 px-7 w-full sm:w-44 text-[15.5px]"
              />
              <div className="grid">
                {modelTabs.content.map((entry, idx) => (
                  <p
                    key={entry.title}
                    aria-hidden={tab !== idx || !entry.priceUpdated}
                    className={`col-start-1 row-start-1 font-raleway leading-[1.3] text-[#5c1a23]/80 text-[12px] m-0 text-center sm:text-right ${
                      tab === idx && entry.priceUpdated ? "block opacity-100" : "hidden md:block md:invisible md:opacity-0 md:pointer-events-none md:select-none"
                    }`}
                  >
                    {entry.priceUpdated || "\u00A0"}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Framed character showcase */}
        <div className="flex flex-col gap-2 items-center w-full md:flex-1 lg:max-w-136 2xl:max-w-164">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Inspect Mia Paprika Live2D model artwork in full view"
            className="group relative h-80 sm:h-92 md:h-[min(calc(100dvh-165px),540px)] w-full rounded-2xl overflow-hidden border border-[#5c1a23]/30 bg-radial from-[#4b121a] via-[#26090d] to-[#150406] shadow-[0_24px_56px_rgba(32,9,12,0.28)] cursor-zoom-in p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5c1a23]"
          >
            <img
              alt="Mia Paprika Live2D model artwork"
              width={1400}
              height={1428}
              className="absolute inset-0 size-full object-contain object-center p-2.5 sm:p-4 transition-transform duration-300 group-hover:scale-[1.02]"
              src={showcaseArt}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#1a0508]/80 backdrop-blur-sm border border-[#efe8e9]/20 px-3 py-1 font-raleway text-[12px] text-[#efe8e9]/90 opacity-85 group-hover:opacity-100 transition-opacity"
            >
              <MagnifyingGlassPlus size={14} weight="bold" />
              <span>Expand</span>
            </span>
          </button>
          <p className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-xs border border-[#5c1a23]/15 px-4 py-1 font-raleway font-medium text-[#3a1016] text-[12.5px] sm:text-[13px] text-center m-0 shadow-xs">
            {active.credit}
          </p>
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          items={[{ src: showcaseArt, alt: "Mia Paprika Live2D model artwork", caption: active.credit }]}
          index={0}
          onClose={() => setLightboxOpen(false)}
          onNav={() => {}}
        />
      )}
    </section>
  );
}

function Illustrations() {
  const [tab, setTab] = useState(0);
  const illusTabs = consts.prices("illustrations");
  const active = illusTabs.content[tab];

  return (
    <section
      id="illustrations"
      className="relative w-full overflow-hidden max-md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),880px)] flex items-start md:items-center bg-linear-to-b from-[#2e090f] via-[#21060a] to-[#160306]"
    >
      <img alt="" width={1920} height={933} loading="lazy" className="absolute inset-0 size-full object-cover opacity-55" src={consts.media("figma/comm-illus-bg.webp")} />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,34,48,0.22),transparent_70%)] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-360 2xl:max-w-400 mx-auto px-4 sm:px-6 md:px-12 lg:px-18 py-4 md:py-5 flex flex-col items-center gap-4 md:gap-5">
        <header className="flex flex-col items-center text-center gap-1">
          <p className="font-raleway uppercase tracking-[0.2em] text-[#efe8e9]/70 text-[10.5px] sm:text-[11px] m-0">
            Character &amp; Scene Artwork
          </p>
          <h2 className="font-cormorant font-normal leading-[1.08] text-[#efe8e9] text-[30px] md:text-[38px] lg:text-[44px] m-0">
            Illustrations
          </h2>
          <div aria-hidden="true" className="flex items-center gap-3 w-32 mt-0.5">
            <span className="h-px flex-1 bg-[#efe8e9]/35" />
            <span className="size-1.5 rotate-45 bg-[#efe8e9]/75 shrink-0" />
            <span className="h-px flex-1 bg-[#efe8e9]/35" />
          </div>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 lg:gap-16 xl:gap-24 w-full">
          {/* Oval-framed art sized at max zoom (2.3x) so transitions downscale instead of upscaling pixelation */}
          <div className="relative shrink-0 w-52 h-68 sm:w-60 sm:h-80 md:w-[min(276px,39dvh)] md:h-[min(368px,52dvh)] lg:w-[min(324px,43.5dvh)] lg:h-[min(432px,58dvh)] border-[5px] border-[#efe8e9]/85 border-solid rounded-[265.5px] overflow-hidden shadow-[0_24px_56px_rgba(0,0,0,0.55)] ring-1 ring-[#efe8e9]/20">
            <img
              alt={`${active.title} illustration sample`}
              width={4096}
              height={2304}
              loading="lazy"
              className="absolute w-[230%] h-[230%] left-[-71.89%] top-[-15.6%] max-w-none object-cover transition-transform duration-500 motion-reduce:transition-none"
              style={active.artStyle}
              src={consts.media("figma/comm-reward4.webp")}
            />
          </div>

          <div className="w-full md:flex-1 md:max-w-132 rounded-2xl bg-[#1a0508]/60 backdrop-blur-sm border border-[#efe8e9]/18 p-4 sm:p-6 shadow-[0_18px_48px_rgba(0,0,0,0.45)] flex flex-col gap-3 md:gap-3.5 items-center text-center md:items-start md:text-left">
            <GroupedTabs items={illusTabs.labels} active={tab} onChange={setTab} className="mx-auto md:mx-0 max-w-full sm:max-w-108" />

            <div className="w-full pb-2.5 border-b border-[#efe8e9]/15">
              <h3 className="font-cormorant font-normal leading-[1.1] text-[#efe8e9] text-[28px] lg:text-[36px] m-0">
                {active.title}
              </h3>
              <p className="font-raleway leading-[1.4] text-[#efe8e9]/85 text-[14px] sm:text-[15px] m-0 mt-1">
                Illustrations are delivered in PNG format, with both a simple background and a transparent background version.
              </p>
            </div>

            <ul className="list-none m-0 p-0 flex flex-col gap-2 w-full">
              {active.prices.map((raw) => {
                const { label, price } = splitPriceLabel(raw);
                return (
                  <li
                    key={raw}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/6 border border-[#efe8e9]/12 px-3.5 py-2 font-raleway text-[14px] sm:text-[15px] text-[#efe8e9]"
                  >
                    <span className="text-[#efe8e9]/85">{label}</span>
                    {price && <span className="font-bold text-[#9be0ff]">{price}</span>}
                  </li>
                );
              })}
            </ul>

            <ButtonPrimary
              label="Contact"
              sizeClass="h-11 px-7 w-full sm:w-44 text-[15.5px]"
              className="mt-0.5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Commissions() {
  return (
    <div className="relative">
      <Navigation />
      <SectionDots sections={consts.sections("commissions")} />
      <main id="main-content">
        <VtuberModels />
        <Illustrations />
        <MyWork />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
