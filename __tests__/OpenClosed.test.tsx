import { act, render } from "@testing-library/react";
import OpenClosed from "@/app/components/OpenClosed";
import * as allure from "allure-js-commons";

// Groups these tests in the Allure report (pnpm test:report).
beforeEach(async () => {
	await allure.epic("Opening hours");
	await allure.feature('Header "Open today" text');
});

// The "Open today / By appointment" text in the site header
// (app/components/OpenClosed.tsx). The day-by-day rules and the timezone
// conversion are tested in lib/opening-hours.test.ts; these tests check the
// component itself: it uses the visitor's timezone, keeps itself up to date,
// never crashes the header, and tidies up after itself.
//
// Fake timers also fake the clock, so "now" is whatever each test sets.
// Times are written in UTC ("Z"). 2026: BST from 29 Mar to 25 Oct.

const text = () => document.querySelector("p")?.textContent?.trim();

// Pretend the visitor's device is in this timezone.
const visitorIn = (timeZone: string | undefined) => {
	const real = Intl.DateTimeFormat.prototype.resolvedOptions;
	vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockImplementation(function (
		this: Intl.DateTimeFormat,
	) {
		return { ...real.call(this), timeZone } as Intl.ResolvedDateTimeFormatOptions;
	});
};

afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe("OpenClosed (header opening status)", () => {
	it("UK visitor: header style, no am/pm", () => {
		visitorIn("Europe/London");
		vi.useFakeTimers({ now: new Date("2026-11-02T10:00:00Z") }); // Monday 10:00 UK
		render(<OpenClosed showPeriod={false} />);
		expect(text()).toBe("Open today 8:30 - 5:00");
	});

	it("UK visitor: shows am/pm when asked", () => {
		visitorIn("Europe/London");
		vi.useFakeTimers({ now: new Date("2026-11-02T10:00:00Z") });
		render(<OpenClosed />);
		expect(text()).toBe("Open today 8:30am - 5:00pm");
	});

	it("Saturday night points to tomorrow (the bug that was reported)", () => {
		visitorIn("Europe/London");
		vi.useFakeTimers({ now: new Date("2026-10-31T22:36:00Z") }); // Saturday 22:36 UK
		render(<OpenClosed showPeriod={false} />);
		expect(text()).toBe("Open tomorrow by appointment");
	});

	it("visitor in New York sees New York times", () => {
		visitorIn("America/New_York");
		vi.useFakeTimers({ now: new Date("2026-11-02T07:00:00Z") }); // Mon 02:00 New York
		render(<OpenClosed showPeriod={false} />);
		expect(text()).toBe("Open today 3:30am - 12:00pm your time");
	});

	it("unreadable device timezone: UK times, labelled UK time", () => {
		visitorIn(undefined);
		vi.useFakeTimers({ now: new Date("2026-11-02T10:00:00Z") });
		render(<OpenClosed showPeriod={false} />);
		expect(text()).toBe("Open today 8:30 - 5:00 (UK time)");
	});

	it("broken clock: shows nothing and doesn't crash the header", () => {
		visitorIn("Europe/London");
		// Every `new Date()` / `Date.now()` gives an invalid time.
		const RealDate = Date;
		vi.stubGlobal(
			"Date",
			class extends RealDate {
				constructor(...args: [] | [number]) {
					super(args.length ? args[0] : Number.NaN);
				}
				static now() {
					return Number.NaN;
				}
			},
		);
		expect(() => render(<OpenClosed />)).not.toThrow();
		expect(text()).toBe("");
	});

	it("switches at exactly 17:00, not up to a minute late", () => {
		visitorIn("Europe/London");
		vi.useFakeTimers({ now: new Date("2026-11-02T16:59:50Z") }); // Monday 16:59:50 UK
		render(<OpenClosed showPeriod={false} />);
		expect(text()).toBe("Open today 8:30 - 5:00");

		act(() => {
			vi.advanceTimersByTime(9_999); // 16:59:59.999
		});
		expect(text()).toBe("Open today 8:30 - 5:00");

		act(() => {
			vi.advanceTimersByTime(1); // 17:00:00
		});
		expect(text()).toBe("Open tomorrow 8:30 - 5:00");
	});

	it("keeps updating every minute after the first", () => {
		visitorIn("Europe/London");
		vi.useFakeTimers({ now: new Date("2026-11-02T16:58:30Z") });
		render(<OpenClosed showPeriod={false} />);
		act(() => {
			vi.advanceTimersByTime(30_000); // 16:59:00 (first, lined-up tick)
		});
		expect(text()).toBe("Open today 8:30 - 5:00");
		act(() => {
			vi.advanceTimersByTime(60_000); // 17:00:00 (regular tick)
		});
		expect(text()).toBe("Open tomorrow 8:30 - 5:00");
	});

	it("updates when the tab comes back into view", () => {
		visitorIn("Europe/London");
		vi.useFakeTimers({ now: new Date("2026-11-02T16:59:50Z") });
		render(<OpenClosed showPeriod={false} />);
		expect(text()).toBe("Open today 8:30 - 5:00");

		// The tab was in the background (timers held back) while the office closed.
		vi.setSystemTime(new Date("2026-11-02T17:30:00Z"));
		act(() => {
			document.dispatchEvent(new Event("visibilitychange"));
		});
		expect(text()).toBe("Open tomorrow 8:30 - 5:00");
	});

	it("removes its timers and listener when it's removed from the page", () => {
		visitorIn("Europe/London");
		vi.useFakeTimers({ now: new Date("2026-11-02T10:00:00Z") });
		const removeListener = vi.spyOn(document, "removeEventListener");
		const { unmount } = render(<OpenClosed />);
		act(() => {
			vi.advanceTimersByTime(60_000); // past the first tick, so the interval exists
		});
		expect(vi.getTimerCount()).toBe(1);
		unmount();
		expect(vi.getTimerCount()).toBe(0);
		expect(removeListener).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
	});
});
