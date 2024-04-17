import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from "next";
import { Open_Sans, Work_Sans } from "next/font/google";
import { ThemeProvider } from "../components/ui/theme-provider";
import "../styles/globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${openSans.variable} ${workSans.variable} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html >
  );
}
