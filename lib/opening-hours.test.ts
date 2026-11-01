import {
	OPENING_HOURS,
	type WeeklyHours,
	formatTime,
	getOpeningStatus,
	ukNow,
	validateHours,
} from "./opening-hours";
import * as allure from "allure-js-commons";

// Groups these tests in the Allure report (pnpm test:report).
beforeEach(async () => {
	await allure.epic("Opening hours");
	await allure.feature("Opening-hours rules");
});


// All instants are given in UTC ("Z") so the tests mean the same thing on any
// machine. 2026 clocks: BST from Sun 29 Mar 01:00 UTC to Sun 25 Oct 01:00 UTC.
const at = (iso: string) => new Date(iso);
const WEEKDAY_HOURS = "8:30am - 5:00pm";

describe("getOpeningStatus: winter (GMT, UK time = UTC)", () => {
	it("Saturday 22:36: points to tomorrow, not 'today' (the reported case)", () => {
		expect(getOpeningStatus(at("2026-10-31T22:36:00Z"))).toBe("Open tomorrow by appointment");
	});

	it("Saturday midday: by appointment only today", () => {
		expect(getOpeningStatus(at("2026-10-31T12:00:00Z"))).toBe("By appointment only today");
	});

	it("Monday before opening shows today's hours", () => {
		expect(getOpeningStatus(at("2026-11-02T07:00:00Z"))).toBe(`Open today ${WEEKDAY_HOURS}`);
	});

	it("Monday during opening hours", () => {
		expect(getOpeningStatus(at("2026-11-02T12:00:00Z"))).toBe(`Open today ${WEEKDAY_HOURS}`);
	});

	it("16:59 is still open, 17:00 is closed", () => {
		expect(getOpeningStatus(at("2026-11-02T16:59:00Z"))).toBe(`Open today ${WEEKDAY_HOURS}`);
		expect(getOpeningStatus(at("2026-11-02T17:00:00Z"))).toBe(`Open tomorrow ${WEEKDAY_HOURS}`);
	});

	it("Friday evening: weekend is by appointment", () => {
		expect(getOpeningStatus(at("2026-11-06T17:30:00Z"))).toBe("Open tomorrow by appointment");
	});

	it("Sunday evening: back to normal hours on Monday", () => {
		expect(getOpeningStatus(at("2026-11-01T18:00:00Z"))).toBe(`Open tomorrow ${WEEKDAY_HOURS}`);
	});

	it("just after midnight Monday", () => {
		expect(getOpeningStatus(at("2026-11-02T00:01:00Z"))).toBe(`Open today ${WEEKDAY_HOURS}`);
	});
});

describe("getOpeningStatus: summer (BST, UK time = UTC + 1)", () => {
	it("16:30 UTC is 17:30 in the UK, so closed (UTC would wrongly say open)", () => {
		expect(getOpeningStatus(at("2026-07-06T16:30:00Z"))).toBe(`Open tomorrow ${WEEKDAY_HOURS}`);
	});

	it("07:45 UTC is 08:45 in the UK, so open", () => {
		expect(getOpeningStatus(at("2026-07-06T07:45:00Z"))).toBe(`Open today ${WEEKDAY_HOURS}`);
	});

	it("Friday 23:30 UTC is already Saturday 00:30 in the UK", () => {
		expect(ukNow(at("2026-07-03T23:30:00Z"))).toEqual({ dayIndex: 5, minutes: 30 });
		expect(getOpeningStatus(at("2026-07-03T23:30:00Z"))).toBe("By appointment only today");
	});
});

describe("getOpeningStatus: clock-change days", () => {
	it("spring forward (Sun 29 Mar): 16:30 UTC is 17:30 BST, closed", () => {
		expect(getOpeningStatus(at("2026-03-29T16:30:00Z"))).toBe(`Open tomorrow ${WEEKDAY_HOURS}`);
	});

	it("spring forward: 15:30 UTC is 16:30 BST, still by appointment today", () => {
		expect(getOpeningStatus(at("2026-03-29T15:30:00Z"))).toBe("By appointment only today");
	});

	it("fall back (Sun 25 Oct): both 01:30s are Sunday in the UK", () => {
		expect(ukNow(at("2026-10-25T00:30:00Z"))).toEqual({ dayIndex: 6, minutes: 90 }); // 01:30 BST
		expect(ukNow(at("2026-10-25T01:30:00Z"))).toEqual({ dayIndex: 6, minutes: 90 }); // 01:30 GMT
	});
});

