import type { Metadata } from "next";
import UploadPage from "../components/UploadPage";

export const revalidate = 30; // revalidate at most 30 seconds

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Upload Page",
		description: "data?.seoDescription",
	};
}

export default async function GeneratePage({
	params,
}: { params: { slug: string } }) {
	return (
		<main className="max-w-6xl mx-auto px-4 overflow-x-hidden">
			<UploadPage />
		</main>
	);
}
