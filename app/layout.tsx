import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "../components/ui/theme-provider";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

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
		template: "%s - Helicopter Services",
	},
	description: "Helicopter Services",
	twitter: {
		card: "summary_large_image",
		site: "@helicopterservices",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
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
					<SpeedInsights />
					<Analytics /> 
				</ThemeProvider>
				{/* Gmap fix */}
				<Script
					id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="efdb81ab-0311-436f-8c4b-ebf6822f57ca"
          data-blockingmode="auto"
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
