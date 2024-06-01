import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "../components/ui/theme-provider";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";

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

{
	/* <meta name="apple-mobile-web-app-capable" content="yes"></meta>; */
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="">
			<body
				className={`${openSans.variable} ${workSans.variable} antialiased text-rendering-optimizeLegibility text-brand-dark-grey overflow-x-hidden`}
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
				</ThemeProvider>
				{/* Gmap fix */}
        <Script id="hide-second-gm-style-iw-t" strategy="lazyOnload">
          {`
						const elements = document.querySelectorAll('.gm-style-iw-t');
						if (elements.length > 1) {
							elements[1].style.display = 'none';
						}
         
          `}
        </Script>
			</body>
		</html>
	);
}
