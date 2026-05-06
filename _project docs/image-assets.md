# V V AI — Image Assets Reference

> Complete inventory of existing CDN images from vvai.com + new assets needed for the redesign.
> CDN Base: `https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image/`

---

## CDN Shorthand

```
CDN = https://vv-web-assets-cdn.vv.com.sg/gms/sgp-prod/vv-website-ui/2026030516/static/image
```

All `CDN/filename` references below expand to the full URL above.

---

## 1. Logo & Brand Assets

| Asset               | URL / Path                                 | Notes                                                      |
| ------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| Bird Logo (primary) | `/public/assets/logo/BirdLogo@2x.png`      | Source from original site; use in `<img>` & Three.js scene |
| Bird Logo Container | `/public/assets/logo/BirdContainer@2x.png` | Circular ring/container around logo                        |
| Logo (dark bg SVG)  | `/public/assets/logo/vvai-logo-dark.svg`   | **New:** Create SVG version for crisp scaling              |
| Logo (light bg SVG) | `/public/assets/logo/vvai-logo-light.svg`  | **New:** For any light-background contexts                 |
| Favicon             | `/public/favicon.ico` + `/public/icon.png` | Extract from existing site                                 |
| OG Image            | `/public/assets/og-image.png` (1200×630)   | **New:** For social sharing previews                       |

---

## 2. Hero Section — Page 1 (Work Suite screenshots used as floating UI elements)

| Filename                   | Full URL                       | Usage                                            |
| -------------------------- | ------------------------------ | ------------------------------------------------ |
| `page1_img1.5c46f174.png`  | `CDN/page1_img1.5c46f174.png`  | Work dashboard — primary floating device         |
| `page1_img2.5fcfb525.png`  | `CDN/page1_img2.5fcfb525.png`  | Work chat / IM interface                         |
| `page1_img3.4de76729.png`  | `CDN/page1_img3.4de76729.png`  | Work tasks / OKR list                            |
| `page1_img5.e4e506ef.png`  | `CDN/page1_img5.e4e506ef.png`  | Calendar / schedule view                         |
| `page1_img7.69413196.png`  | `CDN/page1_img7.69413196.png`  | Document / collaboration view                    |
| `page1_img9.56d6ec0e.png`  | `CDN/page1_img9.56d6ec0e.png`  | Meeting / video call UI                          |
| `page1_img10.2fc1e056.png` | `CDN/page1_img10.2fc1e056.png` | Dashboard stats panel                            |
| `page1_img16.bc8597f1.png` | `CDN/page1_img16.bc8597f1.png` | Work module — floating element                   |
| `page1_img17.02dcc611.png` | `CDN/page1_img17.02dcc611.png` | Work module — secondary panel                    |
| `page1_img18.23671830.png` | `CDN/page1_img18.23671830.png` | Analytics / BI preview                           |
| `page1_img19.d84719c3.png` | `CDN/page1_img19.d84719c3.png` | Mobile app preview                               |
| `page1_img22.a6c02b48.png` | `CDN/page1_img22.a6c02b48.png` | Feature module card                              |
| `page1_img24.8ffaf615.png` | `CDN/page1_img24.8ffaf615.png` | Platform feature UI                              |
| `page1_img25.1b450437.gif` | `CDN/page1_img25.1b450437.gif` | **Animated GIF** — use in hero as motion element |

> **Usage tip:** Layer `page1_img1` (large, behind) + `page1_img3` or `page1_img9` (mid) + `page1_img19` (small mobile, foreground) as a parallax device cluster in the hero section.

---

## 3. Work Suite — index_page2 series

| Filename                        | Full URL                            | Usage                                |
| ------------------------------- | ----------------------------------- | ------------------------------------ |
| `index_page2_img1.d17f0bfc.png` | `CDN/index_page2_img1.d17f0bfc.png` | Work Suite hero / primary screenshot |
| `index_page2_img2.cba306d4.png` | `CDN/index_page2_img2.cba306d4.png` | Work task list view                  |
| `index_page2_img3.1fa2cacf.png` | `CDN/index_page2_img3.1fa2cacf.png` | Work calendar/schedule               |
| `index_page2_img4.f3e7c1ad.png` | `CDN/index_page2_img4.f3e7c1ad.png` | Work IM / chat (mobile)              |
| `index_page2_img7.586f929e.png` | `CDN/index_page2_img7.586f929e.png` | OKR / objectives view                |
| `index_page2_img8.b8b93349.png` | `CDN/index_page2_img8.b8b93349.png` | Document collaboration               |
| `index_page2_img9.fc47a119.png` | `CDN/index_page2_img9.fc47a119.png` | Video meetings / rooms               |

