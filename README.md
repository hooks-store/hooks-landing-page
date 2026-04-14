# Hooks Landing Page

A high-fidelity Hooks landing page — a premium, dark-themed SaaS marketing site for a creator-focused link-in-bio platform. Built with React 19, TypeScript, Tailwind CSS 4, and Vite 7.

---

## Quick Start

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20.x |
| pnpm | 10.x (bundled via `packageManager` field) |

### Installation and Development

```bash
# Clone the repository
git clone git@github.com:Julianahlk/hooks-landing-page.git
cd hooks-landing-page

# Use the project Node version
source ~/.nvm/nvm.sh && nvm use 20

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The dev server starts at **http://localhost:3000** with hot module replacement enabled.

### Production Build

```bash
# Build for production
pnpm build

# Preview the production build locally
pnpm preview
```

The production build outputs to `dist/`. The `pnpm build` command runs Vite for the client bundle and esbuild for the minimal Express server that handles client-side routing in production.

### Other Commands

```bash
# Type-check without emitting files
pnpm check

# Format all files with Prettier
pnpm format
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 | Component rendering and state management |
| **Language** | TypeScript 5.6 | Static type safety across the entire codebase |
| **Styling** | Tailwind CSS 4 | Utility-first CSS with OKLCH design tokens |
| **Build Tool** | Vite 7 | Dev server with HMR, production bundling |
| **Routing** | Wouter 3 | Lightweight client-side routing (~1.5 KB) |
| **Icons** | Lucide React | SVG icon library used for UI icons throughout |
| **Animations** | CSS Keyframes + Intersection Observer | Scroll-triggered fade-ups, floating badges, Ken Burns hero |
| **UI Primitives** | shadcn/ui (Radix) | Pre-built accessible components (used selectively) |
| **Production Server** | Express | Static file serving with SPA fallback for client-side routes |

---

## Project Structure

```
hooks-landing-page/
├── client/
│   ├── index.html                  # HTML shell — loads Inter font, mounts React app
│   ├── public/                     # Static config files only (favicon, robots.txt)
│   └── src/
│       ├── main.tsx                # React entry point — renders <App /> into #root
│       ├── App.tsx                 # Root component — ThemeProvider (dark), router, toaster
│       ├── index.css               # Global styles — Tailwind config, OKLCH tokens, keyframes
│       │
│       ├── pages/
│       │   ├── Home.tsx            # ★ Main landing page — all 14 sections + sub-components
│       │   └── NotFound.tsx        # 404 fallback page
│       │
│       ├── components/
│       │   ├── Navbar.tsx          # Fixed navbar — backdrop-blur, scroll-aware, mobile drawer
│       │   ├── Footer.tsx          # Multi-column footer with social links
│       │   ├── UrlInputBar.tsx     # Pill-shaped "hooks.store/yourname" CTA input
│       │   ├── HooksIcon.tsx       # Logo icon (pink→orange gradient) + wordmark
│       │   ├── SectionWrapper.tsx  # Scroll-triggered fade-up animation wrapper
│       │   ├── CreatorCarousel.tsx # Auto-scrolling, draggable creator card carousel
│       │   ├── EarningsCalculator.tsx # Interactive calculator with sliders and live math
│       │   ├── AppIconGrid.tsx     # Perspective-tilted grid of app integration icons
│       │   ├── WorldMap.tsx        # SVG dot-matrix world map with animated arcs
│       │   ├── ErrorBoundary.tsx   # Runtime error fallback UI
│       │   └── ui/                 # shadcn/ui primitives (button, card, dialog, etc.)
│       │
│       ├── hooks/
│       │   ├── useScrollAnimation.ts  # Intersection Observer hook + useCountUp counter
│       │   ├── useMobile.tsx          # Responsive breakpoint detection
│       │   ├── usePersistFn.ts        # Stable callback reference helper
│       │   └── useComposition.ts      # IME composition state tracking
│       │
│       ├── contexts/
│       │   └── ThemeContext.tsx     # Dark/light theme provider (dark by default)
│       │
│       └── lib/
│           └── utils.ts            # cn() helper — clsx + tailwind-merge
│
├── server/
│   └── index.ts                    # Express server for production SPA serving
│
├── shared/
│   └── const.ts                    # Shared constants
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Site Architecture

### Page Sections

The landing page is a single route (`/`) rendered by `Home.tsx`. It contains **14 sequential sections**, each wrapped in a `<SectionWrapper>` that triggers a fade-up animation when the section scrolls into the viewport.

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-viewport height. Basketball action photo background with Ken Burns zoom. Left-aligned headline ("*Build a Brand* with the best link in bio."), sub-copy, and pill-shaped URL input bar. Right side: floating phone mockup showing a creator profile (Anthony Edwards). |
| 2 | **Manifesto + Creator Carousel** | Large multi-line statement with cascading color/opacity effect (white → gray → orange → dim). Below: horizontally auto-scrolling carousel of creator profile cards with edge fade masks. |
| 3 | **Three-Audience Cards** | "For everyone from creators to enterprise." Three equal cards: People, Business, Agencies — each with a UI mockup preview area and description. |
| 4 | **Monetization (Merch)** | "Make money everywhere." Full-width card showing a merch designer mockup with t-shirt thumbnails, color swatches, size selector, and "Generate with AI" button. |
| 5 | **Two-Column Feature Cards** | Side-by-side cards: "Sell Digital Products" (ebook mockup with revenue badges) and "Paywall Content" (exclusive content preview with payment UI). |
| 6 | **Three-Column Feature Cards** | "Email Marketing" (sales dashboard), "Collect Tips" (creator photo with tip UI), "Course Builder" (course product card with pricing). |
| 7 | **Analytics** | "Track your global analytics." Full-width card with SVG dot-matrix world map, animated arc connections, and floating stat cards (profile views, link clicks, country breakdown). |
| 8 | **Platform Management** | "Manage everything in one place." Two cards: dashboard analytics mockup and iPhone with push notification mockup. |
| 9 | **Earnings Calculator** | Interactive card with product selector chips, price/quantity sliders (orange track), and live-calculated monthly revenue display with count-up animation. |
| 10 | **Integrations Grid** | Perspective-tilted grid of app icons (Spotify, Discord, TikTok, etc.) with edge fade masks and hover glow effects. |
| 11 | **Social Proof / Stats** | Split layout: animated stat counters (39% conversions, 180+ countries) on the left, hoodie product mockup with order summary overlay on the right. |
| 12 | **Blazingly Fast** | Split layout: creator lifestyle photo with floating stat badges on the left, performance copy on the right. |
| 13 | **Final CTA** | Full-width card with background image, three-line conversion headline, description, URL input bar, and phone mockup. |
| 14 | **Footer** | Multi-column layout: logo, People, Company, Resources, Legal link columns with social media icons. |

### Design System

The visual identity is defined through a consistent set of design tokens and patterns.

**Color Palette.** The page uses a near-black background (`#0A0A0A`) with pure white headlines and muted gray (`#8A8F98`) body text. Feature cards use a distinctive dark navy-teal gradient (`#0B1926` → `#0F2840`) that creates subtle depth separation from the page background. The sole accent color is amber/orange (`#E8930C`), used for section labels, slider tracks, and stat labels. Card borders are barely-visible white at 8% opacity.

