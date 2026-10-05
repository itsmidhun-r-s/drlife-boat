# DrLifeBoat frontend – what changed

## Bugs fixed
- **Infinite request loop on logout** when the access token was expired (logout -> 401 -> refresh -> logout -> ...). Logout now clears local state first and skips the refresh logic.
- **Wrong password caused refresh + logout + full-page reload** (the error toast was lost). Auth endpoints are now excluded from the 401 refresh logic.
- **Any network error / 500 on `/auth/me` logged the user out.** Now only 401/403 clear the session.
- Parallel 401s each started their own refresh -> now they share one.
- `fetchMe` ran again after every login / token refresh -> now runs once on startup.
- Unstyled pages (Courses, Pricing, Login, ...) rendered **dark text on a dark background** (invisible). Every page now has real content and styling.
- Header/Footer/Hero/Features were never used by the running app (the site used a tiny inline header). One consistent layout now.
- Missing `/logo.png` and `/hero-bg.jpg` (404s) -> inline logo + SVG favicon, no image dependencies.
- White text on orange buttons (~2:1 contrast) -> dark text on orange (~9:1).
- `Button` defaulted to `type="submit"` inside forms -> now `type="button"`.
- Footer links all pointed to `/`; dead `#` social links -> real routes, socials hidden until configured in `utils/site.ts`.
- `/404` redirect lost the original URL -> 404 renders in place.
- Logged-in users could open /login and /register; non-admins opening /admin were bounced to /login -> guarded properly; login returns you to the page you came from.
- `vite.config.ts` used `import.meta.dirname` (needs Node 20.11+) -> `fileURLToPath`.
- `VITE_API_URL` defaulted to an absolute URL that bypassed the dev proxy (CORS/cookie problems) -> defaults to `/api`.
- Duplicate `env.d.ts` + `vite-env.d.ts` merged; unused Google fonts removed; `tsc` now also checks unused code.

## New / improved UI
Dark navy + orange design system (Tailwind tokens in `tailwind.config.cjs`), sticky glass header with mobile menu,
new hero, exam-pathway cards, features, how-it-works, about, FAQ (accordion), CTA, footer, skeleton loaders,
empty/error states, accessible forms (react-hook-form + zod), route-level code splitting, reduced-motion support.

## Needs your backend to confirm
Course / plan / order response field names are assumed (see `services/*.ts` and `pages/Checkout.tsx`).
Contact form opens the visitor's email app (no contact endpoint exists yet).
