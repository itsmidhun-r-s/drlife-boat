# DrLifeBoat frontend

## Admin panel + small-phone fixes (latest)
**Admin panel** (`/admin`): Overview, Enquiries (view message, call / email, mark contacted / closed), Users (search, enable / disable,
change role), Plans (create / edit / hide - these are what the Pricing page shows) and Payments. Admins sign in on the normal
`/login` page (or via the footer "Admin login" link) and are sent to `/admin`. Normal students are sent back to `/dashboard`.
Tables turn into cards on phones.

**Mobile fixes**: content no longer gets cut off on narrow phones (tested 200-430 px and tablets, with the overflow safety net switched off).
Causes fixed: grids without an explicit 1-column rule, buttons that could not wrap, a header that could not shrink,
long words / e-mail addresses that could not break, and floating hero chips (now hidden below 420 px).


## Premium redesign (latest)
Light, warm theme taken from the WordPress brand (orange #ff9400, warm whites, soft sky/cream/peach tints) with deep-navy
sections for contrast (announcement bar, AI mock-test section, CTA, footer, login panel).

**Design tokens** live in `src/styles/globals.css` (CSS variables) and `tailwind.config.cjs`:
`bg, surface, surface-2, fg, fg-soft, muted, subtle, line, accent, success, warning, danger`.
Wrap any section in `className="theme-dark"` and every token flips to the navy palette.
Fonts: Plus Jakarta Sans (headings) + Inter (text), self-hosted via @fontsource (no Google Fonts request).
Colour contrast: body text 5.9:1, accent text 4.8:1 on light, 9.7:1 on navy; buttons use dark ink on orange (8:1).

**Homepage** now contains all content from the WordPress homepage (`src/data/home.ts`): announcement strip, hero,
About + CEO letter, What We Do (offline/online), What We Offer (6), Courses (5), AI adaptive mock test (6 features),
"Looking to practice medicine in Australia?" band, Our Features (12), Our Values (6), Our Services (3).
The earlier About-page content (vision, mission, 9 differentiators) stays on `/about-us`.

**Checked in a real headless browser**: 11 routes x 5 widths (320 / 375 / 768 / 1024 / 1440) - no horizontal overflow,
one h1 per page, no console errors; mobile menu, filters, FAQ accordion, form validation, skip link and auth guard all work.

Things to update before publishing:
- `src/data/home.ts` ANNOUNCEMENTS: copied from WordPress ("Next batch starts SEPTEMBER 2026" is already in the past).
- The hero uses `public/images/site/doctor.jpg` (a stock photo) - swap for your own photo if you have one.
- The `DrLifeBoathomepage_files` image folder was not in the upload, so section icons are Lucide icons instead of your PNGs.
- "Try a Demo Test" opens the Contact form pre-filled (`/contact?topic=demo`) - point it to the real demo-test URL when it exists.

## WordPress -> React
All text comes from the six WordPress pages.

| WordPress page | React route | Edit the text in |
|---|---|---|
| Home / About (same text in both files) | `/`, `/about-us` | `src/data/content.ts` |
| Courses | `/courses`, `/courses/:slug` | `src/data/courses.ts` |
| Blogs | `/blogs`, `/blogs/:slug` | `src/data/results.ts` |
| FAQ | `/faq` | `src/data/faq.ts` |
| Contact | `/contact` | `src/data/countries.ts`, `src/pages/Contact.tsx` |

Contact details (phone, email, address, social links) are in `src/utils/site.ts`.

## Images
Student posters: `public/images/results/<student-slug>.jpg` (e.g. `neha-jha.jpg`), linked in `src/data/results.ts`.
Matched using the `alt` text of the WordPress page and the name printed on each poster.
Site photos: `public/images/site/` (`doctor.jpg`, `classroom.jpg`, `vision.jpg`, `mission.jpg`).
To add a photo to a course, set `image: '/images/xyz.jpg'` on it in `src/data/courses.ts` (otherwise `classroom.jpg` is used).
If an image file is missing, the card shows the student's initials instead of a broken icon.

Image notes:
- White strips were trimmed from the bottom of 5 posters; a stray white block at the top of Neha Jha, Atharva and Akhila posters was painted black.
- The Neha Jha and Atharva posters are cut off at the bottom in the source ("ON SUCCESSFULLY CLEARING THE...") - send the full originals to fix.
- `skeltonImage.png` (2.6 MB) was shrunk to ~130 KB and used as the default course photo.
- `vision.jpg` / `mission.jpg` (the two unnamed files) are assumed to be the Vision / Mission photos (the old page had Business.png / Businessone.png there). Swap them if reversed.

## Contact form
Sends `POST /api/contact` with: name, email, phone, country, state, primaryMedicalQualification, courses[], message.
If the server is unreachable it opens the visitor's email app pre-filled, so no enquiry is lost.

## Dev backend
`npm run mock` starts a small local API on :5000 (register, login, contact). Development only.

## Content notes (please review)
- Typos fixed: "Dr,Sneha", "Dr.Neha", "AmericanSamoa".
- Source says "all six core AMC subjects" but lists five (AMC MCQ Offline, Question Bank) - copied as written.
- "Question Bank" course copy mentions live lectures (copied from the other courses).
- "Our Specialities" (Cardiology...) looks like a hospital-template leftover; kept on /blogs, easy to remove.
- FAQ answers were not in the saved HTML. They are taken from the page's own Exam Format section.
- Figures ($156,000, 5,000+, 185,000+) are copied from your page - verify their source.
- Earlier placeholder stats ("500+", "4 live classes a week") were removed; stats now come only from your pages.
