// components/PublicSpeakingSection.jsx
import { AdvanceCareer, BostConfidence, DeliverSpeeches, ImproveNetworking } from '@/lib/data/images';
import Image from 'next/image';
import React from 'react';

const PublicSpeakingSection = () => {
  // Hardcoded data
  const title = "Why learn public speaking?";
  const description = "Public speaking is a valuable skill that can help you grow your career, build your brand, and make a positive impact on the world. Here are some of the key benefits of learning to speak with confidence.";
  const items = [
    {
      title: "Boost confidence",
      image: BostConfidence, // Remove curly braces
      description: "Gain the self-assurance to present yourself effectively.",
    },
    {
      title: "Advance your career",
      image: AdvanceCareer, // Remove curly braces
      description: "Open doors to new opportunities with strong presentation skills.",
    },
    {
      title: "Improve networking skills",
      image: ImproveNetworking, // Remove curly braces
      description: "Build meaningful connections through effective communication.",
    },
    {
      title: "Deliver impactful speeches",
      image: DeliverSpeeches, // Remove curly braces
      description: "Inspire and influence your audience with powerful delivery.",
    },
  ];

  return (
    <section className="my-2  py-4 mx-2 md:mx-12 border-t-2 border-gray-200 shadow-md rounded-lg bg-gradient-to-b from-[#F7EBEC]/20 to-[#F1D2D4]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-start">{title}</h2>
        <p className="text-gray-600 text-start mb-5 max-w-3xl leading-5">{description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-2 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col max-h-[350px]  items-center text-center"
            >
              <Image
                src={item.image} // Use the variable directly
                alt={item.title}
                className="w-full h-40 object-cover mb-4 pt-2 rounded"
                width={150}
                height={150}
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-5">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicSpeakingSection;