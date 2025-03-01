import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import Card from "./ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// import { LuMoveUpRight } from "lucide-react"
// TODO: fix card size

const features = [
  {
    title: "Expert Coaches",
    description:
    "Learn for our expert coaches who have years of experience in public speaking",
    image: "/features/why2.jpeg",
  },
  {
    title: "Real-World Practice",
    description:
    "Practice in a safe environment with real audience and get feedback.",
    image: "/features/why3.jpeg",
  },
  {
    title: "Personilized Feedback",
    description:
    "We help you identify your strength and areas for improvements",
    image: "/features/why4.jpeg",
  },
];

// bg-[#F9F9F9]

export function WhyChooseUs() {
  return (
    <section className=" flex flex-col w-[98%] md:w-[93%] mx-auto">
      <div className="flex flex-col items-center justify-center w-full mb-4">
        <div className="w-full flex flex-col items-center justify-start">
          <h1 className="text-5xl font-bold">Why Chose Us</h1>
          <p>Quo excepturi quos eum voluptas dicta ut enim deserunt</p>
        </div>
      </div>

      <div
        className="  rounded-lg  p-10 text-white flex flex-col items-start justify-start gap-5"
        style={{
          backgroundImage: `url(/features/whyhero.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(92, 149, 255, 1)",
          backgroundBlendMode: "darken",
        }}
      >
        <h1 className="font-bold text-4xl">Speak With Confidence</h1>
        <p className="text-base font-medium leading-none">
          Level up your public speaking skills with expert coaching and
          real-world practice. We're here to help you turn your next
          presentation into a performance
        </p>

        <Button
          asChild
          className="bg-pink-100 text-black w-1/4 hover:bg-pink-200 h-12 rounded-3xl m-0  relative overflow-hidden"
          size="lg"
        >
          <div>
            {/* bubbles */}
            <>
              <div className="absolute -top-2 -right-8 w-16 h-16 bg-[#1150c4] rounded-full"></div>
              <div className="absolute -bottom-5 -right-2 w-16 h-16 bg-[#df121f] rounded-full"></div>
            </>

            <Link href="/about">Know More about us</Link>
          </div>
        </Button>
      </div>

      <div className="flex flex-col items-start justify-center gap-3 my-5 w-[80%]">
        <h1 className="font-bold text-3xl">Why we're different</h1>

        <p className="">
          We believe that the best way to improve in public speaking is through
          Practice, feedback and hard Work, That's why our Sessions are designed
          to help you develope the skill you need to become a better speaker
        </p>
      </div>

      {/* cards  */}

      <div className="flex flex-row gap-3 w-full"> 
          {
            features.map((feature, index) => (
              <Card
                key={index}
                title={feature.title}
                description={feature.description}
                image={feature.image}
              />
            ))

          }
      </div>

    </section>
  );
}
