import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

// Next.js ships its own React build with the form hooks (useFormState,
// useFormStatus). Plain react-dom 18 doesn't have them, so give the tests
// simple stand-ins that behave like an idle form.
vi.mock("react-dom", async (importOriginal) => {
	const actual = await importOriginal<typeof import("react-dom")>();
	const React = await import("react");
	return {
		...actual,
		useFormStatus: () => ({ pending: false, data: null, method: null, action: null }),
		useFormState: (action: (state: unknown, payload: unknown) => unknown, initial: unknown) => {
			const [state, setState] = React.useState(initial);
			const dispatch = async (payload: unknown) => setState(await action(state, payload));
			return [state, dispatch];
		},
	};
});

// SAFETY: no test can ever send a real email. EmailJS is replaced for every
// test; check what "would" have been sent with vi.mocked(emailjs.send).
vi.mock("@emailjs/browser", () => ({
	default: {
		init: vi.fn(),
		send: vi.fn(() => Promise.resolve({ status: 200, text: "OK (fake, nothing sent)" })),
	},
}));

// SAFETY: tests never reach the internet. Any real network call fails loudly.
globalThis.fetch = vi.fn(() =>
	Promise.reject(new Error("Network access is blocked in tests (fetch). Mock it instead.")),
) as unknown as typeof fetch;

// Browser-only stand-ins (skipped for tests that run in the Node environment).
if (typeof window !== "undefined") {
	window.XMLHttpRequest.prototype.open = () => {
		throw new Error("Network access is blocked in tests (XMLHttpRequest). Mock it instead.");
	};

	// jsdom doesn't implement these; components call them.
	window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
	window.HTMLElement.prototype.scrollIntoView = vi.fn();
	window.HTMLElement.prototype.hasPointerCapture = vi.fn();
	window.HTMLElement.prototype.releasePointerCapture = vi.fn();

	// Radix UI (radio buttons, selects) measures elements with ResizeObserver.
	class ResizeObserverStub {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.ResizeObserver = window.ResizeObserver || (ResizeObserverStub as unknown as typeof ResizeObserver);
}
