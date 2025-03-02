import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({
  weight: ['400', '300', '100', '500', '900', '700'],
  subsets: ['latin'],
})


export const metadata = {
    title: "Bhartat StoryTellers",
    description: "Bharat storytellers is an community learning platform for storytellers, where they can share their stories and learn from others.",
  };
  


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased bg-[#FAF9F9] `}>
        {children}
      </body>
    </html>
  );
}
