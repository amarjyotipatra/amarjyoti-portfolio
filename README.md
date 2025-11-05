# Amarjyoti Patra · Immersive Portfolio MVP

Game-inspired, AI-personalized portfolio MVP built with Next.js 14, Three.js, Framer Motion, and a custom telemetry pipeline.

## Features

- Cinematic hero with animated Three.js starfield, AI portrait reroll, and adaptive interface skins.
- Unique visitor identification using `browser-fingerprint` + TrackMe beacon and telemetry logging to a local JSON store.
- Pinned GitHub project showcase fed by the GitHub GraphQL API.
- Experience timeline, client stats, and interactive contact palette stub.
- Ambient soundscape toggle and resume download CTA with telemetry tracking.
- Protected `/admin` dashboard secured by OAuth 2.0 (NextAuth) to review visits, uniques, downloads, and recent interactions.
- Optional Replicate integration for on-the-fly AI portraits (fallback uses RoboHash).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and populate required secrets:
   - `GITHUB_ACCESS_TOKEN` with `read:user` scope for pinned repos.
   - OAuth credentials (`GITHUB_*` or `GOOGLE_*`) and `ADMIN_EMAILS` for dashboard access.
   - `NEXT_PUBLIC_GITHUB_USERNAME` (defaults to `amarjyotipatra`).
   - Optional `REPLICATE_API_TOKEN` if you want AI portraits beyond RoboHash.
3. Drop static assets:
   - Copy your provided 2nd profile photo to `public/images/profile-hero.jpg` (used in hero + for favicon source).
   - Export a square favicon from that image and place it at `public/favicon.ico`.
   - Place your resume file at `public/resume/Amarjyoti_Patra_Resume.pdf`.
   - Add welcome track to `public/media/welcome-loop.mp3` (royalty-free loop recommended).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Visit [http://localhost:3000](http://localhost:3000) for the portfolio and `/admin` for the telemetry dashboard (after authenticating).

## Telemetry Storage

The MVP writes visit data to `data/analytics.json`. For production, wire this into a durable database (Supabase, PlanetScale, or DynamoDB) and replace the file-backed helpers in `lib/analytics.ts`.

## Customization Notes

- Update hero copy, mission timeline, and client stats in their respective components under `components/`.
- Swap `ThreeBackground` palette or add new UIs by extending `ThemeSkin` in `store/uiSkin.ts`.
- Replace the RoboHash fallback in `app/api/ai-portrait/route.ts` with your preferred generative service once credentials are ready.

## Tooling

- `npm run lint` for linting.
- `npm run build` / `npm start` for production build.

Enjoy the launch! 🚀
