import React from "react";
import Image from "next/image";
import { youngOratersImg } from "@/lib/data/images";
import { BubbleCard } from "./ui/BubbleCard";

const OurPrograms = () => {
  return (
    <div>
      <section className="wrapper w-full md:h-screen bg-[#FAF9F9] flex flex-col">
        <div className="Header text-center">
          <h1>Our Programs</h1>
          <div className="line">
            Whether you’re an adult looking to build confidence or a young
            speaker eager to find your voice, our programs cater to all skill
            levels and age groups.
          </div>
        </div>

        <div className="Programs">
          <div className="flex w-full items-center justify-center">
            <div className="grid w-[90%] gap-4 p-2 grid-cols-4 grid-rows-6 md:grid-cols-6 md:grid-rows-4 rounded-lg shadow-md">
        
              <BubbleCard 
                  cardSize="large" // "large" or "small"
                  bubbleVariant="default" // "default", "small", or "normal"
                  title="Young Oraters"
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
                  image={youngOratersImg} // image path
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="normal" // "default", "small", or "normal"
                  title="Young Oraters"
                  subHeading="for young kids"
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={youngOratersImg} // image path
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="default" // "default", "small", or "normal"
                  title="Young Oraters"
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
                  image={youngOratersImg} // image path
              />

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPrograms;
