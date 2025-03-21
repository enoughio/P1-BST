import React from "react";
import { Button } from "./ui/button";
import { findAClubImg, youngOratersImg } from "@/lib/data/images";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

const MemberCard = ({ subHeading, title }) => (
  <div
    className="h-[300px] w-[55%] relative overflow-hidden rounded-lg shadow-md flex items-start flex-col gap-8 p-5"
    style={{ background: "rgba(92, 149, 255, 0.3)" }}
  >
    <div className="flex flex-col items-start justify-start">
      <p className="text-lg font-extralight">{subHeading}</p>
      <h1 className="text-3xl font-semibold leading-none">{title}</h1>
    </div>
    <Button text="Become a member" className="mt-5 bg-blue-400">
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
    <div className={"w-36 h-36 absolute bottom-4 left-4"}>
      <Image src={findAClubImg} alt={"someting "} layout="fill" />
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
