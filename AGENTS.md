# AGENTS.md

## Commands
- `npm run dev` - Start development server
- `npm run build` - Typecheck + build for production

## Tech Stack
- Vite + Preact + Preact Signals for state
- TailwindCSS v4 (via `@tailwindcss/vite`)
- TypeScript

## Project Structure
- `src/pages/` - Route components (Home.tsx, About.tsx)
- `src/layouts/` - Layout wrapper components
- `src/types.ts` - Shared interfaces

## Notes
- State uses Preact Signals (`signal()`) - not React hooks
- TailwindCSS v4 doesn't use `tailwind.config.js` - configured in CSS with `@import "tailwindcss"`
- No lint/typecheck scripts in package.json currently, but `tsc -b` runs on build