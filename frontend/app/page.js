import Fotter from "@/components/Fotter";
import JoinUs from "@/components/JoinUs";
import Journy from "@/components/Journy";
import OurPrograms from "@/components/OurPrograms";
import Hero from "@/components/ui/Hero";
import Testimonials from "@/components/ui/Testimonials";
import { WhyChooseUs } from "@/components/WhyChoseUs";
import Image from "next/image";


export default function Home() {
  return (
    <div className="w-full h-full">
      <Hero />
      <WhyChooseUs />
      <OurPrograms />
      <Journy />
      <Testimonials />
      <JoinUs title="Visit Bharat Storytellers and Become a member today!" subHeading={"Become a member"} />
      <Fotter />

    </div>
  );
}
