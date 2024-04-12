import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/ui/theme-provider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html >
  );
}
