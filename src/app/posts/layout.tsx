import type { Viewport } from '@/src/types'
import "@/src/app/globals.css";
import * as React from 'react';
import SkipMenu from '@/src/components/SkipMenu';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'


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

const Layout: React.FunctionComponent<ILayoutProps> = ({children}) => {
  return (
    <html lang="en">
      <body className="bg-white">
        <SkipMenu />
        <Header />
        {children}
        <Footer />
        {/* add google tag manager */}
        { process.env.NEXT_PUBLIC_GOOGLE_TM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TM} />}
        { process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID} />}
      </body>
    </html>
  );
};

export default Layout;
