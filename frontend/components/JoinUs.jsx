import React from "react";
import { Button } from "./ui/button";
import { findAClubImg, youngOratersImg } from "@/lib/data/images";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

const MemberCard = ({ subHeading, title }) => (
  <div
    className="h-[300px] w-[55%] relative overflow-hidden rounded-lg shadow-md flex items-start justify-between flex-col gap-8 p-5"
    style={{ background: "rgba(92, 149, 255, 0.3)" }}
  >
    <div className="flex flex-col items-start justify-start">
      <p className="text-lg font-extralight">{subHeading}</p>
      <h1 className="text-2xl font-semibold leading-none">{title}</h1>
    </div>
    <Button
      asChild
      className="bg-pink-100 text-black w-1/2  md:w-1/4 hover:bg-pink-200 h-10 rounded-3xl m-0 p-0 relative overflow-hidden z-10"
      size="lg"
    >
      <div>
        {/* bubbles */}
        <>
          <div className="absolute -top-2 -right-8 w-16 h-16 bg-[#1150c4] rounded-full"></div>
          <div className="absolute -bottom-5 -right-2 w-16 h-16 bg-[#df121f] rounded-full"></div>
        </>

        <Link href="#">Explore Programs</Link>
      </div>
    </Button>
    <>
      <div
        className="absolute inline-block md:hidden md:right-6 -right-10 top-20 md:top-20 bottom-14 w-14 h-14 md:w-20 md:h-20 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div>
      <div
        className="absolute hidden md:inline-block md:top-20 top-24 -right-10 md:right-10 w-20 h-20 md:w-32 md:h-32 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div>
      <div
        className="absolute  -right-20 md:top-0 top-28 w-40 h-40 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div>
      <div
        className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div>
    </>
  </div>
);

const ClubCard = () => (
  <div
    className=" h-[300px] w-[35%] relative overflow-hidden rounded-lg shadow-md flex items-start flex-col gap-10 p-5"
    style={{ background: "rgba(92, 149, 255, 0.3)" }}
  >
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-2xl font-semibold leading-none">Find A Club</h1>
      <p className="text-base font-extralight leading-none">
        nearest to you within seconds
      </p>
    </div>
    <Button
      text="Find a club"
      className="absolute top-1 right-1 rounded-full w-14 h-14 bg-white font-bold hover:bg-gray-200 hover:scale-105 z-50"
    >
      <GoArrowUpRight />
    </Button>
    <div className={"w-36 h-36 absolute bottom-16 md:bottom-4 md:left-4 left-0 z-10"}>
      <Image src={findAClubImg} alt={"someting "} layout="fill" />
    </div>
    <>
      <div
        className="absolute md:right-6 -right-10 top-20 md:top-20 bottom-14 w-14 h-14 md:w-20 md:h-20 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div>
      {/* <div
        className="absolute md:top-16 top-24 -right-10 md:-right-8 w-20 h-20 md:w-32 md:h-32 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div> */}
      <div
        className="absolute -right-20 md:top-0 top-28 w-40 h-40 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div>
      <div
        className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full"
        style={{ background: "rgba(92, 149, 255, 0.3)" }}
      ></div>
    </>
  </div>
);

const JoinUs = ({ BubbleColor, subHeading, title }) => {
  return (
    <div className="flex justify-center gap-4 mx-auto my-10">
      <MemberCard subHeading={subHeading} title={title} />
      <ClubCard />
    </div>
  );
};

export default JoinUs;
