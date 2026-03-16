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
    <section className="relative my-6 overflow-hidden rounded-3xl border border-[#E7DCCF] bg-white px-4 py-10 shadow-sm md:mx-12 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(243,231,216,0.7),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(230,247,255,0.6),transparent_50%)]" />
      <div className="relative container mx-auto">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Narrative Power</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F1B16] md:text-4xl font-serif">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5B4E44] md:text-base">{description}</p>
          </div>
          <div className="rounded-full border border-[#E7DCCF] bg-white/80 px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
            Stories that stay
          </div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#1F1B16]">
                  Insight {index + 1}
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

export default WhyStorytelling;