describe("getOpeningStatus: visitor's timezone doesn't matter", () => {
	const original = process.env.TZ;
	afterEach(() => {
		process.env.TZ = original;
	});

	for (const tz of ["America/New_York", "Pacific/Auckland", "Asia/Kolkata", "UTC"]) {
		it(`gives UK answers when the device is in ${tz}`, () => {
			process.env.TZ = tz;
			expect(getOpeningStatus(at("2026-10-31T22:36:00Z"))).toBe("Open tomorrow by appointment");
			expect(getOpeningStatus(at("2026-07-06T16:30:00Z"))).toBe(`Open tomorrow ${WEEKDAY_HOURS}`);
			expect(getOpeningStatus(at("2026-11-02T12:00:00Z"))).toBe(`Open today ${WEEKDAY_HOURS}`);
		});
	}
});

describe("getOpeningStatus: options and other hours", () => {
	it("showPeriod: false drops am/pm (used in the header)", () => {
		expect(getOpeningStatus(at("2026-11-02T12:00:00Z"), { showPeriod: false })).toBe(
			"Open today 8:30 - 5:00",
		);
	});

	it("skips closed days and names the day", () => {
		const hours: WeeklyHours = { ...OPENING_HOURS, Saturday: null, Sunday: null };
		expect(getOpeningStatus(at("2026-11-06T18:00:00Z"), { hours })).toBe(
			`Open on Monday ${WEEKDAY_HOURS}`,
		);
	});

	it("closed every day", () => {
		const hours = Object.fromEntries(
			Object.keys(OPENING_HOURS).map((day) => [day, null]),
		) as WeeklyHours;
		expect(getOpeningStatus(at("2026-11-02T12:00:00Z"), { hours })).toBe("Sorry, we are closed");
	});
});

describe("formatTime", () => {
	it.each([
		["08:30", "8:30am"],
		["08:05", "8:05am"], // the old version printed "8:5am"
		["12:00", "12:00pm"],
		["00:15", "12:15am"],
		["17:00", "5:00pm"],
	])("%s -> %s", (input, expected) => {
		expect(formatTime(input)).toBe(expected);
	});

	it("without the period", () => {
		expect(formatTime("17:00", false)).toBe("5:00");
	});
});

describe("getOpeningStatus: exact edge times (UK, winter)", () => {
	it.each([
		["Sunday 23:59 -> Monday's hours tomorrow", "2026-11-01T23:59:00Z", `Open tomorrow ${WEEKDAY_HOURS}`],
		["Monday 00:00 -> today", "2026-11-02T00:00:00Z", `Open today ${WEEKDAY_HOURS}`],
		["Monday 08:30 exactly", "2026-11-02T08:30:00Z", `Open today ${WEEKDAY_HOURS}`],
		["Monday 16:59:59 still today", "2026-11-02T16:59:59Z", `Open today ${WEEKDAY_HOURS}`],
		["Monday 17:00:00 moves on", "2026-11-02T17:00:00Z", `Open tomorrow ${WEEKDAY_HOURS}`],
		["Saturday 16:59 still by appointment", "2026-10-31T16:59:00Z", "By appointment only today"],
		["Saturday 17:00 exactly moves to Sunday", "2026-10-31T17:00:00Z", "Open tomorrow by appointment"],
	])("%s", (_label, iso, expected) => {
		expect(getOpeningStatus(at(iso))).toBe(expected);
	});
});

// Every 15 minutes across a whole week, checked against the rules worked out
// separately here, so no time of day slips through.
describe("getOpeningStatus: whole-week sweep (UK visitor)", () => {
	const weeks = [
		["GMT week", "2026-11-02T00:00:00Z"], // Monday 00:00 UK
		["BST week", "2026-07-05T23:00:00Z"], // Monday 00:00 UK
	] as const;

	for (const [label, start] of weeks) {
		it(`${label}: every 15 minutes gives the right kind of text`, () => {
			for (let step = 0; step < 7 * 24 * 4; step++) {
				const now = new Date(Date.parse(start) + step * 15 * 60_000);
				const { dayIndex, minutes } = ukNow(now);
				const text = getOpeningStatus(now) ?? "";
				const where = `${now.toISOString()} -> "${text}"`;
				const beforeClose = minutes < 17 * 60;
				const weekday = dayIndex <= 4;

				expect(text, where).not.toBe("");
				expect(text, where).not.toMatch(/NaN|undefined/);
				if (weekday && beforeClose) expect(text, where).toBe(`Open today ${WEEKDAY_HOURS}`);
				if (!weekday && beforeClose) expect(text, where).toBe("By appointment only today");
				if (!beforeClose) expect(text, where).not.toMatch(/today/);
				if (!beforeClose && (dayIndex <= 3 || dayIndex === 6)) {
					expect(text, where).toBe(`Open tomorrow ${WEEKDAY_HOURS}`);
				}
				if (!beforeClose && (dayIndex === 4 || dayIndex === 5)) {
					expect(text, where).toBe("Open tomorrow by appointment");
				}
			}
		});
	}
});

