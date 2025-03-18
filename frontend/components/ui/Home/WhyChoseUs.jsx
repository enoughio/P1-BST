import { Button } from "../button";
import Link from "next/link";
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
    <section className=" flex flex-col w-full md:w-[93%] mx-auto shadow-md my-2 border-t-4 border-gray-100">
      <div className="p-5">
        <div className="w-[90%] md:w-full mx-auto mb-2 border-t-2  py-4  border-gray-200  rounded-xl ">
          <div
            className="rounded-lg p-10  flex flex-col items-start justify-start gap-5 "
            style={{
              // backgroundImage: `url(/features/whyhero.svg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(92, 149, 255, .2)",
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
              variant="outline"
              className=" w-1/2 md:min-w-[250px]  md:max-w-[350px] h-12 sm:h-20 rounded-3xl  relative overflow-hidden"
              size="lg"
              style={{
                backgroundColor: "rgba(92, 149, 255, .2)",
              }}
            >
              <div>
                {/* bubbles */}
                <>
                  <div
                    className="absolute -top-2 -right-8 w-16 h-16  rounded-full"
                    style={{
                      backgroundColor: "rgba(92, 149, 255, .2)",
                    }}
                  ></div>
                  <div
                    className="absolute -bottom-5 -right-2 w-16 h-16  rounded-full"
                    style={{
                      backgroundColor: "rgba(92, 149, 255, .2)",
                    }}
                  ></div>
                </>

                <Link href="/membership" className="md:text-2xl z-10">
                  Register Now
                </Link>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <CoachingCarousel />
    </section>
  );
}
