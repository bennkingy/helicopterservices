import { getPlaiceholder } from "plaiceholder";

export function formatDate(
	dateString: string,
	locale?: string,
	options?: Intl.DateTimeFormatOptions,
): string {
	const date = new Date(dateString);
	return date.toLocaleDateString(locale, options);
}

export const getBase64Blur = async (src: string): Promise<string> => {
	try {
		const response = await fetch(src);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const { base64 } = await getPlaiceholder(buffer);
		return base64;
	} catch (error) {
		console.error("Error generating base64 blur:", error);
		return "";
	}
};