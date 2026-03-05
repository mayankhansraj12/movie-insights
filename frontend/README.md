# AI Movie Insights

AI-powered movie details, cast info, and audience sentiment — instantly.

Enter any IMDb ID (e.g. `tt0133093`) to get a comprehensive movie profile including metadata, cast, plot, and an AI-generated audience sentiment analysis.

## Live URL

_Deploy to Vercel and add your live URL here._

## Setup

```bash
git clone <your-repo>
cd movie-insights/frontend
npm install

# Copy env template and fill in your keys
cp .env.example .env.local
# Edit .env.local with your OMDB_API_KEY, GROQ_API_KEY, MONGODB_URI

npm run dev
# App runs at http://localhost:3000
```

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 14 (App Router) | Built-in API routes, serverless-ready, Vercel-native |
| Language | TypeScript | Type safety across API boundaries |
| Styling | Tailwind CSS + CSS Variables | Zero runtime overhead, clean dark/light theming |
| Movie Data | OMDB API | Direct IMDb ID support, simple REST, 1k req/day free |
| AI | Groq (llama-3.1-8b-instant) | 14,400 req/day free, ~0.5s inference, clean JSON |
| Cache | MongoDB Atlas M0 | JSON-native, free 512MB, avoids repeat API calls |
| Hosting | Vercel | Automatic deploys, serverless functions |
| Testing | Vitest | Zero-config TypeScript, fast |

## Environment Variables

| Variable | Description | Source |
|----------|-------------|--------|
| `OMDB_API_KEY` | OMDB movie metadata | [omdbapi.com](https://omdbapi.com) |
| `GROQ_API_KEY` | Groq AI inference | [console.groq.com](https://console.groq.com) |
| `MONGODB_URI` | MongoDB Atlas connection string | [mongodb.com/atlas](https://mongodb.com/atlas) |

## Assumptions

- **No real review scraping:** IMDb blocks scrapers. AI sentiment is generated from the movie's OMDB plot, genre, and rating as context — an honest and practical approximation.
- **Groq free tier:** 14,400 req/day on `llama-3.1-8b-instant` — more than sufficient for development and demo.
- **OMDB free tier:** 1,000 req/day; MongoDB cache significantly reduces actual calls.
- **MongoDB cache:** Results are cached for 24 hours using a TTL index. Cache is best-effort — if MongoDB is unavailable, live API calls are made instead.

## Running Tests

```bash
npm run test
```

17 unit tests across 3 files:
- `__tests__/validators.test.ts` — IMDb ID format validation
- `__tests__/sentiment.test.ts` — Groq JSON response parsing
- `__tests__/omdb.test.ts` — OMDB field mapping

## Deploying to Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set Root Directory to `frontend/`
4. Add environment variables in Vercel → Settings → Environment Variables
5. Deploy — every push to `main` auto-deploys
