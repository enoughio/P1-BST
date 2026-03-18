
// components/CoachingCarousel.jsx
'use client';
import React from 'react';

const CoachingCarousel = () => {
  const cards = [
    {
      id: 1,
      title: "Expert coaches",
      description: "Our coaches have helped thousands of speakers find their voice",
    },
    {
      id: 2,
      title: "Real-world practice",
      description: "Practice in a safe space with real audience members and get feedback",
    },
    {
      id: 3,
      title: "Personalized feedback",
      description: "We'll help you identify your strengths and areas for improvement",
    }
  ];

  return (
    <section className="w-full rounded-[28px] border border-[#E7DCCF] bg-gradient-to-br from-[#F6EFE5] via-white to-[#E6EFF7] px-6 py-10 shadow-sm">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Why we are different</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#1F1B16] font-serif">
            Coaching that feels practical, personal, and proven.
          </h2>
          <p className="text-sm text-[#5B4E44]">
            We believe the best way to improve your public speaking is through practice, feedback, and hard
            work. Our coaching sessions are designed to build skills you can use immediately.
          </p>
          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-r from-[#EAD9C8]/60 to-[#E6EFF7]/60 p-4 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
            Focused practice. Real audiences. Repeatable growth.
          </div>
        </div>

        <ol className="space-y-4">
          {cards.map((card, index) => (
            <li key={card.id} className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-[#E6EFF7]/70 p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DCCF] text-sm font-semibold text-[#1F1B16]">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1F1B16]">{card.title}</h3>
                  <p className="mt-2 text-sm text-[#5B4E44]">{card.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">
                    <span className="h-1 w-6 bg-[#8A6D4D]" />
                    Build your edge
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default CoachingCarousel;