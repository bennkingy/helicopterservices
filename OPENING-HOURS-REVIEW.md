# Opening hours review: the Saturday-night bug and visitors outside the UK

Covers `lib/opening-hours.ts`, `app/components/OpenClosed.tsx` and their tests.
Nothing has been changed yet. The cases below were checked against the new code
with a throwaway test.

---

## 1. Saturday-night bug: fixed locally, not live

- The deployed `OpenClosed.tsx` is the old dayjs version. It uses the visitor's own clock and checks "by appointment" before the time, so it says "By appointment only today" at 22:36 on Saturday.
- The new `lib/opening-hours.ts` is staged but **not committed**.
- `__tests__/OpenClosed.test.tsx` is **untracked**, so CI and the nightly run never run it.

**Fix:** commit the new files (including the component test), then deploy.

---

## 2. Visitors outside the UK see UK times with no label

The times shown are UK times, but nothing says so. "Today" and "tomorrow" also mean the UK's day, not the visitor's.

| Visitor | Their local time | What they see | Problem |
|---|---|---|---|
| New York | Mon 20:00 (Tue 01:00 UK) | "Open today 8:30 - 5:00" | Their "today" is Monday evening, so they'll read it as wrong, or as their local hours |
| Auckland | Sun 11:36 (Sat 22:36 UK) | "Open tomorrow by appointment" | "Tomorrow" means *their* today |

### Fix (chosen): convert to the visitor's local time

**Rules stay in UK time.** Whether the office is open, and which day comes next, is still decided in UK time. Only the *displayed* times and day words change.

**How the conversion works**
1. Work out the real moment the office opens and closes, e.g. "Monday 08:30 UK". This uses the UK offset for that date, so BST/GMT is handled.
2. Format those moments in the visitor's timezone (`Intl.DateTimeFormat().resolvedOptions().timeZone`).
3. Pick "today" / "tomorrow" / a day name using the **visitor's** calendar, not the UK's.
4. If the visitor is on the same offset as the UK at that moment, the text is unchanged from today's.

**What visitors see** (output of the built code)

| Visitor | UK time | Text |
|---|---|---|
| UK | Mon 12:00 | Open today 8:30 - 5:00 (unchanged) |
| New York | Mon 07:00 (02:00 NY) | Open today 3:30am - 12:00pm your time |
| New York | Mon 12:00 (office open) | Open now until 12:00pm your time |
| New York | Tue 01:00 (Mon 20:00 NY) | Open tomorrow 3:30am - 12:00pm your time |
| New York, 16 Mar (US clocks changed, UK not yet) | Mon 07:00 | Open today 4:30am - 1:00pm your time |
| Kolkata | Mon 07:00 | Open today 2:00pm - 10:30pm your time |
| Kathmandu | Mon 07:00 | Open today 2:15pm - 10:45pm your time |
| Auckland | Mon 08:00 (21:00 NZ) | Open today 9:30pm - 6:00am tomorrow your time |
| Auckland | Mon 12:00 (Tue 01:00 NZ) | Open now until 6:00am your time |
| Auckland | Sat 22:36 (Sun 11:36 NZ) | Open today by appointment |
| New York | Sat 12:00 (appointments on) | By appointment only until 1:00pm your time |
| Abidjan, winter (same offset as UK) | Mon 07:00 | Open today 8:30 - 5:00 (unchanged) |
| Timezone unreadable or invalid | Mon 12:00 | Open today 8:30 - 5:00 (UK time) |

Note: in converted mode, while the office is open the text says "Open now until …", because the opening time may have been on the visitor's yesterday.

**Details (as built)**
- **Always show am/pm once converted.** "3:30 - 12:00" is ambiguous. The header's `showPeriod={false}` would only apply to UK visitors.
- **"Your time"** is added when converted, so a visitor who happens to know the UK hours isn't confused. The UK times could also go in a tooltip (`title`), e.g. "8:30am - 5:00pm UK time".
- **Overnight ranges:** where closing falls on the visitor's next day, the text says "tomorrow" or names the day, as in the Auckland row.
- **By-appointment days:** no times are shown, but the day word follows the visitor's calendar. For a UK Sunday, someone in Auckland sees the day their Sunday 08:30 UK falls on.
- **Header width:** the converted text is longer, and the header column is narrow (11.5px text, `lg` and up only). **Still to check by eye** in Storybook or the browser at `lg` (not done yet).
- **Fallback:** if the device's timezone is empty or invalid, the UK text is shown with "(UK time)" added. If a caller doesn't pass a timezone at all (e.g. other code using the function), it gets the plain UK text.
- **UK and US clocks change on different dates.** In 2026 the US changes on 8 Mar and 1 Nov, the UK on 29 Mar and 25 Oct, so for a few weeks New York is 4 hours behind instead of 5. The conversion handles this automatically. It's listed because it needs tests.

