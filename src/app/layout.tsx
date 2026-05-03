import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { RegionProvider } from "@/components/region-provider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agriva | Farmer's AI Copilot",
  description: "Smarter decisions for farmers with Agriva. AI crop decision engine, weather-based crop-loss predictor, and market optimal pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="text-[105%]"
    >
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground font-sans antialiased text-base md:text-lg`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <LanguageProvider>
            <RegionProvider>
              {children}
              <Analytics />
            </RegionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