**Typography.** Inter is the sole typeface, loaded in weights 400 through 700. Headlines range from 32px on mobile to 80px on desktop with tight letter-spacing (`-0.02em`) and a line-height of 1.1. Body text uses 15-17px at weight 400 with a line-height of 1.6.

**Card System.** Feature cards follow a signature pattern: navy-teal gradient background, 20px border-radius, 1px border at `rgba(255,255,255,0.08)`, with floating white UI mockup elements inside. Titles and descriptions sit below the card visual area, not inside it.

### Animation System

All animations are defined as CSS keyframes in `index.css` and triggered via utility classes.

| Animation | Class | Behavior |
|-----------|-------|----------|
| Scroll reveal | `animate-fade-up` | `translateY(30px) → 0`, `opacity 0 → 1`, 0.6s ease-out. Triggered by `SectionWrapper` using Intersection Observer with `threshold: 0.15` and `rootMargin: -40px`. |
| Floating badges | `animate-bob` | `translateY(0 → -4px → 0)` over 3s, infinite, with staggered `animationDelay` per element. |
| Hero background | `animate-ken-burns` | `scale(1 → 1.05)` over 20s, ease-in-out, infinite alternate. |
| Creator carousel | `animate-scroll-carousel` | `translateX(0 → -50%)` over 40s, linear, infinite. Cards are duplicated to create seamless looping. |
| Accent glow | `animate-glow-pulse` | Box-shadow pulse between 8px and 16px orange glow, 4s cycle. |
| Gentle float | `animate-float-slow` | `translateY(0 → -6px → 4px → 0)` with subtle rotation, 6s cycle. |
| Count-up numbers | `useCountUp` hook | Animates stat numbers from 0 to target over 1.5s with `easeOutExpo` easing, triggered when the element enters the viewport. |

All animations respect `prefers-reduced-motion: reduce` — when enabled, all animations and transitions are disabled.

### Responsive Behavior

The page is fully responsive across three breakpoints.

| Breakpoint | Layout Changes |
|------------|---------------|
| **Desktop** (1024px+) | Multi-column card grids, 80px horizontal padding, full-size headlines (48-80px), side-by-side split layouts. |
| **Tablet** (640-1024px) | 2-column grids where applicable, 40px padding, headlines scale down to 40-56px. |
| **Mobile** (<640px) | Single column throughout, 20px padding, headlines at 32-40px, navbar collapses to hamburger with slide-in drawer, carousel becomes touch-swipeable. |

### Theme Architecture

The app uses a `ThemeProvider` context (`contexts/ThemeContext.tsx`) that applies a `.dark` class to the document root. The landing page is dark-mode only by default. All semantic colors (background, foreground, card, border, etc.) are defined as OKLCH CSS custom properties in `index.css`, which Tailwind 4 consumes via `@theme inline` declarations.

---

## External Assets

The page uses five AI-generated images hosted on a CDN. These are referenced directly by URL in `Home.tsx` — no local image files are stored in the repository.

| Asset | Usage |
|-------|-------|
| Hero background | Basketball action photograph, hero section background |
| Creator lifestyle | Person using phone, Blazingly Fast section |
| Hoodie product | Product shot, Social Proof mockup |
| Female creator | Creator portrait, Collect Tips card |
| Creator CTA background | Final CTA section background |

---

## License

This project is provided under the MIT License.
