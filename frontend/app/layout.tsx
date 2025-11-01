import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Planify - Google Calendar Clone",
  description: "A clone Website of Google Calendar",
  icons: {
    icon: "/logo_small.png",       // Main favicon
    shortcut: "/logo_small.png",   // For older browsers
    apple: "/logo_small.png",      // For Apple devices
    // You can still use the light/dark mode array if you want:
    // icon: [
    //   { media: '(prefers-color-scheme: light)', url: '/logo_small.png' },
    //   { media: '(prefers-color-scheme: dark)', url: '/logo_small.png' },
    // ],
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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}