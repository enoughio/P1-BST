// components/PublicSpeakingSection.jsx
import React from 'react';

const PublicSpeakingSection = () => {
  // Hardcoded data
  const title = "Why public speaking?";
  const description = "Public speaking is a valuable skill that can help you grow your career, build your brand, and make a positive impact on the world. Here are some of the key benefits of learning to speak with confidence.";
  const items = [
    {
      title: "Boost confidence",
      description: "Gain the self-assurance to present yourself effectively.",
    },
    {
      title: "Advance your career",
      description: "Open doors to new opportunities with strong presentation skills.",
    },
    {
      title: "Improve networking skills",
      description: "Build meaningful connections through effective communication.",
    },
    {
      title: "Deliver impactful speeches",
      description: "Inspire and influence your audience with powerful delivery.",
    },
  ];

  return (
    <section className="relative my-6 overflow-hidden rounded-3xl border border-[#E7DCCF] bg-white px-4 py-10 shadow-sm md:mx-12 md:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(251,244,234,0.85),rgba(255,255,255,0.7))]" />
      <div className="relative container mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4 rounded-2xl border border-[#EFE4D6] bg-[#FBF4EA] p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Skill Focus</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1F1B16] md:text-4xl font-serif">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-[#5B4E44] md:text-base">{description}</p>
            <div className="rounded-xl border border-[#E7DCCF] bg-white/80 p-4 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
              Confidence is a practiced skill.
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, index) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-[#EFE4D6] bg-white/95 p-5 shadow-sm"
              >
                <span className="absolute -right-6 -top-6 text-6xl font-semibold text-[#F2E6D8]">{index + 1}</span>
                <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Benefit</p>
                <h3 className="mt-2 text-base font-semibold text-[#1F1B16]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#5B4E44]">{item.description}</p>
                <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
                  <span className="h-1 w-6 bg-[#8A6D4D]" />
                  Build your voice
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicSpeakingSection;