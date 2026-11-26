import { useState } from "react";
import commHeroBg from "./assets/figma/comm-hero-bg.webp";
import commIllusBg from "./assets/figma/comm-illus-bg.webp";
import commMiaFull from "./assets/figma/comm-mia-full.webp";
import commRewardArt from "./assets/figma/comm-reward4.webp";
import noiseTexture from "./assets/figma/noise-texture.webp";
import { Navigation, GroupedTabs, ButtonPrimary, MyWork, ContactCTA, Footer, SectionDots } from "./shared.jsx";
import { consts } from "./Consts.js";

function VtuberModels() {
  const [tab, setTab] = useState(0);
  const modelTabs = consts.prices("models");

  return (
    <section id="vtuber-models" className="relative w-full overflow-hidden md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),920px)] flex items-center">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={commHeroBg} />
      <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" src={noiseTexture} />
      <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-[20px] sm:px-[24px] md:px-[32px] lg:px-[44px] 2xl:px-[64px] py-[28px] md:py-[36px] flex flex-col md:flex-row items-center justify-center gap-[28px] lg:gap-[48px] 2xl:gap-[80px]">
        <div className="flex flex-col gap-[10px] 2xl:gap-[14px] items-start w-full md:w-[54%] lg:max-w-[620px] 2xl:max-w-[700px]">
          <h1 className="font-cormorant font-normal leading-[1.15] text-[#20090c] text-[40px] lg:text-[54px] 2xl:text-[68px] w-full m-0">
            Vtuber Models
          </h1>
          <GroupedTabs items={modelTabs.labels} active={tab} onChange={setTab} />
          {/* Overlap all 3 tabs in one grid cell per block so descriptions, lists, and CTA never shift */}
          <div className="grid w-full pt-[4px]">
            {modelTabs.content.map((entry, idx) => (
              <div
                key={entry.title}
                aria-hidden={tab !== idx}
                className={`col-start-1 row-start-1 font-raleway leading-[1.35] w-full text-[#45141a] text-[15px] lg:text-[16px] 2xl:text-[19px] ${
                  tab === idx ? "visible opacity-100" : "invisible opacity-0 pointer-events-none select-none"
                }`}
              >
                {entry.paragraphs.map((p) => (
                  <p key={p} className="mb-0 mt-0">{p}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="grid w-full pt-[4px]">
            {modelTabs.content.map((entry, idx) => {
              const splitIndex = Math.ceil(entry.prices.length / 2);
              const priceColumns = [entry.prices.slice(0, splitIndex), entry.prices.slice(splitIndex)];
              return (
                <div
                  key={entry.title}
                  aria-hidden={tab !== idx}
                  className={`col-start-1 row-start-1 grid grid-cols-2 gap-x-[16px] sm:gap-x-[24px] gap-y-[6px] w-full items-start ${
                    tab === idx ? "visible opacity-100" : "invisible opacity-0 pointer-events-none select-none"
                  }`}
                >
                  {priceColumns.map((col) => (
                    <ul key={col[0]?.text ?? "empty"} className="font-raleway list-disc w-full text-[#45141a] m-0 ps-[18px] flex flex-col gap-[4px]">
                      {col.map((item) => (
                        <li key={item.text} className="leading-[1.4] text-[13px] md:text-[14px] 2xl:text-[16px] break-words">
                          <span className={item.bold ? "font-bold" : ""}>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              );
            })}
          </div>
          <ButtonPrimary label="Contact" dark className="mt-[8px]" />
          <div className="grid w-full">
            {modelTabs.content.map((entry, idx) => (
              <p
                key={entry.title}
                aria-hidden={tab !== idx || !entry.priceUpdated}
                className={`col-start-1 row-start-1 font-raleway leading-[1.3] text-[#45141a]/80 text-[12px] lg:text-[13px] m-0 ${
                  tab === idx && entry.priceUpdated ? "visible opacity-100" : "invisible opacity-0 pointer-events-none select-none"
                }`}
              >
                {entry.priceUpdated || "\u00A0"}
              </p>
            ))}
          </div>
        </div>
        {/* Framed character card */}
        <div className="flex flex-col gap-[8px] items-center w-full md:flex-1 lg:max-w-[600px] 2xl:max-w-[720px]">
          <div className="bg-[#290c10] h-[340px] sm:h-[400px] md:h-[420px] lg:h-[500px] 2xl:h-[620px] relative rounded-[16px] w-full overflow-hidden">
            <img
              alt="Mia Paprika Live2D model artwork"
              className="absolute inset-0 size-full object-contain object-center p-[8px] sm:p-[12px]"
              src={commMiaFull}
            />
          </div>
          <p className="font-raleway leading-[1.5] w-full text-[#20090c] text-[14px] text-center m-0">
            {modelTabs.content[tab].credit}
          </p>
        </div>
      </div>
    </section>
  );
}

function Illustrations() {
  const [tab, setTab] = useState(0);
  const illusTabs = consts.prices("illustrations");
  const active = illusTabs.content[tab];

  return (
    <section id="illustrations" className="relative w-full overflow-hidden md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),900px)] flex items-center">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={commIllusBg} />
      <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-[24px] md:px-[48px] xl:px-[120px] py-[48px] md:py-[64px]">
        <h2 className="font-cormorant font-normal leading-[1.2] text-[#efe8e9] text-[32px] md:text-[42px] lg:text-[48px] 2xl:text-[56px] text-center m-0 mb-[32px] md:mb-[40px]">
          Illustrations
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-[32px] md:gap-[40px] lg:gap-[88px] xl:gap-[128px] 2xl:gap-[152px]">
          {/* Oval-framed art sized at max zoom (2.3x) so transitions downscale instead of upscaling pixelation */}
          <div className="relative shrink-0 w-[236px] h-[314px] sm:w-[270px] sm:h-[360px] lg:w-[330px] lg:h-[440px] 2xl:w-[400px] 2xl:h-[534px] border-[5px] border-[#efe8e9]/85 border-solid rounded-[265.5px] overflow-hidden shadow-[0_20px_48px_rgba(0,0,0,0.5)]">
            <img
              alt={`${active.title} illustration sample`}
              className="absolute w-[230%] h-[230%] left-[-71.89%] top-[-15.6%] max-w-none object-cover transition-transform duration-500"
              style={active.artStyle}
              src={commRewardArt}
            />
          </div>
          <div className="flex flex-col gap-[12px] 2xl:gap-[16px] items-start w-full md:flex-1 md:max-w-[544px] 2xl:max-w-[620px]">
            <GroupedTabs items={illusTabs.labels} active={tab} onChange={setTab} />
            <h3 className="font-cormorant font-normal leading-[1.2] text-[#efe8e9] text-[32px] lg:text-[48px] 2xl:text-[54px] w-full max-w-[600px] m-0">
              {active.title}
            </h3>
            <div className="font-raleway leading-[1.35] w-full text-[#efe8e9] text-[16px] lg:text-[18px] 2xl:text-[20px]">
              <p className="mb-0 mt-0">
                Illustrations are delivered in PNG format, with both a simple background and a transparent background version.
              </p>
              <ul className="list-disc m-0 mt-[16px] ps-[27px]">
                {active.prices.map((p) => (
                  <li key={p} className="mb-0">
                    <span className="leading-[1.3]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
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
      <VtuberModels />
      <Illustrations />
      <MyWork />
      <ContactCTA />
      <Footer />
    </div>
  );
}
