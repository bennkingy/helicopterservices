# To do

Things that still need a person, in rough order. Tick them off as you go.
Details for each are in `REVIEW-FIXES.md`.

## 1. Save the work (do first)
- [ ] Nothing is committed yet. In Source Control, stage **everything**: "Staged Changes" holds the earlier work, and "Changes" holds today's tests, Allure and the pipeline.
- [ ] Commit to a branch (e.g. `feature/review-fixes`) and open a pull request, rather than committing to `main`.
- [ ] Check it builds on Vercel (preview deployment) before merging.

## 2. Sanity (content)
- [ ] Deploy the Studio so the new fields appear: `cd sanity && npx sanity deploy`.
  New: Hero subheading, review score, Opening hours.
- [ ] Settings → **Opening hours**: fill in all seven days. Until then the site uses the built-in hours (Mon–Fri 08:30–17:00, weekends by appointment). Note the old hidden hours in Sanity said 17:30, so check which is right.
- [ ] Fix the typos in live content. Preview first, then apply:
  ```
  cd sanity
  npx sanity exec scripts/fix-review-typos.ts --with-user-token
  npx sanity exec scripts/fix-review-typos.ts --with-user-token -- --apply
  ```
  This fixes "The Hanger", "experence" and "over 17+", and sets the new homepage heading.
- [ ] Settings → **Overall review rating** and **Number of reviews** (from Tripadvisor). This turns on the score under the hero and in Google results.
- [ ] Optional: Settings → **FAQs**, if the client wants to edit them. The built-in list shows until then.

## 3. Photos and design decisions (client)
- [ ] New **trial lessons banner** photo, at least 2400 × 800px, showing the R22 and R44. Until then, consider the hangar photo (compare in Storybook: Site → Page banner).
- [ ] Official **EASA logo** as a vector (SVG) file.
- [ ] Decide on the **orange**: white text on the orange buttons fails accessibility contrast. Darken it slightly, or keep it.
- [ ] Copy for the **thin pages**: `/enquire`, `/training/elcas`, `/fleet/r22`.

## 4. Outside the website (client)
- [ ] Change every link to the site to **https://www.helicopterservices.co.uk**: Google Business Profile, ads, Tripadvisor, social bios, email signatures. Each one currently costs a redirect.
