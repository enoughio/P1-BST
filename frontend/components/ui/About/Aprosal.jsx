"use client";
import { groupPhoto, storyTellingImage } from "@/lib/data/images";
import Image from "next/image";
import React from 'react';

const StorytellingCommunitySection = () => {
  return (
    <div className="w-full bg-pink-50 p-4 md:p-6 lg:p-8 rounded-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden max-h-[40vh] md:max-h-[40vh]">
          <Image
            src={groupPhoto} 
            alt="Teacher reading to children"
            width={600}
            height={400}
            className="w-full h-full object-left-top rounded-lg"
          />
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-1/2 py-4 md:py-6 px-2 md:px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Become Part of Our Storytelling Community!
          </h2>
          
          <p className="text-sm md:text-base text-gray-700 mb-6">
            At obcaecati consequatur ut aliquam architecto qui esse ducimus et omnis quia quo nisi quasi et accusamus doloribus. Id dolores temporibus et tempora iste et provident explicabo est omnis earum At perspiciatis nesciunt.
          </p>
          
          <button className="bg-pink-200 hover:bg-pink-300 text-gray-800 font-medium py-2 px-4 md:px-6 rounded-full flex items-center transition duration-300">
            BECOME A MEMBER
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorytellingCommunitySection;