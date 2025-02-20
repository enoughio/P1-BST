import React from "react";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";

const testimonials = [
  {
    quote:
      "I couldn't be happier with my experience! The team went above and beyond to meet my needs, and the results were better than I ever imagined. I highly recommend them to anyone looking for exceptional service.",
    author: "Reyna Mitchells",
    handle: "@reynaMitchells",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "I couldn't be happier with my experience! The team went above and beyond to meet my needs, and the results were better than I ever imagined. I highly recommend them to anyone looking for exceptional service.",
    author: "Reyna Mitchells",
    handle: "@reynaMitchells",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "I couldn't be happier with my experience! The team went above and beyond to meet my needs, and the results were better than I ever imagined. I highly recommend them to anyone looking for exceptional service.",
    author: "Reyna Mitchells",
    handle: "@reynaMitchells",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

const Testimonials = () => {
  return (
    <div className="flex-col flex justify-center items-center  bg-blue-100 py-10">
      <div className="self-center text-center mb-5">
        <h1 className="font-semibold text-2xl">Testimonials</h1>
        <div>This what our Members say about us</div>
      </div>

      {/* cards */}
      <div className="flex flex-row  justify-center items-center gap-4 mx-10">
        {testimonials.map((testimonial, indx) => (
          // card
          <div key={indx} className="py-5 bg-white w-[90%] md:w-1/3 flex justify-center items gap-1 backdrop-blur-xl rounded-2xl overflow-hidden">
            <div className="w-[50%] h-full flex flex-col justify-center items-center gap-3">
              <div className="w-full h-auto">
                <Image
                  alt="member Image"
                  src={testimonial.avatar}
                  width={300}
                  height={300}
                  className="rounded-full bottom-2 w-32 h-32 border-2 border-black mx-auto"
                />
              </div>
              <div className="text-center">
                <h2 className="text-[.7rem] leading-none">{testimonial.author}</h2>
                <h3 className="text-[.4rem]">{testimonial.handle}</h3>
              </div>
            </div>
            <div className="text-sm max-w-[55%] flex flex-col justify-center h-full gap-3">
              <p className="text-xs">{testimonial.quote}</p>
              <div className="stars flex">
                <span><IoStarSharp /></span>
                <span><IoStarSharp /></span>
                <span><IoStarSharp /></span>
                <span><IoStarSharp /></span>
                <span><IoStarSharp /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
