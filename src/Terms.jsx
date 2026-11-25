import { useEffect, useRef, useState } from "react";
import termsHeroBg from "./assets/figma/terms-hero-bg.webp";
import noiseTexture from "./assets/figma/noise-texture.webp";
import termsBodyBg from "./assets/figma/terms-body-bg.webp";
import { Navigation, ContactCTA, Footer } from "./shared.jsx";

// Bullets support **bold** and [label](url) inline markers, straight from the Figma copy.
const SECTIONS = [
  {
    id: "general-information",
    title: "General Information",
    items: [
      "❥ Before purchasing **please contact me via DM to check availability**, as I open limited slots per waiting list.",
      "❥ **Returning clients have priority** and may be accepted sooner depending on availability.",
      "❥ Models illustrated by Mia Paprika also receive prioritization.",
      "❥ Clients who fail to credit me will not receive priority in future commissions.",
      "❥ Submitting a form or inquiry does not guarantee acceptance.",
      "❥ I accept up to 2–4 commissions per open waitlist.",
      "❥ **All commissions are digital goods only** —no physical products will be shipped.",
      "❥ Commissions are for personal use unless you purchase commercial rights.",
      "❥ Live2D models include usage rights for monetized content creation (e.g., VTubing, streaming).",
      "❥ Pricing may vary depending on character design complexity, detail level, or custom requests.",
      "❥ Commissions are completed in the order of acceptance from the waitlist, unless a priority slot is purchased.",
    ],
  },
  {
    id: "payment-and-pricing",
    title: "Payment and Pricing",
    items: [
      "❥ Work will not begin until full payment is received.",
      "❥ To join the waitlist, a 50% deposit of the base price is required. The remaining balance must be paid before we start working.",
      "❥ **Payment plans are available**, up to a maximum of 4 installments, to offer flexibility.",
      "❥ We accept **payments** through **PayPal, Wise, or stable cryptocurrencies** (such as USDT). **Wise and USDT are preferred due to lower processing fees.**",
      "❥ **Prices listed include PayPal fees.** A 10% discount applies to payments made via Wise or USDT.",
      "❥ Characters with highly detailed, intricate designs or high complexity, level of detail, or custom requests may result in additional fees.",
      "❥ Pricing is subject to change over time as my skill and demand evolve. **Your quote is only guaranteed and freezed once you've joined the waitlist.**",
      "❥ If it's your turn on the list but you haven't paid in full, **your price will remain locked for 3 months.** After that, updated pricing applies.",
    ],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    items: [
      "❥ **We do not offer refunds under any circumstances.**",
      "❥ We will continue to make adjustments and revisions until you're satisfied with the final result.",
      "❥ If you're unable to complete your payment plan, your commission will be paused until the issue is resolved. You may also request to switch your original order for something of lower value, so you don't lose your investment or have to wait longer than necessary. (Example: if you paid 50% for a VTuber model art but unexpectedly can't afford the remaining half, you can ask to use the amount already paid for illustrations or animations instead.)",
      "❥ **Please make sure you're confident in your decision before sending payment, as my country's financial system makes refunds impossible.**",
    ],
  },
  {
    id: "deadlines-and-work-schedule",
    title: "Deadlines and Work Schedule",
    items: [
      "❥ You'll receive an estimated completion time after acceptance.",
      "❥ Deadlines must be clearly discussed and agreed upon beforehand.",
      "❥ Approximate turnaround times:",
      "- Illustrations: 2–6 days.",
      "- Live2D Art or Rig Only: Around 2 months each.",
      "- Full Live2D Model: Typically 3–4+ months total.",
      "❥ We'll provide updates at key stages. If you'd like more frequent progress reports, feel free to ask.",
      "❥ Life happens—delays may occur due to unforeseen or personal matters. I will always communicate if any issues arise.",
    ],
  },
  {
    id: "revisions",
    title: "Revisions",
    items: [
      "❥ **Revisions should be requested during the sketch phase**—pose, expression, design tweaks, etc. Please be clear early on.",
      "❥ **I'm not a character designer**, so it's important to provide a character sheet or detailed reference. If you still want me to create your design, note that it's not my specialty—I recommend arriving with a pre-made ref sheet.",
      "❥ Once the sketch is approved, significant changes like a new pose or outfit will require a 50% additional fee.",
      "❥ A couple of color edits are fine, depending on the project.",
      "❥ Always try to give clear, specific feedback to help me bring your vision to life.",
    ],
  },
  {
    id: "usage-rights-and-copyright",
    title: "Usage Rights and Copyright",
    items: [
      "❥ I retain full ownership and copyright unless you purchase commercial rights.",
      "❥ You may use the commissioned work personally (icons, banners, posts) with proper credit.",
      "❥ My work may not be used for AI training, NFT creation, or blockchain purposes.",
      "❥ **Please credit: [@miapaprika](https://x.com/MiaPaprika) (for art) and [@SrCalabazaVT](https://x.com/SrCalabazaVT) (for rigging).**",
      "❥ No tracing, editing, or unauthorized modifications are allowed.",
      "❥ Recoloring Live2D assets via VTube Studio is permitted.",
      "❥ We may share WIPs or completed work on my social media or portfolio. Let me know if you'd prefer not to be tagged.",
      "❥ A 15% confidentiality fee applies if you want the project kept entirely private.",
    ],
  },
  {
    id: "communication-and-client-responsibility",
    title: "Communication and Client Responsibility",
    items: [
      "❥ **I prefer to communicate via Twitter or Discord.** If you contact me elsewhere and it's not comfortable for communication, I may redirect you.",
      "❥ Be courteous and responsive.",
      "❥ Failing to reply within a reasonable time may delay your commission.",
      "❥ If you become inactive for more than a month, your commission will be placed on hold.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      "❥ Final deliverables may include .png, .jpg, .psd or compressed .zip files.",
      "❥ Files will be sent via Google Drive.",
      "❥ Make sure to download your files within 30 days. **We do not provide long-term storage.**",
    ],
  },
  {
    id: "commercial-use-and-extra-fees",
    title: "Commercial Use and Extra Fees",
    items: [
      "❥ Purchasing **commercial rights adds 50% to 200% to the base cost**, depending on use.",
      "❥ **Do not monetize, resell, or reproduce my work without proper licensing.**",
      "❥ Commercial use includes ads, merchandise, promotions, or sponsored content.",
    ],
  },
  {
    id: "blacklisting-and-denial-of-service",
    title: "Blacklisting and Denial of Service",
    items: [
      "❥ We reserve the right to blacklist you if:",
      "- You fail to credit our work.",
      "- You act rudely or disrespectfully.",
      "- You cross professional boundaries or ignore these terms.",
      "- You attempt to bypass the no-refund policy.",
      "❥ **Blacklisted clients are permanently denied future services.**",
    ],
  },
  {
    id: "live2d-rigging",
    title: "Live2D Rigging (Rig-only Terms)",
    items: [
      "❥ I, Mia, am not the one who rig the models, I'm only the artist and main tester, **the rigger is [SrCalabazaVT](https://x.com/SrCalabazaVT)**, we work together and I'm in charge of all communication and payments, but you can request to speak directly with him if you have any specific doubt, all the TOS mentioned above apply the same for the rigs.",
      "❥ If I'm only handling the rig, you **must provide a clean and properly layered PSD.**",
      "❥ If your artist cannot make required edits, additional charges will apply.",
      "❥ I do not separate or redraw parts. **Rig quality depends on PSD quality.**",
      "❥ **Final files include a VTS-ready folder**, not the original .cmo3 file.",
      "❥ **I do not share .cmo3 source files under any circumstance.**",
      "❥ Estimated **rigging time is 1–3 months**, depending on complexity.",
      "❥ Each commission includes a limit of:",
      "- 1 alternate outfit",
      "- 3 extra hairstyles",
      "- 3 arm toggles",
      "❥ If you want more features, you'll need to reapply to the waitlist (you will receive priority).",
      "❥ Keep in mind that **advanced motions (e.g., walking, leaning) may cause toggle conflicts.** Additional fees may apply if too many features are requested at once.",
      "❥ I provide support only for use inside VTube Studio and VBridger—I cannot assist with other programs.",
      "❥ **Models are fully tested before delivery.** You have 2 months to request any corrections for free.",
    ],
  },
  {
    id: "final-agreement",
    title: "Final Agreement",
    intro: "By commissioning us, you agree to the following:",
    items: [
      "❥ **You've read and accepted all terms.**",
      "❥ **You will credit us** accordingly.",
      "❥ You won't use the work in AI, NFTs, or blockchain-related content.",
      "❥ You will communicate respectfully and promptly.",
      "❥ You understand that **refunds are not available.**",
      "❥ **Violating these terms may result in permanent blacklisting.**",
    ],
  },
];

