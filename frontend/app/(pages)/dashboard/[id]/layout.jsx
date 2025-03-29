export const metadata = {
  title: "Bhartat Story",
  description: "Bharat Storytellers is a community of storytellers who share stories of India and its culture.",
};

export default function RootLayout({ children }) {
  return (
    <div lang="en">
      <div className={`antialiased bg-[#FAF9F9]`}>
        {children}
      </div>
    </div>
  );
}
