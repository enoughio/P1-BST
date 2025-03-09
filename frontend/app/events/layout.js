
export const metadata = {
  title: "Bharat Storytellers - Events",
  description: "Discover and register for exciting storytelling events",
}


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={` mx-auto `} >
          {children}
      </body>
    </html>
  )
}

