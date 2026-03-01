import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        url: 'https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/f4ccd60a-e2bc-47cf-edfc-2ea980636500/Originals', // Must be an absolute URL
        width: 1800,
        height: 1000,
        alt: 'Impact Growth Labs OG Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact Growth Labs',
    description: 'An impact venture studio backing founders who build a better world',
    siteId: '1467726470533754880',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: ['https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/f4ccd60a-e2bc-47cf-edfc-2ea980636500/Originals'], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <SpeedInsights/>

      </body>
    </html>
  );
}