> **Missing:** `index_page2_img5`, `img6` — likely feature icons (inline base64 on original site). Re-create as SVG Lottie icons for redesign.

---

## 4. Life Suite — index_page3 series

| Filename                        | Full URL                            | Usage                      |
| ------------------------------- | ----------------------------------- | -------------------------- |
| `index_page3_img1.39a88fc8.png` | `CDN/index_page3_img1.39a88fc8.png` | Life assistant home screen |
| `index_page3_img2.5460da6b.png` | `CDN/index_page3_img2.5460da6b.png` | Lifestyle services menu    |
| `index_page3_img3.26b4b49d.png` | `CDN/index_page3_img3.26b4b49d.png` | Life planner / calendar    |
| `index_page3_img4.45ea3a2a.png` | `CDN/index_page3_img4.45ea3a2a.png` | Restaurant recommendations |
| `index_page3_img5.b35727f0.png` | `CDN/index_page3_img5.b35727f0.png` | Travel / transport UI      |
| `index_page3_img6.5c4361d5.png` | `CDN/index_page3_img6.5c4361d5.png` | Life overview dashboard    |
| `index_page3_img7.a60d3d74.png` | `CDN/index_page3_img7.a60d3d74.png` | Lifestyle activity card    |
| `index_page3_img8.6b59ffb8.png` | `CDN/index_page3_img8.6b59ffb8.png` | Explore / discovery screen |

---

## 5. Education Suite — index_page4 series

| Filename                        | Full URL                            | Usage                         |
| ------------------------------- | ----------------------------------- | ----------------------------- |
| `index_page4_img1.eb1ade7f.png` | `CDN/index_page4_img1.eb1ade7f.png` | Education dashboard (primary) |
| `index_page4_img2.d15298b8.png` | `CDN/index_page4_img2.d15298b8.png` | Classroom / lesson view       |
| `index_page4_img3.7d863712.png` | `CDN/index_page4_img3.7d863712.png` | Student progress tracking     |
| `index_page4_img4.884a40ca.png` | `CDN/index_page4_img4.884a40ca.png` | Class schedule / timetable    |
| `index_page4_img5.492dc2c1.png` | `CDN/index_page4_img5.492dc2c1.png` | Parent app / mobile view      |

### 5.1 Locale-Specific Education Hero Image

To match in-image UI language by locale, the Education product page uses locale-specific dashboard files under `/public/images/vv/`:

| Locale  | Local file path                                   | Display language in image |
| ------- | ------------------------------------------------- | ------------------------- |
| `en`    | `/public/images/vv/education-dashboard-en.png`    | English                   |
| `zh`    | `/public/images/vv/education-dashboard-zh.png`    | Simplified Chinese        |
| `zh-tw` | `/public/images/vv/education-dashboard-zh-tw.png` | Traditional Chinese       |

Implementation note:

- Mapping is applied in `src/app/[locale]/products/[suite]/page.tsx` for suite id `education`.
- Locale-specific files are applied to `heroImage` in the Education suite hero section.
- The same locale-specific hero image is also used in page metadata Open Graph image selection.

---

## 6. Health Suite — index_page5 series

| Filename                           | Full URL                               | Usage                     |
| ---------------------------------- | -------------------------------------- | ------------------------- |
| `index_page5_img6-1.48b9652f.png`  | `CDN/index_page5_img6-1.48b9652f.png`  | Health overview dashboard |
| `index_page5_img3-2.cd96bc7a.png`  | `CDN/index_page5_img3-2.cd96bc7a.png`  | Health tracking / vitals  |
| `index_page5_img1-3.6e9cf71a.png`  | `CDN/index_page5_img1-3.6e9cf71a.png`  | Appointment booking       |
| `index_page5_img2-4.30adb43e.png`  | `CDN/index_page5_img2-4.30adb43e.png`  | Health records / history  |
| `index_page5_img10-6.10b319be.png` | `CDN/index_page5_img10-6.10b319be.png` | Health resources hub      |
| `index_page5_img4-7.440bf8da.png`  | `CDN/index_page5_img4-7.440bf8da.png`  | Health manager features   |
| `index_page5_img5-8.223254d6.png`  | `CDN/index_page5_img5-8.223254d6.png`  | Resource sharing screen   |

