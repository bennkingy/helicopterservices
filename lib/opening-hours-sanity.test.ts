import * as allure from "allure-js-commons";
import { OPENING_HOURS } from "./opening-hours";
import { getOpeningHours } from "./opening-hours-sanity";
import { client } from "./sanity";

vi.mock("./sanity", () => ({ client: { fetch: vi.fn() } }));
// Typed loosely: the real fetch has many overloads.
const fetchMock = client.fetch as unknown as ReturnType<typeof vi.fn>;

beforeEach(async () => {
	await allure.epic("Opening hours");
	await allure.feature("Opening hours from Sanity");
	vi.spyOn(console, "error").mockImplementation(() => {});
});

const day = { status: "open", open: "09:00", close: "17:30" };
const week = Object.fromEntries(
	["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((d) => [d, day]),
);

describe("getOpeningHours", () => {
	it("uses the hours from Sanity when every day is filled in", async () => {
		fetchMock.mockResolvedValue(week);
		const hours = await getOpeningHours();
		expect(hours.Monday).toEqual({ open: "09:00", close: "17:30" });
		expect(hours.Sunday).toEqual({ open: "09:00", close: "17:30" });
	});

	it("uses the built-in hours while the Sanity field is empty", async () => {
		fetchMock.mockResolvedValue(null);
		expect(await getOpeningHours()).toBe(OPENING_HOURS);
		expect(console.error).not.toHaveBeenCalled();
	});

	it("uses the built-in hours, and logs it, when Sanity's hours are wrong", async () => {
		fetchMock.mockResolvedValue({ ...week, friday: { status: "open", open: "late", close: "17:30" } });
		expect(await getOpeningHours()).toBe(OPENING_HOURS);
		expect(console.error).toHaveBeenCalled();
	});

	it("uses the built-in hours when Sanity can't be reached", async () => {
		fetchMock.mockRejectedValue(new Error("network down"));
		expect(await getOpeningHours()).toBe(OPENING_HOURS);
	});
});
