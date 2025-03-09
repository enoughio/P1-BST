import React from "react";
import Image from "next/image";
import { aspiringProfessionalsImg, bhopalStorytellersImg, oratoFestImg, podcastImg, youngOratersImg } from "@/lib/data/images";
import { BubbleCard } from "./ui/BubbleCard";

const OurPrograms = () => {
  return (
    <div className="mb-14 mt-4">
      <section className="wrapper  md:h-screen bg-[#FAF9F9] flex flex-col w-[92%] mx-auto ">
        <div className="Header text-center flex flex-col items-center mb-2">
          <div className="flex flex-col justify-end">
          <h1 className="text-4xl font-bold">Our <span className="decoration-red-300 underline decoration-[5px]">Programs</span></h1>
          </div>

          <div className="font-light max-w-[600px] md:max-w-[800px] mt-2 leading-5">
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
                  BubbleColor= {{background: "rgba(193, 18, 31, .08)"}}
                  cardColor = {{ background: "rgba(193, 18, 31, .08)" }}
                  discription="Our Young Orators program is designed to help kids develop public speaking skills and build confidence. Through fun and engaging activities, kids learn how to express themselves clearly and confidently in front of an audience, setting them up for success in school and beyond."
                  image={youngOratersImg} // image path
                  className="cursor-pointer inline-block md:hidden"
              />
            <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="normal" // "default", "small", or "normal"
                  title="Bhopal Storytellers"
                  subHeading="For Adults"
                  discription="Bhopal Storytellers program is designed for Professionals seeking to enhance their public speaking and storytelling skills. Through interactive workshops and practical exercises, participants learn to communicate confidently and effectively, mastering techniques that engage and inspire audiences."
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={bhopalStorytellersImg} // image path
                  className="cursor-pointer"
              />
              <BubbleCard 
                  cardSize="large" // "large" or "small"
                  bubbleVariant="default" // "default", "small", or "normal"
                  title="Young Oratars"
                  subHeading="for young kids"
                  BubbleColor= {{background: "rgba(193, 18, 31, .12)"}}
                  cardColor = {{ background: "rgba(193, 18, 31, .12)" }}
                  discription="Our Young Orators program is designed to help kids develop public speaking skills and build confidence. Through fun and engaging activities, kids learn how to express themselves clearly and confidently in front of an audience, setting them up for success in school and beyond."
                  image={youngOratersImg} // image path
                  className="cursor-pointer hidden md:inline-block"
              />
             
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="normal" // "default", "small", or "normal"
                  title="Aspiring Professionals"
                  subHeading="For College Students"
                  discription="Aspiring Professionals program is designed for college students and young professionals looking to enhance their public speaking and communication skills. Participants learn to craft compelling messages, deliver engaging presentations, and connect with audiences in a meaningful way, setting them up for success in their careers."
                  BubbleColor= {{ background: "rgba(193, 18, 31, .12)" }}
                  cardColor = {{ background: "rgba(193, 18, 31, .12)" }}
                  image={aspiringProfessionalsImg} // image path
                  className="cursor-pointer"
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="default" // "default", "small", or "normal"
                  title="Orato Fest"
                  subHeading="For Everyone"
                  discription="Orato Fest is an annual public speaking festival that brings together speakers of all ages and backgrounds to share their stories and ideas. Participants can take part in workshops, competitions, and performances, gaining valuable experience and feedback from expert coaches and judges."
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={oratoFestImg} // image path
                  className="cursor-pointer"
              />
              <BubbleCard 
                  cardSize="small" // "large" or "small"
                  bubbleVariant="normal" // "default", "small", or "normal"
                  title="Expert Sessions"
                  subHeading="Panel Discussions"
                  discription="Expert Sessions feature panel discussions and podcasts with industry leaders, entrepreneurs, and public speaking experts. Participants gain valuable insights and practical tips to help them succeed in their personal and professional lives."
                  BubbleColor= {{ background: "rgba(92, 149, 255, 0.3)" }}
                  cardColor = {{ background: "rgba(92, 149, 255, 0.3)" }}
                  image={podcastImg} // image path
                  className="cursor-pointer"
              />

            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default OurPrograms;
