import React from "react";
import { Button } from "./ui/button";
import { BubbleCard } from "./ui/BubbleCard";
import { findAClubImg, notesImg, youngOratersImg } from "@/lib/data/images";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

const JoinUs = ({ BubbleColor, subHeading, title }) => {
  return (
    <div className="flex">
      <div
        className=" m-12 h-[300px] w-[55%] relative overflow-hidden rounded-lg shadow-md flex items-start  flex-col gap-8  p-5"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      >
        <div className="flex flex-col items-start justify-start ">
          <p className="text-lg font-extralight ">{subHeading}</p>
          <h1 className="text-3xl font-semibold leading-none">{title}</h1>
        </div>

        <Button text="Become a member" className="mt-5 bg-blue-400 ">
          Become a member
        </Button>
        <>
          <div
            className="absolute right-16 top-3 w-20 h-20 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
          <div
            className="absolute top-15 right-16 w-32 h-32 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
          <div
            className="absolute -right-16 top-0 w-40 h-40 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
          <div
            className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
        </>
      </div>

      <div
        className=" m-12 h-[300px] w-[35%] relative overflow-hidden rounded-lg shadow-md flex items-start  flex-col gap-10  p-5"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      >
        <div className="flex flex-col items-start justify-start ">
          <h1 className="text-2xl font-semibold leading-none">{'Find A Club'}</h1>   
          <p className="text-base font-extralight leading-none">{"nearest to you within seconds"}</p>
        </div>

        <Button text="Find a club" className=" absolute top-1 right-1 rounded-full w-16 h-16 bg-blue-400 ">
          <GoArrowUpRight />
        </Button>

        {/* Main image */}
                <div
                  className={ "w-36 h-36 absolute bottom-4 left-4"}
                >
                  <Image src={findAClubImg} alt={'someting '} layout="fill" />
                </div>


        <>
          <div
            className="absolute right-16 top-3 w-20 h-20 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
          <div
            className="absolute top-15 right-16 w-32 h-32 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
          <div
            className="absolute -right-16 top-0 w-40 h-40 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
          <div
            className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full"
            style={{ background: "rgba(92, 149, 255, 0.3)" }}
          ></div>
        </>
      </div>



    </div>
  );
};

export default JoinUs;

{
  /* <BubbleCard
cardSize="button" // "large", "small", or "button"
bubbleVariant="default" // "default", "small", or "normal"
title="Visit Bharat Storytellers and Become a member today!"
buttonText="Become a member"
subHeading="Become a member"
BubbleColor={{ background: "rgba(92, 149, 255, 0.3)" }}
cardColor={{ background: "rgba(92, 149, 255, 0.3)" }}
/> */
}
