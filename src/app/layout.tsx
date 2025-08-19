import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"], // Add this line to include italic
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anovas | Web & App Development Agency",
  description: "Modern websites, apps, and digital solutions that convert. Fast, scalable, results-driven.",
  keywords: ["web development", "Next.js", "digital marketing", "mobile apps", "website development agency", "agency India"],
  metadataBase: new URL("https://anovas.co.in"),
  openGraph: {
    title: "Anovas | Web & App Development Agency",
    description: "Modern, fast, scalable digital experiences with Next.js, React, Tailwind, TypeScript.",
    url: "https://anovas.co.in",
    siteName: "Anovas",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Anovas agency" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anovas Agency",
    description: "Websites and apps built with modern stack that converts leads.",
    images: ["/og.png"],
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
        className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
