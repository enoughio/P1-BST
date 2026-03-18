import React from "react";
import { programsData } from "@/lib/data/programsData"; // Import the programs data
import { BubbleCard } from "../BubbleCard";

const OurPrograms = () => {
  return (
    <div className="mb-14 mt-4 ">
      <section className="wrapper md:h-screen bg-[#FAF9F9] flex flex-col w-[92%] mx-auto">
        <div className="Header text-center flex flex-col items-center mb-2">
          <div className="flex flex-col justify-end">
            <h1 className="text-4xl font-bold">
              Our{" "}
              <span className="decoration-[#D1BFA9] underline decoration-[5px]">
                Programs
              </span>
            </h1>
          </div>

          <div className="font-light max-w-[600px] md:max-w-[800px] mt-2 leading-5">
            Whether you’re an adult looking to build confidence or a young
            speaker eager to find your voice, our programs cater to all skill
            levels and age groups.
          </div>
        </div>

        <div className="Programs ">
          <div className="flex w-full items-center justify-center">
            <div className="grid w-full gap-4 p-2 grid-cols-4 grid-rows-6 md:grid-cols-6 md:grid-rows-4 rounded-lg shadow-md">
              {programsData.map((program, index) => (
                <BubbleCard key={index} {...program} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPrograms;