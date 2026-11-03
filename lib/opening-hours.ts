// Office opening hours and the "Open today / By appointment" text in the header.
//
// The rules (is it open, which day is next) are always worked out in UK time
// (Europe/London, so GMT in winter and BST in summer). The times shown are
// converted to the visitor's own timezone when it differs from the UK's.
//
// The hours themselves are edited in Sanity (Settings > Opening hours) and
// loaded by lib/opening-hours-sanity.ts. OPENING_HOURS below is the fallback
// while that field is empty or filled in wrongly.
// Tests: lib/opening-hours.test.ts (pnpm test:unit).

export const UK_TIMEZONE = "Europe/London";

export const WEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as const;
export type Weekday = (typeof WEEKDAYS)[number];

// open/close are "HH:MM" UK time. byAppointment days show "By appointment
// only" during those hours. null = closed all day.
export type DayHours = { open: string; close: string; byAppointment?: boolean } | null;
export type WeeklyHours = Record<Weekday, DayHours>;

// Built-in hours, used until Settings > Opening hours is filled in in Sanity.
export const OPENING_HOURS: WeeklyHours = {
	Monday: { open: "08:30", close: "17:00" },
	Tuesday: { open: "08:30", close: "17:00" },
	Wednesday: { open: "08:30", close: "17:00" },
	Thursday: { open: "08:30", close: "17:00" },
	Friday: { open: "08:30", close: "17:00" },
	Saturday: { open: "08:30", close: "17:00", byAppointment: true },
	Sunday: { open: "08:30", close: "17:00", byAppointment: true },
};

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DAY_MS = 86_400_000;

// Problems with an hours list (empty = fine). Bad hours make the header show
// nothing rather than something wrong.
export function validateHours(hours: WeeklyHours): string[] {
	const problems: string[] = [];
	for (const name of WEEKDAYS) {
		if (!(name in hours) || hours[name] === undefined) {
			problems.push(`${name}: missing`);
			continue;
		}
		const day = hours[name];
		if (!day) continue;
		if (!TIME.test(day.open)) problems.push(`${name}: bad opening time "${day.open}"`);
		if (!TIME.test(day.close)) problems.push(`${name}: bad closing time "${day.close}"`);
		if (TIME.test(day.open) && TIME.test(day.close) && toMinutes(day.open) >= toMinutes(day.close)) {
			problems.push(`${name}: closes at or before it opens`);
		}
	}
	return problems;
}

// One day as stored in Sanity (Settings > Opening hours).
export type SanityOpeningDay = {
	status?: "open" | "appointment" | "closed";
	open?: string;
	close?: string;
} | null;
export type SanityOpeningHours = Partial<Record<Lowercase<Weekday>, SanityOpeningDay>> | null | undefined;

// Sanity's opening hours as a WeeklyHours list. null when the field is empty
// or any day is missing or wrong, so the caller can fall back to the built-in
// hours as a whole rather than show a mix.
export function hoursFromSanity(doc: SanityOpeningHours): WeeklyHours | null {
	if (!doc) return null;
	const hours = {} as WeeklyHours;
	for (const name of WEEKDAYS) {
		const day = doc[name.toLowerCase() as Lowercase<Weekday>];
		if (!day?.status) return null;
		if (day.status === "closed") {
			hours[name] = null;
			continue;
		}
		const open = day.open?.trim() ?? "";
		const close = day.close?.trim() ?? "";
		hours[name] = day.status === "appointment" ? { open, close, byAppointment: true } : { open, close };
	}
	return validateHours(hours).length ? null : hours;
}

// Google's openingHoursSpecification (LocalBusiness structured data): days with
// set hours, grouped by time. By-appointment days are left out.
export function openingHoursJsonLd(hours: WeeklyHours) {
	const groups = new Map<string, Weekday[]>();
	for (const name of WEEKDAYS) {
		const day = hours[name];
		if (!day || day.byAppointment) continue;
		const key = `${day.open}-${day.close}`;
		groups.set(key, [...(groups.get(key) ?? []), name]);
	}
	return Array.from(groups, ([key, dayOfWeek]) => {
		const [opens, closes] = key.split("-");
		return { "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes };
	});
}

const formatters = new Map<string, Intl.DateTimeFormat>();
function formatterFor(timeZone: string) {
	let formatter = formatters.get(timeZone);
	if (!formatter) {
		formatter = new Intl.DateTimeFormat("en-GB", {
			timeZone,
			weekday: "long",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hourCycle: "h23",
		});
		formatters.set(timeZone, formatter);
	}
	return formatter;
}

export function isValidTimeZone(timeZone: string | undefined): timeZone is string {
	if (!timeZone) return false;
	try {
		formatterFor(timeZone);
		return true;
	} catch {
		return false;
	}
}

// Wall-clock parts of an instant in a timezone.
function partsIn(instant: number, timeZone: string) {
	const p = Object.fromEntries(
		formatterFor(timeZone)
			.formatToParts(instant)
			.map((part) => [part.type, part.value]),
	);
	return {
		weekday: p.weekday as Weekday,
		year: Number(p.year),
		month: Number(p.month),
		day: Number(p.day),
		hour: Number(p.hour),
		minute: Number(p.minute),
		second: Number(p.second),
	};
}

// Minutes the timezone is ahead of UTC at that instant (BST = 60, New York winter = -300).
function offsetMinutes(instant: number, timeZone: string) {
	const p = partsIn(instant, timeZone);
	const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
	return Math.round((asUtc - Math.floor(instant / 1000) * 1000) / 60_000);
}

// Days since 1970 for the instant's calendar date in that timezone.
function dayNumber(instant: number, timeZone: string) {
	const p = partsIn(instant, timeZone);
	return Date.UTC(p.year, p.month - 1, p.day) / DAY_MS;
}

// The instant a UK wall-clock time happens. `ukDay` is days since 1970 (UK calendar).
function ukInstant(ukDay: number, time: string) {
	const wall = ukDay * DAY_MS + toMinutes(time) * 60_000;
	let instant = wall - offsetMinutes(wall, UK_TIMEZONE) * 60_000;
	// Second pass in case the first guess was on the other side of a clock change.
	instant = wall - offsetMinutes(instant, UK_TIMEZONE) * 60_000;
	return instant;
}

// Day of the week and minutes since midnight, in UK time.
export function ukNow(now: Date) {
	const p = partsIn(now.getTime(), UK_TIMEZONE);
	return { dayIndex: WEEKDAYS.indexOf(p.weekday), minutes: p.hour * 60 + p.minute };
}

const toMinutes = (time: string) => {
	const [hour, minute] = time.split(":").map(Number);
	return hour * 60 + minute;
};

// "08:30" -> "8:30am" (or "8:30" without the period), "17:00" -> "5:00pm".
export function formatTime(time: string, showPeriod = true) {
	const [hour, minute] = time.split(":").map(Number);
	const period = hour >= 12 ? "pm" : "am";
	return `${hour % 12 || 12}:${String(minute).padStart(2, "0")}${showPeriod ? period : ""}`;
}

type Options = {
	hours?: WeeklyHours;
	// Only applies to UK times. Converted times always show am/pm.
	showPeriod?: boolean;
	// The visitor's IANA timezone, e.g. "America/New_York". Omitted, empty or
	// invalid = UK times as they are.
	visitorTimeZone?: string;
};

// The header text, or null if it can't be worked out (bad date or bad hours).
export function getOpeningStatus(
	now: Date,
	{ hours = OPENING_HOURS, showPeriod = true, visitorTimeZone }: Options = {},
): string | null {
	const nowMs = now.getTime();
	if (Number.isNaN(nowMs) || validateHours(hours).length > 0) return null;

	const { dayIndex, minutes } = ukNow(now);
	if (dayIndex < 0) return null;
	const ukToday = dayNumber(nowMs, UK_TIMEZONE);

	// Which day to talk about: today until closing time, else the next open day.
	let offset = -1;
	for (let i = 0; i <= 7; i++) {
		const day = hours[WEEKDAYS[(dayIndex + i) % 7]];
		if (!day) continue;
		if (i === 0 && minutes >= toMinutes(day.close)) continue;
		offset = i;
		break;
	}
	if (offset < 0) return "Sorry, we are closed";

	const name = WEEKDAYS[(dayIndex + offset) % 7];
	const day = hours[name] as NonNullable<DayHours>;
	const openAt = ukInstant(ukToday + offset, day.open);
	const closeAt = ukInstant(ukToday + offset, day.close);

	const ukText = () => {
		const range = `${formatTime(day.open, showPeriod)} - ${formatTime(day.close, showPeriod)}`;
		if (offset === 0) return day.byAppointment ? "By appointment only today" : `Open today ${range}`;
		const when = offset === 1 ? "tomorrow" : `on ${name}`;
		return day.byAppointment ? `Open ${when} by appointment` : `Open ${when} ${range}`;
	};

	if (!isValidTimeZone(visitorTimeZone)) return ukText();

	const tz = visitorTimeZone;
	const sameAsUk = [nowMs, openAt, closeAt].every(
		(t) => offsetMinutes(t, tz) === offsetMinutes(t, UK_TIMEZONE),
	);
	if (sameAsUk) return ukText();

	// Converted to the visitor's clock and calendar.
	const today = dayNumber(nowMs, tz);
	const local = (t: number) => {
		const p = partsIn(t, tz);
		return formatTime(`${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}`);
	};
	const dayWord = (t: number) => {
		const diff = dayNumber(t, tz) - today;
		if (diff === 0) return "today";
		if (diff === 1) return "tomorrow";
		return `on ${partsIn(t, tz).weekday}`;
	};

	if (nowMs >= openAt) {
		return day.byAppointment
			? `By appointment only until ${local(closeAt)}`
			: `Open now until ${local(closeAt)}`;
	}
	if (day.byAppointment) return `Open ${dayWord(openAt)} by appointment`;
	return `Open ${dayWord(openAt)} ${local(openAt)} - ${local(closeAt)}`;
}
