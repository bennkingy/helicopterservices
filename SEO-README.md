# SEO audit: helicopterservices.co.uk

**Audit date:** 8 Oct 2026

**What was audited:** a local production build of the current working tree (all staged changes included). Where useful, it was compared with the live site.

**Audit status:**

| Area | Status |
| --- | --- |
| On-page metadata | ✅ Done (below) |
| Content, headings, links and images | ✅ Done (section 2) |
| Technical SEO and structured data | ✅ Done (section 3) |
| Core Web Vitals and mobile | ✅ Done (section 4) |

### Top fixes, in priority order

| # | Fix | Where | Ref |
| --- | --- | --- | --- |
| 1 | Deploy the staged changes. Production still serves the old robots.txt, the broken redirects and the `/industry/*` 500 errors. | Deploy | T-H1 |
| 2 | Add Fleet and About columns to the footer, so those pages get real links | Code | C-H1, T-H2 |
| 3 | Stop animating the `<h1>` (it's served at opacity 0) | Code | C-H2, P-H2 |
| 4 | Write a unique 120–155 character description for each page, with no pipe lists, and fix the conflicting years (20 vs 25) | Sanity | H2–H4 |
| 5 | Add a real poster image and a smaller mobile hero video | Code | P-H1 |
| 6 | Add the og:image width, height and type, plus BreadcrumbList and WebSite structured data | Code | H1, T-H3 |
| 7 | Expand the thin pages, and stop `/fleet` and `/training/type-ratings` duplicating each other | Sanity | C-H3, C-H4 |
| 8 | Make `SanityImage` pass alt text through, and add alt text in Sanity | Code + Sanity | C-M1 |
| 9 | Use a compact CookieYes banner and add a preconnect; load reCAPTCHA when someone focuses the form | Code + dashboard | P-H3, P-H4 |
| 10 | Use darker brand colours for text and buttons | Code | P-H5 |

---

## Why traffic dropped

Two reasons, and neither is lost content.

1. **Google Analytics now only counts visitors who accept cookies.**
   - The 25 Sep update added Google Consent Mode with `analytics_storage: "denied"` as the default.
   - Visitors who ignore or reject the cookie banner no longer show up as GA4 sessions.
   - **To check:** compare Vercel Analytics (no cookies) and Search Console clicks for the weeks before and after 25 Sep. If those are flat, real traffic didn't drop.
2. **Google is re-evaluating every page.**
   - Before the update, every page told Google its canonical was the homepage.
   - The update gave each page its own canonical and moved the whole site to `www`.
   - Expect 2–6 weeks of ranking churn. Don't revert it; the new setup is correct.

FAQ rich results are no longer possible for any site: Google retired them on 7 May 2026. The FAQPage markup is still valid, but it won't produce a rich result.

---

## Changes made in this session (staged, not committed or deployed)

| Area | Files | Change |
| --- | --- | --- |
| Industry pages | `app/industry/[slug]/page.tsx` | Fixed a destructuring bug. Pages now show their Sanity SEO titles, and unknown `/industry/*` URLs return 404 instead of 500. |
| Fleet heading | `app/components/TemplateTwo.tsx` | The aircraft name is now the page `<h1>` (it was an `<h3>`). |
| Enquire title | `app/enquire/page.tsx` | Now "Contact Us \| Helicopter Services". |
| Legacy redirects | `next.config.mjs`, `app/components/GMapHeader.tsx` | `/terms-conditions`, `/vr-simulator` and `/our-hanger` went to 404s and now reach real pages. Added old-slug redirects. Fixed the hangar path check. |
| Nav links | `Navbar.tsx`, `Footer.tsx`, `NavBarHeader.tsx`, `NavMenu.tsx`, `MobileMenu.tsx`, `enquire/page.tsx` | No more links to `/training/training`-style URLs or the non-www host. |
| Mobile About menu | `MobileMenu.tsx` | Restored the "About us → /about-us" link. Removed the pointless random-URL code. |
| Mobile menu UX | `MobileMenu.tsx` | No slide when the drawer opens; it only slides when moving between menus. Removed the blue focus outline on the drawer (iOS). |
| robots.txt | `app/robots.txt` | Removed the Disallow lines that hid the redirects from Google. |
| Share images | `lib/seo.ts` | Every page now has an og:image (38 had none). **The size and type tags are still missing; see H1 below.** |
| Structured data logo | `app/layout.tsx` | Changed `/icon.ico` (404) to `/icon.png` (512×512). |
| FAQ answers | `FAQ.tsx`, `components/ui/accordion.tsx`, `tailwind.config.ts` | All 8 answers are now in the server HTML. A grid-rows keyframe animation keeps the smooth slide. Tested in a headless browser. |
| Sitemap | `app/sitemap.ts` | One failed Sanity request no longer breaks the whole sitemap. |
| "20 years" → "25 years" | `app/enquire/page.tsx`, `lib/homepage-defaults.ts`, new `sanity/scripts/update-years.ts` | Code copy now says 25 (also "UKs" → "UK's"). The Sanity script changes 28 occurrences in 23 documents, including 2 drafts. **The dry run is done; it has not been applied yet.** |
| Misc | `app/consts.tsx` | `PROD_URL` now uses www. The file is dead code; consider deleting it. |

---

## 1. On-page metadata (score 6/10)

### What passes on all 40 pages

- **Status:** every page returns 200.
- **Title and description:** each page has exactly one of each, and no two pages share a title.
- **Canonical:** absolute, https, www, lowercase, no trailing slash, and self-referencing.
  - Query strings are dropped from the canonical (`?utm=x` → clean URL).
  - A trailing slash 308-redirects to the URL without one.
- **Indexing:** no page has a robots noindex or an `x-robots-tag`. The 404 page correctly has `noindex`.
- **Basic tags:** `<html lang="en">`, the charset and the viewport are correct.
- **Icons:** the favicon, `icon.png` (512px) and `apple-icon.png` (180px) all return 200.
- **Open Graph:** og:title and og:description match the page. og:url, og:type, og:locale (en_GB), og:site_name and twitter:card are all present.
- **Share image:** og:image returns 200 (1200×630 JPEG).
- **hreflang:** none, which is correct for a UK-only site.

### Per-page title and description lengths

T = title length, D = description length (characters). The targets are 30–60 for titles and 70–160 for descriptions.

| Page | T | D | Flags |
| --- | --- | --- | --- |
| / | 67 | 150 | Title over 60; uses "-" not "\|" |
| /training | 56 | 96 | No brand suffix; description is a fragment |
| /training/elcas | 27 | 230 | Title short; description too long, pipe list, dup A |
| /training/commercial-pilot-licence | 55 | 126 | Pipe list |
| /training/flight-instructor-refresher-seminars | 58 | 230 | Too long, pipe list, dup A |
| /training/night-rating | 34 | 230 | Too long, pipe list, dup A |
| /training/private-pilot-licence | 52 | 144 | Pipe list |
| /training/pbn | 56 | 230 | Too long, pipe list, dup A |
| /training/flight-examiner-certificates | 61 | 230 | Title just over 60; too long, pipe list, dup A |
| /training/simulator | 31 | 230 | Too long, pipe list, dup A |
| /training/type-ratings | 34 | 230 | Too long, pipe list, dup A |
| /training/instrument-rating | 40 | 230 | Too long, pipe list, dup A |
| /training/advanced-flying-programme | 47 | 230 | Too long, pipe list, dup A |
| /training/flight-instructor-certificates | 47 | 230 | Too long, pipe list, dup A |
| /industry | 50 | 152 | Pipe list; says "25 years" |
| /industry/load-lifting | 34 | 220 | Too long, pipe list, dup B; "20 years" |
| /industry/photography-filming | 43 | 220 | Too long, pipe list, dup B; "20 years" |
| /flights | 54 | 139 | No brand suffix; pipe-list title and description; "20 years" |
| /flights/london-sightseeing-tours | 46 | 220 | Too long, pipe list, dup B |
| /flights/local-area-tours | 38 | 220 | Too long, pipe list, dup B |
| /flights/helicopter-charter | 40 | 220 | Too long, pipe list, dup B |
| /flights/airport-transfers | 38 | 153 | Pipe list; "20 years" |
| /flights/trial-lessons | 35 | 220 | Too long, pipe list, dup B |
| /flights/special-events | 36 | 220 | Too long, pipe list, dup B |
| /fleet | 80 | 220 | Title over 60 and keyword-stuffed; too long, pipe list, dup B |
| /fleet/ab206, as350, aw109, as355 | 27 | 220 | Title is only the model code; too long, pipe list, dup B |
| /fleet/r66, r22, r44 | 25 | 220 | Same as above |
| /about-us | 30 | 91 | "-" separator; dup C |
| /about-us/faqs | 26 | 91 | Title short; dup C |
| /about-us/meet-the-team | 35 | 91 | Dup C |
| /about-us/the-hangar | 32 | 91 | **Typo "Hanger"**; dup C |
| /legal/terms-and-conditions | 82 | 220 | Title over 60 and keyword-stuffed; too long, dup B |
| /legal/cookies | 71 | 220 | Title over 60 and keyword-stuffed; too long, dup B |
| /legal/privacy | 71 | 220 | Title over 60 and keyword-stuffed; too long, dup B |
| /enquire | 32 | 148 | "20 years"; "UKs" is missing its apostrophe |

**Duplicate descriptions:**

- **A** (10 pages): "Helicopter Services | Experienced helicopter training for pilots… | White Waltham Airfield | Maidenhead"
- **B** (18 pages): "Helicopter Services | 20 years' operating experience | … | Twin engines | Instrument rated"
- **C** (4 pages): "Helicopter Services | Experienced helicopter training for pilots, instructors and examiners"

### High priority

**H1. og:image has no width, height, type or alt on any page.** *(code)*

- **Cause:** `pageMetadata` in `lib/seo.ts` passes the image as a plain string. That overrides Next's file-based image metadata, so `/` and `/training` lose the tags they have on the live site.
- **Fix in `lib/seo.ts`:** use this for both `openGraph` and `twitter`:
  `images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: SITE_NAME }]`

**H2. 32 of 40 meta descriptions are duplicates.** *(Sanity, `seoDescription`)*

- Write a unique sentence of 120–155 characters for each page.
- Start with: training (all except the landing page, CPL and PPL), every fleet page, flights (all except the landing page and airport transfers), industry load lifting and photography, every legal page, and every about page.

**H3. 28 descriptions are 220–230 characters, and 35 of 40 are pipe-separated keyword lists.** *(Sanity)*

- Google will cut these off and probably rewrite them.
- Rewrite them as plain sentences. For example, for `/fleet/r22`: "Learn to fly or hire the Robinson R22, our two-seat training helicopter, at White Waltham Airfield near Maidenhead."

**H4. The years of experience conflict.** *(Sanity and code)*

- About 20 descriptions say "20 years". The default description, the structured data and `/industry` say "25 years". Page text mixes both.
- Choose one figure (25 looks current) and update:
  - Sanity: every page in group B, plus the flights landing page and airport transfers.
  - `app/enquire/page.tsx`: "Over 20 years… the UKs…". Also fix "UK's" there.

### Medium priority

**M1. Five titles are over 60 characters.** *(Sanity, `seoTitle`)*

| Page | Current length | Suggested title |
| --- | --- | --- |
| `/fleet` | 80 | "Our Helicopter Fleet \| Helicopter Services" |
| `/legal/terms-and-conditions` | 82 | Drop "\| London helicopter tours \| Trial Lessons", e.g. "Terms & Conditions \| Helicopter Services" |
| `/legal/cookies` | 71 | Same as above, e.g. "Cookie Policy \| Helicopter Services" |
| `/legal/privacy` | 71 | Same as above, e.g. "Privacy Policy \| Helicopter Services" |
| `/` | 67 | "Helicopter Training & Charter, Maidenhead \| Helicopter Services" |

**M2. The brand suffix is inconsistent.** *(Sanity)*

- The training and flights landing pages have no brand.
- The homepage and `/about-us` use " - " instead of " | ".
- Standardise on "{Topic} | Helicopter Services".

**M3. Fleet titles are only the model code.** *(Sanity)*

- For example, "R22 | Helicopter Services". Better: "Robinson R22 Helicopter | Helicopter Services".
- ELCAS and FAQs also need more descriptive titles.

**M4. Typos and copy mismatches.** *(Sanity)*

- The Hangar `seoTitle` says "The Hanger" and has a trailing space.
- `/flights/airport-transfers` is titled "Airport Transfer" (singular).
- "Flight Examiner/Instructor Ratings" is used on pages whose slugs end in `-certificates`.

### Low priority

- **L1 (code):** the not-found fallbacks in the `[slug]` pages (fleet, flights, industry, training) hard-code a pipe-list description and the off-topic title "Experienced helicopter training | White Waltham Airfield | Maidenhead". They should fall back to `DEFAULT_DESCRIPTION` and a title built from the slug.
- **L2 (code):** og:image:alt and twitter:image:alt are missing. The H1 fix covers these.
- **L3 (code, optional):** every page uses the same generic share image. Using each page's Sanity hero image would make shared links more appealing.
- **L4 (code, optional):** there's no `twitter:site`. Add it only if the business has an X account.
- **L5 (Sanity, optional):** some `seoTitle` values have leading or trailing spaces. The code already trims them.

---

## 2. Content, headings, links and images

All 40 pages return 200, each has exactly one `<h1>`, and no internal link returns a 404.

**The FAQ change works.** All 8 answers are in the server HTML, and closed answers are hidden with `visibility:hidden`, which Google still indexes. The FAQPage structured data matches the visible questions and answers word for word.

### High priority

**C-H1. Weak internal linking: the dropdown menu links aren't in the HTML.** *(code)*

- The desktop dropdowns only render when opened, so the server HTML of each page has just 9 nav links.
- The footer covers training, flights, industry and legal pages, but not fleet or about.

| Page | Pages linking to it |
| --- | --- |
| /about-us/faqs | 1 (only /about-us) |
| /about-us/the-hangar | 1 |
| /about-us/meet-the-team | 2 |
| /fleet/ab206, /fleet/as350, /fleet/r66 | 2 each |
| /fleet/aw109, /fleet/r22, /fleet/as355, /fleet/r44 | 4–7 |
| Each training, flights and industry page | 40 (through the footer) |

- **Fix:** add **Fleet** and **About** columns to `app/components/Footer.tsx`. Its query already fetches both (lines 19–39), but nothing renders them.
- **Alternative:** add `forceMount` to the dropdown content (`components/ui/navigation-menu.tsx:109`) and hide it with CSS.
- This is the same issue as T-H2 in section 3.

**C-H2. The `<h1>` starts invisible on 32 of 40 pages.** *(code)* This is the same issue as P-H2 in section 4.

- Framer Motion sends `opacity:0; filter:blur(4px)` in the server HTML. It's applied in `Hero.tsx:54`, and in `Header.tsx:43` for every service page and landing page.
- **Fix:** don't animate the `<h1>`.

**C-H3. Thin content.** *(Sanity, expand the `body`)* Word counts exclude the nav, footer and sidebars.

| Page | Words |
| --- | --- |
| /training/elcas | 49 |
| /fleet/r22 | 63 |
| /training/type-ratings | 113 |
| /training/flight-instructor-refresher-seminars | 115 |
| /fleet | 115 |
| /industry | 139 |
| /about-us/the-hangar | 179 |
| /flights | 196 |
| Other fleet pages | 169–261 |
| /training/advanced-flying-programme | 237 |
| Flights service pages | 246–282 |
| /industry/load-lifting, /industry/photography-filming | 283–296 |

Start with the R22, ELCAS, type ratings and refresher seminars pages.

**C-H4. `/fleet` and `/training/type-ratings` are 84% the same.** *(Sanity, plus optional code)*

- The `fleet` document's body is type-rating copy ("We currently offer 17+ types of helicopter…").
- The type-ratings page shows the same helicopter grid (`app/training/type-ratings/page.tsx:100-104`).
- **Fix:** write fleet-specific copy for `/fleet` and real type-rating copy for `/training/type-ratings`.
- **Optional:** remove the duplicate grid from the type-ratings page.

### Medium priority

**C-M1. Generic image alt text.** *(code and Sanity)*

- 409 images use `alt="Helicopter Services"` and 14 use `alt="Title Image"`.
- In Sanity, only 1 of 34 main images and 12 of 147 assets have alt text.
- **Code bug:** `Header.tsx:35` passes `alt={title}`, but `SanityImage.tsx:28` ignores any `alt` prop and always falls back to "Helicopter Services". The same happens in `Template.tsx:76/142`.
  - **Fix:** make `SanityImage` accept an `alt` prop.
- **Decorative images that should have `alt=""`:**
  - `IconsHelper.tsx:19`
  - the caret icons in `HelicopterCard.tsx:55`, `HelicopterCard2.tsx:43`, `ServiceCard.tsx:62` and `MainServices.tsx:115`
  - `AccrediationsText.tsx:29`
  - the phone icons (`NavMenu.tsx:570`, `MobileMenu.tsx:352`)
  - `Weather.tsx:71` and `about-us/page.tsx:126`
- **Images that need real descriptions:**
  - the approvals graphic (`Approvals.tsx:15`)
  - the reviewer avatars (`Reviews.tsx:97`, `ContactCta.tsx:25`)
  - the homepage photos (`Hero.tsx:96/102/190/197`)
- **Sanity:** add alt text to the main, hero and gallery images on every service, fleet and about document.

**C-M2. Weak or off-topic `<h1>`s.** *(Sanity unless noted)*

- These don't say what the page is about:
  - Home: "Exceeding exacting industry standards" (`homepage.heroTitle`)
  - `/training`: "From beginner to advanced, you're in expert hands"
  - `/industry`: "Elevating industry to new heights"

  Make each one say what the page offers, e.g. "Helicopter Training at White Waltham".
- **Fleet:** the `<h1>`s are just model codes ("R22"). "Robinson R22 Helicopter" would be better.
- **The Hangar:** the `<h1>` and title say "The Hanger". In `about/the-hangar`, fix `hero.heading` and `seoTitle`.
- **`/enquire`:** the `<h1>` "Enquire now" doesn't match the title "Contact Us". *(code, `app/enquire/page.tsx:118`)*

**C-M3. Skipped heading levels.** *(code)*

| Where | Problem | Fix |
| --- | --- | --- |
| Footer, every page | `<h2>` followed by an `<h4>` "White Waltham Airfield" | Make it a `<p>` (`Weather.tsx:66`) |
| FAQ page | `<h1>` followed by `<h3>` questions (Radix's default) | Use `asChild` with an `<h2>` (`components/ui/accordion.tsx:26`) |
| Fleet pages | `<h1>` followed by an `<h3>` "Specifications:" | Make it an `<h2>` (`TemplateTwo.tsx:182`) |
| Home page | `<h3>` cards before any `<h2>`, and `<h5>` carousel titles | Make the carousel titles `<h3>` (`Carousel.tsx:105`) |

**C-M4. Internal links that redirect.**

- **`/about-us`** *(code)*
  - A card links to the relative path `about-us/` (`app/about-us/page.tsx:142`), so `/about-us/fleet` 308-redirects to `/fleet`.
  - The other cards use relative paths too, so they only work from `/about-us`.
  - **Fix:** use absolute paths built from each document's type.
- **`/flights`** *(Sanity)* A card links to `/flights/london-sightseeing`, which redirects. This is the same as T-M6.

**C-M5. Part of the training page is missing from the HTML.** *(code)* The inactive tab on `/training` isn't rendered, so about 70 words and the training route-map links are missing. **Fix:** add `forceMount` with hidden styling at `app/training/page.tsx:245`.

### Low priority

- **C-L1. External links.** *(Sanity, page bodies)*
  - **Broken:** `crazybeargroup.co.uk/stadhampton/` returns 404 (flights/special-events).
  - **Out of date:** the Silverstone 2017, Cowes Week, Aintree, Newmarket and Goodwood links on helicopter-charter.
  - **Third-party copy:** CAP 804 links to a copy on 999tom.com (CPL page). Link the official CAA page instead.
  - **Plain `http://`:** caa.co.uk, captonline, londonheliport, easa, robinsonheli and the event sites.
- **C-L2. `target="_blank"` without `rel="noopener"`.** *(code)*
  - Facebook and Instagram in the footer (`Footer.tsx:119-150`).
  - The TripAdvisor "Read more" link (`Reviews.tsx:130`).
- **C-L3. Missing landmarks.** *(code)*
  - No `<main>` on `/about-us/faqs`, `/about-us/meet-the-team` or the legal pages.
  - No `<footer>` element on any page (`Footer.tsx:72`).
- **C-L4. Words run together.** *(code)* Some headings read "About HelicopterServices" and "Exceeding exactingindustry standards", because a `<br/>` sits between two spans with no space. Add a space before the `<br/>`, in the Hero and the About-page hero.
- **C-L5. FAQ rich results.** These are retired for every site as of May 2026, so the FAQ schema won't produce one. The audit agent said they're limited to government and health sites, which is out of date.
- **C-L6. Image sizes are fine.** next/image outputs are 38–100KB. Sanity images that already have `?w=&auto=format` are processed again by `/_next/image`. That works, but it's redundant.

## 3. Technical SEO and structured data

No critical issues in the working tree.

### What passes

- **Sitemap:** valid XML, identical on local and live.
  - All 40 URLs return 200, are self-canonical and indexable, and aren't blocked by robots.txt.
  - Every Sanity document with a URL is included. Nothing indexable is missing.
- **404s:** a random URL and unknown slugs under all six sections return a real 404 with `noindex`.
- **URL variants:**
  - `/index.html` returns 404.
  - Trailing slashes 308-redirect to the clean URL.
  - `?utm_source=x` keeps the clean canonical.
- **Redirects:** all 48 rules in `next.config.mjs` are single-hop 308s that end at a 200, with no chains, loops or 302s. Non-www → www works.
- **Live headers:**
  - Brotli compression and correct content types.
  - No `x-robots-tag`.
  - Static assets are cached for a year (`immutable`).
- **Rendering:** key content is in the initial HTML, including all 8 FAQ answers. There's no `noindex` on any indexable page.
- **LocalBusiness markup:** valid. The logo, image and `sameAs` URLs all return 200, and the hours and phone match the site.

### High priority

**T-H1. Production still blocks Google from its own redirects.** *(deploy)*

- The live `robots.txt` still disallows `/training/training`, `/about-us/about-us`, `/flights/flights` and `/fleet/fleet`. It doesn't include `/industry/industry`, so it's inconsistent too.
- Blocking these stops Google seeing the 308 redirects, so the old URLs can stay indexed as "blocked by robots.txt".
- The working tree is already fixed. Deploy it, and don't restore the lines.

**T-H2. Two About pages are only linked from JavaScript menus.** *(code)*

- `/about-us/faqs` and `/about-us/the-hangar` have no `<a href>` in the server HTML of any page. The only links are in the desktop dropdown (`NavMenu.tsx:519-530`), which renders only when opened, and in the client-side mobile menu.
- `Footer.tsx` already fetches the About pages but never shows them.
- **Fix:** add an "About" column to the footer, like the training column at `Footer.tsx:183`.

**T-H3. No BreadcrumbList or WebSite structured data.** *(code)*

- The fleet pages show breadcrumbs (`Breadcrumbs.tsx`, used in `TemplateTwo.tsx:124`), but they have no JSON-LD.
- **Fix:**
  - Emit BreadcrumbList from `Breadcrumbs.tsx`.
  - Add a `WebSite` block (`name`, `url`, `publisher` → `#business`) next to the LocalBusiness block in `app/layout.tsx`. It supports the site name shown in Google results.

### Medium priority

- **T-M1. Security headers are missing.** *(code)*
  - Live only sends HSTS, without `includeSubDomains` or `preload`.
  - Add `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy` and `Permissions-Policy` through `headers()` in `next.config.mjs`.
  - Set `poweredByHeader: false` to stop sending `x-powered-by: Next.js`.
- **T-M2. No Service markup on the service pages.** *(code)*
  - Add a `Service` block (name, description, `provider` → `#business`, `areaServed`) to the training, flights and industry `[slug]` templates, built from Sanity fields.
  - `Course` would suit the licence pages.
  - Don't use Product: there are no prices or sales.
- **T-M3. LocalBusiness is missing recommended properties.** *(code, `app/layout.tsx`)* Add `priceRange`, `areaServed`, `hasMap` and `contactPoint`.
- **T-M4. Duplicate descriptions and "20 years".** *(Sanity)* Same as H2–H4 in section 1.
- **T-M5. The vercel.app domain uses a temporary redirect.** *(Vercel dashboard)* `helicopterservices.vercel.app` returns a 307 to www. Change it to a 308 in Vercel → Domains.
- **T-M6. A card link on `/flights` goes through a redirect.** *(Sanity)*
  - It points to `/flights/london-sightseeing`, which 308s. The URL is in the flights landing document, field `services[].url`. Change it to `/flights/london-sightseeing-tours`.
  - `app/flights/page.tsx:100` has a `url.replace("trail","trial")` hack, which suggests a misspelled URL in the same field. Fix the URL in Sanity, then remove the hack.

### Low priority

- **T-L1. Mixed-case slugs return 200.** `/training/PBN` and `/fleet/R44` return 200 with a lowercase canonical. That does no harm. For neatness, call `permanentRedirect` to the lowercase URL in each `[slug]` page.
- **T-L2. Two sitemap dates are always today.** `/` and `/enquire` use today's date on every request (`app/sitemap.ts`). Use the homepage document's `_updatedAt` for `/`, and a fixed date for `/enquire`.
- **T-L3. Redirect hops.** `http://helicopterservices.co.uk/` takes 2 hops, which is normal on Vercel, and HSTS covers repeat visits.
- **T-L4. Old pages redirect to the homepage.** `/faa`, `/corona-19`, `/brexit` and the risk-assessment URLs go to `/`, which Google treats as soft 404s. That's acceptable, or return 410 instead.
- **T-L5. Language tag.** `lang="en"` should be `lang="en-GB"` (`app/layout.tsx:94`).
- **T-L6. FAQPage markup gets no rich result.** It's valid, but FAQ rich results were retired in May 2026. Keep it or remove it.
- **T-L7. Sanity housekeeping:**
  - Delete the test documents: two `post`s ("test", "ewrwer") and an orphan `page` called "Flights".
  - Fix the "Hanger" typo.
  - Remove the dead `allowedSlugs` at `legal/[slug]/page.tsx:12`.
- **T-L8. The 404 page has no `<h1>`.** `app/not-found.tsx:20` uses an `<h3>`.

## 4. Core Web Vitals and mobile

No failures that would hurt SEO: SEO scores are 92–100. Lighthouse, mobile, headless Edge. "Lab" is Lighthouse's simulated slow-phone time; "seen" is when the page actually painted in the test.

| Page (live) | Perf | A11y | BP | SEO | LCP lab / seen | CLS | LCP element |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 66 | 85 | 100 | 92 | 6.8s / 1.6s | 0.007 | CookieYes banner |
| `/training` | 72 | 92 | 100 | 100 | 6.4s / 0.6s | 0 | Hero image |
| `/training/private-pilot-licence` | 86 | 91 | 100 | 100 | 4.0s / 0.5s | 0 | Body text |
| `/flights/london-sightseeing-tours` | 70 | 91 | 100 | 100 | 6.0s / 0.7s | 0 | Body text |
| `/fleet/r44` | 86 | 91 | 100 | 100 | 3.8s / 0.4s | 0 | Body text |
| `/about-us/faqs` | 80 | 91 | 100 | 100 | 5.2s / 0.6s | 0 | CookieYes banner |
| `/enquire` | 76 | 91 | 100 | 100 | 5.8s / 0.6s | 0 | CookieYes banner |

There's no real-user data from Chrome yet; the PageSpeed API quota ran out during the audit. Check the Core Web Vitals report in Search Console instead.

### High priority

**P-H1. The homepage hero video is 9.9MB and its poster image is blank.** *(code, `app/components/Hero.tsx:38-49`)*

- That's about 90% of the homepage's weight on mobile. The poster image is 112 bytes, so nothing shows until the video loads.
- **Fix:**
  - Add a real poster image (60–100KB WebP/AVIF), shown with `next/image` and `priority`.
  - Add a separate mobile video (720p, under 1.5MB).
  - Use `preload="none"`, and load the video once the page is idle.
  - Skip the video when the visitor has data saver or reduced motion turned on.
- **Expected:** about 8MB less on mobile, and LCP around 2.5s.

**P-H2. Page headings start invisible.** *(code, `FramerAnimationBlurIn.tsx:8-14`, used at `Hero.tsx:54` and `Header.tsx:43`)*

- The `<h1>` is served with `opacity:0` and a blur. It only appears after the page's JavaScript has loaded and a 1-second animation has run, which adds about 5.8s of delay when the heading is the LCP element.
- **Fix:** don't animate the first heading on screen. Remove the animation wrapper, or start the fade at `opacity: .01` or higher, so Chrome can still count the heading as the LCP element.

**P-H3. The CookieYes banner is the LCP element on `/`, `/about-us/faqs` and `/enquire`.** *(code and CookieYes dashboard)*

- The banner covers about 47% of a phone screen and appears late.
- Its buttons fail contrast (#f77005 on white is 2.88:1).
- **Fix:**
  - Add `preconnect` links to `cdn-cookieyes.com` and `log.cookieyes.com` in `app/layout.tsx`.
  - Switch CookieYes to a compact bottom bar.
  - Use a darker orange for the buttons, such as #C2410C (5.18:1).

**P-H4. reCAPTCHA loads straight away on `/enquire`.** *(code, `ContactForm.tsx:34`, `:354-358`)*

- It adds about 420KB and 0.5s of main-thread work before anyone touches the form.
- **Fix:** load it the first time someone focuses the form (`next/dynamic` with `ssr: false`), or switch to a version that runs only on submit.

**P-H5. The brand colours fail contrast on every page.**

- `brand-orange` #F77005 is 2.88:1 on white, and `brand-light-blue` #1FB6DE is 2.38:1. Both are used for links, breadcrumbs, tag lines and the orange buttons.
- **Fix:**
  - Add text-safe colours in `tailwind.config.ts`: orange text #C2410C and light-blue text #0E7490.
  - Use them for text and buttons, and keep the bright colours for icons and borders.
- **Expected:** accessibility score 91 → about 98.

### Medium priority

- **P-M1. Review avatars load early.** Three TripAdvisor avatars below the fold are preloaded with `priority` (`Reviews.tsx:93-98`). Remove `priority`, add `sizes="80px"`, and use a real alt text instead of "Title Image".
- **P-M2. Google Analytics is heavy.** It loads 176KB at high priority, with 180–310ms of main-thread work on every page.
  - Move `<GoogleAnalytics>` inside `<body>` (`layout.tsx:96`).
  - Consider loading it lazily.
  - Add a `preconnect` to `region1.google-analytics.com`.
- **P-M3. A link has non-descriptive text.** This is why the homepage SEO score is 92. The TripAdvisor link just says "Read more" (`Reviews.tsx:129-143`). Change it to "Read more reviews on Tripadvisor" to get 100.
- **P-M4. Carousel buttons have no names.** The 5 slide dots have no accessible name (`Carousel.tsx:126-133`). Add `aria-label={`Go to slide ${i + 1}`}`.
- **P-M5. Heading order.**
  - Weather widget `<h4>` in the footer (`Weather.tsx:66`).
  - Carousel `<h5>` (`Carousel.tsx:105`).
  - Homepage service-card `<h3>`s come straight after the `<h1>`.
  - FAQ questions are `<h3>`s straight after the `<h1>`.
  - "Specifications:" is an `<h3>` with no `<h2>` before it (`TemplateTwo.tsx:182`). Make it an `<h2>`.
- **P-M6. Small tap targets.** The legal links in the mobile footer are 19px tall (`Footer.tsx:247-253`). Add `inline-block py-2`.
- **P-M7. Heavy logo image.** The `easa.svg` logo in the hero is 150KB because it's a bitmap wrapped in SVG. Replace it with a real vector, or a small PNG/WebP under 5KB.
- **P-M8. The promo popup will be penalised when switched on.** It's a full-screen overlay that opens 4 seconds after load, which Google penalises on mobile. It's off right now.
  - On mobile, show it as a small bottom sheet instead, covering less than 25% of the screen.
  - Show it only after scrolling, or on the second page view, and never while the cookie banner is showing.

### Low priority

- **Carousel arrows:** their alt text repeats the screen-reader text (`components/ui/carousel.tsx:220,254`). Set `alt=""`.
- **Unused JavaScript:** 67–128KB per page, mostly Framer Motion. Swap the slide-in and blur-in animations for CSS, or use `LazyMotion`.
- **Image sizes:** card images are 51–75KB larger than needed. Pass accurate `sizes` to `SanityImage` in the card grids.
- **CLS:** under 0.01 everywhere, so no action needed. The FAQ accordion change adds 0.010 locally, which is negligible.

---

## To do after deploying

1. Search Console:
   - Resubmit `https://www.helicopterservices.co.uk/sitemap.xml`.
   - Request indexing for the main landing and service pages.
2. Search Console reports: check "Not found (404)", "Server error (5xx)" and "Duplicate, Google chose different canonical".
3. Traffic: compare GA4 with Vercel Analytics and Search Console across 25 Sep, to confirm whether the drop is real or only in GA.
