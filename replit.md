# SahiPath — AI Career Mentor

SahiPath is an AI-powered career mentoring app that guides students and job-seekers through profile setup, mock tests, resume building, and job discovery.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/sahipath run dev` — run the frontend (port from PORT env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Required Secrets (Replit Secrets tab)

| Secret | Required | Purpose |
|---|---|---|
| `JWT_SECRET` | Yes | Signs auth tokens — app won't start without it |
| `GEMINI_API_KEY` | Yes | Powers AI mentor chat (Gemini 1.5 Flash) |
| `OPENAI_API_KEY` | Optional | Powers media generation (images, podcast TTS) |

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React + Tailwind CSS (`artifacts/sahipath`)
- API: Express 5 (`artifacts/api-server`, port 8080)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- PDF: jspdf (resume download)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sahipath/src/App.tsx` — main app with all stages and tab routing
- `artifacts/sahipath/src/components/` — VoiceFill, TestsView, PerformanceView, ResumeView, JobsView
- `artifacts/api-server/src/routes/` — auth, mentor, profile, tests, media, health
- `artifacts/api-server/src/lib/auth.ts` — JWT/password logic (fails fast if JWT_SECRET missing)
- `packages/db/src/schema.ts` — DB schema: `users`, `test_records`

## Architecture decisions

- JWT stored as HttpOnly cookie (`sahipath_token`); fallback to localStorage for session restore
- API server hard-fails at startup if `JWT_SECRET` is absent (never silently uses a weak default)
- Media types `video`/`ppt` are not implemented; only `image` and `podcast` are supported
- Platform proxy routes `/api/*` → API server, `/` → frontend (no Vite proxy needed)
- Voice mic uses browser Web Speech API; degrades gracefully if not supported

## Product

- Language selection (English/Hindi/Regional)
- Personal & professional profile setup with per-field voice mic fill
- AI mentor chat powered by Gemini (detects study topics → schedules test reminders)
- Study tracker: upcoming test notifications via localStorage scheduling
- Tests view: take tests, view real results from DB
- Performance view: charts of test history
- Resume builder: one-click PDF download via jspdf
- Jobs view: live listings from RemoteOK/Himalayas APIs + direct links to LinkedIn/Naukri/Internshala

## Gotchas

- Always set `JWT_SECRET` in Replit Secrets before starting the API server
- `PORT` and `BASE_PATH` are set automatically by the Replit artifact workflow; defaults apply for local runs
- Cookie auth requires HTTPS in production; dev works over the Replit proxy

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._
