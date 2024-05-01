import type { Viewport } from '@/src/types'
import { GoogleTagManager } from '@next/third-parties/google'
import "@/src/app/globals.css";
import SkipMenu from '../components/SkipMenu';

// set viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <SkipMenu />
        <div id="content">
          {children}
        </div>
        {/* add google tag manager */}
        { process.env.NEXT_PUBLIC_GOOGLE_TM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TM} />}
      </body>
    </html>
  );
}
