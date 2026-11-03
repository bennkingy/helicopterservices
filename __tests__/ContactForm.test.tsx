import emailjs from "@emailjs/browser";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/app/components/ContactForm";
import * as allure from "allure-js-commons";

// Groups these tests in the Allure report (pnpm test:report).
beforeEach(async () => {
	await allure.epic("Enquiries");
	await allure.feature("Enquiry form");
});


// The enquiry form (app/components/ContactForm.tsx), tested in the browser
// environment. NO EMAIL IS SENT: vitest.setup.ts replaces EmailJS for every test
// and blocks all network access; reCAPTCHA is faked below.

const mockSend = vi.mocked(emailjs.send);

// reCAPTCHA becomes a button that "passes" when clicked.
vi.mock("react-google-recaptcha", () => ({
	__esModule: true,
	default: ({ onChange }: { onChange: (token: string) => void }) => (
		<button type="button" onClick={() => onChange("test-recaptcha-token")}>
			I'm not a robot
		</button>
	),
}));

const services = {
	Training: [{ label: "Private Pilot Licence", slug: "private-pilot-licence" }],
	Flights: [
		{ label: "Trial lessons", slug: "trial-lessons" },
		{ label: "London sightseeing tours", slug: "london-sightseeing-tours" },
	],
	Industry: [{ label: "Load lifting", slug: "load-lifting" }],
};

function loadForm(recaptchaKey: string | undefined = "test-site-key") {
	return render(<ContactForm services={services} recaptchaSiteKey={recaptchaKey} />);
}

async function fillValidEnquiry(user: ReturnType<typeof userEvent.setup>) {
	await user.type(screen.getByLabelText("Name"), "Sarah Thompson");
	await user.type(screen.getByLabelText("Email"), "sarah@helicopter-fan.co.uk");
	await user.type(screen.getByLabelText("Contact number"), "07700 900123");
	await user.type(screen.getByLabelText("Message"), "Trial lesson for my dad, please.");
}

const submit = () => screen.getByRole("button", { name: /submit enquiry/i });

beforeEach(() => {
	mockSend.mockReset();
	mockSend.mockResolvedValue({ status: 200, text: "OK" } as never);
	sessionStorage.clear();
	vi.spyOn(window, "alert").mockImplementation(() => {});
	vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("Enquiry form", () => {
	it("shows the fields and the reCAPTCHA", () => {
		loadForm();
		for (const label of ["Name", "Email", "Contact number", "Message"]) {
			expect(screen.getByLabelText(label)).toBeInTheDocument();
		}
		expect(screen.getByRole("radio", { name: "Training" })).toBeChecked();
		expect(screen.getByRole("button", { name: "I'm not a robot" })).toBeInTheDocument();
	});

	it("uses the right input types so phones can autofill", () => {
		loadForm();
		expect(screen.getByLabelText("Name")).toHaveAttribute("autocomplete", "name");
		expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
		expect(screen.getByLabelText("Contact number")).toHaveAttribute("type", "tel");
	});

	it("shows errors and sends nothing when the form is empty", async () => {
		const user = userEvent.setup();
		loadForm();
		await user.click(submit());
		expect(await screen.findByText("Please enter your name")).toBeInTheDocument();
		expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
		expect(screen.getByText("Please enter your message")).toBeInTheDocument();
		expect(mockSend).not.toHaveBeenCalled();
	});

	it("won't send until the reCAPTCHA is done", async () => {
		const user = userEvent.setup();
		loadForm();
		await fillValidEnquiry(user);
		await user.click(submit());
		await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Please complete the reCAPTCHA."));
		expect(mockSend).not.toHaveBeenCalled();
	});

	it("sends the enquiry (to the fake EmailJS) and says thank you", async () => {
		const user = userEvent.setup();
		loadForm();
		await fillValidEnquiry(user);
		await user.click(screen.getByRole("button", { name: "I'm not a robot" }));
		await user.click(submit());

		expect(await screen.findByText("Thank you for your enquiry, Sarah Thompson!")).toBeInTheDocument();
		expect(mockSend).toHaveBeenCalledTimes(1);
		const [serviceId, templateId, params] = mockSend.mock.calls[0];
		expect(serviceId).toBe("service_2zcm8le");
		expect(templateId).toBe("template_xbmamql");
		expect(params).toEqual({
			from_name: "Sarah Thompson",
			from_email: "sarah@helicopter-fan.co.uk",
			contact_number: "07700 900123",
			message: "Trial lesson for my dad, please.",
			requirement: "Training",
			service: "",
			"g-recaptcha-response": "test-recaptcha-token",
		});
	});

	it("sends the chosen requirement", async () => {
		const user = userEvent.setup();
		loadForm();
		await fillValidEnquiry(user);
		await user.click(screen.getByRole("radio", { name: "Industry" }));
		await user.click(screen.getByRole("button", { name: "I'm not a robot" }));
		await user.click(submit());
		await waitFor(() => expect(mockSend).toHaveBeenCalledTimes(1));
		expect(mockSend.mock.calls[0][2]).toMatchObject({ requirement: "Industry" });
	});

	it("pre-selects the service page the visitor came from", async () => {
		sessionStorage.setItem("hs:currentPath", "/flights/trial-lessons");
		const user = userEvent.setup();
		loadForm();
		await waitFor(() => expect(screen.getByRole("radio", { name: "Flights" })).toBeChecked());
		expect(screen.getByText("Which flights service?")).toBeInTheDocument();

		await fillValidEnquiry(user);
		await user.click(screen.getByRole("button", { name: "I'm not a robot" }));
		await user.click(submit());
		await waitFor(() => expect(mockSend).toHaveBeenCalledTimes(1));
		expect(mockSend.mock.calls[0][2]).toMatchObject({
			requirement: "Flights: Trial lessons",
			service: "Trial lessons",
		});
	});

	it("tells the visitor when sending fails, and keeps their enquiry", async () => {
		mockSend.mockRejectedValue(new Error("EmailJS is down"));
		const user = userEvent.setup();
		loadForm();
		await fillValidEnquiry(user);
		await user.click(screen.getByRole("button", { name: "I'm not a robot" }));
		await user.click(submit());

		expect(await screen.findByRole("alert")).toHaveTextContent("didn't send");
		expect(screen.queryByText(/Thank you for your enquiry/)).not.toBeInTheDocument();
		expect(screen.getByLabelText("Name")).toHaveValue("Sarah Thompson");
	});

	it("shows a 'please call us' message instead of crashing when the reCAPTCHA key is missing", () => {
		loadForm("");
		expect(screen.getByRole("alert")).toHaveTextContent("missing its reCAPTCHA key");
		expect(screen.getByRole("alert")).toHaveTextContent("+44 1494 513 166");
	});
});
