import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  CloudArrowUp,
  Star,
  TwitchLogo,
  DiscordLogo,
  TwitterLogo,
  YoutubeLogo,
  PaypalLogo,
  Coffee,
} from "@phosphor-icons/react";
import mainLogo from "./assets/figma/main-logo.webp";
import mainLogoMask from "./assets/figma/main-logo-mask.svg";
import postsBlogLeft from "./assets/figma/posts-blog-left.webp";
import ctaCenter from "./assets/figma/cta-center.webp";
import ctaBackground from "./assets/figma/cta-background.webp";
import chibiMia from "./assets/figma/chibi-mia.webp";
import formLine from "./assets/figma/form-line.svg";
import footerDivider from "./assets/figma/footer-divider.svg";
import footerLogoMask from "./assets/figma/footer-logo-mask.svg";

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
    <div className={`flex items-center gap-[18px] text-[#efe8e9] ${className}`}>
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

export function ButtonPrimary({ label, dark, href = "#contact" }) {
  return (
    <a href={href} className="block h-[44px] relative shrink-0 w-[200px] cursor-pointer no-underline">
      <div className={`absolute inset-0 rounded-[5px] ${dark ? "bg-[#5c1a23]" : "bg-[#efe8e9]"}`} />
      <div
        className={`-translate-y-1/2 absolute flex flex-col font-roboto justify-center leading-[0] left-[25px] right-[24px] text-[18px] text-center top-1/2 ${dark ? "text-white" : "text-[#5c1a23]"}`}
      >
        <p className="leading-[normal] m-0">{label}</p>
      </div>
    </a>
  );
}

