# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Next.js 15+ application using pnpm as the package manager:

- **Development server**: `pnpm dev` (runs with turbopack)
- **Build**: `pnpm build`
- **Start production**: `pnpm start`  
- **Lint**: `pnpm lint`

## Architecture Overview

This is a bilingual baby announcement website built with modern Next.js patterns:

### Tech Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui + Radix UI primitives
- **Internationalization**: next-intl with Turkish (tr) and English (en) support
- **Deployment**: Vercel (with analytics and speed insights)

### Key Architecture Patterns

**Internationalized Routing**: 
- Root redirects to `/tr` (Turkish default)
- All pages use dynamic `[locale]` segments
- Middleware handles locale detection and redirects
- Translation files in `/messages/` directory

**Component Structure**:
- Main layout in `src/app/[locale]/layout.tsx` with navigation and footer
- Home page has extensive real-time content (countdown, stats, reviews)
- Donation pages for baby gifts and HAYTAP animal welfare
- Reusable components in `src/components/`

**Styling Approach**:
- Heavy use of Tailwind gradients and animations
- Mobile-first responsive design with multiple breakpoints
- Custom animations for baby-themed interactions
- Playful, colorful design with emoji-heavy content

### Important Files

- `middleware.ts` - Handles internationalization routing
- `src/i18n.ts` - next-intl configuration
- `src/app/[locale]/page.tsx` - Main homepage with dynamic content
- `messages/tr.json` and `messages/en.json` - Translation files
- `src/components/countdown.tsx` - Reusable countdown component

### API Routes

- `/api/paytr/*` - Payment integration endpoints
- `/api/mail/thank-you` - Email service integration  
- `/og` - Open Graph image generation

The codebase follows Next.js 15 conventions with App Router, emphasizes humor and interactivity, and maintains strict TypeScript typing throughout.