---

## 3. Negative cases that fail today

| Input | Result now | Should be |
|---|---|---|
| `new Date("invalid")` | **Throws** "Invalid time value". Thrown inside the effect, this takes down the header | Return `null`; the component shows nothing |
| Hours where open = close | Silently skipped, says "Open tomorrow…" | Rejected by `validateHours()` |
| Hours where close is before open | Silently skipped, says "Open tomorrow…" | Rejected by `validateHours()` |
| Malformed time, e.g. `"8.30"` or `"5pm"` | Silently skipped | Rejected by `validateHours()` |
| A day missing from the hours list | Silently skipped | Rejected by `validateHours()` |
| Bad data on the *next* day | Would print "NaN:NaNam" | Caught by the same check |
| UK weekday can't be read (`dayIndex` = -1) | Silently looks at the wrong day | Guard it and return `null` |

`validateHours()` is new. It would be tested against `OPENING_HOURS`, so a typo in the hours fails the tests instead of quietly showing the wrong text.

---

## 4. Smaller component fixes

- **Timer drift:** the once-a-minute timer isn't lined up with the clock, so the text can switch up to 59s after 17:00. Run the first refresh at the next whole minute, then every minute.
- **Background tabs:** browsers slow timers in background tabs, so also refresh when the tab becomes visible again (`visibilitychange`).

---

## Tests to add

### Rules (`lib/opening-hours.test.ts`)

**Week sweep (GMT week and BST week).** Check every 15 minutes across a full week that:
- it never says "today" after closing time
- Monday to Friday never say "appointment"
- Saturday and Sunday never show weekday hours
- the text is never empty and never contains "NaN"

**Negative tests**
- an invalid date returns `null`
- `validateHours` rejects `"8.30"`, `"25:00"`, `"17:60"`, open = close, close before open, and a missing day
- `OPENING_HOURS` passes `validateHours`

**Edge times**
- Sunday 23:59, then Monday 00:00
- exactly 08:30
- 16:59:59, then 17:00:00
- Saturday 17:00 exactly

**Local-time conversion**
- UK visitor (GMT and BST): text identical to now
- New York, winter, Mon 12:00 UK: "Open today 3:30am - 12:00pm your time"
- New York in the clock-change gap (e.g. 15 Mar 2026, 4 hours behind): times are 4 hours earlier, not 5
- Kolkata (+5:30): "2:00pm - 10:30pm", so half-hour offsets work
- Kathmandu (+5:45): quarter-hour offsets work ("2:15pm")
- Auckland: overnight range says "6:00am tomorrow"
- New York, Mon 20:00 local (Tue 01:00 UK): says "Open tomorrow 3:30am - 12:00pm your time", not "Open today", because Tuesday's opening is tomorrow on the visitor's calendar
- Auckland, Sun 11:36 local (Sat 22:36 UK): the appointment day is named by the visitor's calendar
- a visitor on the same offset as the UK (e.g. `Africa/Abidjan` in winter): no conversion, no "your time"

**Local-time negative tests**
- an invalid visitor timezone (`"Mars/Base"`) falls back to UK text plus "UK time", with no crash
- a missing visitor timezone (`undefined`) falls back the same way
- across the week sweep, in every zone tested: never "NaN", the converted closing time is always after the opening time, and "today" only appears when the opening (or the current open period) is on the visitor's local date
- converted times never drop am/pm, even with `showPeriod={false}`

### Component (`__tests__/OpenClosed.test.tsx`)

- an invalid clock renders empty without crashing
- the text switches at exactly 17:00:00, not up to 59s late
- the text refreshes when the tab becomes visible again
- with the device in New York, the rendered text shows the converted time and "your time"
- with the device in London, the rendered text is unchanged
- keep the existing test that the timer is removed on unmount
- drop the BST tests repeated from the rules file (they're covered in `lib/opening-hours.test.ts`)

---

## Status

Done: sections 1 to 4 and the tests, using local-time conversion (section 2).
- `lib/opening-hours.test.ts`: 72 tests, including whole-week sweeps in 7 timezones across GMT, BST and the March US/UK mismatch
- `__tests__/OpenClosed.test.tsx`: 10 tests
- Checked by deliberately breaking the code: each of an off-by-one closing time, removed validation, UK-calendar day words and an unaligned timer makes tests fail
- Still to do: check the longer text in the header at `lg` width, then push and deploy
