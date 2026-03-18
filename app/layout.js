import { Roboto } from 'next/font/google'
import { MainNav } from "@/components/ui/NavBar";
import { AuthProvider } from '@/context/auth-context';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import EventAnnouncementBar from '@/components/EventAnnouncementBar';
import "./globals.css";
 
const roboto = Roboto({
  weight: ['400', '300', '100', '500', '900', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: "Bharat Storytellers",
  description: "Bharat storytellers is an community learning platform for storytellers, where they can share their stories and learn from others.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-[#FAF9F9] `}>
        <Analytics />
      <AuthProvider>
        <MainNav />
        <EventAnnouncementBar />
        {children}
        <Footer />
      </AuthProvider>
      </body>
    </html>
  );
}
