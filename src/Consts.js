const PAGE_SECTIONS = {
  home: [
    { id: "hero", label: "Mia Paprika" },
    { id: "status", label: "Status" },
    { id: "reviews", label: "Community" },
    { id: "work", label: "My Work" },
    { id: "contact", label: "Contact" },
  ],
  commissions: [
    { id: "vtuber-models", label: "Vtuber Models" },
    { id: "illustrations", label: "Illustrations" },
    { id: "work", label: "My Work" },
    { id: "contact", label: "Contact" },
  ],
};

const PRICING = {
  models: {
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
        priceUpdated: "Last price update 25/11/2026",
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
        priceUpdated: "Last price update 25/11/2026",
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
  },
  illustrations: {
    labels: ["Full-Body", "Half-Body", "Portrait"],
    content: [
      {
        title: "Full-Body",
        // Image renders at max zoom (2.3x) and downscales cleanly so Portrait never upscales a low-res GPU layer
        artStyle: { objectPosition: "50% 18%", transform: "scale(0.434783)", transformOrigin: "55.3% 12%" },
        prices: ["head to toe $300 - 600+ (USD)", "extra character $90+ (USD)"],
      },
      {
        title: "Half-Body",
        artStyle: { objectPosition: "50% 18%", transform: "scale(0.717391)", transformOrigin: "55.3% 12%" },
        prices: ["head to waist $150 - 300+ (USD)", "extra character $70+ (USD)"],
      },
      {
        title: "Portrait",
        artStyle: { objectPosition: "50% 18%", transform: "scale(1)", transformOrigin: "55.3% 12%" },
        prices: ["only head $70 - 200+ (USD)", "extra character $45+ (USD)"],
      },
    ],
  },
};

