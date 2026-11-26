import heroBackground from "./assets/figma/hero-background.webp";
import noiseTexture from "./assets/figma/noise-texture.webp";
import featureQuoteLeft from "./assets/figma/feature-quote-left.webp";
import statusTombstone from "./assets/figma/status-tombstone.webp";
import horizontalInset from "./assets/figma/horizontal-inset.svg";
import showcaseVideo1 from "./assets/videos/showcase-1.mp4";
import showcaseVideo1Poster from "./assets/videos/showcase-1-poster.webp";
import { Navigation, ButtonPrimary, MyWork, ContactCTA, Footer, SocialLinks, CommunityReviews, SectionDots } from "./shared.jsx";
import { consts } from "./Consts.js";

function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),920px)] flex items-center">
      <img alt="" className="absolute inset-x-0 top-0 w-full h-[112%] object-cover object-top" src={heroBackground} />
      {/* Ambient looping showcase video faded into the background with halftone screen overlay */}
      <div aria-hidden="true" className="hero-video-layer absolute pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={showcaseVideo1Poster}
          src={showcaseVideo1}
          className="size-full object-cover saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[#3a0f15]/25" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(16, 4, 6, 0.46) 1.25px, transparent 1.25px)",
            backgroundSize: "6px 6px",
          }}
        />
      </div>
      <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" src={noiseTexture} />
      <div className="relative z-10 w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-[24px] md:px-[32px] lg:px-[44px] 2xl:px-[64px] py-[40px] md:py-[56px]">
        <div className="flex flex-col gap-[14px] sm:gap-[16px] items-start w-full md:w-[50%] lg:max-w-[544px] 2xl:max-w-[640px]">
          <h1 className="font-cormorant font-normal leading-[1.15] text-[#efe8e9] text-[48px] sm:text-[54px] md:text-[52px] lg:text-[64px] 2xl:text-[78px] w-full max-w-[620px] m-0">
            Mia Paprika
          </h1>
          <p className="font-raleway leading-[1.35] w-full text-[#efe8e9] text-[17px] sm:text-[19px] md:text-[18px] 2xl:text-[22px] m-0">
            I&apos;m an artist who specialize in character design, live2D models and illustrations.
            <br aria-hidden />
            English/Spanish = OK!
          </p>
          <SocialLinks size={32} />
          <p className="font-raleway leading-[1.2] w-full text-[#efe8e9]/85 text-[13px] 2xl:text-[14px] m-0">
            Page updated 25-11-2026
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureQuote() {
  return (
    <section id="status" className="relative w-full overflow-hidden md:snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),900px)] flex items-center">
      <img alt="" className="absolute inset-x-0 bottom-0 w-full h-[118%] object-cover object-bottom" src={featureQuoteLeft} />
      <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-[16px] sm:px-[24px] md:px-[32px] lg:px-[80px] xl:px-[120px] py-[40px] md:py-[64px] flex flex-col md:flex-row items-center justify-center gap-[28px] md:gap-[32px] lg:gap-[64px] 2xl:gap-[112px]">
        <div className="flex flex-col gap-[16px] 2xl:gap-[20px] items-start w-full md:flex-1 md:max-w-[520px] 2xl:max-w-[620px] px-[8px] sm:px-0">
          <h2 className="font-cormorant font-normal leading-[1.2] text-[#262626] text-[32px] lg:text-[48px] 2xl:text-[56px] w-full m-0">
            Commission Applications — Opening October 2025
          </h2>
          <div className="font-raleway leading-[1.25] text-[#45141a] text-[16px] 2xl:text-[19px] w-full">
            <p className="mb-0 mt-0">
              Commission requests will be accepted strictly through the following form. If the form is closed, you&apos;re still welcome to reach out via DM to ask about pricing or future availability—don&apos;t hesitate to ask!{" "}
            </p>
            <p className="mb-0 mt-[16px]">Response time is usually within 1–2 days.</p>
          </div>
          <ButtonPrimary label="Contact" dark />
        </div>
        <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:w-[340px] lg:w-[440px] xl:w-[497px] 2xl:w-[560px] shrink-0">
          <img alt="" className="block w-full h-auto object-contain pointer-events-none" src={statusTombstone} />
          <div className="flex flex-col gap-[6px] sm:gap-[8px] lg:gap-[14px] items-center justify-center absolute top-[8%] bottom-[8%] left-[25%] right-[22%]">
            <p className="font-cormorant leading-[1.15] text-[#20090c] text-[24px] sm:text-[28px] lg:text-[34px] xl:text-[36px] text-center m-0">Status</p>
            <div className="h-px w-full max-w-[140px] sm:max-w-[180px] lg:max-w-[240px] relative">
              <img alt="" className="block size-full" src={horizontalInset} />
            </div>
            <p className="font-raleway leading-[1.2] text-[#20090c] text-[12px] sm:text-[14px] lg:text-[17px] xl:text-[18px] text-center m-0 whitespace-nowrap">Illustrations: Closed</p>
            <p className="font-raleway leading-[1.2] text-[#20090c] text-[12px] sm:text-[14px] lg:text-[17px] xl:text-[18px] text-center m-0 whitespace-nowrap">Live2D Art: Closed</p>
            <p className="font-raleway leading-[1.2] text-[#20090c] text-[12px] sm:text-[14px] lg:text-[17px] xl:text-[18px] text-center m-0 whitespace-nowrap">Live2D Rigging: Closed</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <Navigation />
      <SectionDots sections={consts.sections("home")} />
      <Hero />
      <FeatureQuote />
      <CommunityReviews />
      <MyWork />
      <ContactCTA />
      <Footer />
    </div>
  );
}
