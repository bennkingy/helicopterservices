import type { Meta, StoryObj } from "@storybook/nextjs";
import { trialLessons } from "../../.storybook/fixtures";
import GetInTouch from "./GetInTouch";
import Header from "./Header";
import Hero from "./Hero";
import PageTitle from "./PageTitle";

// Every kind of page header on the site, in one place.
//
//   Hero       homepage and About us: full-screen video, title, reviews, buttons
//   Header     inner pages with a photo (training, flights, industry, fleet)
//   PageTitle  pages without a photo: FAQs, Meet the team (light), Enquire (dark)
//   GetInTouch the "Get in touch with us" block at the top of the footer
const meta: Meta<typeof PageTitle> = {
	title: "Site/Page headers",
	component: PageTitle,
	parameters: { layout: "fullscreen" },
	args: {
		tag: "About us",
		title: "FAQs",
		intro: "Frequently asked questions about flying with Helicopter Services.",
		tone: "light",
	},
	argTypes: {
		tone: { control: "inline-radio", options: ["light", "dark"] },
		iconType: { control: "select", options: ["Training", "Flights", "Industry", "Company"] },
	},
	decorators: [
		(Story, { args }) => (
			<div className={args.tone === "dark" ? "bg-brand-dark-blue py-14" : "py-14"}>
				<div className="container">
					<Story />
				</div>
			</div>
		),
	],
};
export default meta;
type Story = StoryObj<typeof PageTitle>;

// Stories for the other components skip the PageTitle wrapper.
const bare = { decorators: [(Story: any) => <Story />] };

// --- PageTitle (pages without a photo) ---

export const FAQs: Story = {
	name: "PageTitle: FAQs",
	parameters: { nextjs: { navigation: { pathname: "/about-us/faqs" } } },
};

export const MeetTheTeam: Story = {
	name: "PageTitle: Meet the team",
	args: { title: "Meet the team", intro: "Meet our team of highly qualified pilots." },
};

export const Enquire: Story = {
	name: "PageTitle: Enquire (dark)",
	args: {
		tone: "dark",
		tag: undefined,
		title: "Enquire now",
		intro: "Tell us how we can help and we'll get in touch as soon as we can.",
		introClassName: "max-w-[400px]",
	},
};

export const PageTitlePhone: Story = {
	...FAQs,
	name: "PageTitle: FAQs (phone)",
	globals: { viewport: { value: "mobile" } },
};

// --- The other header types, for comparison ---

export const HomepageHero: Story = {
	...bare,
	name: "Hero: homepage",
	render: () => (
		<Hero
			title="Helicopter Training, Tours<br/>& Charter from White Waltham"
			subtitle="Exceeding exacting industry standards since 1998."
			height="h-[85svh]"
			cta={{ label: "Call General enquiries", href: "tel:+441494513166" }}
		/>
	),
};

export const PhotoBanner: Story = {
	...bare,
	name: "Header: inner page with photo",
	render: () => (
		<Header
			title="Helicopter Trial Lessons & Gifts"
			tag="Flights"
			iconType="Flights"
			image={(trialLessons as any).mainImage}
		/>
	),
};

export const FooterGetInTouch: Story = {
	...bare,
	name: "GetInTouch: footer",
	render: () => <GetInTouch />,
};

// All of them stacked, to compare sizes and spacing at a glance.
export const AllHeaders: Story = {
	...bare,
	name: "All headers (compare)",
	render: () => {
		const Label = ({ children }: { children: string }) => (
			<p className="bg-neutral-100 text-neutral-500 text-xs font-mono px-4 py-2 border-y">
				{children}
			</p>
		);
		return (
			<div>
				<Label>Hero (homepage, About us)</Label>
				<Hero
					title="Helicopter Training, Tours<br/>& Charter from White Waltham"
					subtitle="Exceeding exacting industry standards since 1998."
					height="h-[70svh]"
					cta={{ label: "Call General enquiries", href: "tel:+441494513166" }}
				/>
				<Label>Header (inner pages with a photo)</Label>
				<Header
					title="Helicopter Trial Lessons & Gifts"
					tag="Flights"
					iconType="Flights"
					image={(trialLessons as any).mainImage}
				/>
				<Label>PageTitle light (FAQs, Meet the team)</Label>
				<div className="container py-14">
					<PageTitle
						tag="About us"
						title="FAQs"
						intro="Frequently asked questions about flying with Helicopter Services."
					/>
				</div>
				<Label>PageTitle dark (Enquire)</Label>
				<div className="bg-brand-dark-blue py-14">
					<div className="container">
						<PageTitle
							tone="dark"
							title="Enquire now"
							intro="Tell us how we can help and we'll get in touch as soon as we can."
							introClassName="max-w-[400px]"
						/>
					</div>
				</div>
				<Label>GetInTouch (top of the footer)</Label>
				<GetInTouch />
			</div>
		);
	},
};
