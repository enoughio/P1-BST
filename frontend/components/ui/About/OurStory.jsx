import React from "react";
import Image from "next/image";
import { gridImage } from "@/lib/data/images";

const OurStory = () => {
  return (
    <section className="w-full md:px-2 ">
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
          <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full">
            {/* Top left - Large image */}
            <div className="col-span-6 row-span-6 rounded-xl overflow-hidden">
              <Image
                src={gridImage}
                alt="Person in orange sweater speaking"
                width={300}
                height={250}
                className="w-full h-full object-cover bg-pink-200"
              />
            </div>

            {/* Top right and middle - Tall image */}
            <div className="col-span-6 row-span-8 rounded-xl overflow-hidden">
              <Image
                src={gridImage}
                alt="Person with microphone on stage"
                width={300}
                height={400}
                className="w-full h-full object-cover bg-pink-200"
              />
            </div>

            {/* Bottom left - Small image */}
            <div className="col-span-6 row-span-6 rounded-xl overflow-hidden">
              <Image
                src={gridImage}
                alt="Young girl reading"
                width={300}
                height={300}
                className="w-full h-full object-cover bg-pink-200"
              />
            </div>

            {/* Bottom right top - Woman in yellow */}
            <div className="col-span-6 row-span-4 rounded-xl overflow-hidden">
              <Image
                src={gridImage}
                alt="Woman in yellow speaking"
                width={300}
                height={200}
                className="w-full h-full object-cover bg-pink-200"
              />
            </div>

            {/* Bottom right bottom - Young girl writing */}
            {/* <div className="col-span-6 row-span-4 rounded-xl overflow-hidden">
              <Image 
                src="/api/placeholder/300/200" 
                alt="Young girl writing" 
                width={300} 
                height={200}
                className="w-full h-full object-cover bg-pink-200"
              />
            </div> */}
          </div>
        </div>

        {/* Content Text Box - Right side on desktop, top on mobile */}
        <div className="lg:w-1/2 bg-blue-50 rounded-3xl p-6 md:p-8 border-2 border-blue-200">
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
            <p>
            Our journey is a testament to the power of stories and the bonds they create. As we continue to expand, we remain committed to providing a platform where individuals can express themselves, share their narratives, and inspire others along the way.
            </p>
          </div>
        </div>

        {/* Mobile Image Gallery - Only visible on small screens */}
        <div className="grid grid-cols-6 gap-3 lg:hidden">
          {/* First row: two images */}
          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={gridImage}
              alt="Person in orange sweater speaking"
              width={200}
              height={200}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          {/* Tall center image spanning two rows */}
          <div className="col-span-3 row-span-2 rounded-xl overflow-hidden">
            <Image
              src={gridImage}
              alt="Person with microphone on stage"
              width={200}
              height={400}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          {/* Second row: two images on left */}
          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={gridImage}
              alt="Young girl reading"
              width={200}
              height={200}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          {/* Third row: two images */}
          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={gridImage}
              alt="Woman in yellow speaking"
              width={200}
              height={200}
              className="w-full h-full object-cover bg-purple-400"
            />
          </div>

          <div className="col-span-3 aspect-square rounded-xl overflow-hidden">
            <Image
              src={gridImage}
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
