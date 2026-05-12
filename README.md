# Star Tech Phone Repairs Platform

Modern repair booking and management platform built with SvelteKit + PocketBase.

## Tech Stack

- **Frontend**: SvelteKit 5 + TypeScript + Tailwind CSS
- **Backend**: PocketBase
- **Hosting**: Cloudflare Pages (frontend) + Fly.io (backend)
- **Database**: SQLite (via PocketBase)

## Getting Started

### Prerequisites

- Node.js 18+
- PocketBase server running

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_POCKETBASE_URL=http://localhost:8090
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/       # Reusable UI components
│   │   └── ui/          # Base UI components (Button, Input, etc.)
│   ├── hooks/           # Auth and other hooks
│   ├── stores/          # Svelte stores
│   ├── utils/           # Utility functions
│   ├── validators/      # Zod schemas
│   └── pocketbase.ts    # PocketBase client
├── routes/
│   ├── (public)/        # Public marketing pages
│   ├── (auth)/          # Authentication pages
│   ├── (customer)/      # Customer dashboard
│   ├── (admin)/         # Admin dashboard
│   ├── book-repair/     # Booking flow
│   └── track-repair/    # Repair tracking
└── app.html             # HTML template
```

## Features

- ✅ Premium Apple-inspired design
- ✅ Responsive layout
- ✅ Real-time repair tracking
- ✅ Multi-step booking flow
- ✅ PocketBase integration
- ✅ Form validation with Zod
- ✅ Toast notifications
- ✅ Mobile-first approach

## Deployment

### Frontend (Cloudflare Pages)

```bash
npm run build
# Deploy dist/ to Cloudflare Pages
```

### Backend (Fly.io)

PocketBase should be deployed separately on Fly.io.

## License

© 2026 Star Tech Phone Repairs
