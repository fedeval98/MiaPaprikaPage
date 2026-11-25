import { useState } from "react";
import commHeroBg from "./assets/figma/comm-hero-bg.webp";
import commIllusBg from "./assets/figma/comm-illus-bg.webp";
import commMiaFull from "./assets/figma/comm-mia-full.webp";
import commRewardArt from "./assets/figma/comm-reward4.webp";
import noiseTexture from "./assets/figma/noise-texture.webp";
import { Navigation, GroupedTabs, MyWork, ContactCTA, Footer, CommunityReviews } from "./shared.jsx";

const MODEL_TABS = {
  labels: ["Art only", "Rig only", "Art + Rig"],
  content: [
    {
      title: "Art Only",
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
      paragraphs: [
        "The complete package: fully layered Live2D-ready artwork plus rigging, everything from the Art Only and Rig Only tiers combined.",
        "Contact me through the form below for a personalized quote.",
      ],
      prices: [{ text: "Pricing up to discussion" }],
    },
  ],
};

const ILLUS_TABS = {
  labels: ["Full-Body", "Half-Body", "Portrait"],
  content: [
    {
      title: "Full-Body",
      // ponytail: one source artwork, per-tab CSS crop mirrors the Figma variants
      artStyle: { objectPosition: "50% 35%" },
      prices: ["head to toe $300 - 600+ (USD)", "extra character $90+ (USD)"],
    },
    {
      title: "Half-Body",
      artStyle: { objectPosition: "50% 22%", transform: "scale(1.8)", transformOrigin: "49% 30%" },
      prices: ["head to waist $150 - 300+ (USD)", "extra character $70+ (USD)"],
    },
    {
      title: "Portrait",
      artStyle: { objectPosition: "50% 22%", transform: "scale(3)", transformOrigin: "49% 26%" },
      prices: ["only head $70 - 200+ (USD)", "extra character $45+ (USD)"],
    },
  ],
};

function VtuberModels() {
  const [tab, setTab] = useState(0);
  const active = MODEL_TABS.content[tab];

  return (
    <section className="relative w-full min-h-[636px] overflow-hidden">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={commHeroBg} />
      <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" src={noiseTexture} />
      <div className="relative w-full max-w-[1440px] mx-auto pb-[64px]">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] pt-[40px] w-full md:p-0 md:ml-[44px] md:mt-[72px] md:w-[544px]">
          <h1 className="font-cormorant font-normal leading-[1.2] relative shrink-0 text-[#20090c] text-[40px] md:text-[60px] w-full max-w-[531px] m-0">
            Vtuber Models
          </h1>
          <GroupedTabs items={MODEL_TABS.labels} active={tab} onChange={setTab} />
          <h2 className="font-cormorant font-normal leading-[1.2] relative shrink-0 text-[#20090c] text-[32px] md:text-[48px] w-full max-w-[531px] m-0">
            {active.title}
          </h2>
          <div className="font-raleway leading-[0] min-w-full relative shrink-0 text-[#45141a] text-[18px] w-[min-content] whitespace-pre-wrap">
            {active.paragraphs.map((p, i) => (
              <p key={i} className="leading-[1.2] mb-0 mt-0">{p}</p>
            ))}
          </div>
          <ul className="font-raleway leading-[0] list-disc min-w-full relative shrink-0 text-[#45141a] m-0 ps-[21px]">
            {active.prices.map((item, i) => (
              <li key={i} className="mb-0">
                <span className={`leading-[1.5] text-[14px] ${item.bold ? "font-bold" : ""}`}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Framed character card */}
        <div className="content-stretch flex flex-col gap-[8px] items-center mt-[32px] px-[16px] w-full md:absolute md:mt-0 md:p-0 md:left-[729px] md:top-[72px] md:w-[671px]">
          <div className="bg-[#290c10] h-[400px] md:h-[524px] relative rounded-[16px] w-full md:w-[671px] overflow-hidden">
            <img
              alt="Mia Paprika Live2D model artwork"
              className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-auto object-contain"
              src={commMiaFull}
            />
          </div>
          <p className="font-raleway leading-[1.5] min-w-full relative shrink-0 text-[#20090c] text-[14px] text-center w-[min-content] m-0">
            provided by: Mia Paprika
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
    <section className="relative w-full overflow-hidden md:h-[700px]">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={commIllusBg} />
      <div className="relative w-full max-w-[1440px] mx-auto h-full">
        <h2 className="relative pt-[40px] font-cormorant font-normal leading-[1.2] text-[#efe8e9] text-[32px] text-center m-0 md:absolute md:pt-0 md:left-0 md:right-0 md:top-[60px] md:text-[48px]">
          Illustrations
        </h2>
        <div className="content-stretch flex flex-col gap-[24px] items-center px-[24px] py-[32px] md:absolute md:flex-row md:gap-[152px] md:p-0 md:left-[167px] md:top-[118px]">
          {/* Circle-framed art; crop zooms per active tab */}
          <div className="h-[358px] w-[320px] md:h-[475px] relative shrink-0 md:w-[425px]">
            <div className="absolute border-8 border-[#5c1a23] border-solid inset-[6.74%_12.24%_0_10.12%] rounded-[265.5px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),10px_4px_0px_0px_#efe8e9]">
              <img
                alt={`${active.title} illustration sample`}
                className="absolute inset-0 size-full object-cover transition-[transform,object-position] duration-500"
                style={active.artStyle}
                src={commRewardArt}
              />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full md:w-[544px]">
            <GroupedTabs items={ILLUS_TABS.labels} active={tab} onChange={setTab} />
            <h3 className="font-cormorant font-normal leading-[1.2] relative shrink-0 text-[#efe8e9] text-[32px] md:text-[48px] w-full max-w-[531px] m-0">
              {active.title}
            </h3>
            <div className="font-raleway leading-[0] min-w-full relative shrink-0 text-[#efe8e9] text-[18px] w-[min-content]">
              <p className="leading-[1.2] mb-0 mt-0 whitespace-pre-wrap">
                Illustrations are delivered in PNG format, with both a simple background and a transparent background version.
              </p>
              <p className="leading-[1.2] mb-0 mt-0">&#8203;</p>
              <ul className="list-disc m-0 ps-[27px]">
                {active.prices.map((p, i) => (
                  <li key={i} className="mb-0">
                    <span className="leading-[1.2]">{p}</span>
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
      <VtuberModels />
      <Illustrations />
      <CommunityReviews />
      <MyWork />
      <ContactCTA />
      <Footer />
    </div>
  );
}
