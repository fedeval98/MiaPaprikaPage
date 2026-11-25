import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  CloudArrowUp,
  List,
  Star,
  TwitchLogo,
  DiscordLogo,
  TwitterLogo,
  YoutubeLogo,
  PaypalLogo,
  Coffee,
  X,
} from "@phosphor-icons/react";
import mainLogo from "./assets/figma/main-logo.webp";
import postsBlogLeft from "./assets/figma/posts-blog-left.webp";
import ctaCenter from "./assets/figma/cta-center.webp";
import ctaBackground from "./assets/figma/cta-background.webp";
import chibiMia from "./assets/figma/chibi-mia.webp";
import formLine from "./assets/figma/form-line.svg";
import footerDivider from "./assets/figma/footer-divider.svg";

// Pixiv has no Phosphor icon; a bold "P" monogram matches the brand mark closely enough.
function PixivMark({ size = 24, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center font-bold leading-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.72 }}
    >
      P
    </span>
  );
}

const SOCIAL_LINKS = [
  { name: "Twitch", href: "https://www.twitch.tv/miapaprika", Icon: TwitchLogo },
  { name: "Discord", href: "https://discord.gg/WMNPPwN5u2", Icon: DiscordLogo },
  { name: "Twitter", href: "https://twitter.com/MiaPaprika", Icon: TwitterLogo },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCOL0LMgV0xYA6-QCTErpuGQ", Icon: YoutubeLogo },
  { name: "Ko-fi", href: "https://ko-fi.com/miapaprika", Icon: Coffee },
  { name: "PayPal", href: "https://www.paypal.com/paypalme/MiaPaprikka?country.x=AR&locale.x=es_XC", Icon: PaypalLogo },
  { name: "Pixiv", href: "https://www.pixiv.net/en/users/67165832", Icon: PixivMark },
];

export function SocialLinks({ size = 24, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-[14px] sm:gap-[18px] text-[#efe8e9] ${className}`}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="opacity-90 hover:opacity-100 transition-opacity"
        >
          <Icon size={size} weight="fill" />
        </a>
      ))}
    </div>
  );
}

