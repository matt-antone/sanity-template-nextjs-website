import type { Viewport } from '@/src/types'
import "@/src/app/globals.css";
import * as React from 'react';
import SkipMenu from '@/src/components/SkipMenu';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google";
import { SanityDocument } from 'next-sanity';
import { useQuery } from '@sanity/react-loader';
import { SITE_SETTINGS_QUERY } from '@/lib/queries';
import { loadQuery } from '@sanity/react-loader';
const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] })
import { client } from "@/sanity/lib/client";

// set viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}

interface ILayoutProps {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<ILayoutProps> = async ({children}) => {
  // get the settings from sanity
  const settings = await client.fetch<SanityDocument>(SITE_SETTINGS_QUERY);
  console.log(settings.organizations)
  return (
    <html lang="en">
      <body className={`bg-black text-white ${inter.className}`}>
        <SkipMenu />
        <Header />
        {children}
        <Footer />
        {/* add google tag manager */}
        <SpeedInsights />
        { process.env.NEXT_PUBLIC_GOOGLE_TM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TM} />}
        { process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID} />}
      </body>
    </html>
  );
};

export default Layout;