function renderInline(text, keyPrefix = "") {
  // Local regex per call: a shared global regex would have its lastIndex
  // clobbered by the recursive calls below, looping forever.
  const INLINE_RE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, boldText, linkText, linkUrl] = match;
    const key = `${keyPrefix}${i++}`;
    if (boldText !== undefined) {
      nodes.push(<strong key={key}>{renderInline(boldText, key)}</strong>);
    } else {
      nodes.push(
        <a
          key={key}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 text-[#5c1a23]"
        >
          {renderInline(linkText, key)}
        </a>
      );
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function TableOfContents({ activeId }) {
  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-[12px] w-[280px]">
      <p className="font-raleway leading-[1.2] text-[#434344] text-[16px] uppercase m-0">Table of Contents</p>
      <div className="flex flex-col gap-[8px] border-l border-[#434344]">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`flex px-[8px] -ml-px no-underline transition-colors duration-300 ${
                isActive ? "border-l-[3px] border-[#45141a]" : "border-l border-[#434344]"
              }`}
            >
              <span
                className={`font-raleway leading-[1.2] text-[16px] ${
                  isActive ? "font-bold text-[#45141a]" : "font-normal text-[#434344]"
                }`}
              >
                {section.title}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default function Terms() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <Navigation />

      {/* Hero */}
      <section className="relative w-full overflow-hidden md:h-[430px]">
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={termsHeroBg} />
        <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" src={noiseTexture} />
        <div className="relative w-full max-w-[1440px] mx-auto h-full">
          <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[48px] w-full md:absolute md:p-0 md:left-[44px] md:top-[90px] md:w-[544px] text-[#efe8e9]">
            <h1 className="font-cormorant font-normal leading-[1.2] text-[40px] md:text-[60px] m-0">Terms and Conditions</h1>
            <div className="font-raleway leading-[1.2] text-[18px]">
              <p className="mb-0 mt-0">Disclaimer</p>
              <p className="m-0">
                By commissioning me, you automatically agree to the terms outlined below. Please read everything carefully. If you do not agree with these conditions, I reserve the right to decline your commission. Any form of harassment or pressure—such as persistent DMs, inappropriate comments, or attempts to bargain for a spot—will result in immediate refusal and may lead to blacklisting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms body: sticky ToC + sections */}
      <section
        className="relative w-full"
        style={{ backgroundImage: `url("${termsBodyBg}")`, backgroundSize: "1440px auto", backgroundRepeat: "repeat" }}
      >
        <div className="relative w-full max-w-[1440px] mx-auto flex gap-[100px] px-[24px] py-[40px] md:px-[155px] md:py-[70px]">
          <div className="shrink-0 hidden md:block">
            <div className="sticky top-[40px]">
              <TableOfContents activeId={activeId} />
            </div>
          </div>
          <div className="flex flex-col gap-[64px] max-w-[707px]">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="scroll-mt-[40px]"
              >
                <h2 className="font-cormorant font-normal leading-[1.2] text-[#20090c] text-[32px] md:text-[48px] m-0 mb-[12px]">
                  {section.title}
                </h2>
                <div className="px-[8px] md:px-[24px] font-raleway leading-[1.2] text-[#20090c] text-[16px] md:text-[18px] flex flex-col gap-[8px]">
                  {section.intro && <p className="m-0">{section.intro}</p>}
                  {section.items.map((item, i) => (
                    <p key={i} className={`m-0 ${item.startsWith("- ") ? "pl-[28px]" : ""}`}>
                      {renderInline(item, `${section.id}-${i}-`)}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
}
