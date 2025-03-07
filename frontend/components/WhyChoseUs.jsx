import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import WhyChoseUsCard from "./ui/WhyChoseUsCard.jsx";
import CoachingCarousel from "./WhyWedifferent";

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
    <section className=" flex flex-col w-full md:w-[93%] mx-auto shadow-md my-5 border-t-4 border-gray-100">
      <div className="p-5">
        <div className="w-[90%] md:w-full mx-auto mb-8 border-t-2  py-4 bg-blue-100  border-gray-200  rounded-xl ">

          <div
            className="rounded-lg p-10 text-white flex flex-col items-start justify-start gap-5 "
            style={{
              backgroundImage: `url(/features/whyhero.svg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(92, 149, 255, 1)",
              backgroundBlendMode: "darken",
            }}
          >
            <h1 className="font-bold text-4xl">Speak With Confidence</h1>
            <p className="text-base leading-none">
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

        </div>


      </div>

      <CoachingCarousel />
    </section>
  );
}



