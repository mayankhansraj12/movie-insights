# AI Movie Insights

> Enter any IMDb ID. Get AI-powered movie details, cast, and audience sentiment — instantly.

Built with **Next.js 14**, **Groq AI** (`llama-3.1-8b-instant`), **OMDB API**, and **MongoDB Atlas** as a response cache.

---

## Live Demo

https://movie-insights.mayankhansraj.me

---

## Features

- 🎬 Full movie details — title, year, rating, genre, poster, cast
- 🤖 AI-generated audience sentiment (POSITIVE / MIXED / NEGATIVE) via Groq
- ⚡ MongoDB response cache — repeat lookups return in ~100ms
- 🌗 Dark / light mode with system preference detection
- 📱 Fully responsive — mobile, tablet, desktop

---

## Project Structure

```
movie-insights/
├── frontend/          ← Next.js 14 application (deployed to Vercel)
│   ├── app/           ← Pages + API routes
│   ├── components/    ← UI components
│   ├── lib/           ← OMDB, Groq, MongoDB clients
│   └── ...
└── README.md
```

---

## Quick Start (Local)

```bash
cd frontend
npm install

# Copy env template and fill in your 3 API keys
copy .env.example .env
# Edit .env with real values (see Environment Variables below)

npm run dev
# → http://localhost:3000
```

---

## Environment Variables

Create `frontend/.env` with these three keys:

| Variable | Where to get it | Free tier |
|----------|----------------|-----------|
| `OMDB_API_KEY` | [omdbapi.com](https://omdbapi.com) — register → get key | 1,000 req/day |
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → API Keys | 14,400 req/day |
| `MONGODB_URI` | [mongodb.com/atlas](https://mongodb.com/atlas) → M0 free cluster → Connect → Drivers | 512 MB free |

> **Important:** In `OMDB_API_KEY` put only the key string (e.g. `8c7d4c40`), not the full URL.

---

## Deploy to Vercel

### One-click setup

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. **Set Root Directory → `frontend`**
4. Add all three environment variables under **Settings → Environment Variables**
5. Click **Deploy**

Every push to `main` triggers an automatic redeploy.

### Vercel settings reference

| Setting | Value |
|---------|-------|
| Framework | Next.js (auto-detected) |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `.next` _(auto)_ |
| Node.js Version | 20.x |

---

## MongoDB Atlas — Required Setup

Before deploying, make sure your Atlas cluster allows connections:

1. In Atlas → **Network Access** → **Add IP Address**
2. For Vercel (dynamic IPs): click **"Allow Access from Anywhere"** → `0.0.0.0/0`
3. Under **Database Access**: ensure your DB user has **read/write** permissions

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Movie Data | OMDB API |
| AI | Groq — `llama-3.1-8b-instant` |
| Cache | MongoDB Atlas M0 (24h TTL) |
| Hosting | Vercel |
| Testing | Vitest (17 unit tests) |

---

## Running Tests

```bash
cd frontend
npm run test
```

---

## Example IMDb IDs to try

| ID | Movie |
|----|-------|
| `tt0133093` | The Matrix (1999) |
| `tt0468569` | The Dark Knight (2008) |
| `tt1375666` | Inception (2010) |
