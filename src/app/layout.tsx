import type { Viewport } from '@/src/types'
import { GoogleTagManager } from '@next/third-parties/google'
import { draftMode } from "next/headers";
import "@/src/app/globals.css";
import LiveVisualEditing from "@/src/components/LiveVisualEditing";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";



// set viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        {/* <Header /> */}
        {children}
        {draftMode().isEnabled && <LiveVisualEditing />}
        {/* <Footer /> */}
        { process.env.NEXT_PUBLIC_GOOGLE_TM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TM} />}
      </body>
    </html>
  );
}
