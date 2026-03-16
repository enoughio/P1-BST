import { AdvanceCareer, BostConfidence, DeliverSpeeches, ImproveNetworking } from '@/lib/data/images';
import Image from 'next/image';
import React from 'react';

const WhyStorytelling = () => {
  // Hardcoded data
  const title = "Why Storytelling?";
  const description = "It is the most impactful style of communication and business presentation to relate to audience. People forget facts and figures but they remember the story.";
  const items = [
    {
      title: "Make Information Stick",
      image: BostConfidence,
      description: "Stories activate multiple brain areas, making content 22x more memorable than facts alone.",
    },
    {
      title: "Build Connections",
      image: AdvanceCareer,
      description: "Stories trigger empathy and emotion, creating authentic bonds with your audience.",
    },
    {
      title: "Simplify Complexity",
      image: ImproveNetworking,
      description: "Turn complicated ideas into clear, relatable messages through narrative.",
    },
    {
      title: "Inspire Action",
      image: DeliverSpeeches,
      description: "Facts tell but stories sell. Master narratives that motivate people to act.",
    },
  ];

  return (
    <section className="my-2 py-4 md:mt-10 mx-2 md:mx-12 border-t-2 border-gray-200 shadow-md rounded-lg bg-gradient-to-b from-[#E6F7FF]/20 to-[#F1D2D4]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-start">{title}</h2>
        <p className="text-gray-600 text-start mb-5 max-w-3xl leading-5">{description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-2 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col max-h-[350px] items-center text-center"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover mb-4 pt-2 rounded"
                width={150}
                height={150}
              />
              <h3 className="text-lg font-semibold  mb-2 leading-5">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStorytelling;