import Fotter from "@/components/Fotter";
import JoinUs from "@/components/JoinUs";
import Journy from "@/components/ui/Home/Journy";
import OurPrograms from "@/components/ui/Home/OurPrograms";
import Hero from "@/components/ui/Home/Hero";
import Testimonials from "@/components/ui/Testimonials";
import PublicSpeakingCard from "@/components/ui/Home/WhyLearnPyblicSpeaking";
import {WhyChooseUs}  from "@/components/ui/Home/WhyChoseUs";


// TODO: fix why chose us Section

export default function Home() {
  return (
    <div className="w-full ">
      <Hero />
      <PublicSpeakingCard />
      <WhyChooseUs />
      <OurPrograms />
      <Journy />
      <Testimonials />
      <JoinUs title="Visit Bharat Storytellers and Become a member today!" subHeading={"Become a member"} />
    </div>
  );
}
