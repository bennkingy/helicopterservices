# Site improvements summary

## Performance

These are Lighthouse scores on phone settings, measured against a production build.

**Homepage**

| Metric | Before | After |
|---|---|---|
| Performance | 71 | 76 |
| Accessibility | 86 | 86 |
| Best practices | 96 | 96 |
| SEO | 92 | 92 |
| Largest paint | 7.9 s | 6.8 s |
| Blocking time | 120 ms | 80 ms |
| Download size | 9.5 MB | 8.6 MB |

**Advanced flying programme page**

| Metric | Before | After |
|---|---|---|
| Performance | 61 | 73 |
| Accessibility | 85 | 91 |
| Best practices | 96 | 96 |
| SEO | 100 | 100 |
| Largest paint | 12.2 s | 6.9 s |
| Blocking time | 270 ms | 200 ms |
| Download size | 4.0 MB | 1.0 MB |

**Caching:** before, every page was rebuilt from scratch on every visit. Now every page is built ahead and served from cache.

The homepage is still held back by the 9.4 MB hero video, which we haven't fixed yet.

## What we fixed

**Images and layout**
- Content images resize properly from phone to desktop.
- Single images keep their real shape instead of being cropped to squares.
- Gallery tiles share one 4:3 shape across the site.
- The gap between images and the sidebar is the same 120px at every screen width.
- Lightbox thumbnails load 240px versions instead of 3,840px originals.

**Sanity CMS**
- Image alt text now comes from Sanity for content images and galleries.
- The fleet page lists helicopters automatically from the helicopter pages.
- All homepage content is editable in Sanity, pre-filled with the existing copy and images.
- The main about page content is editable in Sanity, also pre-filled.
- The popup advert is back as a Studio document with start and end dates, so admins can reuse it anytime.
- The Studio's missing icons package is installed, so it starts without errors.

**Enquiry form**
- Visitors can pick a specific service after choosing Training, Flights or Industry.
- The options come from Sanity, so new pages appear automatically.
- The form pre-selects the service page the visitor came from.

**SEO**
- Each page now tells Google its own address. Before, every page claimed to be the homepage.
- Social sharing tags are set on every page.
- Every page has exactly one main heading.
- Landing pages use the SEO titles and descriptions from Sanity.
- The sitemap uses the www address, and the bare domain redirects to www.
- Search engines get business details, such as address, phone and hours, plus FAQ markup.
- The outdated keywords tag is gone.

**Speed**
- Images no longer request maximum quality or oversized files. Fleet card thumbnails load at twice their box size and quality 90, so they stay sharp.
- Google Maps loads only when scrolled into view.
- The cookie banner no longer delays the page.
- A webhook endpoint lets Sanity refresh the site as soon as content is published.

**Code quality**
- 85 type errors fixed, and builds now check types again.
- Sanity queries pass page addresses safely.
- A misspelled lightbox setting for YouTube thumbnails now works.

**Other**
- Map "Get directions" links open Google Maps instead of what3words.
- A new sharp navy favicon replaces the blurry white-edged one.
- The CSS import error in your editor is fixed.

## Still to do

- **Webhook:** add `SANITY_REVALIDATE_SECRET` in Vercel, and add a webhook in sanity.io/manage pointing to `/api/revalidate` with the same secret.
- **Cookie consent:** turn on Google Consent Mode in the CookieYes dashboard. Otherwise Google Analytics stays in its limited, cookie-free mode.
- **Studio deploy:** run `pnpm run deploy` in the sanity folder so editors see the new fields.
- **Hero video:** compress it to around 2 MB, or show just the poster image on phones.
- **Content:** add alt text to images and write a unique SEO description for each page. Only 12 of 146 images have alt text, and 20 pages share one description.
- **Git:** review and commit the changes. Some new files aren't staged yet.
