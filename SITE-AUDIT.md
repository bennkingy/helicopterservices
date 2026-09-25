# Site audit: Sanity, performance and SEO

Audited 24 September 2026 against a local production build (`pnpm build` then `pnpm start`), with Lighthouse on a mobile profile.

| Page | Performance | Accessibility | Best practices | SEO | Largest paint |
|---|---|---|---|---|---|
| Homepage | 71 | 86 | 96 | 92 | 7.9 s |
| /training/advanced-flying-programme | 61 | 85 | 96 | 100 | 12.2 s |

Lighthouse's SEO score of 100 is misleading. It doesn't catch the canonical bug below, which is the most damaging issue on the site.

## Status

Fixes 1, 2, 3, 5, 6, 10, 11, 12, 13, 14, 15, 16 and 17 are done and checked against a production build.

| Page | Performance before | Performance after | Largest paint after |
|---|---|---|---|
| Homepage | 71 | 76 | 6.8 s |
| /training/advanced-flying-programme | 61 | 73 | 6.9 s |

Still open:
- **4, hero video:** it still accounts for most of the homepage download.
- **7 and 8, alt text and SEO descriptions:** these are editing tasks in the Studio.
- **9, Studio tidy-up:** deploy, lockfile, upgrade and validation messages.

Two fixes need setting up outside the code:
- **Webhook (fix 6):** add `SANITY_REVALIDATE_SECRET` to Vercel. Then add a webhook in sanity.io/manage that POSTs to `https://www.helicopterservices.co.uk/api/revalidate` with the same secret. Until then, pages refresh every 30 seconds.
- **Consent Mode (fix 12):** turn on Google Consent Mode in the CookieYes dashboard. Otherwise Google Analytics stays in its cookieless mode for everyone.

## Fix first

These have the biggest effect for the least work.

### 1. Every page tells Google it is a copy of the homepage
- **Problem:** the root layout sets `alternates.canonical: "/"`. Every page inherits it, and no page overrides it. For example, /training/night-rating outputs `<link rel="canonical" href="https://www.helicopterservices.co.uk"/>`. Google treats a canonical as "index that URL instead", so inner pages can be dropped from search results in favour of the homepage.
- **Fix:** remove `canonical` from `app/layout.tsx`. Set it per page in each `generateMetadata`, for example `alternates: { canonical: "/training/" + slug }`. `metadataBase` is already set, so relative paths work.

### 2. Every page is rendered from scratch on every visit
- **Problem:** `generateViewport` in `app/layout.tsx` calls `headers()` to sniff for iPhones. Reading request headers in the root layout forces the whole site into dynamic rendering. The build marks every page as "server-rendered on demand", and responses carry `Cache-Control: no-store`. The `export const revalidate = 30` in each page therefore does nothing. Every visitor triggers a server render plus uncached Sanity API calls, and Vercel's edge network can't cache any HTML.
- **Fix:** delete `generateViewport`, or return a static `viewport` object without reading headers. It only exists to stop iOS zooming into form fields. Setting form inputs to at least 16px font size solves that properly, and blocking zoom is an accessibility failure anyway. After the fix, rebuild and check pages show as static or ISR in the build output.

### 3. Lightbox thumbnails download every gallery photo at 3,840px, full quality
- **Problem:** LightGallery's thumbnail plugin builds its hidden thumbnail strip on page load. It copies each tile's `next/image` source, which resolves to the largest 3,840px, quality 100 variant. On /training/advanced-flying-programme that's roughly 1.5 MB of images nobody sees unless they open the lightbox.
- **Fix:** in `app/components/Template.tsx`, give each gallery `<span>` a `data-thumb` attribute with a small Sanity URL, such as `urlFor(item).width(160).height(120).fit("crop").url()`. Consider `thumbnail: false` in mobile settings. Apply the same to `TemplateTwo.tsx`.

### 4. The 9.4 MB hero video autoplays on phones
- **Problem:** the homepage and about page hero video is 9.4 MB and makes up 8.2 MB of the homepage's 9.5 MB mobile payload. It's also the largest-paint element, so the page feels slow even on good connections.
- **Fix:** re-encode it to around 1.5 to 2.5 MB. Use H.264 or AV1 at 720p, around 15 to 20 seconds, with no audio track. Serve a smaller file or just the poster image below the `md` breakpoint. Keep `poster` so something shows instantly.

## Sanity

### 5. GROQ queries are built with string interpolation
- **Problem:** 12 queries insert the URL slug directly, as in `slug.current == '${slug}'`. A slug containing a quote breaks the query and returns a 500 instead of a 404. It's also an injection risk, although the dataset is read-only to the public.
- **Fix:** use parameters, for example `client.fetch('*[... && slug.current == $slug]', { slug })`. Also do this in `app/sitemap.ts`, where the type name is interpolated.

### 6. Content only refreshes on a 30-second timer, and the Sanity CDN is off
- **Problem:** `lib/sanity.ts` sets `useCdn: false`, with the comment "We use ISR". Because of issue 2, ISR isn't actually running, so every page view queries the live Sanity API. That's slower and counts against the API quota.
- **Fix:** after fixing issue 2, add a Sanity webhook that calls a Next.js route handler. The handler should use `revalidatePath` or `revalidateTag` on publish. Pages can then cache for a long time and still update within seconds of publishing. Until then, turning `useCdn` on is a cheap improvement.

### 7. Only 12 of 146 images have alt text
- **Problem:** the site now reads alt text from the Media library and from the new per-image alt fields. Almost none have been filled in, so most images fall back to "Helicopter Services".
- **Fix:** an editing task, not a code one. Open the Media tab in Studio and add alt text to each image, starting with the ones used on pages.