export function ButtonPrimary({ label, dark, href = "#contact", sizeClass = "h-[44px] px-[24px] w-[200px] text-[18px]", className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center max-w-full shrink-0 rounded-[5px] font-roboto text-center leading-none cursor-pointer no-underline transition-opacity hover:opacity-95 ${sizeClass} ${
        dark ? "bg-[#5c1a23] text-white" : "bg-[#efe8e9] text-[#5c1a23]"
      } ${className}`}
    >
      {label}
    </a>
  );
}

export function GroupedTabs({ items, active, onChange, className = "" }) {
  return (
    <div className={`flex items-stretch w-full max-w-[432px] ${className}`}>
      {items.map((item, i) => {
        const isActive = i === active;
        const rounded =
          i === 0
            ? "rounded-l-[4px]"
            : i === items.length - 1
              ? "rounded-r-[4px]"
              : "";
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(i)}
            className={`flex-1 min-w-0 min-h-[44px] px-[8px] sm:px-[10px] py-[6px] flex items-center justify-center cursor-pointer font-raleway text-[13px] sm:text-[14px] leading-[1.3] text-center transition-colors ${
              i > 0 ? "-ml-px" : ""
            } ${rounded} ${
              isActive
                ? "bg-[#5c1a23] border border-[#5c1a23] border-solid text-white z-[1]"
                : "bg-[#efe8e9] border border-[#5c1a23] border-solid text-[#5c1a23]"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const desktopLinkClass = ({ isActive }) =>
    `relative no-underline py-[4px] transition-colors ${
      isActive
        ? "text-[#9be0ff] font-semibold drop-shadow-[0_0_8px_rgba(125,211,252,0.45)] after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[2px] after:h-[2px] after:rounded-full after:bg-[#7dd3fc] after:shadow-[0_0_8px_rgba(125,211,252,0.85)]"
        : "text-[#efe8e9] hover:text-[#bfeaff]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `no-underline transition-colors ${
      isActive
        ? "text-[#9be0ff] font-semibold pl-[10px] border-l-2 border-[#7dd3fc] drop-shadow-[0_0_8px_rgba(125,211,252,0.4)]"
        : "text-[#efe8e9] pl-[12px] hover:text-[#bfeaff]"
    }`;

  return (
    <nav className="sticky top-0 w-full h-[60px] md:h-[76px] bg-[#5c1a23]/95 backdrop-blur-sm border-b border-solid border-[rgba(255,255,255,0.8)] z-30">
      <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto h-full px-[16px] md:px-[24px] xl:px-[40px] flex items-center justify-end md:justify-between">
        {/* Mobile: logo left, overhanging bar without shifting row center */}
        <Link to="/" aria-label="Mia Paprika home" className="md:hidden absolute left-[16px] top-[6px] z-20 flex items-center">
          <img
            alt="Mia Paprika"
            className="h-[64px] sm:h-[70px] w-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
            src={mainLogo}
          />
        </Link>

        {/* Desktop & Tablet left links */}
        <div className="hidden md:flex font-raleway gap-[16px] lg:gap-[22px] xl:gap-[30px] items-center text-[#efe8e9] text-[14px] lg:text-[16px] xl:text-[18px] whitespace-nowrap">
          <NavLink to="/" end className={desktopLinkClass}>
            Home
          </NavLink>
          <NavLink to="/commissions" className={desktopLinkClass}>
            Comissions
          </NavLink>
          <NavLink to="/portfolio" className={desktopLinkClass}>
            Portfolio
          </NavLink>
          <NavLink to="/terms" className={(state) => `${desktopLinkClass(state)} lg:hidden`}>
            Terms
          </NavLink>
        </div>

        {/* Tablet & Desktop centered logo overhanging sticky bar */}
        <Link
          to="/"
          aria-label="Mia Paprika home"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-[6px] lg:top-[8px] z-20 items-center justify-center cursor-pointer"
        >
          <img
            alt="Mia Paprika"
            className="h-[80px] lg:h-[96px] xl:h-[110px] w-auto object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
            src={mainLogo}
          />
        </Link>

        {/* Tablet & Desktop right actions */}
        <div className="hidden md:flex gap-[20px] xl:gap-[32px] items-center">
          <NavLink
            to="/terms"
            className={(state) =>
              `hidden lg:flex font-raleway text-[16px] xl:text-[18px] whitespace-nowrap ${desktopLinkClass(state)}`
            }
          >
            Terms &amp; conditions
          </NavLink>
          <ButtonPrimary label="Contact" sizeClass="h-[42px] lg:h-[44px] px-[20px] w-[156px] lg:w-[172px] xl:w-[200px] text-[16px] xl:text-[18px]" />
        </div>

        {/* Mobile right controls: quick Contact + menu toggle */}
        <div className="flex md:hidden items-center gap-[10px]">
          <ButtonPrimary label="Contact" sizeClass="h-[34px] px-[14px] w-auto text-[14px]" />
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center justify-center size-[40px] rounded-[5px] border border-[rgba(239,232,233,0.4)] bg-transparent text-[#efe8e9] cursor-pointer"
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 z-10 bg-[#5c1a23] border-b border-[rgba(255,255,255,0.4)] shadow-lg px-[24px] pt-[24px] pb-[18px] flex flex-col gap-[14px] font-raleway text-[17px]">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
            Home
          </NavLink>
          <NavLink to="/commissions" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
            Comissions
          </NavLink>
          <NavLink to="/portfolio" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
            Portfolio
          </NavLink>
          <NavLink to="/terms" onClick={() => setMenuOpen(false)} className={mobileLinkClass}>
            Terms &amp; conditions
          </NavLink>
        </div>
      )}
    </nav>
  );
}

const reviewArts = import.meta.glob("./assets/clients/*.webp", { eager: true, import: "default" });

// Placeholder entries — swap name/source/text for the real reviews.
// `file` picks the avatar art from the clients set.
const REVIEWS = [
  {
    file: "besarexia-s",
    name: "Client name",
    source: "VGEN Review",
    stars: 5,
    text: "The real review text goes here.",
  },
  {
    file: "vexoria",
    name: "Client name",
    source: "VGEN Review",
    stars: 5,
    text: "The real review text goes here.",
  },
  {
    file: "luca-lullaby",
    name: "Client name",
    source: "VGEN Review",
    stars: 5,
    text: "The real review text goes here.",
  },
];

export function TitleBand({ as: Tag = "h2", children }) {
  return (
    <div className="bg-[#f2f2f2] py-[32px] w-full">
      <Tag className="font-cormorant font-normal leading-[1.2] text-[#20090c] text-[32px] md:text-[42px] text-center m-0">
        {children}
      </Tag>
    </div>
  );
}

function ReviewCard({ file, name, source, stars, text, className = "" }) {
  return (
    <article className={`flex flex-col items-start gap-[10px] bg-white rounded-[8px] p-[24px] sm:p-[32px] xl:p-[40px] w-full lg:min-h-[520px] xl:min-h-[580px] ${className}`}>
      <img
        alt={`${name} character art`}
        className="h-[220px] sm:h-[260px] xl:h-[280px] w-auto max-w-full object-contain self-center mb-[16px] sm:mb-[24px]"
        src={reviewArts[`./assets/clients/${file}.webp`]}
      />
      <h3 className="font-cormorant font-bold leading-[1.2] text-[#20090c] text-[26px] sm:text-[30px] m-0">{name}</h3>
      <div className="flex gap-[3px]" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: stars }, (_, i) => (
          <Star key={i} size={20} weight="fill" color="#5c1a23" />
        ))}
      </div>
      <p className="font-raleway font-bold leading-[1.2] text-[#5c1a23] text-[16px] m-0">{source}</p>
      <p className="font-raleway leading-[1.5] text-[#262626] text-[16px] m-0 whitespace-pre-line">{text}</p>
    </article>
  );
}

export function SectionDots({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    document.documentElement.classList.add("deck-snap");
    return () => document.documentElement.classList.remove("deck-snap");
  }, []);

  useEffect(() => {
    let rafId = 0;
    const updateActive = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.45;
        let current = sections[0]?.id ?? "";
        for (const { id } of sections) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= marker) current = id;
        }
        setActiveId(current);
      });
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-[10px] lg:right-[20px] top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-[12px] rounded-full bg-[#20090c]/60 backdrop-blur-sm border border-[#efe8e9]/20 px-[8px] py-[14px] shadow-[0_4px_16px_rgba(0,0,0,0.28)]"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            aria-label={`Jump to ${label}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            className="group relative flex items-center justify-center size-[16px] bg-transparent border-0 p-0 cursor-pointer"
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute right-[28px] whitespace-nowrap rounded-[4px] bg-[#20090c]/90 border border-[#efe8e9]/15 px-[10px] py-[4px] font-raleway text-[12px] leading-none shadow-sm opacity-0 translate-x-[4px] group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all ${
                isActive ? "text-[#9be0ff] font-semibold" : "text-[#efe8e9]"
              }`}
            >
              {label}
            </span>
            <span
              className={
                isActive
                  ? "block size-[10px] rotate-45 rounded-[2px] bg-[#7dd3fc] shadow-[0_0_10px_rgba(125,211,252,0.95)] ring-2 ring-[#9be0ff]/45 transition-all duration-300"
                  : "block size-[7px] rounded-full bg-[#efe8e9]/55 group-hover:bg-[#bfeaff] group-hover:scale-125 transition-all duration-200"
              }
            />
          </button>
        );
      })}
    </nav>
  );
}

export function CommunityReviews({ id = "reviews" }) {
  const PER_PAGE = 3;
  const [page, setPage] = useState(0);
  const pages = Math.ceil(REVIEWS.length / PER_PAGE);
  const visible = REVIEWS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const navBtn =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-[40px] sm:size-[48px] rounded-full border border-solid border-[#5c1a23] bg-white text-[#5c1a23] cursor-pointer hover:bg-[#5c1a23] hover:text-white transition-colors";

  return (
    <section id={id} className="bg-[#f2f2f2] w-full md:snap-start max-md:min-h-[calc(100dvh-60px)] max-md:flex max-md:flex-col max-md:justify-center py-[16px] md:py-0 pb-[32px] md:pb-[64px]">
      <TitleBand>Words from Mia&apos;s Community</TitleBand>
      <div className={`relative w-full max-w-[1440px] mx-auto ${pages > 1 ? "px-0 md:px-[64px] lg:px-[80px]" : "px-0 md:px-[32px] lg:px-[80px]"}`}>
        {pages > 1 && (
          <>
            <button type="button" aria-label="Previous reviews" onClick={() => setPage((p) => (p - 1 + pages) % pages)} className={`${navBtn} hidden md:flex left-[8px] lg:left-[16px]`}>
              <CaretLeft size={24} />
            </button>
            <button type="button" aria-label="Next reviews" onClick={() => setPage((p) => (p + 1) % pages)} className={`${navBtn} hidden md:flex right-[8px] lg:right-[16px]`}>
              <CaretRight size={24} />
            </button>
          </>
        )}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-[16px] px-[24px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 items-stretch md:gap-[24px]">
          {visible.map((r, i) => (
            <ReviewCard
              key={`${page}-${i}`}
              {...r}
              className={`max-md:w-[82vw] max-md:shrink-0 max-md:snap-center ${visible.length === 3 && i === 2 ? "md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto lg:col-span-1 lg:max-w-none" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const workArts = import.meta.glob("./assets/mywork/*.webp", { eager: true, import: "default" });
const workArt = (f) => workArts[`./assets/mywork/${f}.webp`];
// Tall layout slots rotate through portrait art, wide slots through landscape art,
// so every illustration lands in a frame that fits its shape.
export function ImageLightbox({ items, index, onClose, onNav }) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const item = items[index];
  const canNav = items.length > 1;

  useEffect(() => {
    const step = (delta) => {
      setZoomed(false);
      onNav((index + delta + items.length) % items.length);
    };
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (canNav && e.key === "ArrowLeft") step(-1);
      if (canNav && e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, items.length, canNav, onClose, onNav]);

  if (!item) return null;

  const step = (delta) => {
    setZoomed(false);
    onNav((index + delta + items.length) % items.length);
  };

  const handleMouseMove = (e) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || "Image preview"}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[rgba(13,13,13,0.92)] flex items-center justify-center p-4 sm:p-8"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
        className="fixed top-4 right-4 z-10 w-[44px] h-[44px] rounded-full bg-[rgba(62,28,31,0.85)] border border-[#65353a] text-[#fffdfd] flex items-center justify-center hover:bg-[#5c262b] cursor-pointer"
      >
        <X size={22} weight="bold" />
      </button>

      {canNav && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
          aria-label="Previous image"
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-[rgba(62,28,31,0.85)] border border-[#65353a] text-[#fffdfd] flex items-center justify-center hover:bg-[#5c262b] cursor-pointer"
        >
          <CaretLeft size={22} weight="bold" />
        </button>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center justify-center max-w-[92vw] max-h-[90dvh]"
      >
        <div className="overflow-hidden rounded-[8px] flex items-center justify-center">
          <img
            src={item.src}
            alt={item.alt}
            onMouseMove={handleMouseMove}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setOrigin(`${x}% ${y}%`);
              setZoomed((z) => !z);
            }}
            style={{ transformOrigin: origin }}
            className={`max-w-[92vw] max-h-[84dvh] w-auto h-auto object-contain select-none transition-transform duration-200 ${
              zoomed ? "scale-[2.2] cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
          />
        </div>
        {item.caption && (
          <figcaption className="mt-3 font-cormorant italic font-bold leading-[1.2] text-[#efe8e9] text-[24px] sm:text-[28px] text-center">
            {item.caption}
          </figcaption>
        )}
      </figure>

      {canNav && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
          aria-label="Next image"
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full bg-[rgba(62,28,31,0.85)] border border-[#65353a] text-[#fffdfd] flex items-center justify-center hover:bg-[#5c262b] cursor-pointer"
        >
          <CaretRight size={22} weight="bold" />
        </button>
      )}
    </div>
  );
}

const WORK_PORTRAITS = ["ayano", "gomurya", "easter"];
const WORK_LANDSCAPES = ["asher", "coloso", "galaxy", "grand-mother-silk", "koto-pond", "nailpolish", "seikawallpaper"];
const WORK_ALL = [...WORK_PORTRAITS, ...WORK_LANDSCAPES];
const workAlt = (f) => f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const WORK_LIGHTBOX_ITEMS = WORK_ALL.map((file) => ({ src: workArt(file), alt: workAlt(file) }));

const MOBILE_WORK_SLIDES = [
  ["ayano"],
  ["asher", "coloso"],
  ["gomurya"],
  ["galaxy", "grand-mother-silk"],
  ["easter"],
  ["koto-pond", "nailpolish"],
  ["seikawallpaper"],
];

const WORK_ANIM_DUR = 260;
const WORK_ANIM_STAGGER = 65;
const WORK_ANIM_DIST = 72;

function animateWorkColumns(gridEl, keyframes, reverse, activeAnimsRef) {
  if (!gridEl) return Promise.resolve();
  const items = [...gridEl.children];
  const lefts = [...new Set(items.map((el) => el.offsetLeft))].sort((a, b) => a - b);
  if (reverse) lefts.reverse();
  items.forEach((el) => {
    el.style.zIndex = String(lefts.length - lefts.indexOf(el.offsetLeft));
  });
  const anims = items.map((el) =>
    el.firstElementChild.animate(keyframes, {
      duration: WORK_ANIM_DUR,
      delay: lefts.indexOf(el.offsetLeft) * WORK_ANIM_STAGGER,
      easing: "ease-in-out",
      fill: "both",
    })
  );
  activeAnimsRef.current = anims;
  return Promise.all(anims.map((a) => a.finished.catch(() => {})));
}

export function MyWork({ id = "work" }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [mobileSlide, setMobileSlide] = useState(0);
  const trackRef = useRef(null);
  const desktopGridRef = useRef(null);
  const pendingEnterRef = useRef(null);
  const activeAnimsRef = useRef([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      activeAnimsRef.current.forEach((a) => a.cancel());
    };
  }, []);

  useLayoutEffect(() => {
    const pending = pendingEnterRef.current;
    if (!pending) return;
    pendingEnterRef.current = null;
    const gridEl = desktopGridRef.current;
    if (!gridEl) {
      setBusy(false);
      return;
    }
    const { shift, reverse } = pending;
    animateWorkColumns(
      gridEl,
      [
        { transform: `translateX(${-shift}px)`, opacity: 0 },
        { transform: "translateX(0)", opacity: 1 },
      ],
      reverse,
      activeAnimsRef
    ).then(() => {
      if (!mountedRef.current) return;
      activeAnimsRef.current.forEach((a) => a.cancel());
      activeAnimsRef.current = [];
      [...gridEl.children].forEach((el) => {
        el.style.zIndex = "";
      });
      setBusy(false);
    });
  }, [step]);

  const goDesktop = async (dir) => {
    if (busy) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !desktopGridRef.current) {
      setStep((s) => s + dir);
      return;
    }
    setBusy(true);
    const shift = -dir * WORK_ANIM_DIST;
    const reverse = dir < 0;
    await animateWorkColumns(
      desktopGridRef.current,
      [
        { transform: "translateX(0)", opacity: 1 },
        { transform: `translateX(${shift}px)`, opacity: 0 },
      ],
      reverse,
      activeAnimsRef
    );
    if (!mountedRef.current) return;
    pendingEnterRef.current = { shift, reverse };
    setStep((s) => s + dir);
  };

  const at = (pool, offset) => pool[(((step * 2 + offset) % pool.length) + pool.length) % pool.length];
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const slots = [
    { file: at(WORK_PORTRAITS, 0), desktopClass: "md:aspect-[3/4] lg:aspect-auto lg:col-span-1 lg:row-span-2", imgPos: "object-top" },
    { file: at(WORK_PORTRAITS, 1), desktopClass: "md:aspect-[3/4] lg:aspect-auto lg:col-span-1 lg:row-span-2", imgPos: "object-top" },
    { file: at(WORK_LANDSCAPES, 0), desktopClass: "md:aspect-[16/10] lg:aspect-auto lg:col-span-1 lg:row-span-1", imgPos: "object-[50%_25%]" },
    { file: at(WORK_LANDSCAPES, 1), desktopClass: "md:aspect-[16/10] lg:aspect-auto lg:col-span-1 lg:row-span-1", imgPos: "object-center" },
  ];
  const navBtn =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-[40px] sm:size-[48px] rounded-full border border-[#efe8e9]/25 bg-[rgba(32,9,12,0.8)] text-[#efe8e9] cursor-pointer hover:bg-[#5c1a23] disabled:opacity-40 disabled:cursor-default transition-colors shadow-md";

  const scrollMobileTo = (index) => {
    const wrapped = ((index % MOBILE_WORK_SLIDES.length) + MOBILE_WORK_SLIDES.length) % MOBILE_WORK_SLIDES.length;
    setMobileSlide(wrapped);
    const el = trackRef.current;
    if (el) {
      el.scrollTo({ left: wrapped * el.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <section id={id} className="relative w-full overflow-hidden md:snap-start max-md:h-[calc(100dvh-60px)] max-md:flex max-md:flex-col md:min-h-[calc(100dvh-76px)] md:flex md:flex-col md:justify-center">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#262626] inset-0" />
        <img alt="" className="absolute max-w-none object-cover opacity-10 size-full" src={postsBlogLeft} />
      </div>
      <div className="relative w-full max-w-[1220px] xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-[4px] sm:px-[12px] md:px-[56px] lg:px-[72px] xl:px-[88px] py-[16px] md:py-[28px] lg:py-[32px] max-md:flex-1 max-md:flex max-md:flex-col max-md:min-h-0">
        <h2 className="font-cormorant font-normal leading-[1.2] text-[#efe8e9] text-[32px] md:text-[36px] lg:text-[44px] m-0 mb-[12px] md:mb-[20px] lg:mb-[24px] text-center shrink-0">
          My Work
        </h2>

        {/* Mobile: 1 portrait or 2 landscapes per swipeable view */}
        <div className="relative flex-1 min-h-0 flex flex-col gap-[12px] md:hidden">
          <div className="relative flex-1 min-h-0">
            <div
              ref={trackRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                if (el.clientWidth > 0) {
                  setMobileSlide(Math.round(el.scrollLeft / el.clientWidth));
                }
              }}
              className="flex h-full w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {MOBILE_WORK_SLIDES.map((group, idx) => (
                <div
                  key={idx}
                  className="w-full h-full shrink-0 snap-center flex flex-col items-center justify-center gap-[16px] px-[4px]"
                >
                  {group.map((file) => (
                    <img
                      key={file}
                      alt={workAlt(file)}
                      onClick={() => setLightboxIdx(WORK_ALL.indexOf(file))}
                      className={`max-w-full w-auto h-auto object-contain rounded-[6px] cursor-zoom-in ${
                        group.length > 1 ? "max-h-[calc(50%-8px)]" : "max-h-full"
                      }`}
                      src={workArt(file)}
                    />
                  ))}
                </div>
              ))}
            </div>
            <button type="button" aria-label="Previous artworks" onClick={() => scrollMobileTo(mobileSlide - 1)} className={`${navBtn} left-[8px]`}>
              <CaretLeft size={24} />
            </button>
            <button type="button" aria-label="Next artworks" onClick={() => scrollMobileTo(mobileSlide + 1)} className={`${navBtn} right-[8px]`}>
              <CaretRight size={24} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-[8px] shrink-0 pb-[4px]">
            {MOBILE_WORK_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View artworks slide ${idx + 1}`}
                aria-current={mobileSlide === idx ? "true" : undefined}
                onClick={() => scrollMobileTo(idx)}
                className={`h-[8px] rounded-full border-0 p-0 cursor-pointer transition-all ${
                  mobileSlide === idx ? "w-[20px] bg-[#efe8e9]" : "w-[8px] bg-[#efe8e9]/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Tablet (2x2 proportional) & desktop (3-col bento) with column-staggered transition */}
        <div
          className="relative hidden md:block focus:outline-none"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") goDesktop(1);
            if (e.key === "ArrowLeft") goDesktop(-1);
          }}
        >
          <div
            ref={desktopGridRef}
            className="relative grid overflow-hidden md:grid-cols-2 md:gap-[16px] lg:grid-cols-[1fr_1fr_1.2fr] lg:grid-rows-2 lg:gap-[16px] xl:gap-[20px] lg:h-[min(calc(100dvh-210px),480px)] xl:h-[min(calc(100dvh-220px),580px)]"
          >
            {slots.map(({ file, desktopClass, imgPos }, idx) => (
              <div key={idx} className={`relative ${desktopClass}`}>
                <img
                  alt={workAlt(file)}
                  onClick={() => setLightboxIdx(WORK_ALL.indexOf(file))}
                  className={`absolute inset-0 size-full object-cover ${imgPos} rounded-[6px] cursor-zoom-in`}
                  src={workArt(file)}
                />
              </div>
            ))}
          </div>
          <button type="button" aria-label="Previous artworks" disabled={busy} onClick={() => goDesktop(-1)} className={`${navBtn} left-[14px] lg:left-[20px]`}>
            <CaretLeft size={24} />
          </button>
          <button type="button" aria-label="Next artworks" disabled={busy} onClick={() => goDesktop(1)} className={`${navBtn} right-[14px] lg:right-[20px]`}>
            <CaretRight size={24} />
          </button>
        </div>
      </div>
      {lightboxIdx !== null && (
        <ImageLightbox
          items={WORK_LIGHTBOX_ITEMS}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNav={setLightboxIdx}
        />
      )}
    </section>
  );
}

const FIELD_BOX =
  "bg-[#efe8e9] border border-[#9d9d9d] border-solid rounded-[6px] font-raleway leading-[1.5] text-[#0d0d0d] text-[14px] outline-none focus:border-[#5c1a23] w-full";

function FieldLabel({ label, required }) {
  return (
    <span className="font-raleway leading-[1.2] text-[#262626] text-[12px] whitespace-nowrap">
      {label}
      {required && <span className="text-[#5c1a23]">*</span>}
    </span>
  );
}

function FormField({ label, required, placeholder, name, type = "text" }) {
  return (
    <label className="flex w-full md:flex-1 md:min-w-0 flex-col gap-[4px] items-start">
      <FieldLabel label={label} required={required} />
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={`${FIELD_BOX} h-[40px] p-[8px] placeholder:text-[#727272]`}
      />
    </label>
  );
}

const COMMISSION_TYPES = [
  "Illustration",
  "Live2D Artwork",
  "Live2D Rigging",
  "Live2D Artwork + Rigging",
  "Other",
];

function CommissionTypeField() {
  return (
    <label className="flex w-full md:flex-1 md:min-w-0 flex-col gap-[4px] items-start">
      <FieldLabel label="Commission type" required />
      <div className="relative w-full">
        <select
          name="commissionType"
          required
          defaultValue=""
          className={`${FIELD_BOX} h-[40px] px-[8px] pr-[32px] appearance-none cursor-pointer invalid:text-[#727272]`}
        >
          <option value="" disabled>
            Select a type
          </option>
          {COMMISSION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <CaretDown size={16} color="#5c1a23" className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </label>
  );
}

const ACCEPTED_FILES = ".jpg,.jpeg,.png,.pdf,.psd,.ai,.doc,.docx,.ppt,.pptx";

function FileUpload({ files, setFiles }) {
  const addFiles = (list) => setFiles((prev) => [...prev, ...Array.from(list)]);
  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-[8px] w-full items-center">
      <label
        className="relative w-[524px] max-w-full min-h-[202px] px-[16px] py-[20px] bg-[#f4f4f4] border border-[#ccb8bb] border-dashed rounded-[4px] flex flex-col items-center justify-center gap-[10px] cursor-pointer transition-colors hover:bg-[#efe8e9]"
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("bg-[#efe8e9]");
        }}
        onDragLeave={(e) => e.currentTarget.classList.remove("bg-[#efe8e9]")}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("bg-[#efe8e9]");
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          multiple
          accept={ACCEPTED_FILES}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <CloudArrowUp size={56} color="#5c1a23" weight="light" aria-hidden="true" />
        <p className="font-raleway text-[16px] text-center m-0">
          <span className="text-[#0d0d0d]">Drag &amp; drop files or </span>
          <span className="text-[#5c1a23] underline">Browse</span>
        </p>
        <p className="font-raleway leading-[1.2] text-[#727272] text-[12px] text-center m-0">
          Supported formats: JPEG, PNG, PDF, PSD, AI, Word, PPT
        </p>
      </label>
      {files.length > 0 && (
        <ul className="w-[524px] max-w-full list-none m-0 p-0 flex flex-col gap-[4px]">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-[8px] bg-[#efe8e9] border border-[#9d9d9d] border-solid rounded-[6px] px-[8px] py-[6px]"
            >
              <span className="font-raleway text-[#0d0d0d] text-[13px] truncate">
                {file.name}{" "}
                <span className="text-[#727272]">({(file.size / 1024).toFixed(0)} KB)</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 cursor-pointer border-0 bg-transparent p-0 font-raleway text-[#5c1a23] text-[13px] underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ContactCTA() {
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ponytail: no backend yet - swap this for a real endpoint (e.g. web3forms/formspree)
    // when Mia has one; FormData(e.target) + files already carries everything needed.
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-size-[1024px_1024px] bg-top-left overflow-x-clip pt-[80px] pb-[48px] md:pt-[104px] md:pb-[72px] md:snap-start max-md:min-h-[calc(100dvh-60px)] max-md:flex max-md:items-center"
      style={{ backgroundImage: `url("${ctaCenter}")` }}
    >
      <div
        className="absolute bg-size-[1024px_1024px,auto_auto] bg-top-left inset-0"
        style={{ backgroundImage: `url("${ctaBackground}"), linear-gradient(90deg, rgb(13, 13, 13) 0%, rgb(13, 13, 13) 100%)` }}
      />
      <div className="relative w-full max-w-[1440px] mx-auto px-[16px] md:px-[24px]">
        <div className="relative flex flex-col gap-[16px] items-center justify-center mx-auto w-full max-w-[604px]">
          <div className="bg-[#efe8e9] border border-[#9d9d9d] border-solid drop-shadow-[0px_20px_10px_rgba(0,0,0,0.04),0px_4px_1.625px_rgba(0,0,0,0.02)] flex flex-col gap-[16px] items-start px-[20px] pt-[64px] pb-[40px] md:px-[40px] md:pt-[84px] md:pb-[64px] relative rounded-[16px] shrink-0 w-full">
            <h2 className="font-cormorant font-normal leading-[1.2] relative shrink-0 text-[#0d0d0d] text-[30px] text-center w-full m-0">
              Contact Me!
            </h2>
            <div className="h-0 relative shrink-0 w-full">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={formLine} />
              </div>
            </div>
            {submitted ? (
              <div className="w-full py-[48px] text-center" role="status">
                <p className="font-cormorant text-[#0d0d0d] text-[30px] leading-[1.2] m-0">Thank you!</p>
                <p className="font-raleway text-[#262626] text-[14px] leading-[1.5] mt-[12px] mb-0">
                  Your commission request has been received. I'll get back to you within 1–2 days.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-[16px] items-center w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-[16px] md:gap-[8px] items-start w-full">
                  <FormField label="Name" name="name" required placeholder="Your name" />
                  <FormField label="Email" name="email" type="email" required placeholder="name@email.com" />
                </div>
                <div className="flex flex-col md:flex-row gap-[16px] md:gap-[8px] items-start w-full">
                  <CommissionTypeField />
                  <FormField label="Budget (Optional)" name="budget" placeholder="$250" />
                </div>
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="font-cormorant leading-[1.2] text-[#262626] text-[24px] m-0">
                    Description<span className="font-raleway text-[#5c1a23]">*</span>
                  </p>
                  <p className="font-raleway leading-[1.2] text-[#262626] text-[12px] m-0">
                    Share a short summary of your project: what do you need, what are you envisioning, what is your deadline and your future plans - are you planning to add anything to your model like extra outfits or expressions?
                  </p>
                  <textarea
                    name="description"
                    required
                    placeholder="Tell me about your project..."
                    className={`${FIELD_BOX} h-[148px] p-[8px] resize-none placeholder:text-[#727272]`}
                  />
                </div>
                <div className="flex flex-col gap-[8px] items-center w-full">
                  <p className="font-cormorant leading-[1.2] w-full text-[#262626] text-[24px] m-0">References</p>
                  <p className="font-raleway leading-[1.2] w-full text-[#262626] text-[12px] m-0">
                    If you're requesting rigging or animation, please include your PSD file. For art, If you don't have any references yet, that's totally fine! Just try to describe your idea in as much detail as you can.
                  </p>
                  <FileUpload files={files} setFiles={setFiles} />
                </div>
                <button type="submit" className="bg-[#5c1a23] flex items-center justify-center p-[8px] rounded-[6px] w-full cursor-pointer border-0 hover:bg-[#45141a] transition-colors">
                  <p className="font-outfit leading-[24px] text-[#efe8e9] text-[16px] whitespace-nowrap m-0">Submit</p>
                </button>
              </form>
            )}
          </div>
          <div className="absolute h-[104px] w-[184px] -top-[52px] md:h-[144px] md:w-[254px] md:-top-[72px] left-1/2 -translate-x-1/2 pointer-events-none">
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={chibiMia} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-[#45141a] md:snap-end">
      <div className="relative w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-[20px] md:px-[40px] py-[20px] md:py-[24px] flex flex-col items-center gap-[12px] md:gap-[16px]">
        <div className="w-full max-w-[820px] flex flex-wrap justify-center md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-x-[20px] gap-y-[8px] md:gap-[32px] lg:gap-[48px]">
          <div className="flex flex-wrap justify-center md:justify-end font-raleway gap-x-[20px] md:gap-x-[32px] lg:gap-[48px] items-center leading-[1.4] text-[#efe8e9] text-[13px] md:text-[14px] whitespace-nowrap">
            <Link to="/" className="shrink-0 no-underline text-[#efe8e9] hover:text-[#bfeaff] transition-colors">Home</Link>
            <Link to="/commissions" className="shrink-0 no-underline text-[#efe8e9] hover:text-[#bfeaff] transition-colors">Comissions</Link>
          </div>
          <Link
            to="/"
            aria-label="Mia Paprika home"
            className="hidden md:flex items-center justify-center shrink-0 cursor-pointer"
          >
            <img alt="Mia Paprika" className="h-[46px] w-auto object-contain pointer-events-none" src={mainLogo} />
          </Link>
          <div className="flex flex-wrap justify-center md:justify-start font-raleway gap-x-[20px] md:gap-x-[32px] lg:gap-[48px] items-center leading-[1.4] text-[#efe8e9] text-[13px] md:text-[14px] whitespace-nowrap">
            <Link to="/portfolio" className="shrink-0 no-underline text-[#efe8e9] hover:text-[#bfeaff] transition-colors">Portfolio</Link>
            <Link to="/terms" className="shrink-0 no-underline text-[#efe8e9] hover:text-[#bfeaff] transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
        <div className="hidden md:block w-full max-w-[880px] h-px relative opacity-70">
          <img alt="" className="block max-w-none size-full" src={footerDivider} />
        </div>
        <div className="flex items-center justify-center">
          <SocialLinks size={22} className="justify-center" />
        </div>
        <div className="flex flex-wrap justify-center font-raleway gap-x-[16px] gap-y-[4px] items-center leading-[1.4] text-[#efe8e9]/80 text-[12px] text-center">
          <p className="shrink-0 m-0">© 2025 Mia Paprika</p>
          <Link to="/terms" className="shrink-0 no-underline text-[#efe8e9]/80 hover:text-[#efe8e9] transition-colors">Terms and conditions</Link>
        </div>
      </div>
    </footer>
  );
}
