import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${roboto.variable} ${firaCode.variable} font-light font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Clarice’s 40th Birthday Celebration",
  description:
    "Join us for a night of celebration as we compile four decades of memories and initialize the next chapter of Clarice’s journey.",
  openGraph: {
    title: "Clarice’s 40th Birthday Celebration",
    description:
      "Join us for a night of celebration as we compile four decades of memories and initialize the next chapter of Clarice’s journey.",
    url: "https://rsvp.clarice.bouwer.dev",
    siteName: "Clarice’s 40th Birthday Celebration",
    images: [
      {
        url: "https://rsvp.clarice.bouwer.dev/og-image.png", // hosted static image
        width: 1200,
        height: 630,
        alt: "Clarice is 40!",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clarice’s 40th Birthday Celebration",
    description:
      "Join us for a night of celebration as we compile four decades of memories and initialize the next chapter of Clarice’s journey.",
    images: ["https://rsvp.clarice.bouwer.dev/og-image.png"],
  },
};
