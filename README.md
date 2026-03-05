# 🌿 Plantgen — Eco-Friendly Plant Gifting

**Live:** [plantgen.live](https://plantgen.live)

Plantgen is a premium plant gifting e-commerce platform based in Chandigarh, India. Built with Next.js 14, designed for emotion-driven gifting with a clean, botanical aesthetic.

## Features

- **100 Plant Products** across 7 categories (Indoor, Desk, Flowering, Outdoor, Herbs, Succulents, Corporate)
- **Smart Filtering** by category, budget, care level, and plant type
- **Gift Personalization** — custom messages and gift wrapping
- **COD Checkout** with delivery scheduling (date + time slots)
- **Telegram Notifications** — real-time order alerts to your bot
- **Firebase Admin Panel** — manage orders, update status, view stats
- **SEO Optimized** — sitemap, robots.txt, JSON-LD structured data
- **Framer Motion** animations throughout
- **Fully Responsive** — mobile-first design

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand (persisted cart) |
| Database | Firebase Firestore |
| Auth | Firebase Auth |
| Notifications | Telegram Bot API |
| Images | Pexels API (fallback) |
| Icons | Lucide React |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Pexels (already included for dev)
PEXELS_API_KEY=your_pexels_api_key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Telegram Bot
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout + SEO
│   ├── globals.css           # Global styles
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── robots.ts             # Robots.txt
│   ├── shop/                 # Shop with filters
│   ├── product/[id]/         # Product detail
│   ├── checkout/             # COD checkout
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── admin/                # Admin panel (auth protected)
│   └── api/orders/           # Order API + Telegram
├── components/
│   ├── home/                 # Homepage sections
│   ├── layout/               # Header, Footer, CartDrawer
│   └── ui/                   # Reusable UI components
├── data/
│   └── products.ts           # 60 products data
├── lib/
│   ├── firebase.ts           # Firebase config
│   ├── pexels.ts             # Pexels API
│   └── telegram.ts           # Telegram notifications
├── store/
│   └── cart.ts               # Zustand cart store
└── types/
    └── index.ts              # TypeScript interfaces
```

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** (start in test mode)
3. Enable **Authentication** → Email/Password
4. Create an admin user in Authentication
5. Copy config values to `.env.local`

## Telegram Bot Setup

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot → get the **Bot Token**
3. Get your **Chat ID** from [@userinfobot](https://t.me/userinfobot)
4. Add both to `.env.local`

## Deployment

Recommended: **Vercel**

```bash
npx vercel
```

Set environment variables in Vercel dashboard → Settings → Environment Variables.

## License

Private — Plantgen © 2024
