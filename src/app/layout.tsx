import type { Viewport } from '@/src/types'
import "@/src/app/globals.css";
import * as React from 'react';
import SkipMenu from '@/components/SkipMenu';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] })

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
  return (
    <html lang="en">
      <body className={`bg-background text-foreground ${inter.className}`}>
        <SkipMenu />
        <Header />
        <div id="content">
          {children}
        </div>
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