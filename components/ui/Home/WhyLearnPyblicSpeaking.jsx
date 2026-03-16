// components/PublicSpeakingSection.jsx
import { AdvanceCareer, BostConfidence, DeliverSpeeches, ImproveNetworking } from '@/lib/data/images';
import Image from 'next/image';
import React from 'react';

const PublicSpeakingSection = () => {
  // Hardcoded data
  const title = "Why public speaking?";
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
    <section className="relative my-6 overflow-hidden rounded-3xl border border-[#E7DCCF] bg-[#FAF6EF] px-4 py-10 shadow-sm md:mx-12 md:px-8">
      <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-[#E8D8C6] blur-3xl opacity-70" />
      <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-[#F3E7D8] blur-3xl opacity-80" />
      <div className="relative container mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Skill Focus</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F1B16] md:text-4xl font-serif">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5B4E44] md:text-base">{description}</p>
          </div>
          <div className="text-sm text-[#6E5C4C]">Four outcomes that show up on stage and at work.</div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#EFE4D6] bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-40">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={220}
                  height={160}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#1F1B16]">
                  0{index + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-base font-semibold tracking-tight text-[#1F1B16]">{item.title}</h3>
                <p className="text-sm text-[#5B4E44]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicSpeakingSection;