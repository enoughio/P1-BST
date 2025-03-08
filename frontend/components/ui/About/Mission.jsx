import { mission1, mission2, mission3 } from "@/lib/data/images";
import Image from "next/image";
import React from "react";

const Mission = () => {
  return (
    <section className="my-6 mx-2">
      <div className="flex flex-col w-full items-center mb-8 ">
        <div className="text-3xl font-medium flex">
          <div>
            <h3>Mission</h3>
            <div className="w-[80%] h-1 bg-red-200 rounded-full"></div>
          </div>

          <div className="mx-2">and</div>

          <div>
            <h3>Vision</h3>
            <div className="w-[70%] h-1 bg-red-200 rounded-full"></div>
          </div>
        </div>

        <p className="w-full md:w-[60%] text-center mt-1">
          Whether you're an adult looking to build confidence or a young speaker
          eager to find your voice, our programs cater to all skill levels and
          age groups.
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-5  ">
        {/* left card */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="border-blue-100 border-2 p-4 w-full md:w-1/2 md:py-8 bg-blue-50 rounded-3xl shadow-lg shadow-gray-300 ">
            <div className="flex flex-col w-fit">
              <h1 className="font-semibold text-5xl leading-none">Mission</h1>
              <div className="bg-blue-400 w-[70%] h-1 self-end rounded-3xl"></div>
            </div>

            <div className="mt-6 ">
              <p>
                At Bharat Storytellers, we believe that every voice has a story
                to tell, and every story deserves to be heard. Everyone has a
                unique perspective, and sharing these stories helps build
                connections and understanding.
              </p>
              <p className="mt-6">
                Our mission is to empower individuals to find their voice,
                articulate their ideas, and express themselves with confidence.
                Through storytelling and public speaking, we help people connect
                with the world and make a lasting impact.
              </p>
            </div>
          </div>

          <div className="border-blue-100 border-2 p-4 w-full md:w-1/2 md:py-8 bg-blue-50 rounded-3xl shadow-lg shadow-gray-300 ">
            <div className="flex flex-col w-fit">
              <h1 className="font-semibold text-5xl leading-none">Vision</h1>
              <div className="bg-blue-400 w-[70%] h-1 self-end rounded-3xl"></div>
            </div>

            <div className="mt-6">
              <p>
                We envision a world where communication barriers are broken,
                enabling people from all backgrounds to express themselves with
                confidence. Everyone should have the opportunity to share their
                stories, connect with others, and make their voices heard.
              </p>
              <p className="mt-6">
                Through our programs, we strive to build a supportive community
                that fosters mutual growth and learning. By embracing the power
                of storytelling, we inspire individuals to develop their
                communication skills and create meaningful connections.
              </p>
            </div>
          </div>
        </div>

        {/* right Images */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-3 w-full md:w-auto ">
          <div className="w-full flex justify-center ">
            <Image
              src={mission1}
              alt="mission images"
              width={250}
              height={250}
              className="w-full h-auto max-w-[250px] object-cover rounded-lg shadow-lg shadow-gray-300 "
            />
          </div>
          <div className="w-full flex justify-center">
            <Image
              src={mission2}
              alt="mission images"
              width={250}
              height={250}
              className="w-full h-auto max-w-[250px] object-cover rounded-lg"
            />
          </div>
          <div className="w-full flex justify-center">
            <Image
              src={mission3}
              alt="mission images"
              width={250}
              height={250}
              className="w-full h-auto max-w-[250px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
