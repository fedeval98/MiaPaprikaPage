import heroBackground from "./assets/figma/hero-background.webp";
import noiseTexture from "./assets/figma/noise-texture.webp";
import miaDesignNb1 from "./assets/figma/mia-design-nb1.webp";
import featureQuoteLeft from "./assets/figma/feature-quote-left.webp";
import statusTombstone from "./assets/figma/status-tombstone.webp";
import heroFrameGroup9 from "./assets/figma/hero-frame-group9.svg";
import horizontalInset from "./assets/figma/horizontal-inset.svg";
import { Navigation, ButtonPrimary, MyWork, ContactCTA, Footer, SocialLinks, CommunityReviews } from "./shared.jsx";

function Hero() {
  return (
    <section className="relative w-full overflow-hidden md:h-[636px]">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={heroBackground} />
      <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" src={noiseTexture} />
      <div className="relative w-full max-w-[1440px] mx-auto h-full flex flex-col md:block">
        {/* Character art, contained within the hero */}
        <img
          alt="Mia Paprika character art"
          className="order-2 self-center h-[320px] w-auto object-contain object-bottom pointer-events-none md:order-none md:absolute md:right-[150px] md:bottom-0 md:h-[96%]"
          src={miaDesignNb1}
        />
        {/* Decorative red pentagons */}
        <div className="hidden md:block absolute h-[357px] right-[40px] top-[80px] w-[162px] pointer-events-none">
          <img alt="" className="block max-w-none size-full" src={heroFrameGroup9} />
        </div>
        <div className="order-1 content-stretch flex flex-col gap-[12px] items-start px-[24px] pt-[48px] pb-[16px] w-full md:absolute md:p-0 md:left-[44px] md:top-[126px] md:w-[544px]">
          <h1 className="font-cormorant font-normal leading-[1.2] relative shrink-0 text-[#efe8e9] text-[40px] md:text-[60px] w-full max-w-[531px] m-0">
            Mia Paprika
          </h1>
          <p className="font-raleway leading-[1.2] min-w-full relative shrink-0 text-[#efe8e9] text-[18px] w-[min-content] m-0">
            I'm an artist who specialize in character design, live2D models and illustrations.
            <br aria-hidden />
            English/Spanish = OK!
          </p>
          <SocialLinks size={30} />
          <p className="font-raleway leading-[1.2] min-w-full relative shrink-0 text-[#efe8e9] text-[12px] w-[min-content] m-0">
            Page updated 09-08-2025
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureQuote() {
  return (
    <section className="relative w-full overflow-hidden md:h-[551px]">
      <img alt="" className="absolute inset-0 w-full h-full object-cover" src={featureQuoteLeft} />
      <div className="relative w-full max-w-[1440px] mx-auto h-full">
        <div className="content-stretch flex flex-col gap-[32px] px-[24px] py-[48px] md:absolute md:flex-row md:items-center md:justify-between md:gap-0 md:p-0 md:left-[155px] md:top-[102px] md:w-[1132px]">
          <div className="content-stretch flex flex-col gap-[16px] items-start relative w-full md:w-[500px] shrink-0">
            <h2 className="font-cormorant font-normal leading-[1.2] relative shrink-0 text-[#262626] text-[32px] md:text-[48px] w-full m-0">
              Commission Applications — Opening October 2025
            </h2>
            <div className="font-raleway leading-[0] relative shrink-0 text-[#45141a] text-[16px] w-full whitespace-pre-wrap">
              <p className="leading-[1.2] mb-0 mt-0">
                Commission requests will be accepted strictly through the following form. If the form is closed, you're still welcome to reach out via DM to ask about pricing or future availability—don't hesitate to ask!{" "}
              </p>
              <p className="leading-[1.2] mb-0 mt-0">&#8203;</p>
              <p className="leading-[1.2] m-0">Response time is usually within 1–2 days.</p>
            </div>
            <ButtonPrimary label="Application" dark />
          </div>
          <div className="hidden md:block h-[360px] relative shrink-0 w-[497px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={statusTombstone} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start mx-auto pb-[48px] w-[250px] md:absolute md:mx-0 md:pb-0 md:left-[914px] md:top-[185px] md:w-[250.648px]">
          <p className="font-cormorant leading-[1.2] relative shrink-0 text-[#20090c] text-[36px] text-center w-full m-0">Status</p>
          <div className="h-px relative shrink-0 w-full">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={horizontalInset} />
          </div>
          <p className="font-raleway leading-[1.2] relative shrink-0 text-[#20090c] text-[18px] text-center w-full m-0">Illustrations: Closed</p>
          <p className="font-raleway leading-[1.2] relative shrink-0 text-[#20090c] text-[18px] text-center w-full m-0">Live2D Art: Closed</p>
          <p className="font-raleway leading-[1.2] relative shrink-0 text-[#20090c] text-[18px] text-center w-full m-0">Live2D Rigging: Closed</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <FeatureQuote />
      <CommunityReviews />
      <MyWork />
      <ContactCTA />
      <Footer />
    </div>
  );
}
