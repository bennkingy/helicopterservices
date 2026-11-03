import { client } from "./sanity";

export type ReviewSummary = {
	rating: number;
	count: number;
	sourceUrl?: string;
} | null;

// Overall review score, set in Sanity under Settings. Returns null until both
// the rating and the count are filled in, so nothing shows by default.
export async function getReviewSummary(): Promise<ReviewSummary> {
	try {
		const data = await client.fetch<{
			reviewRating?: number;
			reviewCount?: number;
			reviewSourceUrl?: string;
		} | null>(
			`*[_type == "settings"][0]{reviewRating, reviewCount, reviewSourceUrl}`,
			{},
			{ next: { revalidate: 300 } },
		);
		if (!data?.reviewRating || !data?.reviewCount) return null;
		return {
			rating: data.reviewRating,
			count: data.reviewCount,
			sourceUrl: data.reviewSourceUrl,
		};
	} catch (error) {
		console.error("Failed to load review summary from Sanity", error);
		return null;
	}
}
