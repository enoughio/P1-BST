import React from 'react';

const WhyStorytelling = () => {
  // Hardcoded data
  const title = "Why Storytelling?";
  const description = "It is the most impactful style of communication and business presentation to relate to audience. People forget facts and figures but they remember the story.";
  const items = [
    {
      title: "Make Information Stick",
      description: "Stories activate multiple brain areas, making content 22x more memorable than facts alone.",
    },
    {
      title: "Build Connections",
      description: "Stories trigger empathy and emotion, creating authentic bonds with your audience.",
    },
    {
      title: "Simplify Complexity",
      description: "Turn complicated ideas into clear, relatable messages through narrative.",
    },
    {
      title: "Inspire Action",
      description: "Facts tell but stories sell. Master narratives that motivate people to act.",
    },
  ];

  return (
    <section className="relative my-6 overflow-hidden rounded-3xl border border-[#E7DCCF] bg-gradient-to-br from-[#F6EFE5] via-white to-[#E6EFF7] px-4 py-10 shadow-sm md:mx-12 md:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,239,229,0.75),rgba(230,239,247,0.7))]" />
      <div className="relative container mx-auto">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Narrative Power</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1F1B16] md:text-4xl font-serif">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-[#5B4E44] md:text-base">{description}</p>
            <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-blue-50/70 p-5 text-sm text-[#5B4E44]">
              Stories are the shortest path from idea to emotion to action.
            </div>
            <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-r from-[#EAD9C8]/60 to-[#E6EFF7]/60 p-5 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
              Remembered longer. Shared faster.
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-[#E7DCCF]" />
            <div className="space-y-6 pl-10">
              {items.map((item, index) => (
                <div key={item.title} className="relative rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-[#EAD9C8]/60 p-5 shadow-sm">
                  <span className="absolute -left-10 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-[#1F1B16] text-xs text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-[#1F1B16]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#5B4E44]">{item.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">
                    <span className="h-1 w-6 bg-[#8A6D4D]" />
                    Story craft
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyStorytelling;