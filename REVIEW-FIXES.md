# Site review fixes (31 Oct 2026)

These are fixes for the external site review (performance, SEO, accessibility, typos). Nothing has been deployed or pushed.

## Results (Lighthouse mobile, local production build)

| | Before (review, live site) | After (local) |
|---|---|---|
| Performance | 71 | 82 |
| Accessibility | 86 | 96 |
| SEO | 92 | 100 |
| LCP | 7.6 s | 4.5 s |

The "after" numbers come from `next start` on a laptop, not the live site. Re-check with PageSpeed Insights after deploying.

---

## What was fixed

### Speed
- **Desktop hero video:** cut from 9.9 MB to 2.0 MB by re-encoding (1600px, about 680 kbps, no audio). It is the full 22.8 s, nothing trimmed. It is now served from `public/videos/heroVideo.mp4` instead of Vercel Blob. Either location works; moving it back to Blob is optional (see "Not done").
- **Hero video loading:** the video only starts downloading after the page has loaded, so the poster image paints first. See `app/components/HeroVideo.tsx`.
- **Mobile hero:**
  - The poster is now a clear in-cockpit frame instead of the blurry close-up.
  - The mobile video (1.2 MB, full length) starts from that same frame. The first 5 s of footage moved to the end of the loop, so nothing is cut.
- **Hero H1:** no longer waits for a blur-in animation. It is plain HTML (`app/components/Hero.tsx`).
- **Third-party scripts:** Google Analytics and CookieYes load once the page is idle (`lazyOnload` in `app/layout.tsx`). Consent Mode defaults still load first.
- **Cookie banner:** smaller on phones, using a CSS override at the bottom of `styles/globals.css`.
- **EASA logo:** was a 150 KB PNG hidden inside an SVG. It is now a 12 KB `public/images/easa.webp`. The old `easa.svg` is no longer used.

### SEO
- `<html lang="en-GB">`.
- **Homepage H1:** now "Helicopter Training, Tours & Charter from White Waltham". The old line becomes a subheading through the new Sanity field "Hero subheading".
- **Structured data**, in `lib/jsonld.tsx`:
  - `BreadcrumbList` on every training, flights, fleet, industry and about page.
  - `Course` on training pages.
  - `AggregateRating` once a rating is entered in Sanity (see below).
- The Tripadvisor link now reads "Read more reviews on Tripadvisor".

### Overall review score (new, optional)
- Sanity → **Settings** has new fields: **Overall review rating**, **Number of reviews** and **Review source link**.
- Once rating and count are filled in, the homepage hero shows "★ 4.9 from N reviews" and Google gets an `AggregateRating`. While they're empty, nothing shows.

### Accessibility
- **Carousel dots:** have labels ("Go to slide 2") and `aria-current`.
- **Headings:** in order now.
  - Homepage service cards are h2 (they were h3).
  - Carousel titles are h3 (were h5).
  - The weather widget title is no longer a heading.
- **Decorative images:** icons and arrows use `alt=""`.
  - Logos say "Helicopter Services home".
  - Review photos say "Photo of {name}".