---

## 7. Customer Avatars

| Person                          | Filename                  | Full URL                      | Used In               |
| ------------------------------- | ------------------------- | ----------------------------- | --------------------- |
| Jacky C. — Operations Director  | `customer-1.9abed173.png` | `CDN/customer-1.9abed173.png` | Testimonials carousel |
| Michelle L. — Education Founder | `customer-2.b746ddaa.png` | `CDN/customer-2.b746ddaa.png` | Testimonials carousel |
| Bonny H. — Corporate Employee   | `customer-3.9335c9bb.png` | `CDN/customer-3.9335c9bb.png` | Testimonials carousel |
| Winnie W. — Marketing & Sales   | `customer-4.9618f882.png` | `CDN/customer-4.9618f882.png` | Testimonials carousel |
| Kevin S. — Parent               | `customer-5.e95ceacf.png` | `CDN/customer-5.e95ceacf.png` | Testimonials carousel |

> **Tip:** Download and host locally under `/public/assets/customers/` to avoid CDN dependency. Compress to WebP.

---

## 8. Background / Section Images

| Asset                   | Local path                           | CDN origin                | Used In                                | Status                   |
| ----------------------- | ------------------------------------ | ------------------------- | -------------------------------------- | ------------------------ |
| Platform / Team-Work bg | `/public/images/vv/team-work-bg.png` | `CDN/bg.a08dbe52.png`     | Section 5 — Platform (PlatformSection) | ✅ Downloaded            |
| Hero background         | —                                    | `bg.png` or `hero-bg.png` | Hero section                           | Recreate as CSS gradient |
| Security section bg     | —                                    | `Security-bg.png`         | Section 6 — Security                   | Recreate as CSS gradient |
| Partner section bg      | —                                    | `Partner-bg.png`          | Section 7 — Partners                   | Recreate as CSS gradient |
| Customer section bg     | —                                    | `Customer-bg.png`         | Section 8 — Testimonials               | Recreate as CSS gradient |

> **`team-work-bg.png`** is the full-bleed background image from the original site's "team-work" (Platform Reimagined) section. It is already saved locally and referenced by `PlatformSection.tsx` with a GSAP ScrollTrigger parallax effect (`yPercent: -6 → +6`, `scrub: true`).
> All other background images should be **recreated as CSS gradients** (see `design-system.md` Section 5) for better performance unless a photographic asset is strictly required.

---

## 9. Feature Icons (inline base64 on original site)

The original site serves feature icons as inline base64 PNGs. For the redesign:

**Option A (recommended): Lottie JSON animations**

- Commission or create animated `.json` Lottie files for each feature icon
- Host under `/public/assets/icons/lottie/`
- Use `lottie-web` or `@lottiefiles/react-lottie-player`

**Option B: Custom SVGs**

- Create icon SVGs from scratch or use Lucide React as base
- Host under `/public/assets/icons/svg/`

**Icon list needed:**

```
work/       briefcase, okr-target, tasks-check, ticket, dashboard-grid,
            chat-bubble, video-camera, calendar, document, cloud-storage,
            board, mail, translation

enterprise/ organization-chart, workflow-arrows, contract, employees,
            policy, office-supplies, access-key

hr/         clock-attendance, salary-coin, performance-star, onboarding-person,
            staff-transfer, resignation

education/  graduation-cap, classroom, parent-child, ai-tutor, schedule-book

life/       home-sparkle, restaurant-fork, travel-plane, calendar-life,
            lifestyle-explore

health/     heart-pulse, appointment-calendar, health-record, resource-share,
            health-manager

ai/         brain-circuit, ai-agent-sparkle, multimodal, workflow-ai,
            data-expert, process-expert, evaluation-star

security/   shield-lock, encryption, backup, iso-badge, gdpr-badge,
            alert-warning, key-access
```

---

## 10. New Assets Required (Redesign)

