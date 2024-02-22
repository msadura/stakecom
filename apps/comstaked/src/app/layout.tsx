import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { env } from "~/env";

import "~/app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Providers } from "~/components/Providers";
import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/SiteFooter";
import { ThemeProvider } from "~/components/Theme";
import { Box } from "~/components/ui/box";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://stake.com.ai"
      : "http://localhost:3000",
  ),
  title: "Stake Com AI",
  description: "Stake wrapped Commune AI tokens",
  openGraph: {
    title: "Stake Com AI",
    description: "Stake wrapped Commune AI tokens and earn native yield",
    url: "https://stake.com.ai",
    siteName: "Stake Com",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@jullerino",
  //   creator: "@jullerino",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Providers>
            <Box className="min-h-screen flex-col">
              <SiteHeader />
              <Box className="flex-1 flex-col">{props.children}</Box>
              <SiteFooter />
              <Toaster />
            </Box>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
