import OurPrograms from "@/components/OurPrograms";
import  Hero  from "@/components/ui/Hero";
import { WhyChooseUs } from "@/components/WhyChoseUs";
import Image from "next/image";


export default function Home() {
  return (
    <div className="w-full h-full">
      <Hero /> 
      <WhyChooseUs />     
      <OurPrograms />
    </div>
  );
}
