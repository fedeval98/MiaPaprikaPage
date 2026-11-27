import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, ButtonPrimary, MyWork, ContactCTA, Footer, SocialLinks, CommunityReviews, SectionDots } from "./shared.jsx";
import { consts } from "./Consts.js";

function Hero() {
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (navigator.connection?.saveData || reducedMotion.matches) return;
    const start = () => setVideoSrc(consts.media("videos/showcase-1.mp4"));

    const onMotionChange = (e) => {
      if (e.matches) videoRef.current?.pause();
    };
    reducedMotion.addEventListener("change", onMotionChange);

    if (!window.matchMedia("(min-width: 768px)").matches) {
      const events = ["pointerdown", "touchstart", "scroll", "keydown"];
      const onInteract = () => {
        events.forEach((ev) => window.removeEventListener(ev, onInteract));
        start();
      };
      events.forEach((ev) => window.addEventListener(ev, onInteract, { once: true, passive: true }));
      return () => {
        reducedMotion.removeEventListener("change", onMotionChange);
        events.forEach((ev) => window.removeEventListener(ev, onInteract));
      };
    }

    const queueVideo = () => {
      if ("requestIdleCallback" in window) {
        const idleId = window.requestIdleCallback(start);
        return () => window.cancelIdleCallback(idleId);
      }
      const timerId = window.setTimeout(start, 150);
      return () => window.clearTimeout(timerId);
    };
    if (document.readyState === "complete") {
      const cancelIdle = queueVideo();
      return () => {
        reducedMotion.removeEventListener("change", onMotionChange);
        cancelIdle();
      };
    }
    let cancelIdle = () => {};
    const onLoad = () => {
      cancelIdle = queueVideo();
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("load", onLoad);
      cancelIdle();
    };
  }, []);

  useEffect(() => {
    if (videoSrc) {
      videoRef.current?.play().catch(() => {});
    }
  }, [videoSrc]);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),920px)] flex items-center bg-[#2a080d]"
    >
      <img
        alt=""
        width={1920}
        height={887}
        fetchPriority="high"
        className="absolute inset-x-0 top-0 w-full h-[112%] object-cover object-top"
        src={consts.media("figma/hero-background.webp")}
      />
      {/* Ambient looping showcase video faded into the background with halftone screen overlay */}
      <div aria-hidden="true" className="hero-video-layer absolute pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={consts.media("videos/showcase-1-poster.webp")}
          src={videoSrc ?? undefined}
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
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-[#1a0408]/80 via-[#24060b]/50 to-[#160306]/45 md:to-transparent pointer-events-none"
      />
      <img
        alt=""
        fetchPriority="low"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-30 pointer-events-none"
        src={consts.media("figma/noise-texture.webp")}
      />

      <div className="relative z-10 w-full max-w-360 2xl:max-w-420 mx-auto px-5 sm:px-8 lg:px-12 2xl:px-16 py-8 md:py-12">
        <div className="flex flex-col gap-3.5 sm:gap-4 items-center text-center md:items-start md:text-left w-full md:w-[56%] lg:max-w-146 2xl:max-w-168">
          <p className="font-raleway uppercase tracking-[0.22em] text-[#efe8e9]/75 text-[10.5px] sm:text-[11px] m-0">
            Live2D Artist &amp; Character Illustrator
          </p>
          <h1 className="font-cormorant font-normal leading-[1.04] text-[#efe8e9] text-[48px] sm:text-[58px] lg:text-[68px] 2xl:text-[80px] m-0 drop-shadow-[0_6px_22px_rgba(0,0,0,0.45)]">
            Mia Paprika
          </h1>
          <div aria-hidden="true" className="flex items-center gap-3 w-36">
            <span className="h-px flex-1 bg-[#efe8e9]/40" />
            <span className="size-1.5 rotate-45 bg-[#efe8e9]/75 shrink-0" />
            <span className="h-px flex-1 bg-[#efe8e9]/40 md:hidden" />
          </div>

          <p className="font-raleway leading-[1.5] w-full max-w-lg text-[#efe8e9]/92 text-[16px] sm:text-[18px] 2xl:text-[20px] m-0">
            I&apos;m an artist who specialize in character design, live2D models and illustrations.{" "}
            <span className="inline-block font-semibold text-[#9be0ff]">English / Spanish = OK!</span>
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            <Link
              to="/commissions"
              className="inline-flex items-center justify-center h-10.5 px-6 rounded-[5px] bg-[#efe8e9] hover:bg-white text-[#5c1a23] font-roboto font-medium text-[15.5px] no-underline transition-colors shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dd3fc]"
            >
              View Commissions
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center h-10.5 px-6 rounded-[5px] border border-[#efe8e9]/40 bg-[#1a0508]/55 hover:bg-[#efe8e9]/15 backdrop-blur-xs text-[#efe8e9] font-roboto text-[15.5px] no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7dd3fc]"
            >
              Explore Portfolio
            </Link>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2 pt-1.5">
            <SocialLinks
              size={26}
              className="justify-center md:justify-start rounded-full bg-[#1a0508]/55 backdrop-blur-xs border border-[#efe8e9]/15 px-4 py-2"
            />
            <p className="font-raleway leading-[1.2] text-[#efe8e9]/70 text-[12px] m-0">
              Page updated 25-11-2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusOrnament() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3.5 w-full my-0.5">
      <span className="h-px flex-1 bg-[#5c1a23]/45" />
      <svg width="15" height="19" viewBox="0 0 16 20" fill="none" className="shrink-0 text-[#4a151c]">
        <path
          d="M8.7 1.2C7.1 3.7 7.4 5.5 8.8 7C6.1 6.7 3.2 8.7 3.2 12.1C3.2 15.6 5.6 18.2 8.8 18.2C11.9 18.2 14 15.7 14 12.6C14 8.5 10.1 6.3 8.7 1.2Z"
          fill="currentColor"
        />
        <circle cx="8.5" cy="13.1" r="2.1" fill="#f3eced" />
      </svg>
      <span className="h-px flex-1 bg-[#5c1a23]/45" />
    </div>
  );
}

function FeatureQuote() {
  const statusItems = consts.status();
  const anyOpen = statusItems.some((item) => item.open);

  return (
    <section
      id="status"
      className="relative w-full overflow-hidden bg-[#f2eced] snap-start min-h-[calc(100dvh-60px)] md:min-h-[min(calc(100dvh-76px),900px)] flex items-center"
    >
      <img
        alt=""
        loading="lazy"
        className="absolute inset-x-0 bottom-0 w-full h-[118%] object-cover object-bottom"
        src={consts.media("figma/feature-quote-left.webp")}
      />

      <div className="relative z-10 w-full max-w-340 2xl:max-w-380 mx-auto px-4 sm:px-6 md:px-10 py-4 md:py-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 lg:gap-10">
        <div className="flex flex-col gap-2.5 lg:gap-3.5 items-center text-center md:items-start md:text-left w-full md:flex-1 md:max-w-108 lg:max-w-124">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-xs border border-[#5c1a23]/15 px-3.5 py-1 shadow-xs">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${anyOpen ? "bg-[#11552b]" : "bg-[#7a151e]"}`}
            />
            <span className="font-raleway uppercase tracking-[0.16em] text-[#45141a] text-[10.5px] font-semibold">
              {anyOpen ? "Commissions Open" : "Waitlist & Form Status"}
            </span>
          </div>

          <h2 className="font-cormorant font-normal text-balance leading-[1.06] text-[#3a1016] text-[28px] sm:text-[34px] lg:text-[40px] xl:text-[46px] w-full m-0">
            Commission Applications — Opening October 2025
          </h2>

          <StatusOrnament />

          <div className="w-full rounded-2xl bg-white/80 backdrop-blur-sm border border-[#5c1a23]/12 p-4 sm:p-5 shadow-[0_10px_30px_rgba(32,9,12,0.06)] flex flex-col gap-3 items-center md:items-start">
            <div className="font-raleway leading-[1.45] text-[#2b1719] text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] w-full">
              <p className="m-0">
                Commission requests will be accepted strictly through the following form. If the form is closed, you&apos;re still welcome to reach out via DM to ask about pricing or future availability—don&apos;t hesitate to ask!
              </p>
              <p className="m-0 mt-2 font-medium text-[#5c1a23]">
                Response time is usually within 1–2 days.
              </p>
            </div>
            <ButtonPrimary
              label="Contact"
              dark
              sizeClass="h-10.5 px-7 w-full sm:w-56 text-[16px]"
            />
          </div>
        </div>

        <div className="relative w-[84%] max-w-78 sm:w-full sm:max-w-108 md:w-[min(420px,54dvh*1.27)] lg:w-[min(560px,62dvh*1.27)] xl:w-[min(640px,64dvh*1.27)] shrink-0">
          <img
            alt=""
            width={1220}
            height={960}
            loading="lazy"
            className="block w-full h-auto object-contain pointer-events-none drop-shadow-[0_18px_36px_rgba(32,9,12,0.16)]"
            src={consts.media("figma/status-tombstone.webp?v=2")}
          />
          <div className="flex flex-col gap-1 lg:gap-1.5 items-center justify-center absolute top-[15%] bottom-[38%] left-[28%] right-[30%]">
            <p className="font-cormorant font-medium leading-[1.1] text-[#3f1118] text-[18px] sm:text-[22px] lg:text-[26px] xl:text-[30px] text-center m-0">
              Status
            </p>
            <div
              aria-hidden="true"
              className="h-[1.5px] w-full max-w-22 sm:max-w-28 lg:max-w-36 xl:max-w-44 bg-[#5c1a23]/65 my-0.5"
            />
            {statusItems.map(({ label, open }) => (
              <p
                key={label}
                className="font-raleway font-bold leading-tight text-[#2b1014] text-[9.5px] sm:text-[12px] lg:text-[13.5px] xl:text-[15px] text-center m-0 whitespace-nowrap"
              >
                {label}:{" "}
                <span
                  className={`font-bold text-[11.5px] sm:text-[14px] lg:text-[15.5px] xl:text-[17px] ${
                    open ? "text-[#11552b]" : "text-[#7a151e]"
                  }`}
                >
                  {open ? "Open" : "Closed"}
                </span>
              </p>
            ))}
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
      <main>
        <Hero />
        <FeatureQuote />
        <CommunityReviews />
        <MyWork />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
