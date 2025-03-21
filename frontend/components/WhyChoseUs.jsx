import Image from "next/image";
import { LuMoveUpRight } from "react-icons/lu";
import SmallFatArrow from "./ui/SmallFatArrow";

// import { LuMoveUpRight } from "lucide-react"

const features = [
  {
    title: "Transform Your Public Speaking Skills",
    description:
      "Everyone has a story worth telling. Our structured programs build your confidence and communication skills, whether you're a beginner or an experienced speaker. With expert guidance and a supportive community, you'll refine your craft, becoming more persuasive, confident, and impactful in any setting.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Unlock New Opportunities For Growth",
    description:
      "Joining Bharat Storytellers goes beyond public speaking. As you refine your storytelling and communication skills, you'll gain confidence, expand career opportunities, and enhance your ability to lead and inspire—leading to professional success and stronger relationships.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Connect With A Like-Minded Community",
    description:
      "Bharat Storytellers is more than a club—it’s a network of passionate individuals dedicated to growth and success. Surround yourself with like-minded people, collaborate, and build lasting connections while mastering storytelling and communication.",
    image: "/placeholder.svg?height=400&width=600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="wrapper w-[95%]  bg-[#F9F9F9] mx-auto">
      <div className="main-container w-full  flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <div className="w-full flex flex-col items-center justify-center">
            <div>
              <h1 className="text-5xl font-bold">Why Chose Us</h1>
              <div className="w-[70%]  h-2 bg-red-300 "> </div>
            </div>
          </div>
          <div>
            <p>Quo excepturi quos eum voluptas dicta ut enim deserunt</p>
          </div>
        </div>

        {/* <div className="flex flex- items-center justify-center w-full bg-yellow-100"> */}
        {/* //cards */}

        <div className="flex flex-col md:flex-row items-start justify-center w-full rounded-lg overflow-hidden gap-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col w-full p-1 md:w-1/3 items-center justify-center bg-blue"
            >
              <div>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  height={400}
                  width={600}
                />
              </div>

              <div className="relative bg-red-200 p-4 rounded-b-lg w-full">
                <div >
                  <div className="absolute top-0 right-0" >
                    <SmallFatArrow />
                  </div>
                  <h1 className="text-xl mb-3 leading-none font-bold flex justify-between ">
                    {feature.title}
                  </h1>
                </div>
                <p className="text-md font-thin leading-tight tracking-tight">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* </div> */}
      </div>
    </section>
  );
}
