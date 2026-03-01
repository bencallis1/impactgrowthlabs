import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Impact Growth Labs",
    template: "%s | Impact Growth Labs",
  },
  description:
    "An impact venture studio backing founders who build a better world. We invest in bold ideas at the intersection of business and positive change.",
  openGraph: {
    title: "Impact Growth Labs",
    description: "Backing founders who build a better world.",
    type: "website",
    images: [
      {
        url: 'https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/a948c15c-5075-4efc-2319-2c9d7fc90e00/Originals', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/f4ccd60a-e2bc-47cf-edfc-2ea980636500/Originals', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Impact Growth Labs OG Image',
      },
    ],
  },

};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSerif.variable} antialiased`}>
        {children}
        <Analytics/>

      </body>
    </html>
  );
}
