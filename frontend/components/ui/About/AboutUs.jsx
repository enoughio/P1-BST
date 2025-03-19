import {  aboutHero, downQuot } from "@/lib/data/images";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center md:gap-8 gap-4  w-full mt-6">
      <div className="border-red-200 border-2 m-2  p-2 md:p-4 w-full md:w-1/2 rounded-3xl shadow-md ">
        <div className="flex flex-col justify-between items-center w-full relative ">
          <p className="p-2 text-[.93rem] ">
            <Image
              src={downQuot}
              alt="downQuot"
              width={30}
              height={30}
              className="rotate-180 self-start inline-block mr-6 pt-1"
            />
            Bharat Storytellers is more than just an organization; it’s a
            supportive community dedicated to helping you unlock your potential
            as a communicator and leader. We believe that everyone has a story
            to tell and a unique voice to share. Through our platform,
            individuals can develop the confidence and skills needed to
            articulate their thoughts effectively, inspire others, and leave a
            lasting impact.
            <Image
              src={downQuot}
              alt="downQuot"
              width={30}
              height={30}
              className="self-end inline-block mx-3 mt-3"
            />
          </p>
        </div>

        <div className="mt-2">
          <Image
            src={aboutHero}
            alt="mission"
            className="rounded-md object-cover mx-auto"
            width={670}
            height={320}
          />
        </div>
      </div>

      <div className="border-blue-100 border-2 p-4  w-full md:w-1/2 md:py-8 bg-blue-50 rounded-3xl shadow-lg shadow-gray-300  ">
        <div className="flex flex-col w-fit">
          <h1 className="font-semibold text-3xl leading-none">About Us</h1>
          <div className=" bg-blue-400 w-[70%] h-1 self-end rounded-3xl"></div>
        </div>

        <div className="mt-6 text-[.93rem]  ">
          <p>
            Bharat Storytellers helps individuals master communication. Conquer
            public speaking fears, refine storytelling, or connect with
            like-minded individuals. Through workshops, sessions, and expert
            discussions, we provide tools to boost confidence and skills
          </p>
          <p className="mt-6">
            We host weekly meetings, specialized training sessions, and
            exclusive events designed to offer hands-on experience in a
            welcoming environment. Our community fosters growth, creativity, and
            collaboration, ensuring that every member feels empowered to share
            their voice. No matter where you are on your journey, Bharat
            Storytellers is the perfect place to develop your skills and become
            a more effective communicator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