| Asset                  | Type                   | Description                                 | Priority               |
| ---------------------- | ---------------------- | ------------------------------------------- | ---------------------- |
| Animated bird logo     | Lottie / SVG           | Bird assembles from particles on load       | P0 — Hero              |
| Interactive globe      | Three.js scene         | Slowly rotating globe with city connections | P0 — Hero              |
| Particle field         | Three.js / tsParticles | Neural mesh background                      | P0 — Hero              |
| Feature icons set      | Lottie JSON (30+)      | See Section 9 icon list above               | P0 — All sections      |
| OG social image        | Static PNG 1200×630    | For social sharing, meta tags               | P0 — SEO               |
| Noise texture          | SVG / PNG              | Subtle background texture overlay           | P1 — UI polish         |
| Team/company photos    | JPEG/WebP              | For About page — group shots, office        | P1 — About page        |
| Product video demo     | MP4 (H.264 + WebM)     | 30–60s feature walkthrough                  | P1 — Hero / Products   |
| Updated UI screenshots | WebP                   | Higher-res, updated product UI              | P1 — All product pages |
| Partner logo SVGs      | SVG                    | Clean scalable partner logos for marquee    | P1 — Partners section  |
| ISO 27001 badge        | SVG                    | Official certification badge                | P2 — Security          |
| GDPR badge             | SVG                    | Official badge or custom-designed           | P2 — Security          |
| App Store badges       | SVG                    | Download on App Store / Google Play         | P2 — Footer, Platform  |
| Hero background video  | MP4 / WebM loop        | Optional — ambient dark background          | P3 — Hero              |

---

## 11. Image Optimisation Guidelines

### Format Strategy

```
Photos (avatars, screenshots, backgrounds) → WebP  (with JPEG fallback)
Icons (UI elements, logos)                 → SVG   (preferred) or Lottie
Animated sequences                         → Lottie JSON (preferred over GIF)
Hero background animation                  → Three.js canvas (preferred over video)
OG / social sharing images                 → PNG (1200×630 or 1200×628)
```

### Next.js `<Image>` Component usage

```tsx
import Image from 'next/image'

// For CDN images — add domain to next.config.ts
;<Image
  src="https://vv-web-assets-cdn.vv.com.sg/..."
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={true} // only for above-the-fold images
  quality={85}
/>

// next.config.ts
const config = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'vv-web-assets-cdn.vv.com.sg' }],
  },
}
```

### Recommended Sizes

```
Customer avatars:      128×128px  (displayed at 64px, 2× for retina)
Suite screenshots:     1200×800px (desktop) / 400×860px (mobile)
Partner logos:         240×80px   (displayed at 120×40px)
Hero device cluster:   1400×900px composite (or separate pieces)
OG image:              1200×630px
Section backgrounds:   1920×1080px minimum (blurred, low priority)
```

---

## 12. `next.config.ts` Image Domain Configuration

```ts
// next.config.ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vv-web-assets-cdn.vv.com.sg',
        pathname: '/gms/sgp-prod/vv-website-ui/**',
      },
      // Add Sanity CDN when CMS is configured:
      // { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 128, 256, 384],
  },
}

export default config
```

---

## 13. Local Asset Folder Structure

Recommended `/public` organisation for the redesign:

```
public/
├── assets/
│   ├── logo/
│   │   ├── BirdLogo@2x.png          ← from original site
│   │   ├── BirdContainer@2x.png     ← from original site
│   │   ├── vvai-logo-dark.svg        ← NEW
│   │   └── vvai-logo-light.svg       ← NEW
│   ├── customers/
│   │   ├── customer-1.webp           ← downloaded + converted from CDN
│   │   ├── customer-2.webp
│   │   ├── customer-3.webp
│   │   ├── customer-4.webp
│   │   └── customer-5.webp
│   ├── icons/
│   │   ├── lottie/                   ← Lottie JSON files
│   │   │   ├── icon-work.json
│   │   │   ├── icon-education.json
│   │   │   └── ...
│   │   └── svg/                      ← Static SVG fallbacks
│   ├── backgrounds/
│   │   ├── noise.svg                 ← subtle texture
│   │   └── grid.svg                  ← background grid pattern
│   ├── partners/                     ← partner logo SVGs
│   ├── og-image.png                  ← 1200×630 social preview
│   └── fonts/
│       └── SpaceGrotesk-Variable.woff2
└── favicon.ico
```
