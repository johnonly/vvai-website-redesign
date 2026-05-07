# V V AI — Website Redesign Plan

> **Current site:** [vvai.com](https://www.vvai.com/en/)
> **Company:** V V Technology Pte. Ltd. (Singapore)
> **Date:** March 29, 2026

---

## 0. AI Build Reference — How to Use These Files

> **For AI agents:** This section explains every reference file in this project folder and tells you exactly when and how to consult each one during development. Always read the relevant reference file before writing code for any feature area.

---

### Reference File Map

```
_project docs/
├── vvai-redesign-plan.md     ← YOU ARE HERE — master brief, content, and strategy
├── design-system.md          ← CSS tokens, colours, typography, component styles
├── page-templates.md         ← Next.js App Router file structure + page TSX layouts
├── component-library.md      ← Every UI component: props, anatomy, usage, animation notes
├── data-models.md            ← TypeScript types, static data, API routes, Sanity schemas, i18n
├── image-assets.md           ← All existing CDN image URLs + new asset requirements
└── animations.md             ← Full animation implementation code (GSAP, Framer Motion, Three.js)
```

---

### `vvai-redesign-plan.md` — This File

**Role:** Master brief. The source of truth for all content, copy, brand decisions, and strategy.

**When to use:**

- Whenever you need the exact headline copy, section descriptions, or CTA text for any page or component — all live in Sections 4 and 8 of this file.
- When checking which features belong to which product suite — see Sections 3 (sitemap) and 7 (feature inventory).
- When making brand or visual decisions — refer to Section 1 (brand identity) and Section 6 (animation & design system spec).
- When checking what tech stack to use — see Section 8.
- When checking i18n requirements — see Section 9.
- When assessing performance targets — see Section 11.
- When understanding the build roadmap and phase order — see Section 12.

**Key rule:** Never invent copy. All text content must come from this file.

---

### `design-system.md` — CSS & Visual Design Tokens

**Role:** Single source of truth for every visual style decision: colours, spacing, typography, component CSS, and background patterns.

**When to use:**

- **Starting the project:** Copy the Tailwind config extension (Section 1) and CSS custom properties (Section 1) into `tailwind.config.ts` and `globals.css` before writing any component.
- **Any time you write a CSS class or inline style:** Check this file first — the token already exists (`--color-blue`, `--bg-base`, `--gradient-brand`, etc.).
- **Building buttons:** Use the `.btn-primary` and `.btn-ghost` styles verbatim from Section 4.
- **Building cards:** Use the `.glass-card` spec from Section 4. Do not invent your own glassmorphism values.
- **Section backgrounds:** Use the named background classes from Section 5 (`section-bg-base`, `section-bg-gradient`, `cta-bg`).
- **Typography:** Use the type scale classes (`.text-display`, `.text-section`, `.text-body`, etc.) from Section 2. Apply `clamp()` sizes — do not hardcode px values.
- **Spacing:** Use `--section-py` and `.content-container` for all section padding and max-width. Do not use arbitrary values.
- **Font setup:** Follow Section 2 exactly — Inter + optional Space Grotesk via `next/font`.
- **Responsive:** Use the breakpoint tokens from Section 7. Mobile-first: `xs → sm → md → lg → xl → 2xl`.
- **Theming:** The site supports **dark mode** (default) and **light mode** (inspired by original vvai.com — light blue-white `#EEF3FC` background, dark navy text). Use semantic token utilities (`bg-bg-base`, `text-text-primary`, `border-border-default`) so components adapt automatically. See Section 0 of `design-system.md` for the full theming spec. The toggle lives in the Navbar (`ThemeToggle.tsx`).

---

### `page-templates.md` — Page Layouts & Route Structure

**Role:** Defines every page's file path, component composition order, and layout skeleton.

**When to use:**

- **Setting up the Next.js project:** Use Template 1 (Root Layout) as the exact starting point for `app/[locale]/layout.tsx`.
- **Building the home page:** Template 2 shows the exact order of all 9 sections. Do not reorder them.
- **Building any product page:** Use Template 3 (Product Suite Page) — it defines `SuiteHero → FeatureGrid → ScreenshotShowcase → ModuleList → SuiteSecurityBar → CtaSection`.
- **Building solutions pages:** Template 4.
- **Building the security page:** Template 5 — note the `CertificationsBar` and `DataResidency` components required.
- **Building about/news/contact/pricing/legal/careers pages:** Templates 6–12.
- **Navigation structure:** The `NAV_ITEMS` array at the bottom of this file is the definitive sitemap for `Navbar.tsx` — use it verbatim.
- **Shared section skeleton:** Every section must follow the wrapper pattern at the bottom of this file (`section-wrapper → content-container → section-label → heading → body → grid`).

---

### `component-library.md` — UI Components

**Role:** Defines every reusable component: its TypeScript props, internal DOM structure, CSS classes, and animation behaviour.

**When to use:**

- **Before creating any new component:** Check if it already exists here. Do not duplicate — use the defined component.
- **`Button`:** Always use the `Button` component with defined `variant` and `size` props. Never write a raw `<button>` with custom styles inline.
- **`GlassCard`:** Use for all cards across the site. Never repeat the glassmorphism CSS — it's encapsulated here.
- **`SectionLabel`:** Use the eyebrow/label component above every section heading. Style must match the defined pill shape.
- **`GradientText`:** Wrap gradient-coloured heading words in this component. Do not use inline `background-clip` styles.
- **`PillarTabs` data:** The `PILLARS` array in Section 7 contains the exact CDN screenshot URLs for each pillar tab — use them directly.
- **`TestimonialsSection`:** The `TESTIMONIALS` array in Section 11 contains all 5 customer quotes, roles, and live CDN avatar URLs — use them verbatim.
- **`SecurityChecklist`:** The `SECURITY_CARDS` array in Section 12 contains the exact security copy split into two cards — use it as-is.
- **`HeroSection` anatomy:** Section 13 defines the exact DOM layers (canvas → grid bg → content → globe). Build it in this order.
- **Component index table** at the bottom maps every component to its file path.

---

### `data-models.md` — Types, Data, APIs & i18n

**Role:** All TypeScript interfaces, pre-populated static data, API route implementations, Sanity CMS schemas, and i18n message key structure.

**When to use:**

- **Starting TypeScript work:** Import types from `src/types/` using the interfaces defined in Section 1. Never re-define types that already exist here.
- **Populating suite data:** The `SUITES` array in Section 2.1 is pre-filled with all 4 suites including correct CDN screenshot URLs, accent colours, keywords, and hrefs. Import and use it — do not hardcode suite data inline in components.
- **Populating module data:** The `MODULES` array in Section 2.2 contains all 35 modules across 7 groups. Use it to build the product nav and module list pages.
- **Populating testimonials:** The `TESTIMONIALS` array in Section 2.3 is the definitive source — includes live CDN avatar URLs. Use `data-models.md` (also referenced in `component-library.md`) — both point to the same data.
- **Building the demo form API route:** Use the Zod schema and `DemoRequest` type from Section 3.1. Include reCAPTCHA validation, rate limiting, and CRM forwarding as specified.
- **Sanity CMS queries:** Use the GROQ query strings from Section 3.2 verbatim for news articles, partner logos, and testimonials.
- **i18n routing middleware:** `src/middleware.ts` handles locale-prefixed routing (reads from `src/i18n/routing.ts`). Locales are `en`, `zh`, `zh-tw`. The file `src/proxy.ts` is a legacy artefact — the correct file is `middleware.ts`.
- **Locale switching:** Use `LocaleSwitcher` component (`src/components/ui/LocaleSwitcher.tsx`). It uses `createNavigation` from `src/navigation.ts` for typed locale-aware `useRouter` and `usePathname`. Do not construct locale URLs manually.
- **Environment variables:** Follow the `.env.local` template in Section 5 — all required keys are listed. Never hardcode secrets.
- **i18n message keys:** When adding translated text, use the key structure from Section 6 as the naming convention baseline.

---

### `image-assets.md` — Images & Media

**Role:** Complete inventory of all existing CDN images from the live vvai.com site, with exact hashed URLs, plus a specification for all new assets needed.

**When to use:**

- **Any time you need a product screenshot:** Find it in Sections 2–6. All images are grouped by suite with descriptions of what each screenshot shows — pick the right one for context.
- **Hero floating device cluster:** Section 2 identifies `page1_img1` (primary), `page1_img3`/`page1_img9` (mid), `page1_img19` (mobile foreground) as the recommended parallax layers.
- **Customer avatars:** Section 7 — all 5 avatars with exact hashed CDN URLs. Reference these in the `TESTIMONIALS` data array.
- **Background images:** Section 8 — these are recreated as CSS gradients (see `design-system.md` Section 5). Do not look for background image files.
- **Feature icons:** Section 9 lists the full icon set needed. Use Lottie JSON (Option A) under `/public/assets/icons/lottie/` or SVG fallbacks. Never use emoji or rasterised icons.
- **New assets checklist:** Section 10 lists everything that needs to be created (bird logo Lottie, Three.js globe, OG image, etc.) with priority levels (P0 = must have for launch).
- **`next.config.ts` setup:** Copy the `remotePatterns` config from Section 12 to enable CDN images in `next/image`. This must be done before any CDN image will load.
- **Public folder structure:** Follow the folder layout in Section 13 when placing any new asset under `/public/`.
- **Image optimisation rules:** Section 11 — always use `next/image`, WebP for photos, SVG for icons, Lottie for animated icons. Set `priority={true}` only on above-the-fold images.

---

### `animations.md` — Motion & Interaction

**Role:** Complete, copy-paste-ready implementation code for every animation effect in the redesign.

**When to use:**

- **Project setup:** Install all packages from the `npm install` block in Section 1. Set up `LenisProvider` (Section 1) in `app/[locale]/layout.tsx` and `GSAPProvider` (Section 1) as a child provider.
- **Hero particle field:** Use the Three.js `ParticleField` component from Section 2.1 — includes mouse-tracking parallax.
- **Hero globe:** Use the `GlobeScene` R3F component from Section 2.2 — do not build a globe from scratch.
- **Bird logo entrance:** Apply the GSAP timeline from Section 2.3 in `HeroSection.tsx`.
- **Hero text reveal:** Use the GSAP SplitText pattern from Section 2.4 for the H1 typewriter-style word reveal.
- **Any scroll-triggered reveal:** Use the `initScrollReveal` utility from Section 3.1 or the `ScrollReveal` Framer Motion wrapper from `component-library.md` Section 17. Do not write one-off ScrollTrigger instances.
- **Pillar tab transitions:** Use the `contentVariants` + `AnimatePresence` pattern from Section 4.2 exactly.
- **Testimonial carousel depth:** Use the `cardVariants` offset function from Section 4.3. The container needs `perspective: 1200px`.
- **Navbar mega menu:** Use the `menuVariants` + `itemVariants` from Section 4.4.
- **Partner marquee:** Copy the CSS `@keyframes` block from Section 8 into `globals.css`. The doubled-array JS trick for seamless looping is in the TSX block below it.
- **CTA animated background:** Copy the `gradient-shift` keyframe and `.cta-bg` class from Section 9 into `globals.css`.
- **3D card tilt:** Use the `TiltCard` wrapper component from Section 6 on all `TechPillarCards` and any feature card requiring hover depth.
- **Lottie icons:** Use the `LottieIcon` component from Section 7 — it handles play-on-hover automatically.
- **Performance guard:** Always wrap heavy animations with the `shouldReduceAnimation()` check from Section 11. The CSS `@media (prefers-reduced-motion)` override block must be present in `globals.css`.
- **Animation timeline table:** Section 12 lists every animation in the site, which library it uses, and what triggers it — use it as a checklist during QA.

---

### Cross-File Decision Tree

| Task                                   | Primary file                | Secondary file         |
| -------------------------------------- | --------------------------- | ---------------------- |
| Writing any copy or headline           | `vvai-redesign-plan.md` §4  | —                      |
| Adding a CSS colour, spacing, or style | `design-system.md`          | —                      |
| Creating a new page route              | `page-templates.md`         | `data-models.md` §3    |
| Creating a new component               | `component-library.md`      | `design-system.md`     |
| Displaying a product screenshot        | `image-assets.md` §2–6      | `data-models.md` §2.1  |
| Displaying a customer testimonial      | `component-library.md` §11  | `data-models.md` §2.3  |
| Adding any animation                   | `animations.md`             | `component-library.md` |
| Writing a TypeScript type              | `data-models.md` §1         | —                      |
| Fetching from CMS                      | `data-models.md` §3.2       | —                      |
| Setting up i18n                        | `data-models.md` §3.3, §6   | `page-templates.md` §1 |
| Adding an icon                         | `image-assets.md` §9        | `animations.md` §7     |
| Performance/accessibility check        | `vvai-redesign-plan.md` §11 | `animations.md` §11    |

---

## 1. Brand Identity & Core Messaging

### Tagline (keep & amplify)

> **"Redefining Connections, Acting on Your Words"**

### Supporting Description

> "Providing Intelligent AI-Driven Services Across Work, Education, Life, and Health — Leveraging AI concepts and technologies to deliver precise, intelligent services, creating an AI era where services seamlessly transition from **being sought** to **being enjoyed**."

### Brand Personality

- Forward-thinking, intelligent, trustworthy
- Global yet human-centred
- Tech-forward with warmth (the "V" bird logo conveys motion, freedom, connection)

### Logo & Visual Identity

- **Logo:** Bird/wing motif — conveys flight, freedom, upward momentum
- **Primary accent colour:** `#5590F6` (vivid blue — seen on feature dot icons)
- **Background colour range:** Deep navy/dark (`#0A0E1A`) to rich indigo (`#1A1F3C`)
- **Gradient accents:** Blue → violet (`#5590F6` → `#8B5CF6`)
- **Text:** White on dark, muted grey for secondary (`#A0A6B5`)
- **Typography:** Clean sans-serif (current site uses a modern rounded typeface consistent with enterprise SaaS)

---

## 2. Current Site Audit — What Works, What to Redesign

### Strengths to Preserve

- Clear four-pillar structure: **Work · Education · Life · Health**
- Animated hero with globe + bird logo
- Split Enterprise / Personal positioning
- Security trust signals (ISO 27001, GDPR, end-to-end encryption)
- Partner logos scroll section
- Customer testimonial carousel
- "Book a Demo" CTA throughout

### Opportunities to Elevate

- Hero is visually interesting but feels slow and requires JavaScript to render
- Sections feel disconnected — need a stronger visual narrative flow
- Animations exist but are mostly opacity fades — needs kinetic, immersive motion
- Mobile experience needs parallax depth
- Product depth (30+ features) is buried in a nav dropdown — needs better surfacing
- No video content surfacing AI capabilities in action
- Customer quotes are small — need more visual weight
- Stats/social proof numbers are not prominently displayed

---

## 3. Sitemap — Redesigned Navigation

```
Home
├── Products
│   ├── Work Suite
│   │   ├── Work Management (OKR, Projects, Tasks, Tickets, Dashboard)
│   │   ├── Communication & Collaboration (IM, Meetings, Email, Calendar)
│   │   ├── Document & Storage (Docs, MicroDisk, Board)
│   │   └── AI Work Agent
│   ├── Enterprise Suite
│   │   ├── HR Management (Attendance, Salary, Performance, Recruitment)
│   │   ├── Enterprise Management (Org, Workflow, Contracts, Policy)
│   │   └── Business Intelligence (Data Expert, Evaluation, Process Expert)
│   ├── Education Suite
│   │   ├── Home-School Collaboration
│   │   ├── Smart Classroom
│   │   └── AI Learning Assistant
│   ├── Life Suite
│   │   ├── Life Assistant
│   │   └── Lifestyle Services
│   └── Health Suite
│       ├── Health Manager
│       └── Resource Sharing
├── Solutions
│   ├── For Enterprises
│   ├── For Education Institutions
│   ├── For Individuals
│   └── For Healthcare
├── Security
├── Pricing
├── About
│   ├── Our Story
│   └── News
├── Contact
│   ├── Book a Demo
│   ├── Contact VV
│   └── Join Us
└── Legal
    ├── Terms
    └── Privacy
```

---

## 4. Page Sections — Landing Page Redesign

### Section 1 — Hero / Banner

**Goal:** Instant visual impact. Communicate scale + intelligence in under 3 seconds.

**Content:**

- H1: **"V V AI Connects Enterprises and Individuals to Enable True Human–AI Collaboration and Co-creation"**
- Subheadline: _"Acting on Your Words. Redefining Connections."_
- CTAs: **[Try for Free]** · **[Book a Demo]**
- Platforms: Windows · Android · macOS · iOS · iPadOS

**Animation Ideas:**

- **Particle field / neural network mesh** in background — nodes connecting dynamically, suggesting "connection"
- **Animated globe** (keep from original) — glowing, slowly rotating, with light-trail network lines connecting cities
- **Bird logo** morphs/assembles from particles as page loads — swooping entrance with motion blur
- **Typewriter effect** on headline — words appear as if the AI is "acting on your words"
- **Breathing glow pulse** around the logo (matches existing `group-breath` animation intent)
- **Parallax depth** — hero elements move at different speeds on scroll
- **Mouse-tracking parallax** — globe/particles subtly react to cursor position

---

### Section 2 — Four Pillars Tabbed Showcase

**Goal:** Show the breadth of V V AI across four life domains.

**Tabs / Cards:**
| Pillar | Headline | Subline | Keywords |
|---|---|---|---|
| 🏢 Work | "One-Stop Smart Collaboration Platform" | Connecting You to the "V" World of Intelligence | Smart · Convenient · Personalized · Collaborative |
| 🎓 Education | "New AI-powered Collaborative Education Services" | Connecting You to the "V" World of Wisdom | Collaborative · Private · Efficient · Targeted |
| 🌆 Life | "Your Personal and Reliable Smart Lifestyle Planner" | Connecting You to the "V" World of Convenience | Digital · Convenient · Comprehensive · Connected |
| 🏥 Health | "Your Reliable, Quick-Response Health Manager" | Connecting You to the "V" World of Health | Smart · Reliable · Caring · Collaborative |

**Animation Ideas:**

- **Animated tab switch** — morphing card with liquid/blob transition between pillars
- **Floating device mockup** per pillar — phone + watch + laptop, each showing real UI preview screenshots
- **Icon entrance animations** — feature icons fly in with staggered delays on tab activation
- **Parallax product screenshots** — screens slide in from depth
- **Glowing ring** around active tab

---

### Section 3 — Enterprise vs. Individual Split

**Goal:** Clearly position dual audience with visual contrast.

**Enterprise side:**

- H2: **"AI Intelligent Enterprise Management Platform"**
- Sub: _"Innovating how Enterprises are Managed — Improving Operational Efficiency and Business Outcome"_
- Feature icons (4): Work Management · Home-School Collaboration · Life Services · Health Management

**Individual side:**

- H2: **"AI-Powered Personal Assistant"**
- Sub: _"From task executor to decision enabler — From human-serving tools to people-centric services"_
- Feature icons (4): Intelligent Assistance · Personalized Learning · Proactive Service · Risk Detection

**More detail (original copy):**

- Enterprise: _"Use V V to improve work efficiency between teams with an innovative and comprehensive collaboration and enterprise management platform."_
- Individual: _"V V career assistant accumulates and assesses your skills and achievements, offering a holistic perspective of your professional journey, opening doors to a plethora of new and exciting opportunities."_

**Animation Ideas:**

- **Split-screen** with subtle gradient divide — left deep blue (enterprise), right lighter violet (personal)
- **Central V V logo** slowly pulses/breathes between both panels (existing `group-breath` concept elevated)
- **Icon hover states** — icons glow, bounce, and expand card with description on hover
- **Floating connection lines** animate between enterprise and personal sides showing data flow
- **Staggered fade-up** for each feature item as the section enters viewport

---

### Section 4 — Four Technology Pillars (Innovation Section)

**Goal:** Establish technology credibility with visual depth.

**Title:** "Leading Product Aggregation Framework"

**Cards:**

1. **Next-Generation AI Capabilities**

   > "A next-generation AI intelligence foundation, equipped with globally innovative multi-modal conversational interaction technologies and proprietary AI capabilities. Empowers enterprises with super-intelligent AI work agents, and individuals with AI super assistants — redefining how industries connect and enabling true 'Acting on Your Words' Human–AI collaboration."

2. **Industry-Leading Internal-External Collaboration**

   > "A powerful platform architecture that seamlessly connects internal work collaboration with external business collaboration. Through unified workflows and efficient coordination, it enhances organizational execution and helps enterprises achieve transparent and effective management."

3. **Intelligent IM Communication Capabilities**

   > "End-to-end encrypted ensures privacy and data security. Covers core business communication scenarios, enabling IM-based task execution, approvals, and information sharing. Supports multi-language real-time translation, intelligent group structuring, simplified setup, and automatic member identity recognition."

4. **Global Data Security & Compliance**
   > "A globally compliant data platform aligned with international standards, including GDPR. Certified under ISO 27001 and supported by a proprietary security protection framework, ensuring comprehensive data security and compliance worldwide."

**Animation Ideas:**

- **3D card tilt** on hover — CSS perspective transform with highlight sweep
- **Particle burst** when card becomes active
- **Connecting lines** between cards suggest the platform is one integrated whole
- **Glassmorphism cards** — frosted glass effect with glowing border
- **Scroll-triggered counter** numbers if stats are added (e.g., "30+ integrations", "100+ partners")

---

### Section 5 — Platform Reimagined (Team-Work Section)

**Goal:** Showcase multi-device experience and unified workspace.

**Title:** **"V V AI Reimagines Enterprises and Individuals — Transforming Collaboration from Execution to Creation"**

**Bullet Points:**

- "A Fully Integrated AI-Powered Platform, connecting people, business, finance, and operations through intelligent collaboration"
- "A Unified Workspace, enabling internal coordination and external operational execution with seamless integration"

**Platforms:** Windows · Android · macOS · iOS · iPadOS

**Animation Ideas:**

- **3D floating device cluster** (phone + laptop + tablet + watch) with animated UI screens — parallax on scroll, devices rotate slightly
- **Device screens animate** — show real product UI switching between modules
- **Platform icons** bounce in sequentially with subtle glow
- **Background grid/mesh** — animated dark-mode grid that suggests a digital workspace
- **Scroll-driven reveal** — devices assemble from off-screen as you scroll down

---

### Section 6 — Security & Trust

**Goal:** Build enterprise confidence with clear security credentials.

**Card 1: Data Security & Technology Assurance**

- End-to-end data encryption enabling secure bidirectional data transmission
- Protection against accidental deletion or loss with multiple backup methods
- ISO 27001 certified, fully compliant with GDPR requirements
- Protection against malicious attacks, anomalous requests, and high-risk operation alerts
- Unauthorized access prevented with permission controls

**Card 2: Customer Success Service Assurance**

- Go-live within 7 days, enabling a seamless transition to digital management
- 7×24 daily customer support to ensure stable and continuous digital operations
- Full lifecycle operational system support, enabling intelligent operational decision-making
- Ongoing and growth-enablement services to support personalized long-term decision strategies

**Animation Ideas:**

- **Shield/lock icon** with animated pulse ring — security-themed entrance
- **Checkmark animations** — each feature item ticks in sequentially on scroll
- **Glassmorphism panel** with deep navy/blue backdrop
- **Glowing security badge** for ISO 27001 and GDPR logos
- **Progress ring animation** around compliance badges

---

### Section 7 — Partner Logos Scroll

**Goal:** Establish credibility through partner ecosystem.

**Title:** **"Co-Creating with 100+ Education Partners"**

**Animation Ideas:**

- **Infinite horizontal marquee** (two rows, alternating scroll directions) — keep and elevate
- **Hover pause + glow** — logos glow on hover and pause the scroll
- **Fade mask** on edges — gradient fade left/right to suggest infinite depth
- **Subtle logo entrance** — logos fade in as section first comes into view

---

### Section 8 — Customer Testimonials

**Goal:** Social proof with human faces and real stories.

**Title:** **"What Our Customers Say"**
**Subtitle:** _"Every customer's story and experience fuel our journey forward"_

**Testimonials:**

1. **Jacky C.** — Operations Director

   > _"V V AI integrates over 30 core enterprise management functions into a single platform with real-time data synchronization, making people, finance, and resource management unprecedentedly simple. It has saved me at least 30% of my time."_

2. **Michelle L.** — Education Center Founder

   > _"V V AI's educational space designed for institutions and families not only helped me increase course sales, but more importantly, it significantly improved the service experience for parents and students, leading to more referral enrollments. Teachers also find it very convenient—they can check class schedules, timetables, and students' attendance status anytime on the APP."_

3. **Bonny H.** — Corporate Employee

   > _"V V AI's office assistant is incredibly useful. It helps me organize daily to-do lists, meeting schedules, approval workflows, and more. I can chat with it anytime to discuss work ideas, and it often gives me very practical suggestions. It also quickly summarizes documents and writes reports for me—my work efficiency has improved a lot!"_

4. **Winnie W.** — Marketing & Sales Representative

   > _"Because of work, I often have client entertainment needs. Through V V AI's life assistant, I can get creative ideas for hosting clients, it recommends nearby restaurants, and it even suggests the best travel times and transportation arrangements."_

5. **Kevin S.** — Parent
   > _"I downloaded V V AI on the recommendation of the training center. At first, I only used it to check my child's class schedule, but after using it, I found it can centrally manage the learning plans, bills, notifications, learning evaluations, classroom highlights, after-class homework, and periodic learning reports for all 3 of my children across different institutions. It's truly a treasure app for parents!"_

**Animation Ideas:**

- **3D card carousel** — cards have depth/shadow and rotate on a curved arc
- **Auto-play with pause on hover**
- **Quote marks animate** — large decorative `"` marks morph in cinematically
- **Avatar photo** subtle zoom-in pulse on active card
- **Swipe gesture support** on mobile
- **Soft blurred background** matching the testimonial person's role colour (enterprise = blue, education = teal, etc.)

---

### Section 9 — Final CTA

**Goal:** Convert visitors to demos or free trial sign-ups.

**Title:** **"V V AI — Redefining Connections, Acting on Your Words"**
**CTA Button:** `Book a Demo` · `Try for Free`

**Animation Ideas:**

- **Full-width gradient wave background** — animated CSS gradient shifting through brand colours
- **CTA button** glows and pulses with a halo ring
- **Text reveals** letter-by-letter or word-by-word on scroll entry
- **Abstract bird particles** converge toward the CTA from background

---

## 5. SEO Keywords (From Original Site)

```
collaboration software, collaborative education system, health management system,
AI collaboration, AI work assistant, AI Education, AI review management,
AI Customer Service, AI business intelligence, AI ticketing system,
AI risk management, video conferencing software, teleconferencing software,
online office software, attendance management app, cloud, online document,
meeting software, work connectivity, enterprise collaboration, office collaboration,
education collaboration, office cooperation, project management, work management,
goal management, task management, OKR management, HR management,
recruitment management, global recruitment, global work, flexible employment,
remote work opportunities, attendance management
```

---

## 6. Animation & Design System Specification

### Motion Philosophy

> _"Motion should feel like intelligence — purposeful, fluid, and responsive. Every animation should reinforce the idea that V V AI thinks ahead of you."_

### Core Animation Techniques

| Technique                     | Where Used                  | Library                              |
| ----------------------------- | --------------------------- | ------------------------------------ |
| Particle / neural mesh        | Hero background             | Three.js / tsParticles               |
| Scroll-triggered reveals      | All sections                | GSAP ScrollTrigger                   |
| Parallax depth                | Hero, device section        | GSAP / Lenis smooth scroll           |
| 3D card tilt                  | Feature cards, testimonials | Vanilla-tilt.js / CSS `perspective`  |
| Text reveal (split chars)     | Section headings            | GSAP SplitText                       |
| Typewriter effect             | Hero headline               | GSAP or typed.js                     |
| Infinite marquee              | Partner logos               | CSS `@keyframes` or Framer Motion    |
| Lottie animations             | Feature icons               | Lottie-web                           |
| Liquid/blob transitions       | Pillar tab switches         | SVG SMIL or GSAP morphSVG            |
| Glassmorphism panels          | Security, feature cards     | CSS `backdrop-filter: blur()`        |
| Gradient animated backgrounds | CTA section, hero           | CSS `@keyframes` background-position |
| Counter/number reveal         | Stats (30%, 100+ partners)  | GSAP `countTo`                       |
| Mouse tracking parallax       | Hero globe/particles        | JavaScript `mousemove` event         |

### Colour Palette

```
Primary Blue:       #5590F6  (accent, CTAs, highlights)
Deep Navy:          #0A0E1A  (main background)
Rich Indigo:        #1A1F3C  (card backgrounds)
Medium Navy:        #141829  (section backgrounds)
Electric Violet:    #8B5CF6  (gradient partner to blue)
Neon Cyan:          #22D3EE  (highlight glow, hover states)
White:              #FFFFFF  (primary text)
Muted Grey:         #A0A6B5  (secondary text, icons)
Glass White:        rgba(255,255,255,0.06)  (glassmorphism panels)
Glow Blue:          rgba(85,144,246,0.3)    (shadow/glow effects)
```

### Typography Scale

```
Display (H1):       56–72px  |  font-weight: 700  |  line-height: 1.1
Section Title (H2): 40–48px  |  font-weight: 700  |  line-height: 1.2
Card Title (H3):    24–28px  |  font-weight: 600  |  line-height: 1.3
Body:               16–18px  |  font-weight: 400  |  line-height: 1.7
Caption:            13–14px  |  font-weight: 400  |  color: #A0A6B5
CTA Button:         16px     |  font-weight: 600  |  letter-spacing: 0.025em
```

**Recommended Fonts:** Inter (all weights) + optional display font (Clash Display, Syne, or Space Grotesk for headings)

### Component Design Patterns

**Glassmorphism Card:**

```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```

**Glowing CTA Button:**

```css
background: linear-gradient(135deg, #5590f6, #8b5cf6);
box-shadow: 0 0 24px rgba(85, 144, 246, 0.5);
transition:
  box-shadow 0.3s ease,
  transform 0.2s ease;
/* hover: */
box-shadow: 0 0 40px rgba(85, 144, 246, 0.8);
transform: translateY(-2px);
```

**Section Divider Gradient:**

```css
background: linear-gradient(180deg, #0a0e1a 0%, #141829 50%, #0a0e1a 100%);
```

---

## 7. Product Features Inventory (from original site nav)

### Human Resource Management

| Feature        | Description                                   |
| -------------- | --------------------------------------------- |
| Attendance     | Intelligent Time Attendance Tracking          |
| Salary         | Core Payroll Data Integration                 |
| Performance    | Multi-dimensional Performance Management      |
| Onboarding     | Eliminate Data Fragmentation, Centralize Data |
| Confirmation   | Provide Insights & Support Decision Making    |
| Staff Transfer | Convenient & Efficient Job Transfers          |
| Resignations   | Seamless Digital Service Integration          |

### Enterprise Management

| Feature         | Description                                    |
| --------------- | ---------------------------------------------- |
| Organization    | Clear Structure, Easy Adjustment               |
| Company         | Agile Global Enterprise Management             |
| Workflow        | Intelligent Processes & Efficient Approval     |
| Policy          | Flexible Configuration & Convenient Management |
| Office Supplies | Resource Management & Cost Control             |
| Contracts       | Smart Contract Management to Empower Business  |
| Employees       | Integrated Data Management                     |
| Access Rights   | Flexible & Secure Management                   |

### Work Management

| Feature         | Description                               |
| --------------- | ----------------------------------------- |
| Objective (OKR) | Goal Breakdown, Result-Oriented           |
| Projects        | Integrated Task Management                |
| Tasks           | Transparent Work & Data Quantification    |
| Tickets         | Problem Tracking & Closed-loop Management |
| Dashboard       | Real-time Team Data Management            |

### Communication & Collaboration

| Feature       | Description                                                                                |
| ------------- | ------------------------------------------------------------------------------------------ |
| IM            | Timely & Efficient Information Delivery (end-to-end encrypted, multi-language translation) |
| Meetings      | Video conferencing, teleconferencing                                                       |
| Meeting Rooms | Smart room management                                                                      |
| Calendar      | Scheduling & coordination                                                                  |
| Email         | Business email integration                                                                 |
| Document      | Online document collaboration                                                              |
| Board         | Visual project boards                                                                      |
| MicroDisk     | Cloud storage                                                                              |
| Group         | Team collaboration spaces                                                                  |
| Multilingual  | Real-time translation                                                                      |

### Other Modules

| Feature                    | Description                   |
| -------------------------- | ----------------------------- |
| Recruitment                | Global Recruitment Management |
| Feedback / Feedback Expert | AI Review Management          |
| Customer Service           | AI Customer Service           |
| Data Expert                | AI Business Intelligence      |
| Evaluation Expert          | Assessment & Analytics        |
| Process Expert             | Workflow Automation           |
| Disaster Recovery          | Data backup & recovery        |
| Regulation                 | Compliance management         |

---

## 8. Tech Stack Recommendation (Redesign)

| Layer          | Technology                                      | Rationale                           |
| -------------- | ----------------------------------------------- | ----------------------------------- |
| Framework      | **Next.js 15** (React)                          | SSR/SSG for SEO, App Router         |
| Styling        | **Tailwind CSS** + CSS Modules                  | Utility-first, custom design tokens |
| Animations     | **GSAP** + **Framer Motion**                    | Industry-leading motion library     |
| 3D / Particles | **Three.js** or **@react-three/fiber**          | Hero globe, particle systems        |
| Smooth Scroll  | **Lenis**                                       | Buttery-smooth scroll feel          |
| Icons          | **Lottie** + custom SVG                         | Animated feature icons              |
| CMS (optional) | **Sanity.io** or **Contentful**                 | For news, testimonials, partners    |
| Deployment     | **Vercel**                                      | Optimal for Next.js                 |
| Analytics      | **Google Analytics 4** (existing: G-ML4Z1T6JT5) | Already implemented                 |
| i18n           | **next-intl**                                   | English · 中文 · 繁體中文           |

---

## 9. Internationalisation

Current site supports:

- `en` — English (`https://www.vvai.com/en/`)
- `zh` — Simplified Chinese (`https://www.vvai.com/zh/`)
- `zh-tw` — Traditional Chinese (`https://www.vvai.com/zh-tw/`)

Redesign must maintain all three locales with server-side routing.

---

## 10. Platform Support

Must be fully responsive and native-feeling on:

- **Desktop** (Windows, macOS)
- **Tablet** (iPadOS)
- **Mobile** (Android, iOS)

Reduce/disable heavy animations on low-power devices via `@media (prefers-reduced-motion)` and battery API checks.

---

## 11. Page Performance Targets

| Metric                         | Target          |
| ------------------------------ | --------------- |
| LCP (Largest Contentful Paint) | < 2.5s          |
| FID / INP                      | < 100ms         |
| CLS                            | < 0.1           |
| Lighthouse Performance         | ≥ 90            |
| Lighthouse Accessibility       | ≥ 95            |
| Bundle size (initial JS)       | < 200KB gzipped |

Animations should use `will-change`, GPU-composited properties (`transform`, `opacity`), and be lazy-loaded below the fold.

---

## 12. Phase Plan / Build Roadmap

### Phase 1 — Foundation (Weeks 1–2)

- [x] Set up Next.js project with Tailwind, GSAP, Framer Motion
- [x] Design token system (colours, typography, spacing)
- [x] Component library: Button, Card, Badge, Section wrapper
- [x] Navigation header + mobile menu
- [x] Footer

### Phase 2 — Hero & Core Sections (Weeks 3–4)

- [x] Hero section — particle background, animated bird logo, headline
- [x] Four pillars tab/slider section
- [x] Enterprise vs. Individual split section (→ BannerSection with animated bird + hover icons)

### Phase 3 — Features & Technology (Week 5)

- [x] Innovation cards (4 pillars) with glassmorphism
- [x] Multi-device platform showcase

### Phase 4 — Trust & Social Proof (Week 6)

- [x] Security module with animated feature checks
- [x] Partner logos infinite marquee
- [x] Testimonials section

### Phase 5 — Product Pages (Weeks 7–9)

- [x] Work Suite product page (`/products/work`)
- [x] Education Suite product page (`/products/education`)
- [x] Life Suite product page (`/products/life`)
- [x] Health Suite product page (`/products/health`)
- [x] Products overview index page (`/products`) — suite card grid
- [x] Solutions page (`/solutions`) — enterprise/education/personal/healthcare sections

### Phase 6 — Ancillary Pages (Week 10)

- [x] About / Our Story (`/about`) — values, milestones, stats
- [x] News (`/about/news`)
- [x] Security & Compliance (`/security`) — ISO 27001, GDPR, data security, customer success
- [x] Pricing (`/pricing`) — enterprise contact-for-quote model, FAQ
- [x] Contact / Book a Demo form (`/contact`, `/demo`)
- [x] Join Us (`/join`) — careers with 18 job listings
- [x] Support (`/support`) — 7×24, channels, SLA badges
- [x] Terms & Privacy (`/terms`, `/privacy`)
- [x] Redirect stubs: `/about/story` → `/about`, `/about/careers` → `/join`

### Phase 7 — QA, Performance & Launch (Weeks 11–12)

- [ ] Cross-browser testing
- [ ] Performance optimisation
- [ ] i18n QA (EN / ZH / ZH-TW) ✅ Complete — all pages fully translated (see Implementation Notes §i18n)
- [ ] Accessibility audit
- [ ] SEO meta/OG tags
- [ ] Analytics & GTM setup
- [ ] Launch

---

## 14. Implementation Notes (Added During Build)

### Navigation routing (updated)

`navigation.ts` NAV_ITEMS and FOOTER_LINKS reflect live routes:

- `Our Story` → `/about` (the about page IS the story page)
- `Careers / Join Us` → `/join` (not `/about/careers`)
- Old URLs `/about/story` and `/about/careers` have redirect pages that forward to the correct routes

### Products routing

All four suites are served by a single dynamic route `products/[suite]/page.tsx` using `generateStaticParams`. An index page at `products/page.tsx` lists all suites.

### Solutions — single page

`/solutions` is a single page with four audience sections (enterprise, education, personal, healthcare) rather than separate sub-routes, matching actual vvai.com structure.

### Pricing model

VV AI does not publish public pricing. The `/pricing` page explains the enterprise contact-for-quote model with a feature-by-suite table, enterprise CTA, and FAQ section.

### GlassCard component

`GlassCard.tsx` now accepts `style?: React.CSSProperties` for inline style overrides (e.g. custom gradient backgrounds on highlighted cards).

### Platform section background (updated)

`PlatformSection.tsx` no longer uses the full-bleed `team-work-bg.png` parallax image layer, which caused visual clutter and reduced copy legibility in the light theme.

The section now uses a cleaner layered background system:

- Base gradient surface via `.platform-section-bg` (blue/violet atmospheric wash)
- Subtle structural grid via `.platform-section-grid`
- Two soft glow blobs (left blue / right violet) to keep depth without noisy texture
- Secondary polish pass reduced grid contrast and glow intensity to improve text readability and visual calmness across dark/light themes

Styles live in `src/app/globals.css` and are theme-aware (`:root`/dark + `html.light` overrides).

### Favicon

Tab icon is served via `src/app/icon.png` (file-based Next.js App Router convention). The old `favicon.ico` was deleted. Both use the bird logo at `/images/vv/bird-logo.png`.

### Locale switcher

**Component:** `src/components/ui/LocaleSwitcher.tsx` — globe icon button + dropdown, placed in the Navbar (desktop right-side CTA bar and mobile menu).

**How locale switching works:**

1. `src/navigation.ts` calls `createNavigation(routing)` and exports typed `Link`, `useRouter`, `usePathname`, `redirect`, `permanentRedirect`.
2. `LocaleSwitcher` reads the current locale via `useLocale()` and path via `usePathname()` (from `@/navigation` — returns path **without** locale prefix).
3. On selection, calls `router.replace(pathname, { locale: newLocale })` — next-intl re-prefixes the URL automatically.

**Labels:** `en` → `EN` · `zh` → `中文` · `zh-tw` → `繁體`

### Try for Free routing + download page (updated)

`Try for Free` CTAs no longer point to `/signup`.

- Canonical in-site route is now `/{locale}/feeds/download` (implemented as `src/app/[locale]/feeds/download/page.tsx`).
- The page now follows the original download-screen style/content: `Download V V`, subtitle `The best way to experience our full suite of services`, `Update: 2026-03-20`, and four CTA tiles (`Windows`, `MAC`, `App Store`, `Google Play`).
- Legacy/original-style URL compatibility is preserved via `next.config.ts` redirect:
  - `/feeds/en/download` → `/en/feeds/download`
  - `/feeds/zh/download` → `/zh/feeds/download`
  - `/feeds/zh-tw/download` → `/zh-tw/feeds/download`

This keeps links familiar to original vvai.com path patterns while preserving locale-prefixed App Router architecture.

### Official Chinese brand slogan (updated)

The Chinese slogan is now:

- **Simplified Chinese (zh):** `V V AI 重塑连接 你说我做。`
- **Traditional Chinese (zh-tw):** `V V AI 重塑連結 你說我做。`

Use this wording when updating hero Chinese subheadline copy.

Occurrences updated: `messages/zh.json` → `hero.subheadline`; `messages/zh-tw.json` → `hero.subheadline`.

### i18n — Translation namespaces (complete list)

All pages and components use `next-intl` server-side `getTranslations`. Message files live in `messages/{en,zh,zh-tw}.json`. Current namespaces:

| Namespace      | Used in                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------- |
| (root keys)    | Navbar, Footer, global strings                                                           |
| `hero`         | HeroSection                                                                              |
| `cta`          | CtaSection                                                                               |
| `about`        | `/about` page                                                                            |
| `contact`      | `/contact` page                                                                          |
| `demo`         | `/demo` page                                                                             |
| `download`     | `/feeds/download` page                                                                   |
| `pricing`      | `/pricing` page                                                                          |
| `solutions`    | `/solutions` page                                                                        |
| `security`     | `/security` page                                                                         |
| `join`         | `/join` page                                                                             |
| `support`      | `/support` page                                                                          |
| `terms`        | `/terms` page                                                                            |
| `privacy`      | `/privacy` page                                                                          |
| `productsPage` | `/products` (overview) page                                                              |
| `news`         | `/about/news` page — includes translated posts array                                     |
| `products`     | Suite components: FeatureGrid, ModuleList, SuiteSecurityBar, SuiteHero                   |
| `suites`       | Suite translatable data: label, headline, subline, tagline, keywords, ctaLabel, features |
| `modules`      | Module names, descriptions, and group names for ModuleList                               |

**Architecture pattern for suite pages:**

- Visual/structural data (colors, images, href) stays in `src/data/suites.ts`
- Translatable content (label, headline, etc.) lives in the `suites` namespace
- `products/[suite]/page.tsx` merges them: `const localizedSuite = { ...suite, label: st('work.label'), ... }`
- All child components receive the merged `localizedSuite` object unchanged
- `ModuleList` additionally calls `getTranslations('modules')` for per-module names/descriptions

---

## 13. Key Images/Assets to Source or Recreate

From original site asset paths:

- `BirdLogo@2x.png` — Primary logo bird icon
- `BirdContainer@2x.png` — Logo container/ring
- Section background images: `bg.png` variants per section
- Customer avatars: `customer-1.png` through `customer-5.png` (Jacky, Michelle, Bonny, Winnie, Kevin)
- Feature icons: `icon1` through `icon8` (Work/Personal feature icons)
- Product screenshots: `page1_img1` through `page1_img25`, `index_page2` through `index_page5` series
- Security background: `Security-bg.png`
- Partner background: `Partner-bg.png`
- Customer section background: `Customer-bg.png`

**New assets needed for redesign:**

- Animated/Lottie versions of feature icons
- High-resolution product UI screenshots (updated)
- Hero particle/globe animation assets
- Video demo clip (30–60s) for hero or dedicated section
- Team/company photos for About page

---

## 14. Competitive Positioning Notes

VV AI positions as a **super-app for enterprise + personal AI** — analogous to:

- Notion + Slack + HubSpot + HR platform + personal AI assistant
- But with specific differentiation in **Education** and **Health** verticals
- **Singapore-based** with global GDPR compliance — appeals to APAC enterprise market
- **30+ integrated modules** in one platform — key differentiator vs. point solutions

The redesign should bold this "all-in-one" story visually, not just in copy.

---

_End of Redesign Plan — v1.0_
