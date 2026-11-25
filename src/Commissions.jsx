import { useState } from "react";
import commHeroBg from "./assets/figma/comm-hero-bg.webp";
import commIllusBg from "./assets/figma/comm-illus-bg.webp";
import commMiaFull from "./assets/figma/comm-mia-full.webp";
import commRewardArt from "./assets/figma/comm-reward4.webp";
import noiseTexture from "./assets/figma/noise-texture.webp";
import { Navigation, GroupedTabs, ButtonPrimary, MyWork, ContactCTA, Footer, CommunityReviews, SectionDots } from "./shared.jsx";

const COMMISSION_SECTIONS = [
  { id: "vtuber-models", label: "Vtuber Models" },
  { id: "illustrations", label: "Illustrations" },
  { id: "reviews", label: "Community" },
  { id: "work", label: "My Work" },
  { id: "contact", label: "Contact" },
];

const MODEL_TABS = {
  labels: ["Art only", "Rig only", "Art + Rig"],
  content: [
    {
      title: "Art Only",
      credit: "Provided by Mia Paprika",
      paragraphs: [
        "Artwork for Live2D models is delivered in a PSD file, fully layered and named, with high-quality cutting, under fill method, and extended textures.",
        "INCLUDES: Nude base, Model with the main outfit, one hairstyle, 5 simple expressions, Clean PNG Version of the model and their respective toggles.",
      ],
      prices: [
        { text: "Fullbody $3000 USD", bold: true },
        { text: "Halfbody $1700 USD", bold: true },
        { text: "Extras Expressions $12 - 80+ USD" },
        { text: "Hand variation $55+ USD each" },
        { text: "Pet $100 - 400+ USD" },
        { text: "Extra outfit $170 - 815+ USD" },
        { text: "Extra Hairstyle $90 - 555+ USD" },
        { text: "Character design $200+ USD" },
        { text: "Others Up to discussion" },
      ],
    },
    {
      title: "Rig includes",
      credit: "Provided by SrCalabazaVT",
      paragraphs: [
        "Head XYZ, Body XYZ, Arm Movement, Full Body Complex Physics, Disappearing jaw lineart, Breathing Eye Open/Close with Physics, Eye Smile, Eyebrows, Mouth Physics, Mouth X and Cheek puff, Hip movement, Leg movement, Sleeping animation.",
        "5 simple expressions included",
      ],
      prices: [
        { text: "Fullbody $2500 USD", bold: true },
        { text: "Halfbody $1500 USD", bold: true },
        { text: "Extras Expressions $10+ USD" },
        { text: "Animations/Animated Expressions $15 - 50+ USD" },
        { text: "Hand variation $100+ USD" },
        { text: "each Pet $155+ USD" },
        { text: "Extra outfit $115 - 750+ USD" },
        { text: "Extra Hairstyle $90 - 500+ USD" },
        { text: "Animal Ears Physics $75+ USD" },
        { text: "Animal Tail Physics $60+ USD" },
        { text: "Horns $80+ USD" },
        { text: "Tongue Out $57 USD" },
        { text: "Vbridger $300 USD + $90 with tongue" },
        { text: "Others Up to discussion" },
      ],
    },
    {
      title: "Art + Rig",
      credit: "Provided by Mia Paprika and SrCalabazaVT",
      paragraphs: [
        "The complete package: fully layered Live2D-ready artwork plus rigging, everything from the Art Only and Rig Only tiers combined.",
        "Contact me through the form below for a personalized quote.",
      ],
      prices: [
        { text: "Fullbody & Halfbody — Pricing up to discussion", bold: true },
        { text: "Includes Art Only & Rig Only base features" },
        { text: "All extras & add-ons available" },
        { text: "Personalized quote via Contact form" },
      ],
    },
  ],
};

const ILLUS_TABS = {
  labels: ["Full-Body", "Half-Body", "Portrait"],
  content: [
    {
      title: "Full-Body",
      // ponytail: one source artwork, per-tab CSS crop mirrors the Figma variants
      artStyle: { objectPosition: "50% 18%", transform: "scale(1)", transformOrigin: "55.3% 12%" },
      prices: ["head to toe $300 - 600+ (USD)", "extra character $90+ (USD)"],
    },
    {
      title: "Half-Body",
      artStyle: { objectPosition: "50% 18%", transform: "scale(1.65)", transformOrigin: "55.3% 12%" },
      prices: ["head to waist $150 - 300+ (USD)", "extra character $70+ (USD)"],
    },
    {
      title: "Portrait",
      artStyle: { objectPosition: "50% 18%", transform: "scale(2.3)", transformOrigin: "55.3% 12%" },
      prices: ["only head $70 - 200+ (USD)", "extra character $45+ (USD)"],
    },
  ],
};

