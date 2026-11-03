import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import { HANGAR_IMAGE, R44_IMAGE, sanityImage } from "../../.storybook/fixtures";
import FramerAnimationBlurIn from "./FramerAnimationBlurIn";
import FramerAnimationSlideIn from "./FramerAnimationSlideIn";
import GMap from "./GMap";
import GMapHeader from "./GMapHeader";
import Gallery from "./Gallery";
import HeroVideo from "./HeroVideo";
import Modal from "./Modal";
import SanityImage from "./SanityImage";
import YouTubeThreeD from "./YouTubeThreeD";

const meta: Meta = { title: "Media/Media", parameters: { layout: "padded" } };
export default meta;

export const SanityImages: StoryObj = {
	render: () => (
		<div className="grid sm:grid-cols-3 gap-6 items-start">
			<SanityImage sanityImage={sanityImage(R44_IMAGE, "Robinson R44")} />
			<SanityImage sanityImage={sanityImage(R44_IMAGE, "Robinson R44")} cutCorner />
			<div className="w-[190px]">
				<SanityImage sanityImage={sanityImage(R44_IMAGE, "Robinson R44")} isCircle />
			</div>
		</div>
	),
};

export const GallerySingle: StoryObj = {
	render: () => (
		<Gallery galleryType="gallery-single">
			<a href="#0" data-src={`https://cdn.sanity.io/images/0he7nz2b/production/${HANGAR_IMAGE.replace("image-", "").replace(/-(jpg|png|webp)$/, ".$1")}`}>
				<SanityImage sanityImage={sanityImage(HANGAR_IMAGE, "Robinson helicopters in the hangar")} />
			</a>
		</Gallery>
	),
};

export const YouTube3D: StoryObj = {
	name: "YouTube 3D tour",
	render: () => <YouTubeThreeD data="https://www.youtube.com/embed/EVIILsZO42U" className="" />,
};

export const HeroVideoOnly: StoryObj = {
	name: "Hero video (loads after the page)",
	render: () => (
		<div className="relative h-[400px] bg-brand-dark-blue">
			<HeroVideo className="w-full h-full absolute object-cover" />
		</div>
	),
};

export const VideoModal: StoryObj = {
	render: () => (
		<Modal isOpen onClose={fn()}>
			<p className="p-6 bg-white">Modal content</p>
		</Modal>
	),
};

export const BlurInAnimation: StoryObj = {
	render: () => (
		<FramerAnimationBlurIn delay={0}>
			<h2 className="text-4xl font-workSans">Fades and un-blurs on scroll</h2>
		</FramerAnimationBlurIn>
	),
};

export const SlideInImages: StoryObj = {
	render: () => (
		<div className="relative max-w-xl">
			<FramerAnimationSlideIn
				className="w-full"
				items={[
					<SanityImage key={1} sanityImage={sanityImage(HANGAR_IMAGE, "Hangar")} />,
					<div key={2} className="absolute -bottom-10 right-0 w-[200px] border-8 border-white shadow-xl">
						<SanityImage sanityImage={sanityImage(R44_IMAGE, "R44")} />
					</div>,
				]}
			/>
		</div>
	),
};

// In Storybook the map is a placeholder (see .storybook/mocks/gmap.tsx).
export const GoogleMap: StoryObj = {
	render: () => (
		<div className="max-w-md">
			<GMapHeader className="" />
			<GMap />
		</div>
	),
};
