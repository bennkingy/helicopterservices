import { atom } from "nanostores";

// Create a store to hold the hover state
export const hoverStore = atom(false);

// @ts-ignore
let hideTimeout;

export const showOverlay = () => {
	// @ts-ignore
	clearTimeout(hideTimeout); // Clear any pending hide actions
	hoverStore.set(true);
};

export const hideOverlay = () => {
	hideTimeout = setTimeout(() => {
		hoverStore.set(false);
	}, 200); // Adjust the delay time as needed
};
