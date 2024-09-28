import { Toaster } from "@/components/ui/toaster";
import type { Metadata, Viewport } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "../components/ui/theme-provider";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";
import { GoogleTagManager } from "@next/third-parties/google";

const workSans = Work_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-work-sans",
});

const openSans = Open_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-open-sans",
});

export const metadata: Metadata = {
	title: {
		default: "Helicopter Services",
		template: "%s",
	},
	description: "Helicopter Services",
	twitter: {
		card: "summary_large_image",
		site: "@helicopterservices",
	},
	applicationName: "Helicopter Services",
	authors: [{ name: "Helicopter Services" }],
	generator: "Next.js",
	keywords: [
		"helicopter services",
		"type rating instructor",
		"helicopter lessons",
		"helicoper training",
		"aviation licence",
		"private pilot licence",
		"charter helicoper",
		"helicopter taxi",
		"private pilots licence",
		"london helicopter tour",
		"helicopter vr simulator",
		"helicopter lessons near me",
	],
	referrer: "origin-when-cross-origin",
	creator: "Helicopter Services",
	publisher: "Helicopter Services",
	metadataBase: new URL("https://www.helicopterservices.co.uk/"),
	alternates: {
		canonical: "/",
	},
};

export async function generateViewport(): Promise<Viewport> {
	const userAgent = headers().get("user-agent");
	const isiPhone = /iphone/i.test(userAgent ?? "");
	return isiPhone
		? {
				width: "device-width",
				initialScale: 1,
				maximumScale: 1, // disables auto-zoom on ios safari
			}
		: {};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="border-none">
			<GoogleTagManager gtmId="G-4VTPBZBHK4" />
			<body
				className={`${openSans.variable} ${workSans.variable} antialiased text-rendering-optimizeLegibility font-openSans text-brand-dark-grey overflow-x-hidden`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<Navbar />
					{children}
					<ScrollTop />
					<Footer />
					<Toaster />
					{/* <SpeedInsights />
					<Analytics /> */}
				</ThemeProvider>
				{/* Gmap fix */}
				<Script
					id="cookieyes"
					src="https://cdn-cookieyes.com/client_data/e2ee9be7bb054050144f0f50/script.js"
					type="text/javascript"
					async
				/>
				<Script id="hide-second-gm-style-iw-t" strategy="lazyOnload">
					{`
						const elements = document.querySelectorAll('.gm-style-iw-c');
						if (elements.length > 1) {
							elements[1].style.display = 'none';
						}
         
          `}
				</Script>
			</body>
		</html>
	);
}