const SOCIALS = [
  { name: "Twitch", href: "https://www.twitch.tv/miapaprika", iconKey: "twitch" },
  { name: "Discord", href: "https://discord.gg/WMNPPwN5u2", iconKey: "discord" },
  { name: "Twitter", href: "https://twitter.com/MiaPaprika", iconKey: "twitter" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCOL0LMgV0xYA6-QCTErpuGQ", iconKey: "youtube" },
  { name: "Ko-fi", href: "https://ko-fi.com/miapaprika", iconKey: "kofi" },
  { name: "VGen", href: "https://vgen.co/MiaPaprika", iconKey: "vgen" },
  { name: "Pixiv", href: "https://www.pixiv.net/en/users/67165832", iconKey: "pixiv" },
  { name: "Email", href: "mailto:miapaprikacontact@gmail.com", iconKey: "email" },
];

const COMMISSION_TYPES = [
  "Illustration",
  "Live2D Artwork",
  "Live2D Rigging",
  "Live2D Artwork + Rigging",
  "Other",
];

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

const MY_WORK = {
  portraits: ["ayano", "gomurya", "easter"],
  landscapes: ["asher", "coloso", "galaxy", "grand-mother-silk", "koto-pond", "nailpolish", "seikawallpaper"],
  mobileSlides: [
    ["ayano"],
    ["asher", "coloso"],
    ["gomurya"],
    ["galaxy", "grand-mother-silk"],
    ["easter"],
    ["koto-pond", "nailpolish"],
    ["seikawallpaper"],
  ],
  anim: {
    duration: 260,
    stagger: 65,
    distance: 72,
  },
};

// Newest commissions first (Drive folders 2026 -> 2022). `zoom` overrides the
// default head crop for arts whose framing needs it.
const CLIENTS = [
  { file: "besarexia-s", name: "Besaxeria" },
  { file: "vexoria", name: "Vexoria" },
  { file: "luca-lullaby", name: "LucaLullaby" },
  { file: "reo-techiya", name: "Reo Techiya" },
  { file: "moomi", name: "Moomi" },
  { file: "coventryy", name: "Coventryy" },
  { file: "megan", name: "Megan" },
  { file: "glitchy", name: "Glitchy" },
  { file: "ludo", name: "Ludo" },
  { file: "sordidj", name: "Sordidj" },
  { file: "mochi-braids", name: "Mirune Mochi" },
  { file: "lunar-elsa-v2", name: "LunarElsa" },
  { file: "may-kitsune", name: "May Kitsune" },
  { file: "vivi-fellow", name: "Vivi Fellow" },
  { file: "kabuki", name: "Kabuki" },
  { file: "octo", name: "Octo" },
  { file: "koara", name: "Koara" },
  { file: "psycho-veee", name: "Psycho Veee" },
  { file: "taiga-pipe", name: "Taiga" },
  { file: "demythical", name: "Demythical" },
  { file: "azu-ryuna", name: "AzuRyuna" },
  { file: "muimina", name: "Muimina", zoom: "h-[420%] mt-[-190px]" },
  { file: "zavalr", name: "Zavalr" },
  { file: "lunar-elsa", name: "LunarElsa", zoom: "h-[300%]" },
  { file: "demize", name: "Demize" },
  { file: "eremes-ng", name: "Eremes" },
  { file: "cuchu-nemurin", name: "CuchuNemurin" },
  { file: "galaxy", name: "Galaxy" },
  { file: "alyss-sourscream", name: "Alyss Sourscream" },
  { file: "cindyrockssch", name: "Cindyrocks" },
  { file: "coventryywt", name: "Coventryy" },
  { file: "cryoladyx", name: "CryoLadyx", zoom: "h-[420%] mt-[-180px]" },
  { file: "demythical-2022", name: "Demythical" },
  { file: "fabitoh", name: "Fabitoh", zoom: "h-[400%] mt-[-90px]" },
  { file: "girlofnox", name: "GirlOfNox" },
  { file: "grin", name: "Grin" },
  { file: "halo", name: "Halo", zoom: "h-[400%] mt-[-195px]" },
  { file: "itsfirekeeperqa", name: "Itsfirekeeperqa", zoom: "h-[300%] mt-[-95px]" },
  { file: "maevey", name: "Maevey" },
  { file: "remmychu", name: "Remmychu" },
  { file: "skatinmonkgu", name: "SkatinmonkGU" },
  { file: "soreyya", name: "Soreyya" },
  { file: "trace", name: "Träce" },
  { file: "zayaorejas", name: "Zayaorejas" },
  // 2021
  { file: "y2021-1", name: "Yasashi" },
  { file: "y2021-2", name: "Meizu" },
  { file: "y2021-3", name: "Moon" },
  { file: "y2021-4", name: "Maaka" },
  { file: "y2021-5", name: "Prelettis" },
];

// Bullets support **bold** and [label](url) inline markers, straight from the Figma copy.
const TERMS_SECTIONS = [
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

/**
 * Container of static site configuration exposed through getter functions.
 */
export const consts = {
  /** Returns section navigation dots for `"home"` or `"commissions"`, or all pages. */
  sections(page) {
    return page ? (PAGE_SECTIONS[page] ?? []) : PAGE_SECTIONS;
  },

  /** Returns commission pricing tabs (`"models"` | `"illustrations"`), or both. */
  prices(kind) {
    return kind ? (PRICING[kind] ?? null) : PRICING;
  },

  /** Returns social links metadata. */
  socials() {
    return SOCIALS;
  },

  /** Returns contact form commission type options. */
  commissionTypes() {
    return COMMISSION_TYPES;
  },

  /** Returns community review entries. */
  reviews() {
    return REVIEWS;
  },

  /** Returns My Work gallery filenames, mobile groups, and transition timings. */
  myWork() {
    return MY_WORK;
  },

  /** Returns portfolio client entries. */
  clients() {
    return CLIENTS;
  },

  /** Returns Terms & Conditions sections. */
  terms() {
    return TERMS_SECTIONS;
  },
};

export default consts;
