import { MainNav } from "@/components/ui/NavBar";

// export const experimental_ppr = true;

 


export const metadata = {
  title: "Bhartat Storytellers",
  description: "Bharat storytellers is an community learning platform for storytellers, where they can share their stories and learn from others.",
};

export default function RootLayout({ children }) {
  return (
    <div>
        {/* <MainNav /> */}
        {children}
    </div>
  );
}
