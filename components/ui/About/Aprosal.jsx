import { groupPhoto } from "@/lib/data/images";
import Image from "next/image";
import React from "react";

const StorytellingCommunitySection = () => {
  return (
    <section className="w-full rounded-3xl border border-[#E7DCCF] bg-gradient-to-br from-[#F6EFE5] via-white to-[#E6EFF7] p-6 shadow-sm md:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center">
        <div className="w-full md:w-1/2">
          <div className="rounded-3xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/85 to-blue-100/60 p-3 shadow-sm">
            <Image
              src={groupPhoto}
              alt="Teacher reading to children"
              width={640}
              height={420}
              className="w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Community</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1F1B16] font-serif">
            Become part of our storytelling community.
          </h2>
          <p className="text-sm md:text-base text-[#5B4E44]">
            At obcaecati consequatur ut aliquam architecto qui esse ducimus et omnis quia quo nisi quasi
            et accusamus doloribus. Id dolores temporibus et tempora iste et provident explicabo est omnis
            earum At perspiciatis nesciunt.
          </p>
          <button className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#1F1B16] bg-[#1F1B16] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#2A231D]">
            BECOME A MEMBER
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default StorytellingCommunitySection;
