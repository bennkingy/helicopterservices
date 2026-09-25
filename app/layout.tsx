import { Toaster } from "@/components/ui/toaster";
import type { Metadata, Viewport } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "../components/ui/theme-provider";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import PageTracker from "./components/PageTracker";
import PromoPopupServer from "./components/PromoPopupServer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

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
		default: SITE_NAME,
		template: "%s",
	},
	description: DEFAULT_DESCRIPTION,
	applicationName: SITE_NAME,
	authors: [{ name: SITE_NAME }],
	referrer: "origin-when-cross-origin",
	creator: SITE_NAME,
	publisher: SITE_NAME,
	metadataBase: new URL(SITE_URL),
	// Each page sets its own canonical URL through pageMetadata in lib/seo.ts.
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

// Tells search engines who the business is and where to find it.
const organisationJsonLd = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"@id": `${SITE_URL}/#business`,
	name: SITE_NAME,
	description: DEFAULT_DESCRIPTION,
	url: SITE_URL,
	logo: `${SITE_URL}/icon.ico`,
	image: `${SITE_URL}/opengraph-image.jpg`,
	telephone: "+441494513166",
	email: "info@helicopterservices.co.uk",
	address: {
		"@type": "PostalAddress",
		streetAddress: "White Waltham Airfield",
		addressLocality: "Maidenhead",
		addressRegion: "Berkshire",
		postalCode: "SL6 3NJ",
		addressCountry: "GB",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 51.49492,
		longitude: -0.77341,
	},
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "08:30",
			closes: "17:00",
		},
	],
	sameAs: [
		"https://www.facebook.com/heliservicesuk/",
		"https://www.instagram.com/helicopterservices/",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="border-none">
			{/* <GoogleTagManager gtmId="G-4VTPBZBHK4" /> */}
			<GoogleAnalytics gaId="G-4VTPBZBHK4" />

			<body
				className={`${openSans.variable} ${workSans.variable} antialiased text-rendering-optimizeLegibility font-openSans text-brand-dark-grey overflow-x-hidden`}
			>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organisationJsonLd),
					}}
				/>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					forcedTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<Navbar />
					{children}
					<ScrollTop />
					<PageTracker />
					<Footer />
					<PromoPopupServer />
					<Toaster />
					<SpeedInsights />
					<Analytics />
				</ThemeProvider>
				{/* Gmap fix */}
				{/* Google Consent Mode: tracking stays off until CookieYes records
				    the visitor's choice, so the banner no longer has to block the page. */}
				<Script id="consent-default" strategy="beforeInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag("consent", "default", {
							ad_storage: "denied",
							ad_user_data: "denied",
							ad_personalization: "denied",
							analytics_storage: "denied",
							functionality_storage: "denied",
							personalization_storage: "denied",
							security_storage: "granted",
							wait_for_update: 2000,
						});
						gtag("set", "ads_data_redaction", true);
						gtag("set", "url_passthrough", true);
					`}
				</Script>
				<Script
					id="cookieyes"
					src="https://cdn-cookieyes.com/client_data/e2ee9be7bb054050144f0f50/script.js"
					type="text/javascript"
					strategy="afterInteractive"
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
