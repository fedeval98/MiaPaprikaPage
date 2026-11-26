import { useEffect, useRef, useState } from "react";
import { Navigation, ContactCTA, Footer } from "./shared.jsx";
import { consts } from "./Consts.js";

function renderInline(text, keyPrefix = "") {
  // Local regex per call: a shared global regex would have its lastIndex
  // clobbered by the recursive calls below, looping forever.
  const INLINE_RE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/gu;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, boldText, linkText, linkUrl] = match;
    const key = `${keyPrefix}${i++}`;
    if (boldText === undefined) {
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
    } else {
      nodes.push(<strong key={key}>{renderInline(boldText, key)}</strong>);
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function TableOfContents({ sections, activeId }) {
  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-[12px] w-full">
      <p className="font-raleway leading-[1.2] text-[#434344] text-[16px] uppercase m-0">Table of Contents</p>
      <div className="flex flex-col gap-[8px] border-l border-[#434344]">
        {sections.map((section) => {
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
                className={`font-raleway leading-[1.2] text-[15px] lg:text-[16px] ${
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
  const sections = consts.terms();
  const [activeId, setActiveId] = useState(sections[0].id);
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
      <section className="relative w-full overflow-hidden min-h-[calc(100dvh-60px)] md:min-h-[430px] flex items-center">
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={consts.media("figma/terms-hero-bg.webp")} />
        <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" src={consts.media("figma/noise-texture.webp")} />
        <div className="relative w-full max-w-[1440px] mx-auto px-[24px] md:px-[44px] py-[48px] md:py-[72px]">
          <div className="flex flex-col gap-[12px] items-start w-full max-w-[544px] text-[#efe8e9]">
            <h1 className="font-cormorant font-normal leading-[1.2] text-[40px] lg:text-[60px] m-0">Terms and Conditions</h1>
            <div className="font-raleway leading-[1.3] text-[16px] md:text-[18px]">
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
        className="relative w-full min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-76px)]"
        style={{ backgroundImage: `url("${consts.media("figma/terms-body-bg.webp")}")`, backgroundSize: "max(100%, 1024px) auto", backgroundRepeat: "repeat-y", backgroundPosition: "top center" }}
      >
        <div className="relative w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-start gap-[32px] md:gap-[40px] lg:gap-[64px] xl:gap-[100px] px-[24px] md:px-[48px] lg:px-[80px] xl:px-[155px] py-[40px] md:py-[70px]">
          <details className="md:hidden w-full bg-[#efe8e9]/90 border border-[#ccb8bb] rounded-[8px] px-[16px] py-[12px]">
            <summary className="font-raleway font-bold text-[#45141a] text-[15px] uppercase cursor-pointer">
              Table of Contents
            </summary>
            <div className="mt-[12px] flex flex-col gap-[8px]">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    const details = e.currentTarget.closest("details");
                    if (details) details.open = false;
                  }}
                  className="font-raleway text-[#20090c] text-[15px] no-underline hover:underline"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </details>
          <div className="shrink-0 hidden md:block w-[220px] lg:w-[250px] xl:w-[280px] sticky top-[88px]">
            <TableOfContents sections={sections} activeId={activeId} />
          </div>
          <div className="flex flex-col gap-[40px] md:gap-[64px] min-w-0 flex-1 w-full max-w-[707px]">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="scroll-mt-[84px]"
              >
                <h2 className="font-cormorant font-normal leading-[1.2] text-[#20090c] text-[32px] lg:text-[48px] m-0 mb-[12px]">
                  {section.title}
                </h2>
                <div className="px-[8px] md:px-[24px] font-raleway leading-[1.3] text-[#20090c] text-[16px] md:text-[18px] flex flex-col gap-[8px]">
                  {section.intro && <p className="m-0">{section.intro}</p>}
                  {section.items.map((item) => (
                    <p key={item} className={`m-0 break-words ${item.startsWith("- ") ? "pl-[28px]" : ""}`}>
                      {renderInline(item, `${section.id}-${item.slice(0, 16)}-`)}
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