- **Contrast:** new colour `brand-light-blue-text` (#0B7493) in `tailwind.config.ts` for light-blue text on white. The original `brand-light-blue` stays for icons, borders and text on dark blue.
- **Footer:** legal links have a bigger tap area.
- **Enquiry form** (`ContactForm.tsx`):
  - name is `type="text"` (was the invalid `type="name"`)
  - phone is `type="tel"`
  - `autocomplete` is set on name, email and phone

### Typos
- **In code:** fixed "experence" and "over 17+" in `lib/homepage-defaults.ts` and `MainServices.tsx`.
- **In Sanity content:** the script `sanity/scripts/fix-review-typos.ts` fixes:
  - "experence"
  - "The Hanger" → "The Hangar"
  - "over 17+"
  - the homepage H1

  **It has only been dry-run.** It found 10 changes and saved nothing. To apply:
  ```
  cd sanity
  npx sanity exec scripts/fix-review-typos.ts --with-user-token            # preview
  npx sanity exec scripts/fix-review-typos.ts --with-user-token -- --apply # save
  ```
  Deploy the Studio first (`npx sanity deploy`) so the new fields show up.

---

## Opening hours ("Open today" in the header)
- **Bug fixed:** the text used the visitor's own clock and timezone, and the page HTML was built on a UTC server.
  - It now always works in **UK time**, including BST/GMT changes.
  - It's worked out in the browser and refreshes every minute.
  - Saturday 22:36 now says "Open tomorrow by appointment" instead of "By appointment only today".
- **One list of hours, edited in Sanity** (Settings → **Opening hours**: open / by appointment / closed, opens, closes, for each day). Until all seven days are filled in correctly, the built-in hours in `lib/opening-hours.ts` are used. It drives:
  - the header text
  - the contact boxes (new `OpeningHoursTable` component; the three hand-typed copies are gone)
  - the opening hours given to Google (`LocalBusiness` in `app/layout.tsx`)
- **Tests:** see "Automated tests" below.

---

## Automated tests
Run `pnpm test:unit` (Vitest; about 15 seconds), or `pnpm test:watch` to re-run as you edit. **No test can send an email or reach the internet:** `vitest.setup.ts` replaces EmailJS for every test and blocks all network calls.

| File | What it checks |
|---|---|
| `__tests__/ContactForm.test.tsx` | Enquiry form: fields and autofill types, error messages, reCAPTCHA required, what gets sent to EmailJS (faked), pre-selecting the service page you came from, a clear error if sending fails, a "please call us" message if the reCAPTCHA key is missing |
| `__tests__/contact-schema.test.ts` | Enquiry rules. Accepts real names (O'Brien, Zoë) and phone numbers with spaces or +44; blocks spam domains |
| `__tests__/OpenClosed.test.tsx` | Header "Open today" text: UK time incl. BST, other device timezones, updates itself at closing time, cleans up its timer |
| `lib/opening-hours.test.ts` | Opening-hours rules, incl. clock-change days |
| `__tests__/jsonld.test.tsx` | Builders for Google's structured data: breadcrumbs, courses, FAQs; `</script>` in Sanity text can't break the page; FAQ list falls back if Sanity is empty or down |

**Bugs the tests found (fixed):**
- the enquiry form rejected phone numbers with spaces or "+44", and names with apostrophes or accents
- it showed nothing when sending failed
- the footer weather showed wind speed as "4.6%"; it now shows knots

### End-to-end tests (Playwright, `tests/`)
**Structured data (`tests/structured-data.spec.ts`):** every page in the sitemap is checked for the hidden data Google reads: valid JSON, known types only, links to real live-site pages, the same business details everywhere (phone and opening hours match the site), breadcrumbs Home › Section › Page, a Course on every training page (name matches the heading), FAQ questions and answers that are on the page, and nothing on pages it doesn't belong to. Each page is a step in the report, and the full data is attached.

42 checks in a real browser, at desktop and phone size: homepage, menus (including the phone menu by keyboard), every page in the sitemap, the enquiry form and Google structured data.

**Safety** (`tests/support.ts`): every test intercepts EmailJS (no email sent) and blocks Google Analytics, CookieYes and Vercel analytics (visitor stats stay clean).

- `pnpm test:e2e` runs against `pnpm start` (run `pnpm build` first).
- `E2E_BASE_URL=https://… pnpm test:e2e` runs against a deployed site instead.

### The client report (Allure)
- `pnpm test:report` runs the unit tests, builds the site, runs the end-to-end tests and builds one combined report in `allure-report/`.
- `pnpm report:open` opens it.
- The report is grouped as unit vs end-to-end, then by area (Enquiries, Opening hours, Website basics, SEO). Failures include screenshots and a video.
- Settings: `allurerc.mjs`.

### Nightly run (Azure DevOps): `azure-pipelines-nightly.yml`
- **When:** every night at 02:00 UTC on `main`, even with no new commits.
- **What it does:**
  - runs everything
  - keeps 60 nights of history, so the report shows trends
  - publishes the report to a separate Vercel project (the client's link), as a pipeline artifact, and to the DevOps **Tests** tab
- **One-off setup:**
  1. Create a variable group `helicopterservices-nightly` (see the top of the YAML file).
  2. Create a separate Vercel project for the report. Protect it with a password or a shareable link rather than making it public.
  3. Add the pipeline in DevOps from the YAML file.
- **Not tested yet:** the pipeline itself, since there's no DevOps access from here. Run it once by hand after setup.

---

## Storybook (component library)
- **Run it:** `pnpm storybook` → http://localhost:6006. Build a static copy with `pnpm build-storybook`.
- **What's in it:** every component on the site, with real content copied from Sanity into `.storybook/fixtures/`, phone/tablet/desktop views, and an Accessibility tab on every story.
- **Docs pages:**
  - **Introduction**
  - **Brand:** logo, colours, type, page anatomy with live components, which Sanity field drives what, writing style
  - **Guides → Vibe coding a page:** how a product owner builds a page with Claude Code, with a worked example
- **Nothing live is touched.** Mocks stand in for Sanity and Google Maps (`.storybook/mocks/`, swapped in by `.storybook/main.ts`).

---

## Component review (Storybook pass)

### Fixed
- **Training pathway** (`TrainingMap`): the "Commercial" label was misspelt ("Commerical"). It also sat outside a table cell, so browsers moved it and React logged errors.
- **Enquiry form crash:** with no reCAPTCHA key the whole form crashed. It now shows a "please call us" message instead.
- **FAQs come from Sanity:** Settings → FAQs now drives the FAQ page and its Google FAQ data. The old list is the fallback (`lib/faq-defaults.ts`).
- **Unused Sanity field hidden:** Settings → "Opening Hours" was never read, so it's now hidden in the Studio.
- **Navigation query in one place:** Navbar and Footer each had a copy. Both now use `lib/navigation.ts`.
- **Footer type-checking** was switched off (`@ts-nocheck`). It's back on and passes.
- **Video modal** had no accessible title for screen readers. It has one now.
- **Faster homepage:** six review photos below the fold were marked `priority`, which made them load before the hero. Removed.
- **Decorative tick** in the accreditation strip now has empty alt text.
- **Unneeded `async`:** `Header`, `ServiceCard`, `HelicopterCard` and `HelicopterCard2` were `async` without awaiting anything, which blocked using them in client components. Now plain components.
- **`Heading`** no longer forces client-side rendering. It has no browser code.
- **Dead code removed:**
  - `CardWrapper`, `TemplateThree` (rendered nothing), `OpenClosedServer` (all comments), `UploadPage`, `ModeToggle` (the site is light-only), `HelicopterIcon`, `lib/blur-notusing.ts`, `actions/hello-action.ts`
  - 93 lines of commented-out code in `Hero.tsx`

### Worth doing next (not changed)
- **`NavMenu.tsx`** is 600 lines with 26 `@ts-ignore`s and the same block repeated per menu. Rebuild it from data, like `MobileMenu`.
- **Homepage reviews** are typed into `Reviews.tsx`. Move them into Sanity so marketing can update them.
- **Unused API routes:** `/api`, `/api/fleet` and `/api/navigation` aren't used by the site. Remove them if nothing outside uses them.
- **Old files in `public/images`:** old logo versions (`LogoDark`, `LogoDarkV1`, `LogoDarkV2`, `LogoLight`, `LogoLightV1`, `LogoLightV2`) and many unused images. Clear them out.
- **Trial lessons banner photo** is 1672 × 419, so it looks soft on big screens. The hangar shot is a better interim choice (compare them in Storybook: Site → Page banner). The real fix is a new photo at least 2400px wide showing the R22 and R44.

---

## Not done (and why)
- **Blog / guides:** out of scope, as asked.
- **Thin pages** (`/enquire`, `/training/elcas`, `/fleet/r22`): these need more copy written in Sanity by the client.
- **Redirect cost:** update external links (Google Business Profile, ads, Tripadvisor, socials, email signatures) to use `https://www.helicopterservices.co.uk`. This isn't a code change.
- **Video hosting:** the hero videos live in `public/videos` because there was no Blob token to upload with. Blob would keep the binaries out of git history; to move them, upload to Blob and point `HeroVideo.tsx` at the new URLs.
- **EASA logo:** a true vector version needs the official file. The WebP is fine until then.
- **Orange brand colour:** white-on-orange buttons and orange text on light grey still fail contrast checks (2.6–2.9:1). Fixing them means darkening the brand orange, which is a design decision.
- **Remaining mobile LCP time:** most of it is now render delay while the page JavaScript runs on a throttled phone. Further gains would mean cutting client-side JS (framer-motion, carousels).
