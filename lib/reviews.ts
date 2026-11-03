import { client } from "./sanity";

export const TRIPADVISOR_URL =
	"https://www.tripadvisor.co.uk/Attraction_Review-g315927-d7108370-Reviews-Helicopter_Services_Limited-Marlow_Buckinghamshire_England.html";
export const FACEBOOK_REVIEWS_URL = "https://www.facebook.com/heliservicesuk/reviews";

// A star rating out of 5 (Tripadvisor, Google).
export type ReviewSource = {
	source: "Tripadvisor" | "Google";
	rating: number;
	count: number;
	sourceUrl?: string;
};

// Facebook doesn't use stars: it shows the % of reviewers who recommend you.
export type FacebookRecommend = {
	percent: number;
	count: number;
	sourceUrl: string;
};

export type ReviewSummary = {
	stars: ReviewSource[];
	facebook: FacebookRecommend | null;
};

// Review scores, set in Sanity under Settings. A source is left out until
// both its score and count are filled in, so nothing shows by default.
export async function getReviewSummary(): Promise<ReviewSummary> {
	try {
		const data = await client.fetch<{
			reviewRating?: number;
			reviewCount?: number;
			reviewSourceUrl?: string;
			googleReviewRating?: number;
			googleReviewCount?: number;
			googleReviewUrl?: string;
			facebookRecommendPercent?: number;
			facebookReviewCount?: number;
			facebookReviewUrl?: string;
		} | null>(
			`*[_type == "settings"][0]{reviewRating, reviewCount, reviewSourceUrl, googleReviewRating, googleReviewCount, googleReviewUrl, facebookRecommendPercent, facebookReviewCount, facebookReviewUrl}`,
			{},
			{ next: { revalidate: 300 } },
		);
		const stars: ReviewSource[] = [];
		if (data?.reviewRating && data?.reviewCount) {
			stars.push({
				source: "Tripadvisor",
				rating: data.reviewRating,
				count: data.reviewCount,
				sourceUrl: data.reviewSourceUrl || TRIPADVISOR_URL,
			});
		}
		if (data?.googleReviewRating && data?.googleReviewCount) {
			stars.push({
				source: "Google",
				rating: data.googleReviewRating,
				count: data.googleReviewCount,
				sourceUrl: data.googleReviewUrl,
			});
		}
		const facebook =
			data?.facebookRecommendPercent && data?.facebookReviewCount
				? {
						percent: data.facebookRecommendPercent,
						count: data.facebookReviewCount,
						sourceUrl: data.facebookReviewUrl || FACEBOOK_REVIEWS_URL,
					}
				: null;
		return { stars, facebook };
	} catch (error) {
		console.error("Failed to load review summary from Sanity", error);
		return { stars: [], facebook: null };
	}
}
