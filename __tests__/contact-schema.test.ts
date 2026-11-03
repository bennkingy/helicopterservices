import { ContactSchema } from "@/app/schema";
import * as allure from "allure-js-commons";

// Groups these tests in the Allure report (pnpm test:report).
beforeEach(async () => {
	await allure.epic("Enquiries");
	await allure.feature("Enquiry form rules");
});

// The enquiry form's validation rules.
const valid = {
	name: "Sarah TEST",
	email: "sarah@test.co.uk",
	contactNumber: "07700 900123",
	requirement: "Flights",
	service: "trial-lessons",
	body: "I'd like to book a trial lesson for my dad's birthday.",
};

const errorsFor = (overrides: Partial<typeof valid>) => {
	const result = ContactSchema.safeParse({ ...valid, ...overrides });
	return result.success ? [] : result.error.issues.map((i) => `${i.path[0]}: ${i.message}`);
};

describe("ContactSchema", () => {
	it("accepts a normal enquiry", () => {
		expect(errorsFor({})).toEqual([]);
	});

	it("service is optional", () => {
		expect(errorsFor({ service: undefined })).toEqual([]);
	});

	describe("name", () => {
		it.each(["O'Brien", "Zoë Müller", "Anne-Marie Smith", "St. John", "José"])("accepts %s", (name) => {
			expect(errorsFor({ name })).toEqual([]);
		});
		it("is required", () => {
			expect(errorsFor({ name: "   " })).toEqual(["name: Please enter your name"]);
		});
		it.each(["Sarah123", "<script>", "a@b"])("rejects %s", (name) => {
			expect(errorsFor({ name })).toHaveLength(1);
		});
	});

	describe("contact number", () => {
		it.each(["07700900123", "07700 900123", "+44 1494 513 166", "(01494) 513166", "01494-513166"])(
			"accepts %s",
			(contactNumber) => {
				expect(errorsFor({ contactNumber })).toEqual([]);
			},
		);
		it("needs at least 10 digits", () => {
			expect(errorsFor({ contactNumber: "0149 451" })).toEqual([
				"contactNumber: Please enter a valid contact number with at least 10 digits",
			]);
		});
		it("rejects letters", () => {
			expect(errorsFor({ contactNumber: "07700 CALLME" })[0]).toMatch(/can only contain digits/);
		});
	});

	describe("email", () => {
		it("must be an email address", () => {
			expect(errorsFor({ email: "not-an-email" })).toEqual(["email: Please enter a valid email address"]);
		});
		it.each(["someone@example.com", "x@SPAM.com"])("blocks %s", (email) => {
			expect(errorsFor({ email })).toEqual(["email: Email domain is not allowed"]);
		});
	});

	it("message is required", () => {
		expect(errorsFor({ body: "  " })).toEqual(["body: Please enter your message"]);
	});
});
