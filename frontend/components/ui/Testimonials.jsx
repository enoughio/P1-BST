import React from "react";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";

const testimonials = [
  {
    quote:
      "I've been in leadership roles since 2010 but struggled with precise communication. Bharat Storytellers helped me deliver impactful speeches within time, keeping my audience engaged.",
    author: "Piyush Kumar Kachhi",
    handle: "Seasoned Banker ",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "I always searched for a stage to learn and I found it with Bharat Storytellers. Here I got the people who encourages me and give their feedback so that I can improve myself. I know I am still not perfect but I can tell that I am a better speaker today.",
    author: "Vasanthi Rayapati",
    handle: "Student at MANIT",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "Joining Bharat Storytellers transformed my public speaking. The supportive environment refined my storytelling, making workshops engaging. I now master gestures, pauses, and impactful delivery!",
    author: "Utkrishti Katheriya",
    handle: "Counselling Psychologist",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

const Testimonials = () => {
  return (
    <div
      className="flex-col flex justify-center items-center bg-blue-100 py-5"
    >
      <div className="self-center text-center mb-2">
        <h1 className="font-semibold text-2xl">Testimonials</h1>
        <div>This what our Members say about us</div>
      </div>

      {/* cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mx-10 px-3">
        {testimonials.map((testimonial, indx) => (
          // card
          <div
            key={indx}
            className="py-6 bg-white  w-full md:w-1/3 flex flex-col justify-center items-center gap-2 backdrop-blur-xl rounded-2xl overflow-hidden min-h-52"
          >
            <div className=" h-full flex justify-center items-center gap-2 mx-2">
              <div className="w-full h-auto">
                <Image
                  alt="member Image"
                  src={testimonial.avatar}
                  width={300}
                  height={300}
                  className="rounded-full bottom-2 w-32 h-32 border-2 border-black mx-auto"
                />
              </div>
              <p className="text-xs max-w-[55%] mx-2">{testimonial.quote}</p>
            </div>

            <div className="text-sm ml-5 self-start  flex justify-center h-full gap-3">
              <div className="text-center flex flex-col justify-center items-center gap-1">
                <h2 className="text-[.9rem] leading-none">
                  {testimonial.author}
                </h2>
                <h3 className="text-[.6rem] max-w-[60%] leading-3 ">
                  {testimonial.handle}
                </h3>
              </div>
              <div className="stars flex">
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
                <span>
                  <IoStarSharp />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
