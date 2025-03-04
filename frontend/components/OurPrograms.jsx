import React from "react";
import Image from "next/image";
import { aspiringProfessionalsImg, bhopalStorytellersImg, oratoFestImg, podcastImg, youngOratersImg } from "@/lib/data/images";
import { BubbleCard } from "./ui/BubbleCard";

const OurPrograms = () => {
  return (
    <div className="mb-14 mt-4">
      <section className="wrapper  md:h-screen bg-[#FAF9F9] flex flex-col w-[95%] mx-auto ">
        <div className="Header text-center flex flex-col items-center my-5">
          <div className="flex flex-col justify-end">
          <h1 className="text-5xl font-bold">Our <span className="decoration-red-300 underline decoration-[5px]">Programs</span></h1>
          </div>

          <div className="line w-[80%] mt-2 leading-5">
            Whether you’re an adult looking to build confidence or a young
            speaker eager to find your voice, our programs cater to all skill
            levels and age groups.
          </div>
        </div>

        <div className="Programs">
          <div className="flex w-full items-center justify-center">
            <div className="grid w-full gap-4 p-2 grid-cols-4 grid-rows-6 md:grid-cols-6 md:grid-rows-4 rounded-lg shadow-md">
        
              <BubbleCard 
                  cardSize="large" // "large" or "small"
                  bubbleVariant="default" // "default", "small", or "normal"
                  title="Young Oratars"
                  subHeading="for young kids"
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={youngOratersImg} // image path
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="normal" // "default", "small", or "normal"
                  title="Young Oraters"
                  subHeading="for young kids"
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={bhopalStorytellersImg} // image path
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="normal" // "default", "small", or "normal"
                  title="Young Oraters"
                  subHeading="for young kids"
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={aspiringProfessionalsImg} // image path
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="default" // "default", "small", or "normal"
                  title="Young Oraters"
                  subHeading="for young kids"
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={oratoFestImg} // image path
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="normal" // "default", "small", or "normal"
                  title="Young Oraters"
                  subHeading="for young kids"
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={podcastImg} // image path
              />

            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default OurPrograms;
