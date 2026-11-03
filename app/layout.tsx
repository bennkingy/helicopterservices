import { Toaster } from "@/components/ui/toaster";
import type { Metadata, Viewport } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import Script from "next/script";
import MotionProvider from "./components/MotionProvider";
import { ThemeProvider } from "../components/ui/theme-provider";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import PageTracker from "./components/PageTracker";
import PromoPopupServer from "./components/PromoPopupServer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { closuresJsonLd, openingHoursJsonLd } from "@/lib/opening-hours";
import { getClosures, getOpeningHours } from "@/lib/opening-hours-sanity";

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
	logo: `${SITE_URL}/icon.png`,
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
	sameAs: [
		"https://www.facebook.com/heliservicesuk/",
		"https://www.instagram.com/helicopterservices/",
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// No review score (aggregateRating) here on purpose: Google doesn't show
	// stars for a business's own reviews on its own site, and the score comes
	// from Tripadvisor, which Google's rules say not to mark up. The homepage
	// still shows it to visitors.
	return (
		<html lang="en-GB" suppressHydrationWarning className="border-none">
			<head>
				{/* The cookie banner loads once the page is idle; connect early so it shows quickly. */}
				<link rel="preconnect" href="https://cdn-cookieyes.com" />
				<link rel="preconnect" href="https://log.cookieyes.com" />
			</head>

			<body
				className={`${openSans.variable} ${workSans.variable} antialiased text-rendering-optimizeLegibility font-openSans text-brand-dark-grey overflow-x-hidden`}
			>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							...organisationJsonLd,
							// Same hours as the header and contact boxes (Sanity: Settings > Opening hours).
							openingHoursSpecification: openingHoursJsonLd(await getOpeningHours()),
							// Christmas, New Year and Sanity's closed dates in the coming year.
							specialOpeningHoursSpecification: closuresJsonLd(await getClosures(), new Date()),
						}),
					}}
				/>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					forcedTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<a
						href="#main-content"
						className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-brand-dark-blue focus:px-4 focus:py-2 focus:font-bold focus:shadow-brand"
					>
						Skip to main content
					</a>
<MotionProvider>
										<Navbar />
					<main id="main-content" tabIndex={-1} className="outline-none">
						{children}
					</main>
					<ScrollTop />
					<PageTracker />
					<Footer />
					</MotionProvider>
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
					strategy="lazyOnload"
				/>
				{/* GA4. Loads after the page is idle so it doesn't delay the first paint.
				    Consent Mode above keeps it from tracking until the visitor accepts. */}
				<Script
					id="gtag-src"
					src="https://www.googletagmanager.com/gtag/js?id=G-4VTPBZBHK4"
					strategy="lazyOnload"
				/>
				<Script id="gtag-init" strategy="lazyOnload">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag("js", new Date());
						gtag("config", "G-4VTPBZBHK4");
					`}
				</Script>
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
