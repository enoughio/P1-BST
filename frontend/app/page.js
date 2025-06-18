import JoinUs from "@/components/JoinUs";
import Journy from "@/components/ui/Home/Journy";
import OurPrograms from "@/components/ui/Home/OurPrograms";
import Hero from "@/components/ui/Home/Hero";
import Testimonials from "@/components/ui/Testimonials";
import PublicSpeakingCard from "@/components/ui/Home/WhyLearnPyblicSpeaking";
import {WhyChooseUs}  from "@/components/ui/Home/WhyChoseUs";
import WhyStorytelling from "@/components/ui/Home/WhyStorytelling";


// TODO: fix why chose us Section

export default function Home() {
  return (
    <div className="w-full ">
      <div id="hero" >
      <Hero />
      </div>
      <div id="why-learn-public-speaking" >
      <PublicSpeakingCard />
      </div>
      <div id="why-storytelling" >
      <WhyStorytelling/>
      </div>

      <div id="why-choose-us" >
      <WhyChooseUs />
      </div>
      <div id="programs" >
      <OurPrograms />
      </div>

      <div id="journey" >
      <Journy />
      </div>
      <div  id="testimonials" >
      <Testimonials />
      </div>
      <JoinUs title="Visit Bharat Storytellers and Become a member today!" subHeading={"Become a member"} />
    </div>
  );
}