export function GroupedTabs({ items, active, onChange, className = "" }) {
  return (
    <div className={`content-stretch flex items-center relative shrink-0 w-full max-w-[432px] ${className}`}>
      {items.map((item, i) => {
        const isActive = i === active;
        const rounded = i === 0 ? "rounded-bl-[4px] rounded-tl-[4px]" : i === items.length - 1 ? "rounded-br-[4px] rounded-tr-[4px]" : "";
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(i)}
            className={`flex-[1_0_0] h-[44px] min-w-px relative cursor-pointer border-0 bg-transparent p-0 ${rounded}`}
          >
            <div className={`absolute inset-0 ${rounded} ${isActive ? "bg-[#5c1a23]" : "bg-[#efe8e9] border border-[#5c1a23] border-solid"}`} />
            <div className={`-translate-y-1/2 absolute flex flex-col font-raleway justify-center leading-[0] left-[10px] right-[10px] text-[14px] text-center top-[calc(50%+0.5px)] ${isActive ? "text-white" : "text-[#5c1a23]"}`}>
              <p className="leading-[1.5] m-0">{item}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function Navigation() {
  return (
    <nav className="relative w-full md:h-[64px] bg-[#5c1a23] border-b border-solid border-[rgba(255,255,255,0.8)] z-30">
      <div className="relative w-full max-w-[1440px] mx-auto h-full">
        <div className="content-stretch flex font-raleway gap-[20px] items-center justify-center leading-[0] py-[14px] text-[#efe8e9] text-[16px] whitespace-nowrap md:absolute md:justify-start md:py-0 md:gap-[30px] md:left-[40px] md:text-[18px] md:top-[21px]">
          <Link to="/" className="no-underline text-[#efe8e9]">
            <p className="leading-[1.2] m-0">Home</p>
          </Link>
          <Link to="/commissions" className="no-underline text-[#efe8e9]">
            <p className="leading-[1.2] m-0">Comissions</p>
          </Link>
          <Link to="/portfolio" className="no-underline text-[#efe8e9]">
            <p className="leading-[1.2] m-0">Portfolio</p>
          </Link>
          <Link to="/terms" className="no-underline text-[#efe8e9] md:hidden">
            <p className="leading-[1.2] m-0">Terms</p>
          </Link>
        </div>
        <div className="hidden md:flex absolute content-stretch gap-[32px] items-center right-[24px] top-[10px]">
          <Link to="/terms" className="flex flex-col font-raleway justify-center leading-[0] no-underline text-[#efe8e9] text-[18px] whitespace-nowrap">
            <p className="leading-[1.2] m-0">Terms &amp; conditions</p>
          </Link>
          <ButtonPrimary label="Application" />
        </div>
        <Link
          to="/"
          aria-label="Mia Paprika home"
          className="hidden md:block absolute h-[103px] left-1/2 -translate-x-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[8px_10px] mask-size-[160px_80px] top-[14px] w-[176px] cursor-pointer"
          style={{ maskImage: `url("${mainLogoMask}")` }}
        >
          <img alt="Mia Paprika" className="absolute inset-0 max-w-none object-cover size-full pointer-events-none" src={mainLogo} />
        </Link>
      </div>
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

function ReviewCard({ file, name, source, stars, text }) {
  return (
    <article className="flex flex-col items-start gap-[10px] bg-white rounded-[8px] p-[40px] w-full md:flex-1 md:min-h-[620px]">
      <img
        alt={`${name} character art`}
        className="h-[280px] w-auto max-w-full object-contain self-center mb-[24px]"
        src={reviewArts[`./assets/clients/${file}.webp`]}
      />
      <h3 className="font-cormorant font-bold leading-[1.2] text-[#20090c] text-[30px] m-0">{name}</h3>
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

export function CommunityReviews() {
  const PER_PAGE = 3;
  const [page, setPage] = useState(0);
  const pages = Math.ceil(REVIEWS.length / PER_PAGE);
  const visible = REVIEWS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const navBtn =
    "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-[48px] rounded-full border border-solid border-[#5c1a23] bg-white text-[#5c1a23] cursor-pointer hover:bg-[#5c1a23] hover:text-white transition-colors";

  return (
    <>
      <TitleBand>Words from Mia&apos;s Community</TitleBand>
      <section className="bg-[#f2f2f2] w-full pb-[64px]">
        <div className="relative max-w-[1440px] mx-auto px-[24px] md:px-[80px]">
          {pages > 1 && (
            <>
              <button type="button" aria-label="Previous reviews" onClick={() => setPage((p) => (p - 1 + pages) % pages)} className={`${navBtn} left-[8px] md:left-[16px]`}>
                <CaretLeft size={24} />
              </button>
              <button type="button" aria-label="Next reviews" onClick={() => setPage((p) => (p + 1) % pages)} className={`${navBtn} right-[8px] md:right-[16px]`}>
                <CaretRight size={24} />
              </button>
            </>
          )}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-[24px]">
            {visible.map((r, i) => (
              <ReviewCard key={`${page}-${i}`} {...r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const workArts = import.meta.glob("./assets/mywork/*.webp", { eager: true, import: "default" });
const workArt = (f) => workArts[`./assets/mywork/${f}.webp`];
// Tall layout slots rotate through portrait art, wide slots through landscape art,
// so every illustration lands in a frame that fits its shape.
const WORK_PORTRAITS = ["ayano", "gomurya", "easter"];
const WORK_LANDSCAPES = ["asher", "coloso", "galaxy", "grand-mother-silk", "koto-pond", "nailpolish", "seikawallpaper"];
const workAlt = (f) => f.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function MyWork() {
  const [step, setStep] = useState(0);
  const at = (pool, offset) => pool[(((step * 2 + offset) % pool.length) + pool.length) % pool.length];
  const slots = [
    { file: at(WORK_PORTRAITS, 0), inset: "md:inset-[18.45%_64.17%_-1.45%_8.82%]" },
    { file: at(WORK_PORTRAITS, 1), inset: "md:inset-[18.42%_37.15%_-1.45%_35.83%]" },
    { file: at(WORK_LANDSCAPES, 0), inset: "md:inset-[18.42%_10.35%_42.46%_62.85%]" },
    { file: at(WORK_LANDSCAPES, 1), inset: "md:inset-[57.5%_10.35%_-1.45%_62.85%]" },
  ];
  const navBtn =
    "absolute top-[55%] z-10 flex items-center justify-center size-[48px] rounded-full border-0 bg-[rgba(32,9,12,0.6)] text-[#efe8e9] cursor-pointer hover:bg-[#5c1a23] transition-colors";

  return (
    <section className="relative w-full overflow-hidden md:h-[760px]">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#262626] inset-0" />
        <img alt="" className="absolute max-w-none object-cover opacity-10 size-full" src={postsBlogLeft} />
      </div>
      <div className="relative w-full max-w-[1440px] mx-auto h-full">
        <h2 className="relative pt-[40px] font-cormorant font-normal leading-[1.2] text-[#efe8e9] text-[32px] m-0 text-center whitespace-nowrap md:absolute md:pt-0 md:inset-[6.32%_42.22%_83.03%_42.22%] md:text-[48px]">
          My Work
        </h2>
        <div className="relative grid grid-cols-2 gap-[8px] px-[24px] pt-[24px] pb-[32px] md:contents">
          {slots.map(({ file, inset }) => (
            <div key={file} className={`relative h-[160px] overflow-hidden md:h-auto md:absolute ${inset}`}>
              <img alt={workAlt(file)} className="absolute inset-0 size-full object-cover" src={workArt(file)} />
            </div>
          ))}
        </div>
        <button type="button" aria-label="Previous artworks" onClick={() => setStep((s) => s - 1)} className={`${navBtn} left-[16px]`}>
          <CaretLeft size={24} />
        </button>
        <button type="button" aria-label="Next artworks" onClick={() => setStep((s) => s + 1)} className={`${navBtn} right-[16px]`}>
          <CaretRight size={24} />
        </button>
      </div>
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
    <label className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px">
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
    <label className="flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px">
      <FieldLabel label="Commission type" required />
      <div className="relative w-full">
        <select
          name="commissionType"
          required
          defaultValue=""
          className={`${FIELD_BOX} h-[40px] px-[8px] appearance-none cursor-pointer invalid:text-[#727272]`}
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
        className="relative w-[524px] max-w-full min-h-[202px] bg-[#f4f4f4] border border-[#ccb8bb] border-dashed rounded-[4px] flex flex-col items-center justify-center gap-[10px] cursor-pointer transition-colors hover:bg-[#efe8e9]"
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
      className="relative w-full md:h-[1049px] bg-size-[1024px_1024px] bg-top-left overflow-hidden md:overflow-visible"
      style={{ backgroundImage: `url("${ctaCenter}")` }}
    >
      <div
        className="absolute bg-size-[1024px_1024px,auto_auto] bg-top-left inset-0"
        style={{ backgroundImage: `url("${ctaBackground}"), linear-gradient(90deg, rgb(13, 13, 13) 0%, rgb(13, 13, 13) 100%)` }}
      />
      <div className="relative w-full max-w-[1440px] mx-auto h-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center mx-auto px-[16px] py-[48px] w-full max-w-[604px] md:absolute md:-translate-x-1/2 md:left-[calc(50%+8px)] md:top-[39px] md:w-[604px] md:max-w-none md:p-0 md:mx-0">
          <div className="bg-[#efe8e9] border border-[#9d9d9d] border-solid content-stretch drop-shadow-[0px_20px_10px_rgba(0,0,0,0.04),0px_4px_1.625px_rgba(0,0,0,0.02)] flex flex-col gap-[16px] items-start px-[20px] py-[40px] md:px-[40px] md:py-[64px] relative rounded-[16px] shrink-0 w-full">
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
        </div>
        <div className="hidden md:block absolute h-[144px] left-[601px] top-[-33px] w-[254px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={chibiMia} />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-[#45141a] md:h-[410px]">
      <div className="relative w-full max-w-[1440px] mx-auto h-full flex flex-col items-center gap-[24px] py-[40px] md:block md:py-0">
        <div className="content-stretch flex flex-col items-center gap-[24px] leading-[0] md:absolute md:flex-row md:justify-between md:gap-0 md:left-1/2 md:-translate-x-1/2 md:top-[84px] md:w-[869px]">
          <div className="content-stretch flex font-raleway gap-[32px] items-center leading-[1.5] relative text-[#efe8e9] text-[14px] w-auto md:gap-[64px] whitespace-nowrap">
            <Link to="/" className="relative shrink-0 no-underline text-[#efe8e9]">Home</Link>
            <Link to="/commissions" className="relative shrink-0 no-underline text-[#efe8e9]">Comissions</Link>
          </div>
          <Link
            to="/"
            aria-label="Mia Paprika home"
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[82px] w-[140px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-86px_2px] mask-size-[312px_80px] cursor-pointer"
            style={{ maskImage: `url("${footerLogoMask}")` }}
          >
            <img alt="Mia Paprika" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={mainLogo} />
          </Link>
          <div className="content-stretch flex font-raleway gap-[32px] items-center leading-[1.5] relative text-[#efe8e9] text-[14px] w-auto md:gap-[64px] whitespace-nowrap">
            <Link to="/portfolio" className="relative shrink-0 no-underline text-[#efe8e9]">Portfolio</Link>
            <Link to="/terms" className="relative shrink-0 no-underline text-[#efe8e9]">Terms &amp; Conditions</Link>
          </div>
        </div>
        <div className="hidden md:block absolute inset-[45.85%_15.28%_54.15%_15.28%]">
          <div className="absolute inset-[-0.5px_0]">
            <img alt="" className="block max-w-none size-full" src={footerDivider} />
          </div>
        </div>
        <div className="md:absolute md:inset-[59.27%_39.72%_30.98%_39.72%] md:flex md:items-center md:justify-center">
          <SocialLinks size={30} />
        </div>
        <div className="content-stretch flex font-raleway gap-[16px] items-center leading-[1.5] text-[#efe8e9] text-[14px] text-center whitespace-nowrap md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[355px]">
          <p className="relative shrink-0 m-0">© 2025 Mia Paprika</p>
          <Link to="/terms" className="relative shrink-0 no-underline text-[#efe8e9]">Terms and conditions</Link>
        </div>
      </div>
    </footer>
  );
}
