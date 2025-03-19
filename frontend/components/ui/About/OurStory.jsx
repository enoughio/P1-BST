import React from "react";
import Image from "next/image";
import { grid1, grid2, grid3, grid4, grid5, grid8 } from "@/lib/data/images";

const OurStory = () => {
  return (
    <section className="w-full md:px-4 py-4 shadow-md rounded-lg shadow-gray-400 my-6">
      {/* Side accent */}

      {/* Title Section */}
      <div className="w-fit my-5 mx-2 md:mx-2">
        <h3 className="text-4xl font-medium">Our Story</h3>
        <div className="w-[80%] h-1 bg-blue-200 rounded-full"></div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Layout - Image Grid on Left */}
        <div className="hidden lg:block lg:w-1/2">

        <div className=" h-full grid grid-cols-12 gap-2 mx-auto">
      {/* Left column */}
      <div className="col-span-5 grid grid-rows-2 gap-2">
        {/* Top left image */}
        <div className="row-span-1 relative rounded-lg overflow-hidden bg-teal-100">
          <Image
            src={grid4}
            objectFit="cover"
            fill
            alt="Person with microphone"
            className=""
          />
        </div>
        
        {/* Bottom left image */}
        <div className="row-span-1 relative rounded-lg overflow-hidden bg-purple-100">
          <Image
            src={grid3}
            objectFit="cover"
            fill
            alt="Child with book"
            className=" "
          />
        </div>
      </div>
      
      {/* Middle column */}
      <div className="col-span-4 relative rounded-lg overflow-hidden bg-blue-100">
        <Image
          src={grid1}
          fill
          objectFit="cover"
          alt="Speaker on stage"
          className=" object-cover"
        />
      </div>
      
      {/* Right column */}
      <div className="col-span-3 grid grid-rows-2 gap-2">
        {/* Top right image */}
        <div className="row-span-1 relative rounded-lg overflow-hidden bg-purple-100">
          <Image
            src={grid5}
            fill
            objectFit="cover"
            alt="Person with microphone"
            className=" "
          />
        </div>
        
        {/* Bottom right image */}
        <div className="row-span-1 relative rounded-lg overflow-hidden bg-pink-100">
          <Image
            src={grid8}
            alt="Child writing"
            fill
            className=""
          />
        </div>
      </div>
    </div>

                  </div>

        {/* Content Text Box - Right side on desktop, top on mobile */}
        <div className="lg:w-[45vw] bg-blue-50 rounded-3xl p-6 md:p-8 border-2 border-blue-200 shadow-md shadow-gray-300">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            This is How we Started
            <div className="h-1 w-40 bg-blue-300 "></div>
          </h3>

          <div className="space-y-4">
            <p>
            Over time, our small gathering transformed into a thriving network of passionate individuals from across India. Through storytelling, we have built connections, fostered learning, and encouraged self-expression, making our community a place of growth and inspiration.
            </p>

            <p>
            Over time, our small gathering transformed into a thriving network of passionate individuals from across India. Through storytelling, we have built connections, fostered learning, and encouraged self-expression, making our community a place of growth and inspiration.
            </p>
            <p className="hidden md:block">
            Our journey is a testament to the power of stories and the bonds they create. As we continue to expand, we remain committed to providing a platform where individuals can express themselves, share their narratives, and inspire others along the way.
            </p>
          </div>
        </div>

        {/* Mobile Image Gallery - Only visible on small screens */}
        <div className="grid grid-cols-6 gap-3 lg:hidden">
          {/* First row: two images */}
          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={grid4}
              alt="Person in orange sweater speaking"
              width={200}
              height={200}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          {/* Tall center image spanning two rows */}
          <div className="col-span-3 row-span-2 rounded-xl overflow-hidden">
            <Image
              src={grid3}
              alt="Person with microphone on stage"
              width={200}
              height={400}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          {/* Second row: two images on left */}
          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={grid1}
              alt="Young girl reading"
              width={200}
              height={200}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          {/* Third row: two images */}
          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={grid5}
              alt="Woman in yellow speaking"
              width={200}
              height={200}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={grid8}
              alt="Young girl writing"
              width={200}
              height={200}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
q