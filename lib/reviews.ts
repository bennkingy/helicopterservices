import { client } from "./sanity";

export const TRIPADVISOR_URL =
	"https://www.tripadvisor.co.uk/Attraction_Review-g315927-d7108370-Reviews-Helicopter_Services_Limited-Marlow_Buckinghamshire_England.html";

export type ReviewSource = {
	source: "Tripadvisor" | "Google";
	rating: number;
	count: number;
	sourceUrl?: string;
};

// Review scores, set in Sanity under Settings. A source is left out until
// both its rating and count are filled in, so nothing shows by default.
export async function getReviewSummary(): Promise<ReviewSource[]> {
	try {
		const data = await client.fetch<{
			reviewRating?: number;
			reviewCount?: number;
			reviewSourceUrl?: string;
			googleReviewRating?: number;
			googleReviewCount?: number;
			googleReviewUrl?: string;
		} | null>(
			`*[_type == "settings"][0]{reviewRating, reviewCount, reviewSourceUrl, googleReviewRating, googleReviewCount, googleReviewUrl}`,
			{},
			{ next: { revalidate: 300 } },
		);
		const sources: ReviewSource[] = [];
		if (data?.reviewRating && data?.reviewCount) {
			sources.push({
				source: "Tripadvisor",
				rating: data.reviewRating,
				count: data.reviewCount,
				sourceUrl: data.reviewSourceUrl || TRIPADVISOR_URL,
			});
		}
		if (data?.googleReviewRating && data?.googleReviewCount) {
			sources.push({
				source: "Google",
				rating: data.googleReviewRating,
				count: data.googleReviewCount,
				sourceUrl: data.googleReviewUrl,
			});
		}
		return sources;
	} catch (error) {
		console.error("Failed to load review summary from Sanity", error);
		return [];
	}
}