### 8. Most SEO descriptions are the same pipe-separated keyword list
- **Problem:** 20 of 38 pages use a description starting "Helicopter Services | 20 years' operating experience | ...". Google usually ignores keyword lists and writes its own snippet. Duplicate descriptions also make pages look alike to search engines.
- **Fix:** write a unique one or two sentence description for each page in Studio, under 160 characters.

### 9. The Studio needs a tidy-up and a deploy
- **Deploy:** the hosted Studio doesn't have this session's schema changes. From the `sanity` folder, run `pnpm run deploy` when the site changes go live.
- **Two lockfiles:** the `sanity` folder has both `package-lock.json` and `pnpm-lock.yaml`. Delete `package-lock.json` so everyone uses pnpm.
- **Old version:** Sanity 3.40 is well behind the current release. Upgrade the `sanity` package and its plugins together.
- **Validation messages:** several don't match their rules. For example, the "Quote Message" field allows 70 characters but the warning says 40.
- **Browser bundle:** `app/components/SanityImage.tsx` is a client component that imports the full Sanity client, which ships to the browser. Lighthouse reports 90 to 200 KB of unused JavaScript. Use `urlFor` in a server component and pass plain URLs to the client, or import only `@sanity/image-url`.

## Performance

### 10. Images are requested at quality 100
- **Problem:** 39 `next/image` usages set `quality={100}`. That roughly doubles file size compared with the default 75, with no visible difference. Lighthouse estimates 370 to 440 KB of savings per page.
- **Fix:** remove `quality={100}` everywhere. Also check `sizes` on `SanityImage`. `"(max-width: 800px) 100vw, 2000px"` asks for 2,000px or wider images on desktop even in small cards.

### 11. Google Maps loads on every content page
- **Problem:** `GMap` calls `useJsApiLoader` as soon as the sidebar renders. That loads several hundred KB of Maps JavaScript on every training, flights and industry page, usually below the fold. It's a large part of the 1.3 s script boot time and 17 s time-to-interactive on the advanced flying programme page.
- **Fix:** load the map only when it scrolls into view, using an `IntersectionObserver` or `next/dynamic` with `ssr: false`. Alternatively, show a static map image that links to Google Maps.

### 12. The cookie banner script blocks rendering
- **Problem:** CookieYes loads with `strategy="beforeInteractive"`, which puts it ahead of the page. Lighthouse estimates 510 to 660 ms of render-blocking time.
- **Fix:** use `afterInteractive`, unless the consent setup requires blocking before analytics. Google Analytics could instead wait on consent through Consent Mode.

### 13. TypeScript errors are ignored in builds
- **Problem:** `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so type errors never block a deploy. There are existing errors in the link renderer in `Template.tsx` and in the about schema's body validation.
- **Fix:** fix the handful of errors, then remove the flag.

## SEO

### 14. Content pages have no main heading, and some pages have several
- **Problem:** the `Heading` component renders its title as a `<div>`. The page header on every training, flights, industry and fleet page uses it, so those pages have no `<h1>` at all. Meanwhile the fleet page has 2 `<h1>` elements and the about page has 3, because section titles such as "Twin engine" and "Our services" are `<h1>`.
- **Fix:** give `Heading` an `as` prop. The page header should render `h1`, and section headings should render `h2`. Change the extra `<h1>` elements on the fleet and about pages to `h2`.

### 15. The sitemap and canonical domains disagree
- **Problem:** `app/sitemap.ts` lists `https://helicopterservices.co.uk/...` without www. `robots.txt` and `metadataBase` use `https://www.helicopterservices.co.uk`. Search engines get mixed signals about which host is real.
- **Fix:** build sitemap URLs from one constant with www. Also make sure the non-www domain 301-redirects to www in Vercel.

### 16. No structured data
- **Problem:** there's no JSON-LD on the site. A local business with an address, opening hours and reviews benefits from `LocalBusiness` markup, and FAQ pages from `FAQPage`.
- **Fix:** add a JSON-LD `<script>` in the root layout with name, address, phone, geo, opening hours and the TripAdvisor rating. Add `FAQPage` markup on /about-us/faqs.

### 17. Smaller metadata issues
- **Fallback descriptions:** the fleet page and the root layout fall back to a description of just "Helicopter Services".
- **Keywords tag:** the `keywords` meta tag is ignored by Google and contains typos such as "helicoper". Remove it.
- **Open Graph:** it's only partly set up. Pages get an image from the file convention, but `openGraph.description` and `url` aren't set per page.

## Accessibility

Lighthouse flagged these on both pages. They affect real users and, indirectly, SEO.

- **Carousel dots:** the carousel's dot buttons have no accessible name. Add `aria-label="Go to slide N"`.
- **Colour contrast:** some text fails, for example the orange "Enlarge and view" link on white and light-blue tags.
- **Tap targets:** some are too small or too close together on mobile.
- **Map dropdown:** the location `<select>` on the map has no label.
- **Lightbox dialog:** it has no accessible name.
- **Zoom:** the iPhone viewport sets `maximumScale: 1`, which blocks pinch zoom. This goes away with the fix for issue 2.

## Fixed during this session

- Content images and galleries are responsive, keep a consistent shape, and keep a constant gap to the sidebar.
- Alt text flows from Sanity for body images, galleries, homepage, about page and fleet cards.
- The fleet list is built from the helicopter documents.
- The homepage and main about page content is editable in Sanity, pre-filled with the existing copy and images.
- The Studio's missing `@sanity/icons` dependency has been added.
