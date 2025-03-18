
export const metadata = {
  title: "Bhartat Story",
  description: "Bharat Storytellers is a community of storytellers who share stories of India and its culture.",
};

// TODO: fetch data of the user from the API and based on that decide to show member dashboard or admin dashboard

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#FAF9F9] `}>
        {children}
      </body>
    </html>
  );
}