describe("getOpeningStatus: bad input shows nothing rather than something wrong", () => {
	const noon = at("2026-11-02T12:00:00Z");

	it("an invalid date returns null (and doesn't throw)", () => {
		expect(getOpeningStatus(new Date("not a date"))).toBeNull();
		expect(
			getOpeningStatus(new Date(Number.NaN), { visitorTimeZone: "America/New_York" }),
		).toBeNull();
	});

	it.each([
		["opening time with a dot", { Monday: { open: "8.30", close: "17:00" } }],
		["closing time as text", { Monday: { open: "08:30", close: "5pm" } }],
		["hour 25", { Monday: { open: "08:30", close: "25:00" } }],
		["minute 60", { Monday: { open: "08:30", close: "17:60" } }],
		["opens and closes at the same time", { Monday: { open: "09:00", close: "09:00" } }],
		["closes before it opens", { Monday: { open: "17:00", close: "08:30" } }],
		["bad data on another day", { Wednesday: { open: "", close: "17:00" } }],
		["a day missing", { Monday: undefined }],
	])("bad hours (%s) return null", (_label, change) => {
		const hours = { ...OPENING_HOURS, ...change } as WeeklyHours;
		expect(validateHours(hours).length).toBeGreaterThan(0);
		expect(getOpeningStatus(noon, { hours })).toBeNull();
	});
});

describe("validateHours", () => {
	it("the real opening hours are valid", () => {
		expect(validateHours(OPENING_HOURS)).toEqual([]);
	});

	it("allows closed days (null)", () => {
		expect(validateHours({ ...OPENING_HOURS, Sunday: null })).toEqual([]);
	});

	it("names the day and the problem", () => {
		const hours = { ...OPENING_HOURS, Tuesday: { open: "17:00", close: "08:30" } };
		expect(validateHours(hours)).toEqual(["Tuesday: closes at or before it opens"]);
	});

	it("reports a missing day", () => {
		const { Friday: _friday, ...rest } = OPENING_HOURS;
		expect(validateHours(rest as WeeklyHours)).toEqual(["Friday: missing"]);
	});
});

// Times are converted to the visitor's own clock and calendar; the rules
// (open or not, which day is next) are still UK time.
describe("getOpeningStatus: converted to the visitor's local time", () => {
	const status = (iso: string, visitorTimeZone: string, showPeriod = false) =>
		getOpeningStatus(at(iso), { visitorTimeZone, showPeriod });

	it("UK visitor: unchanged, in GMT and BST", () => {
		expect(status("2026-11-02T12:00:00Z", "Europe/London")).toBe("Open today 8:30 - 5:00");
		expect(status("2026-07-06T12:00:00Z", "Europe/London")).toBe("Open today 8:30 - 5:00");
	});

	it("New York before the UK opens: today's hours in New York time", () => {
		// Mon 07:00 UK = Mon 02:00 New York.
		expect(status("2026-11-02T07:00:00Z", "America/New_York")).toBe(
			"Open today 3:30am - 12:00pm",
		);
	});

	it("New York while the UK office is open: open now, until when", () => {
		expect(status("2026-11-02T12:00:00Z", "America/New_York")).toBe(
			"Open now until 12:00pm",
		);
	});

	it("New York Monday 20:00 (Tue 01:00 UK): Tuesday is 'tomorrow', not 'today'", () => {
		expect(status("2026-11-03T01:00:00Z", "America/New_York")).toBe(
			"Open tomorrow 3:30am - 12:00pm",
		);
	});

	it("New York in March, after the US clock change but before the UK's: 4 hours behind, not 5", () => {
		// 2026: US clocks change 8 Mar, UK 29 Mar.
		expect(status("2026-03-16T07:00:00Z", "America/New_York")).toBe(
			"Open today 4:30am - 1:00pm",
		);
	});

	it("India (+5:30): half-hour offsets", () => {
		expect(status("2026-11-02T07:00:00Z", "Asia/Kolkata")).toBe(
			"Open today 2:00pm - 10:30pm",
		);
	});

	it("Nepal (+5:45): quarter-hour offsets", () => {
		expect(status("2026-11-02T07:00:00Z", "Asia/Kathmandu")).toBe(
			"Open today 2:15pm - 10:45pm",
		);
	});

	it("Auckland: hours that run past the visitor's midnight (no extra day word)", () => {
		// Mon 08:00 UK = Mon 21:00 Auckland.
		expect(status("2026-11-02T08:00:00Z", "Pacific/Auckland")).toBe(
			"Open today 9:30pm - 6:00am",
		);
		// Mon 12:00 UK = Tue 01:00 Auckland; it opened "yesterday" for them.
		expect(status("2026-11-02T12:00:00Z", "Pacific/Auckland")).toBe(
			"Open now until 6:00am",
		);
	});

	it("Saturday night UK (Sun 11:36 Auckland): Sunday's appointments are 'today' for them", () => {
		expect(status("2026-10-31T22:36:00Z", "Pacific/Auckland")).toBe("Open today by appointment");
		expect(status("2026-10-31T22:36:00Z", "America/New_York")).toBe(
			"Open tomorrow by appointment",
		);
	});

	it("by-appointment day while it's on: until when, in their time", () => {
		expect(status("2026-10-31T12:00:00Z", "America/New_York")).toBe(
			"By appointment only until 1:00pm",
		);
	});

	it("same offset as the UK right now (Abidjan in winter): not converted", () => {
		expect(status("2026-11-02T07:00:00Z", "Africa/Abidjan")).toBe("Open today 8:30 - 5:00");
	});

	it("same zone, different offset in summer (Abidjan during BST): converted", () => {
		expect(status("2026-07-06T07:00:00Z", "Africa/Abidjan")).toBe(
			"Open today 7:30am - 4:00pm",
		);
	});

	it("converted times always show am/pm, even with showPeriod off", () => {
		expect(status("2026-11-02T07:00:00Z", "America/New_York", false)).toMatch(/am .*pm/);
	});
});

