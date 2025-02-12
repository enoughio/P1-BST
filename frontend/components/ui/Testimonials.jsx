import React from "react";
import Image from "next/image";
import { youngOratersImg } from "@/lib/data/images";

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
    <div className=" h-[50vh] w-full flex-col flex justify-center items-center mb-80">
      <div className="self-center text-center">
        <h1>Testimonials</h1>
        <div>This what out Memebers say about us</div>
      </div>

      {/* cards */}
      <div className="  h-[90%] w-1/3 flex justify-center items-center  gap-1 border-2 rounded-2xl overflow-hidden ">
        <div className=" w-[50%] h-full flex flex-col justify-center items-center gap-3 ">
          <div className="w-full h-auto ">
            <Image
              alt="member Image"
              src={"/placeholder.svg"}
              // alt={testimonial.author}
              width={300}
              height={300}
              className="rounded-full bottom-2 w-32 h-32 border-2 border-black mx-auto "
            />
          </div>

          <div className="text-center">
            <h2 className="text-[.7rem] leading-none">Member Name</h2>
            <h3 className="text-[.4rem]">@Stundent at Manit</h3>
          </div>
        </div>

        <div className=" text-sm max-w-[55%] p-3 flex flex-col justify-center h-full gap-3">
          <p className="text-xs">
            “I couldn’t be happier with my experience! The team went above and
            beyond to meet my needs, and the results were better than I ever
            imagined. I highly recommend them to anyone looking for exceptional
            service.”
          </p>

          <div className="stars flex  ">
            <span>o</span>
            <span>o</span>
            <span>o</span>
            <span>o</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
