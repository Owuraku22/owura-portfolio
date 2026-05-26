# CLAUDE.md - Portfolio Project Guide for AI Assistants

This document provides a comprehensive guide to the portfolio-kelvin codebase structure, development workflows, and conventions for AI assistants working on this project.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Development Workflows](#development-workflows)
5. [Code Conventions](#code-conventions)
6. [Component Architecture](#component-architecture)
7. [Styling System](#styling-system)
8. [Asset Management](#asset-management)
9. [Common Tasks](#common-tasks)
10. [Important Notes](#important-notes)

---

## Project Overview

**Portfolio-Kelvin** is a modern, responsive personal portfolio website showcasing design work, philosophy, and testimonials. It's a **static, single-page application** with no backend API or database.

**Key Characteristics:**
- Static content (all data hardcoded in components)
- Modern Next.js 16 with App Router
- Server-first architecture (only one client component)
- Custom design system with Tailwind CSS v4
- Fully responsive (mobile-first design)
- Performance-optimized with React Compiler

**Project Type:** Personal Portfolio / Landing Page

---

## Tech Stack

### Core Framework
- **Next.js**: 16.0.1 (App Router, React Server Components)
- **React**: 19.2.0 (Latest with React Compiler)
- **TypeScript**: ^5

### Styling
- **Tailwind CSS**: v4 (Latest with `@theme inline`) inside global.css
- **PostCSS**: via `@tailwindcss/postcss`
- Custom CSS Variables (comprehensive design system)

### Fonts
- **OverusedGrotesk**: Custom local font (16 weight variations)
- **Shantell Sans**: Google Font (accent typography)

### Icon Libraries
- **react-icons**: ^5.5.0 (BiSolidCopy, FaLinkedin, FaDribbble, HiOutlineMail, etc.)
- **hugeicons-react**: ^0.3.0 (UserIcon, UserGroupIcon, BulbChargingIcon)

### Build Tools
- **babel-plugin-react-compiler**: ^1.0.0 (React 19 compiler)
- **Turbopack**: Enabled for dev server caching (experimental)

### Development Tools
- **ESLint**: ^9 (Flat config with Next.js rules)
- **TypeScript Config**: Strict mode enabled

### Node Version
- Node.js 20+ recommended (uses `@types/node@^20`)

---

## Project Structure

```
portfolio-kelvin/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, metadata, Navbar/Footer wrapper)
│   ├── page.tsx                 # Home page (Hero → Philosophy → Works → Testimonials)
│   └── globals.css              # Global styles + Tailwind v4 theme config
│
├── components/                   # React components (all server except TestimonialSection)
│   ├── Hero.tsx                 # Hero section with greeting, main heading, CTA
│   ├── Navbar.tsx               # Sticky navigation with logo and links
│   ├── Footer.tsx               # Footer with social links and navigation
│   ├── PhilosophySection.tsx    # 3-card design philosophy showcase
│   ├── SelectedWorks.tsx        # Portfolio projects grid (alternating layout)
│   ├── TestimonialSection.tsx   # Client component: infinite scroll carousel
│   └── SectionHeader.tsx        # Reusable section title component
│
├── public/                       # Static assets
│   ├── fonts/                   # OverusedGrotesk-*.woff2 (16 files)
│   ├── images/
│   │   ├── *.png                # Logos, decorative icons, backgrounds
│   │   ├── SVG-icons/           # work-title.svg
│   │   ├── works/               # Project mockups (4 PNG files)
│   │   ├── UI-Screens/               # UI design images. Built or to be built. 
│   │   └── users/               # Testimonial avatars (2 PNG files)
│   ├── *.svg                    # file.svg, globe.svg, next.svg, window.svg
│   └── favicon.ico
│
├── Configuration Files
│   ├── package.json             # Dependencies and scripts
│   ├── tsconfig.json            # TypeScript config (strict mode, path aliases)
│   ├── next.config.ts           # Next.js config (React Compiler, Turbopack)
│   ├── eslint.config.mjs        # ESLint v9 flat config
│   ├── postcss.config.mjs       # PostCSS with Tailwind v4
│   └── .gitignore               # Git ignore rules
│
├── README.md                    # Project documentation
└── CLAUDE.md                    # This file
```

### Key File Locations

| File Path | Purpose | Key Features |
|-----------|---------|--------------|
| `app/layout.tsx` | Root layout | Font setup, metadata, Navbar/Footer wrapper |
| `app/page.tsx` | Home page | Imports and renders 4 main sections |
| `app/globals.css` | Global styles | Tailwind imports, CSS variables, `@theme inline` |
| `components/*.tsx` | UI components | 7 components (6 server, 1 client) |
| `public/fonts/` | Custom fonts | 16 OverusedGrotesk woff2 files |
| `public/images/` | Images/icons | Organized by type (works, users, decorative) |

---

## Development Workflows

### Starting Development

```bash
# Install dependencies (first time)
npm install

# Run development server (default: http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run ESLint
npm run lint
```

### File System Conventions

**Path Aliases:**
- `@/*` resolves to root directory (configured in `tsconfig.json`)
- Example: `import Hero from "@/components/Hero"`

**Import Conventions:**
```typescript
// Next.js imports
import Image from "next/image"
import Link from "next/link"

// Component imports (use @ alias)
import Hero from "@/components/Hero"

// Icon imports
import { BiSolidCopy } from "react-icons/bi"
import { UserIcon } from "hugeicons-react"
```

### Hot Module Replacement (HMR)
- Enabled by default in dev mode
- Changes to `.tsx`, `.ts`, `.css` files trigger instant updates
- No manual refresh needed

---

## Code Conventions

### TypeScript Standards

**1. Interface Definitions**
Always define interfaces for data structures:

```typescript
interface Work {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  imageMain: string;
}
```

**2. Type Safety**
- Strict mode enabled (`tsconfig.json`)
- All props should be typed
- Use `typeof` for deriving types when needed

**3. Path Aliases**
Always use `@/` prefix for internal imports:
```typescript
// Good
import SectionHeader from "@/components/SectionHeader"

// Avoid
import SectionHeader from "../components/SectionHeader"
```

### Component Conventions

**1. Server Components (Default)**
All components are server components unless marked with `"use client"`:

```typescript
// components/Hero.tsx - Server component (no directive needed)
import Image from "next/image"

export default function Hero() {
  return <section>...</section>
}
```

**2. Client Components (When Needed)**
Use `"use client"` directive only when necessary (animations, interactivity):

```typescript
// components/TestimonialSection.tsx - Client component
'use client'
import { useEffect, useState } from 'react'

const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true)
}, [])

if (!isClient) return null // or return a placeholder
```

**3. Component File Structure**
```typescript
// 1. Imports (grouped by type)
import Image from "next/image"              // Next.js
import { BiSolidCopy } from "react-icons/bi" // Icons
import SectionHeader from "./SectionHeader"  // Local components

// 2. Type/Interface definitions
interface Props {
  title: string;
  description: string;
}

// 3. Data structures (if needed)
const data: Item[] = [...]

// 4. Component definition
export default function Component({ title, description }: Props) {
  return <div>...</div>
}
```

**4. Prop Patterns**
```typescript
// Option 1: Destructure in function signature
export default function Component({ title, description }: Props) {
  return <h1>{title}</h1>
}

// Option 2: Use props object (less common)
export default function Component(props: Props) {
  return <h1>{props.title}</h1>
}
```

### Data Management

**Local Data Structures**
All content is hardcoded as typed arrays/objects within components:

```typescript
// Example from SelectedWorks.tsx
const worksData: Work[] = [
  {
    id: 1,
    title: "Advenr",
    category: "Transportation (Ride-sharing)",
    description: "Advenr is a groundbreaking ride-sharing...",
    year: "2024",
    imageMain: "/images/works/Advenr.png",
  },
  // ... more items
]

// Render pattern
return (
  <div>
    {worksData.map((work) => (
      <WorkCard key={work.id} {...work} />
    ))}
  </div>
)
```

**Important:** There are NO external APIs, databases, or dynamic data fetching in this project.

### File Naming

- **Components**: PascalCase (e.g., `Hero.tsx`, `SelectedWorks.tsx`)
- **Config files**: lowercase with extensions (e.g., `next.config.ts`, `tsconfig.json`)
- **Directories**: lowercase (e.g., `components/`, `public/`)
- **Image files**: lowercase with hyphens (e.g., `star-twinkle.png`, `kelvin-logo.png`)

---

## Component Architecture

### Component Overview

| Component | Type | Lines | Purpose | Unique Features |
|-----------|------|-------|---------|-----------------|
| **Hero** | Server | 119 | Landing section | Decorative icons, email copy button |
| **Navbar** | Server | 59 | Navigation header | Responsive logos, sticky positioning |
| **Footer** | Server | 143 | Site footer | Social links, dynamic icons |
| **PhilosophySection** | Server | 84 | Design philosophy | 3-card grid, hugeicons |
| **SelectedWorks** | Server | 163 | Project showcase | Alternating layout, WorkCard sub-component |
| **TestimonialSection** | Client | 172 | Testimonials | Infinite scroll animation, duplicated items |
| **SectionHeader** | Server | 20 | Reusable title | Accepts title/description props |

### Component Details

#### Hero (`components/Hero.tsx`)
**Location:** Top of page
**Data:** Hardcoded text, image paths
**Features:**
- Greeting text: "Hello there 👋🏾, I'm Kelvin"
- Main heading with decorative crown and star icons
- Profile image with decorative tag
- CTA button with email copy functionality
- Uses `BiSolidCopy` from react-icons

**Responsive Design:**
- Text: `text-2xl → text-6xl`
- Padding: `px-4 → px-8`
- Grid layout changes: `grid-cols-1 → grid-cols-2`

#### Navbar (`components/Navbar.tsx`)
**Location:** Sticky header
**Data:** Logo paths, navigation links
**Features:**
- Responsive logo switching (desktop: `kelvin-logo.png`, mobile: `mini-logo.png`)
- Navigation links: Home, Works, Resume
- Sticky positioning with `backdrop-blur-md`
- Different icons for desktop/mobile resume button

**Responsive Breakpoints:**
- Logo switch: `hidden max-lg:block` / `hidden lg:block`
- Icon visibility: `max-md:hidden` / `md:hidden`

#### Footer (`components/Footer.tsx`)
**Location:** Bottom of page
**Data:** `socialLinks` array with LinkedIn, Dribbble, Email
**Features:**
- Dark background (`#222222`)
- Logo, navigation, social links, copyright
- External link handling (`target="_blank"`, `rel="noopener noreferrer"`)
- Dynamic icon component rendering
- Decorative emoji: 👀

**Social Links Structure:**
```typescript
const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/...",
    icon: FaLinkedin,
    external: true,
  },
  // ... more
]
```

#### PhilosophySection (`components/PhilosophySection.tsx`)
**Location:** Second section on page
**Data:** `philosophyData` array (3 items)
**Features:**
- SectionHeader component for title
- 3-column grid (`grid-cols-1 md:grid-cols-3`)
- Icons from hugeicons-react: `UserIcon`, `UserGroupIcon`, `BulbChargingIcon`
- Each card: icon, title, description

**Data Structure:**
```typescript
interface Philosophy {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}
```

#### SelectedWorks (`components/`)
**Location:** Third section on page
**Data:** `worksData` array (4 projects)
**Features:**
- Alternating layout pattern (image left/right)
- Internal `WorkCard` sub-component
- Background image: `/images/works-bg.png`
- Each project: image, title, category, description, year, CTA

**Alternating Layout Pattern:**
```typescript
const isEven = index % 2 === 0
<div className={`${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
  {/* Content alternates left/right on desktop */}
</div>
```

#### TestimonialSection (`components/TestimonialSection.tsx`)
**Location:** Fourth section on page
**Type:** CLIENT COMPONENT (`"use client"`)
**Data:** `testimonialsData` array (5 items, duplicated 3x)
**Features:**
- Infinite scroll animation (CSS keyframes)
- Pause on hover
- Fade edges (left/right)
- Dark section with white text
- 40-second linear animation

**Animation Implementation:**
```typescript
<style jsx>{`
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.333%); }
  }
  .animate-scroll-left {
    animation: scroll-left 40s linear infinite;
  }
  .animate-scroll-left:hover {
    animation-play-state: paused;
  }
`}</style>
```

#### SectionHeader (`components/SectionHeader.tsx`)
**Location:** Reusable across sections
**Type:** Server component
**Props:**
```typescript
interface SectionHeaderProps {
  title: string;
  description: string;
}
```
**Usage:**
```typescript
<SectionHeader
  title="Selected Works"
  description="Explore my design portfolio showcasing innovation and creativity."
/>
```

---

## Styling System

### Tailwind CSS v4 Architecture

**Key Change from v3:** Configuration is now in CSS using `@theme inline` instead of `tailwind.config.js`.

**Configuration Location:** `app/globals.css`

```css
@import "tailwindcss";

/* CSS Custom Properties */
:root {
  --brand-500: #ff8800;
  --brand-400: #ffa033;
  /* ... 50+ design tokens */
}

/* Tailwind v4 Theme */
@theme inline {
  --color-brand-500: var(--brand-500);
  --color-brand-400: var(--brand-400);
  /* ... extends with CSS variables */
}
```

### Design System Tokens

#### Colors
```css
/* Brand Colors (Orange) */
--brand-400: #ffa033
--brand-500: #ff8800  /* Primary brand color */
--brand-600: #e67a00
--brand-700: #cc6d00
--brand-faded: #ffe9d0

/* Accent Colors (Blue) */
--accent-500: #3b82f6
--accent-600: #2563eb

/* Grayscale (11 shades) */
--gray-25: #fcfcfd
--gray-50: #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827

/* Custom */
--custom-gray: #222222  /* Footer background */
```

#### Typography Scale
```css
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px */
--font-size-base: 1rem     /* 16px */
--font-size-lg: 1.125rem   /* 18px */
--font-size-xl: 1.25rem    /* 20px */
--font-size-2xl: 1.5rem    /* 24px */
--font-size-3xl: 1.875rem  /* 30px */
--font-size-4xl: 2.25rem   /* 36px */
--font-size-5xl: 3rem      /* 48px */
```

#### Spacing
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 1.5rem   /* 24px */
--spacing-lg: 2rem     /* 32px */
--spacing-xl: 2.5rem   /* 40px */
--spacing-2xl: 3rem    /* 48px */
```

#### Border Radius
```css
--radius-sm: 0.25rem   /* 4px */
--radius-md: 0.5rem    /* 8px */
--radius-lg: 1rem      /* 16px */
--radius-xl: 1.5rem    /* 24px */
--radius-full: 9999px  /* Circular */
```

#### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

#### Transitions
```css
--transition-fast: 150ms ease
--transition-base: 300ms ease
--transition-slow: 500ms ease
```

### Responsive Design Breakpoints

```css
/* Tailwind default breakpoints */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Small desktops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

**Mobile-First Approach:**
```typescript
// Default styles are for mobile, enhanced with breakpoints
className="text-base md:text-lg lg:text-xl"
// Mobile: 1rem, Tablet: 1.125rem, Desktop: 1.25rem
```

**Common Responsive Patterns:**
```typescript
// Hide on mobile, show on desktop
className="hidden lg:block"

// Show on mobile, hide on desktop
className="block lg:hidden"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Responsive padding
className="px-4 md:px-6 lg:px-8"
```

### Font System

#### OverusedGrotesk (Primary Font)
- **Type:** Local font (woff2 format)
- **Weights:** 300, 400, 500, 600, 700, 800, 900 (each with italic variant)
- **Total files:** 16 woff2 files
- **CSS Variable:** `--font-overused-grotesk`
- **Usage:** Default font applied to body

**Implementation in `app/layout.tsx`:**
```typescript
const overusedGrotesk = localFont({
  src: [
    { path: "../public/fonts/OverusedGrotesk-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/OverusedGrotesk-LightItalic.woff2", weight: "300", style: "italic" },
    // ... 14 more variations
  ],
  display: "swap",
  variable: "--font-overused-grotesk",
})
```

#### Shantell Sans (Accent Font)
- **Type:** Google Font
- **Weights:** 300-800
- **CSS Variable:** `--font-shantell-sans`
- **Usage:** Section headings (via `.font-shantell` class)

**Font Loading Strategy:**
- `display: "swap"` for optimal performance
- Font loaded in root layout
- CSS variables for flexible usage

### Common Tailwind Patterns

#### Buttons
```typescript
<button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
  Button Text
</button>
```

#### Cards
```typescript
<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
  Card Content
</div>
```

#### Flexbox Layouts
```typescript
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
  {/* Content */}
</div>
```

#### Grid Layouts
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

#### Hover Effects
```typescript
<div className="group">
  <img className="group-hover:scale-105 transition-transform" />
  <button className="group-hover:translate-x-1 transition-transform" />
</div>
```

---

## Asset Management

### Image Organization

```
public/images/
├── Decorative Icons (root level)
│   ├── crown.png           # Hero crown decoration
│   ├── star-twinkle.png    # Hero star decoration
│   └── image-tag.png       # Profile image tag
│
├── Logos (root level)
│   ├── kelvin-logo.png     # Desktop navbar logo (177x36px)
│   └── mini-logo.png       # Mobile navbar logo (33x33px)
│
├── Backgrounds (root level)
│   └── works-bg.png        # Works section background
│
├── SVG-icons/
│   └── work-title.svg      # Work category icon
│
├── works/                  # Project mockup images
│   ├── Advenr.png          # Ride-sharing project
│   ├── CreditUnion.png     # Credit union project
│   ├── ShaqApp.png         # Shaq app project
│   └── Vacancies.png       # Vacancies project
│
└── users/                  # Testimonial user avatars
    ├── user1.png           # Testimonial avatar 1
    └── user2.png           # Testimonial avatar 2
```

### Font Files

```
public/fonts/
└── OverusedGrotesk-*.woff2  (16 files)
    ├── Light.woff2           (300 normal)
    ├── LightItalic.woff2     (300 italic)
    ├── Book.woff2            (400 normal)
    ├── BookItalic.woff2      (400 italic)
    ├── Roman.woff2           (400 normal variant)
    ├── Italic.woff2          (400 italic variant)
    ├── Medium.woff2          (500 normal)
    ├── MediumItalic.woff2    (500 italic)
    ├── SemiBold.woff2        (600 normal)
    ├── SemiBoldItalic.woff2  (600 italic)
    ├── Bold.woff2            (700 normal)
    ├── BoldItalic.woff2      (700 italic)
    ├── ExtraBold.woff2       (800 normal)
    ├── ExtraBoldItalic.woff2 (800 italic)
    ├── Black.woff2           (900 normal)
    └── BlackItalic.woff2     (900 italic)
```

### Image Usage Patterns

**Next.js Image Component:**
```typescript
// Fixed dimensions (for decorative images)
<Image
  src="/images/crown.png"
  alt="Crown Icon"
  width={40}
  height={24}
  className="object-contain"
/>

// Fill container (for project images)
<Image
  src="/images/works/Advenr.png"
  alt="Advenr Project"
  fill
  className="object-cover rounded-lg"
/>

// Responsive images
<Image
  src="/images/kelvin-logo.png"
  alt="Kelvin Logo"
  width={177}
  height={36}
  className="hidden lg:block"
/>
```

**Path Conventions:**
- Always use absolute paths starting with `/`
- Reference files in `public/` directly: `/images/crown.png`
- Next.js automatically optimizes images at build time

### Icon Libraries

**react-icons** (primary icon library):
```typescript
import { BiSolidCopy } from "react-icons/bi"        // Brand Icons
import { FaLinkedin, FaDribbble } from "react-icons/fa" // Font Awesome
import { HiOutlineMail } from "react-icons/hi"      // Hero Icons
import { CgArrowTopRight } from "react-icons/cg"    // CSS.gg Icons
import { PiReadCvLogoLight } from "react-icons/pi"  // Phosphor Icons
import { FiArrowUpRight } from "react-icons/fi"     // Feather Icons
```

**hugeicons-react** (used in PhilosophySection):
```typescript
import { UserIcon, UserGroupIcon, BulbChargingIcon } from "hugeicons-react"
```

**Usage Pattern:**
```typescript
// Static icon
<BiSolidCopy className="text-lg text-gray-600" />

// Dynamic icon from data
const IconComponent = item.icon
<IconComponent className="text-xl text-brand-500" />
```

---

## Common Tasks

### Adding a New Component

1. **Create component file** in `components/` directory:
```typescript
// components/NewComponent.tsx
import Image from "next/image"

interface NewComponentProps {
  title: string;
  description: string;
}

export default function NewComponent({ title, description }: NewComponentProps) {
  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </section>
  )
}
```

2. **Import and use** in `app/page.tsx`:
```typescript
import NewComponent from "@/components/NewComponent"

export default function Home() {
  return (
    <>
      <Hero />
      <NewComponent title="Title" description="Description" />
      {/* ... other sections */}
    </>
  )
}
```

### Adding New Content to Existing Sections

**Example: Adding a new project to SelectedWorks**

1. **Add project image** to `public/images/works/NewProject.png`

2. **Update worksData** in `components/SelectedWorks.tsx`:
```typescript
const worksData: Work[] = [
  // ... existing projects
  {
    id: 5,
    title: "New Project",
    category: "Project Category",
    description: "Detailed project description...",
    year: "2024",
    imageMain: "/images/works/NewProject.png",
  },
]
```

### Modifying Design System

**Add new color:**
1. Add CSS variable in `app/globals.css`:
```css
:root {
  --new-color: #123456;
}
```

2. Extend Tailwind theme:
```css
@theme inline {
  --color-new-color: var(--new-color);
}
```

3. Use in components:
```typescript
<div className="bg-new-color text-white">...</div>
```

### Creating a Client Component

**When to use:**
- Component needs React hooks (`useState`, `useEffect`)
- Component has interactivity (click handlers, animations)
- Component uses browser APIs

**Example:**
```typescript
"use client"  // Must be at the top

import { useState } from "react"

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

### Adding External Links

**Pattern from Footer component:**
```typescript
<Link
  href="https://external-site.com"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-brand-500 transition-colors"
>
  External Link
</Link>
```

### Adding Animations

**CSS Keyframes (for complex animations):**
```typescript
export default function AnimatedComponent() {
  return (
    <>
      <div className="animate-custom-animation">
        Content
      </div>

      <style jsx>{`
        @keyframes custom-animation {
          0% { transform: translateX(0); }
          100% { transform: translateX(100px); }
        }
        .animate-custom-animation {
          animation: custom-animation 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
```

**Tailwind Utilities (for simple animations):**
```typescript
<button className="hover:scale-105 transition-transform duration-300">
  Hover me
</button>
```

### Running Linting and Fixing Issues

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues (add to package.json scripts)
npm run lint -- --fix
```

### Building for Production

```bash
# Create production build
npm run build

# Output location: .next/ directory

# Test production build locally
npm start
```

---

## Important Notes

### Server vs Client Components

**Default: Server Components**
- All components are server components unless marked with `"use client"`
- Server components can't use React hooks or browser APIs
- Server components render on the server (better performance)

**When to use Client Components:**
- Need `useState`, `useEffect`, or other React hooks
- Need event handlers (onClick, onChange, etc.)
- Need browser APIs (window, document, localStorage)
- Need third-party libraries that use browser APIs

**Current client components in this project:**
- `components/TestimonialSection.tsx` (uses animations and hover state)

### Static Site Generation (SSG)

This project is a **static site** (no dynamic routes or data fetching):
- All content is hardcoded in components
- No `/app/api/` routes
- No database connections
- Build output can be served as static files

**Deployment:**
- Can be deployed to Vercel, Netlify, or any static hosting
- Run `npm run build` to generate static files in `.next/`

### Path Alias Configuration

**Configured in `tsconfig.json`:**
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

**Usage:**
```typescript
// Instead of:
import Hero from "../../components/Hero"

// Use:
import Hero from "@/components/Hero"
```

### TypeScript Strict Mode

**Enabled in `tsconfig.json`:**
- All variables must be typed
- No implicit `any` types
- Null/undefined checks enforced
- Unused variables/imports flagged

**Best Practices:**
- Define interfaces for all data structures
- Type all function parameters and return values
- Use TypeScript's type inference when obvious

### Performance Optimizations

**Built-in optimizations:**
1. **React Compiler** (`reactCompiler: true` in `next.config.ts`)
   - Automatic optimization of React components
   - Reduces unnecessary re-renders

2. **Turbopack Dev Server** (experimental)
   - Faster hot module replacement
   - File system caching enabled

3. **Next.js Image Optimization**
   - Automatic image resizing and optimization
   - WebP format conversion
   - Lazy loading by default

4. **Font Optimization**
   - `display: "swap"` prevents layout shift
   - Preloaded font files
   - Self-hosted fonts (OverusedGrotesk)

5. **Server Components**
   - Reduced JavaScript bundle size
   - Better initial page load

### ESLint Configuration

**ESLint v9 with Flat Config:**
- Configuration in `eslint.config.mjs` (not `.eslintrc`)
- Next.js recommended rules included
- TypeScript support enabled

**Ignored directories:**
```javascript
globalIgnores([
  ".next/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
])
```

### Git Workflow

**Branches:**
- Main branch: (not specified in this document)
- Feature branch: `claude/claude-md-mhyr01zykvjv0z1j-01CFv98MDUJDGf6U8NDJ2qQ7`

**Commit conventions:**
- Use descriptive commit messages
- Group related changes in single commits
- Test builds before committing

### Browser Support

**Target browsers:**
- ES2017+ (configured in `tsconfig.json`)
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

**CSS features used:**
- CSS Grid (IE11 not supported)
- CSS Custom Properties (no IE11 support)
- Backdrop filter (may need fallback for older browsers)
- Flexbox (widely supported)

### Accessibility Considerations

**Current implementations:**
- Semantic HTML (`<section>`, `<nav>`, `<footer>`)
- Alt text on all images
- Keyboard navigation support
- Focus states on interactive elements

**Recommended improvements for future:**
- ARIA labels on icon-only buttons
- Skip to content link
- Color contrast validation
- Screen reader testing

### Environment Variables

**Currently:** No environment variables used

**If adding environment variables:**
1. Create `.env.local` file (gitignored by default)
2. Prefix with `NEXT_PUBLIC_` for client-side access
3. Access via `process.env.NEXT_PUBLIC_VARIABLE_NAME`

### Debugging Tips

**Development mode:**
```bash
npm run dev
# View console in browser DevTools
# React DevTools extension recommended
```

**Common issues:**
- **Hydration errors:** Check for client/server component mismatches
- **Module not found:** Verify path aliases and imports
- **Type errors:** Run `npm run build` to see all TypeScript errors
- **Styling not applied:** Check Tailwind class names, verify `globals.css` import

**Useful commands:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors without building
npx tsc --noEmit
```

---

## Quick Reference

### File Locations Cheat Sheet

```
Adding content:
  - New component → components/NewComponent.tsx
  - New image → public/images/filename.png
  - New font → public/fonts/fontname.woff2

Editing content:
  - Page structure → app/page.tsx
  - Root layout → app/layout.tsx
  - Global styles → app/globals.css
  - TypeScript config → tsconfig.json
  - Next.js config → next.config.ts

Components:
  - Hero section → components/Hero.tsx
  - Navigation → components/Navbar.tsx
  - Footer → components/Footer.tsx
  - Philosophy → components/PhilosophySection.tsx
  - Projects → components/SelectedWorks.tsx
  - Testimonials → components/TestimonialSection.tsx
```

### Common Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

### Key Technologies

```
Framework:    Next.js 16 (App Router)
UI Library:   React 19
Language:     TypeScript 5
Styling:      Tailwind CSS v4
Icons:        react-icons, hugeicons-react
Fonts:        OverusedGrotesk (local), Shantell Sans (Google)
```

---

## Additional Resources

**Official Documentation:**
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**Icon Libraries:**
- [react-icons](https://react-icons.github.io/react-icons/)
- [hugeicons-react](https://hugeicons.com/)

**Project Files:**
- README.md - Basic setup instructions
- CLAUDE.md - This comprehensive guide (for AI assistants)

---

**Last Updated:** 2025-11-14
**Project Version:** 0.1.0
