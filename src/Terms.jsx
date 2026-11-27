import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
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
          className="font-semibold text-[#5c1a23] underline decoration-[#5c1a23]/45 underline-offset-3 hover:decoration-[#5c1a23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c1a23] rounded-xs transition-colors"
        >
          {renderInline(linkText, key)}
        </a>
      );
    } else {
      nodes.push(
        <strong key={key} className="font-semibold text-[#20090c]">
          {renderInline(boldText, key)}
        </strong>
      );
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function groupSectionItems(items) {
  const grouped = [];
  for (const raw of items) {
    if (raw.startsWith("- ") && grouped.length > 0) {
      grouped[grouped.length - 1].subItems.push(raw.slice(2));
    } else {
      grouped.push({
        text: raw.replace(/^❥\s*/u, ""),
        subItems: [],
      });
    }
  }
  return grouped;
}

function TermsOrnament() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3.5 w-full max-w-64 my-1">
      <span className="h-px flex-1 bg-[#efe8e9]/45" />
      <span className="size-2 rotate-45 border border-[#efe8e9]/80 bg-[#efe8e9]/20 shrink-0" />
      <span className="h-px flex-1 bg-[#efe8e9]/45" />
    </div>
  );
}

function TableOfContents({ sections, activeId }) {
  return (
    <nav
      aria-label="Table of contents"
      className="bg-white/85 backdrop-blur-sm border border-[#5c1a23]/12 rounded-2xl p-5 shadow-[0_8px_28px_rgba(32,9,12,0.06)] flex flex-col gap-3 w-full"
    >
      <div className="flex items-baseline justify-between pb-2.5 border-b border-[#5c1a23]/15">
        <p className="font-cormorant font-semibold leading-[1.2] text-[#20090c] text-[22px] m-0">
          Table of Contents
        </p>
        <span className="font-raleway text-[11px] uppercase tracking-[0.14em] text-[#5c1a23]/75">
          {sections.length} sections
        </span>
      </div>
      <ol className="list-none m-0 p-0 flex flex-col gap-0.5">
        {sections.map((section, idx) => {
          const isActive = activeId === section.id;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg no-underline border-l-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c1a23] ${
                  isActive
                    ? "bg-[#5c1a23]/10 border-[#5c1a23] text-[#45141a] font-semibold"
                    : "border-transparent text-[#434344] hover:text-[#20090c] hover:bg-[#5c1a23]/5"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`font-cormorant italic text-[14px] leading-tight pt-0.5 shrink-0 ${
                    isActive ? "text-[#5c1a23]" : "text-[#5c1a23]/55"
                  }`}
                >
                  {num}
                </span>
                <span className="font-raleway leading-[1.3] text-[13.5px] lg:text-[14px]">
                  {section.title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <div className="pt-2.5 mt-1 border-t border-[#5c1a23]/15 flex items-center justify-between gap-2 text-[12.5px] font-raleway">
        <a
          href="#terms-hero"
          className="text-[#434344] hover:text-[#5c1a23] no-underline transition-colors"
        >
          Back to top
        </a>
        <a
          href="#contact"
          className="font-semibold text-[#5c1a23] hover:text-[#3a1016] no-underline transition-colors"
        >
          Contact form →
        </a>
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
      { rootMargin: "-18% 0px -68% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main id="main-content">
        {/* Full-viewport editorial hero on desktop & mobile */}
        <section
          id="terms-hero"
          className="relative w-full overflow-hidden min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-76px)] flex items-center"
        >
          <img
            alt=""
            width={1920}
            height={729}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
            src={consts.media("figma/terms-hero-bg.webp")}
          />
          <img
            alt=""
            width={1024}
            height={1024}
            className="absolute inset-0 size-full object-cover opacity-30 pointer-events-none"
            src={consts.media("figma/noise-texture.webp")}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-[#23060a]/55 via-[#2e090f]/25 to-[#160306]/75 pointer-events-none"
          />

          <div className="relative z-10 w-full max-w-360 mx-auto px-5 sm:px-8 lg:px-12 py-10 md:py-14 flex flex-col items-center text-center">
            <div className="flex flex-col items-center gap-4 md:gap-5 w-full max-w-2xl lg:max-w-3xl text-[#efe8e9]">
              <p className="font-raleway uppercase tracking-[0.22em] text-[#efe8e9]/75 text-[11px] sm:text-[12px] m-0">
                Commission Guidelines &amp; Policy
              </p>
              <h1 className="font-cormorant font-normal leading-[1.08] text-[42px] sm:text-[52px] md:text-[60px] lg:text-[70px] 2xl:text-[78px] m-0 text-balance drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
                Terms and Conditions
              </h1>
              <TermsOrnament />

              <div className="w-full mt-1 rounded-2xl bg-[#1b0509]/55 backdrop-blur-sm border border-[#efe8e9]/20 px-5 py-5 sm:px-8 sm:py-6 shadow-[0_18px_44px_rgba(0,0,0,0.4)]">
                <p className="font-raleway font-semibold uppercase tracking-[0.18em] text-[#f5ccd2] text-[12px] m-0 mb-2.5">
                  Important Disclaimer
                </p>
                <p className="font-raleway leading-[1.6] text-[#efe8e9]/95 text-[14.5px] sm:text-[16px] md:text-[17px] m-0">
                  By commissioning me, you automatically agree to the terms outlined below. Please read everything carefully. If you do not agree with these conditions, I reserve the right to decline your commission. Any form of harassment or pressure—such as persistent DMs, inappropriate comments, or attempts to bargain for a spot—will result in immediate refusal and may lead to blacklisting.
                </p>
              </div>

              <a
                href="#terms-content"
                className="mt-2 inline-flex items-center justify-center gap-2 min-h-11 rounded-full border border-[#efe8e9]/40 bg-[#efe8e9]/10 hover:bg-[#efe8e9] text-[#efe8e9] hover:text-[#45141a] px-6 py-2.5 font-raleway font-medium text-[14px] sm:text-[15px] no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dd3fc]"
              >
                <span>Read all {sections.length} sections</span>
                <CaretDown size={16} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* Terms body: sticky ToC + parchment section cards */}
        <section
          id="terms-content"
          className="relative w-full min-h-[calc(100dvh-60px)] md:min-h-[calc(100dvh-76px)]"
          style={{
            backgroundImage: `url("${consts.media("figma/terms-body-bg.webp")}")`,
            backgroundSize: "max(100%, 1024px) auto",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "top center",
          }}
        >
          <div className="relative w-full max-w-360 mx-auto flex flex-col md:flex-row items-start gap-6 md:gap-8 lg:gap-12 xl:gap-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 sm:py-10 md:py-14">
            <details className="group md:hidden w-full bg-white/85 backdrop-blur-sm border border-[#5c1a23]/15 rounded-xl shadow-[0_6px_20px_rgba(32,9,12,0.06)]">
              <summary className="list-none flex items-center justify-between gap-3 px-4 py-3.5 font-raleway font-semibold text-[#45141a] text-[14px] tracking-[0.08em] uppercase cursor-pointer">
                <span>Table of Contents ({sections.length})</span>
                <CaretDown
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                  className="text-[#5c1a23] transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <ol className="list-none m-0 px-4 pb-4 pt-2 border-t border-[#5c1a23]/12 flex flex-col gap-1.5">
                {sections.map((section, idx) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        const details = e.currentTarget.closest("details");
                        if (details) details.open = false;
                      }}
                      className="flex items-baseline gap-2.5 py-1 font-raleway text-[#20090c] text-[14.5px] no-underline hover:text-[#5c1a23]"
                    >
                      <span className="font-cormorant italic text-[#5c1a23]/75 text-[15px]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <div className="shrink-0 hidden md:block w-60 lg:w-68 xl:w-74 sticky top-24">
              <TableOfContents sections={sections} activeId={activeId} />
            </div>

            <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 min-w-0 flex-1 w-full max-w-204">
              {sections.map((section, idx) => {
                const groupedItems = groupSectionItems(section.items);
                const isFinal = section.id === "final-agreement";
                const num = String(idx + 1).padStart(2, "0");

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => (sectionRefs.current[section.id] = el)}
                    className={`scroll-mt-4 md:scroll-mt-6 rounded-2xl border px-5 py-6 sm:px-8 sm:py-7 backdrop-blur-[2px] shadow-[0_8px_28px_rgba(32,9,12,0.06)] ${
                      isFinal
                        ? "bg-[#fcf5f6]/90 border-[#5c1a23]/30"
                        : "bg-white/80 border-[#5c1a23]/12"
                    }`}
                  >
                    <header className="flex items-baseline gap-3 pb-3 mb-4 border-b border-[#5c1a23]/15">
                      <span
                        aria-hidden="true"
                        className="font-cormorant italic font-semibold text-[#5c1a23]/75 text-[22px] lg:text-[26px] leading-none shrink-0"
                      >
                        {num}
                      </span>
                      <h2 className="font-cormorant font-semibold leading-[1.15] text-[#20090c] text-[26px] sm:text-[30px] lg:text-[36px] m-0">
                        {section.title}
                      </h2>
                    </header>

                    <div className="font-raleway leading-[1.6] text-[#2b1719] text-[15px] md:text-[16px]">
                      {section.intro && (
                        <p className="font-medium text-[#20090c] m-0 mb-3">
                          {section.intro}
                        </p>
                      )}
                      <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
                        {groupedItems.map((entry) => (
                          <li key={entry.text} className="flex items-start gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.58em] size-1.5 rotate-45 bg-[#5c1a23] shrink-0"
                            />
                            <div className="min-w-0 flex-1 wrap-break-word">
                              <span>{renderInline(entry.text, `${section.id}-${entry.text.slice(0, 16)}-`)}</span>
                              {entry.subItems.length > 0 && (
                                <ul className="list-none m-0 mt-2 pl-4 border-l-2 border-[#5c1a23]/25 flex flex-col gap-1.5 text-[14.5px] md:text-[15px] text-[#3a2124]">
                                  {entry.subItems.map((sub) => (
                                    <li key={sub} className="wrap-break-word">
                                      {renderInline(sub, `${section.id}-${sub.slice(0, 16)}-`)}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