function VtuberModels() {
  const [tab, setTab] = useState(0);

  return (
    <section id="vtuber-models" className="relative w-full overflow-hidden md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),920px)] flex items-center">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={commHeroBg} />
      <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" src={noiseTexture} />
      <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-[20px] sm:px-[24px] md:px-[32px] lg:px-[44px] 2xl:px-[64px] py-[28px] md:py-[36px] flex flex-col md:flex-row items-center justify-center gap-[28px] lg:gap-[48px] 2xl:gap-[80px]">
        <div className="flex flex-col gap-[10px] 2xl:gap-[14px] items-start w-full md:w-[54%] lg:max-w-[620px] 2xl:max-w-[700px]">
          <h1 className="font-cormorant font-normal leading-[1.15] text-[#20090c] text-[40px] lg:text-[54px] 2xl:text-[68px] w-full m-0">
            Vtuber Models
          </h1>
          <GroupedTabs items={MODEL_TABS.labels} active={tab} onChange={setTab} />
          {/* Overlap all 3 tabs in one grid cell per block so descriptions, lists, and CTA never shift */}
          <div className="grid w-full pt-[4px]">
            {MODEL_TABS.content.map((entry, idx) => (
              <div
                key={entry.title}
                aria-hidden={tab !== idx}
                className={`col-start-1 row-start-1 font-raleway leading-[1.35] w-full text-[#45141a] text-[15px] lg:text-[16px] 2xl:text-[19px] ${
                  tab === idx ? "visible opacity-100" : "invisible opacity-0 pointer-events-none select-none"
                }`}
              >
                {entry.paragraphs.map((p, i) => (
                  <p key={i} className="mb-0 mt-0">{p}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="grid w-full pt-[4px]">
            {MODEL_TABS.content.map((entry, idx) => {
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
                  {priceColumns.map((col, colIdx) => (
                    <ul key={colIdx} className="font-raleway list-disc w-full text-[#45141a] m-0 ps-[18px] flex flex-col gap-[4px]">
                      {col.map((item, i) => (
                        <li key={i} className="leading-[1.4] text-[13px] md:text-[14px] 2xl:text-[16px] break-words">
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
            {MODEL_TABS.content[tab].credit}
          </p>
        </div>
      </div>
    </section>
  );
}

function Illustrations() {
  const [tab, setTab] = useState(0);
  const active = ILLUS_TABS.content[tab];

  return (
    <section id="illustrations" className="relative w-full overflow-hidden md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),900px)] flex items-center">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={commIllusBg} />
      <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-[24px] md:px-[48px] xl:px-[120px] py-[48px] md:py-[64px]">
        <h2 className="font-cormorant font-normal leading-[1.2] text-[#efe8e9] text-[32px] md:text-[42px] lg:text-[48px] 2xl:text-[56px] text-center m-0 mb-[32px] md:mb-[40px]">
          Illustrations
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-[32px] md:gap-[40px] lg:gap-[88px] xl:gap-[128px] 2xl:gap-[152px]">
          {/* Oval-framed art; crop zooms per active tab */}
          <div className="relative shrink-0 w-[236px] h-[314px] sm:w-[270px] sm:h-[360px] lg:w-[330px] lg:h-[440px] 2xl:w-[400px] 2xl:h-[534px] border-[5px] border-[#efe8e9]/85 border-solid rounded-[265.5px] overflow-hidden shadow-[0_20px_48px_rgba(0,0,0,0.5)]">
            <img
              alt={`${active.title} illustration sample`}
              className="absolute inset-0 size-full object-cover transition-[transform,object-position] duration-500"
              style={active.artStyle}
              src={commRewardArt}
            />
          </div>
          <div className="flex flex-col gap-[12px] 2xl:gap-[16px] items-start w-full md:flex-1 md:max-w-[544px] 2xl:max-w-[620px]">
            <GroupedTabs items={ILLUS_TABS.labels} active={tab} onChange={setTab} />
            <h3 className="font-cormorant font-normal leading-[1.2] text-[#efe8e9] text-[32px] lg:text-[48px] 2xl:text-[54px] w-full max-w-[600px] m-0">
              {active.title}
            </h3>
            <div className="font-raleway leading-[1.35] w-full text-[#efe8e9] text-[16px] lg:text-[18px] 2xl:text-[20px]">
              <p className="mb-0 mt-0">
                Illustrations are delivered in PNG format, with both a simple background and a transparent background version.
              </p>
              <ul className="list-disc m-0 mt-[16px] ps-[27px]">
                {active.prices.map((p, i) => (
                  <li key={i} className="mb-0">
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
      <SectionDots sections={COMMISSION_SECTIONS} />
      <VtuberModels />
      <Illustrations />
      <CommunityReviews />
      <MyWork />
      <ContactCTA />
      <Footer />
    </div>
  );
}