describe("getOpeningStatus: visitor timezone that can't be used", () => {
	it.each(["Mars/Base", "", "not a zone"])(
		"%j falls back to the plain UK text",
		(visitorTimeZone) => {
			expect(
				getOpeningStatus(at("2026-11-02T12:00:00Z"), { visitorTimeZone, showPeriod: false }),
			).toBe("Open today 8:30 - 5:00");
		},
	);
});

describe("getOpeningStatus: whole-week sweep in other timezones", () => {
	const zones = [
		"America/New_York",
		"America/Los_Angeles",
		"Pacific/Honolulu",
		"Asia/Kolkata",
		"Asia/Kathmandu",
		"Asia/Tokyo",
		"Pacific/Auckland",
	];
	// GMT week, BST week, and the March weeks when US and UK clocks disagree.
	const weeks = ["2026-11-02T00:00:00Z", "2026-07-05T23:00:00Z", "2026-03-16T00:00:00Z"];
	const toMins = (h: string, m: string, p: string) =>
		((Number(h) % 12) + (p === "pm" ? 12 : 0)) * 60 + Number(m);

	for (const visitorTimeZone of zones) {
		it(`${visitorTimeZone}: every 15 minutes agrees with the UK rules`, () => {
			for (const start of weeks) {
				for (let step = 0; step < 7 * 24 * 4; step++) {
					const now = new Date(Date.parse(start) + step * 15 * 60_000);
					const { dayIndex, minutes } = ukNow(now);
					const text = getOpeningStatus(now, { visitorTimeZone, showPeriod: false }) ?? "";
					const where = `${visitorTimeZone} ${now.toISOString()} -> "${text}"`;
					const inHours = minutes >= 8 * 60 + 30 && minutes < 17 * 60;

					expect(text, where).not.toBe("");
					expect(text, where).not.toMatch(/NaN|undefined|your time|UK time|tomorrow$/);
					// Every converted time has am/pm.
					expect(text, where).not.toMatch(/\d:\d\d(?!am|pm)/);
					// "Open now" only while the UK office is open, and always then.
					expect(text.startsWith("Open now"), where).toBe(inHours && dayIndex <= 4);
					expect(text.startsWith("By appointment only until"), where).toBe(
						inHours && dayIndex >= 5,
					);
					// A range is always 8.5 hours long (overnight ranges wrap past midnight).
					const range = text.match(/(\d+):(\d\d)(am|pm) - (\d+):(\d\d)(am|pm)$/);
					if (range) {
						const length =
							(toMins(range[4], range[5], range[6]) - toMins(range[1], range[2], range[3]) + 1440) %
							1440;
						expect(length, where).toBe(8.5 * 60);
					}
				}
			}
		});
	}
});
