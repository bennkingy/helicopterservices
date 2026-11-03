# Design improvements: header heroes, text size, paddings

Review of `app/components/Hero.tsx`, `Header.tsx`, `Heading.tsx`, `Template.tsx`, the homepage and `tailwind.config.ts`. Nothing has been changed yet. Most important first.

## Header heroes

### Homepage hero (`app/components/Hero.tsx`)

1. **Use `svh` instead of `lvh` for the height.** `100lvh` measures the screen with the browser's address bar hidden. While the bar is showing, the hero is taller than the screen, so the CAA/EASA strip at the bottom starts out cut off on phones. `h-[calc(100svh_-_65px)]` keeps it on screen.
2. **Vertically centre the content.** The title sits near the top (`place-self-start` plus `mt-[45px]`), which leaves a big empty band in the middle of a full-height hero. `place-self-center` (or `self-center`) looks more deliberate. Also give the content bottom padding as tall as the accreditation strip. On short screens, like a phone held sideways, the title, subtitle and reviews can currently run underneath that strip, which is positioned over the hero.
3. **Make the title heavier on mobile.** `font-extralight` at 36px over video is hard to read. Use `font-light` up to `md` and keep extralight only at `md:text-6xl` and above, where it still looks elegant.
4. **Add a call to action.** The `cta` buttons render `<Button />` with no label, so nothing ever shows. The hero has no "Book a flight" or "Call us" button, even though `Enquire` already provides one. Above the fold is where it matters most.

### Inner-page header (`app/components/Header.tsx`)

5. **Make it taller on mobile.** At 200px (`h-[200px]`), the tag, the two-line h1 and the image all feel squeezed. Go to about `h-[260px] sm:h-[340px] lg:h-[440px]`, or use `min-h` plus vertical padding so long titles can't overflow.
6. **Replace `w-screen` with `w-full`.** `w-screen` includes the scrollbar's width, so the page scrolls sideways on desktop. That's why it's wrapped in `overflow-x-hidden` in `Template.tsx`.
7. **Lift the title text.** On mobile it's `text-[29px] font-extralight max-w-[300px]`. Use `font-light`, let it run wider (`max-w-[90%]`), and set the line-height relative to the font size (e.g. `leading-tight`) rather than the fixed 40px from `leading-10`.
8. **Remove the dead props.** `height` and `extraPadding` are accepted but never do anything.

## Text size

9. **`text-md` doesn't exist in Tailwind.** It's used 7 times (hero strip, `MainServices`, `NavMenu`, `MobileMenu`, `Reviews`, `TemplateTwo`) and silently does nothing. Change it to `text-base`, or define `md` in `theme.extend.fontSize`.
10. **Bump body text on desktop.** All body copy is 16px Open Sans at every width. Using `lg:text-[17px]` or `lg:text-lg` for paragraphs, and `prose-lg` at `lg` for the CMS content in `Template.tsx`, reads noticeably better. Cap line length at about 70 characters with `max-w-prose`.
11. **Standardise heading sizes.** Section headings repeat `text-3xl sm:text-4xl` by hand, while CMS headings use `prose-h2:text-[25px] lg:prose-h2:text-4xl`, so they don't match. Give `Heading` a `size` prop (e.g. `'section' | 'page'`) or add fluid sizes to the config, for example `display: clamp(2.25rem, 5vw + 1rem, 4.5rem)`. Then the hero, the header and section titles all scale smoothly from one source.
12. **Restyle the light-blue tag line.** It was `font-normal text-lg`. Now `text-base font-normal`, normal case, so it sits quietly above the heading.

## Paddings

13. **Fix the competing side padding.** The config sets `container.padding: "2rem"`, but `Template.tsx` adds `px-4`, which overrides it, so inner pages have 16px sides and the homepage has 32px. Use a responsive container padding in the config, e.g. `{ DEFAULT: '1.25rem', sm: '2rem', lg: '3rem' }`, and remove the ad-hoc `px-4`.
14. **Vary section spacing by screen size.** Every section is `py-20` (80px) whether on a phone or a 1440px screen. That's heavy on mobile and a bit tight on large desktops. Something like `py-14 md:py-20 xl:py-28` works, ideally as a single `section-y` class in `styles/globals.css` so it changes in one place.
15. **Cut back the one-off spacing values.** `mt-5`, `mt-6`, `mt-7`, `mt-8`, `mt-10`, `mt-12`, `mt-14`, `mt-16` and `mt-20` are all in use. Settle on roughly four steps (`2 / 4 / 8 / 16`, i.e. 8/16/32/64px) and use `space-y-*` or `gap-*` on parents instead of a margin on each child. The `-mt-[5px]` in `Heading.tsx` and `-mb-[5px]` in `app/page.tsx` are offsetting line-height. They're fragile and go away once heading line-heights are set properly.
16. **Increase the container max width.** It only goes up to 1280px (`6xl`). That's fine, but on 1440px+ screens the side gutters look empty next to the full-width blue sections. Adding a `2xl: 1400px` step would help.

## Where to start

Items 1, 2, 5, 9, 13 and 14 make the biggest visible difference with small, contained changes. Items 11 and 15 make future changes easier but touch more files.
