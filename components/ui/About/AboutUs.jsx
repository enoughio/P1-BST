import { about, aboutHero, downQuot } from "@/lib/data/images";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full rounded-3xl border border-[#E7DCCF] bg-gradient-to-br from-red-100 via-white to-blue-100 p-5 shadow-sm md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">About Us</span>
            <span className="h-px flex-1 bg-[#E7DCCF]" />
          </div>
          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-blue-100/60 p-5 text-sm text-[#5B4E44]">
            <Image
              src={downQuot}
              alt="downQuot"
              width={28}
              height={28}
              className="rotate-180 inline-block mr-3"
            />
            Bharat Storytellers is more than just an organization; it is a supportive community dedicated
            to helping you unlock your potential as a communicator and leader. We believe that everyone
            has a story to tell and a unique voice to share. Through our platform, individuals develop the
            confidence and skills needed to articulate their thoughts effectively, inspire others, and
            leave a lasting impact.
            <Image
              src={downQuot}
              alt="downQuot"
              width={28}
              height={28}
              className="inline-block ml-3 align-bottom"
            />
          </div>
          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/85 to-red-100/70 p-5 text-sm text-[#5B4E44]">
            <p>
              Bharat Storytellers helps individuals master communication. Conquer public speaking fears,
              refine storytelling, or connect with like-minded individuals. Through workshops, sessions,
              and expert discussions, we provide tools to boost confidence and skills.
            </p>
            <p className="mt-4">
              We host weekly meetings, specialized training sessions, and exclusive events designed to
              offer hands-on experience in a welcoming environment. Our community fosters growth,
              creativity, and collaboration, ensuring that every member feels empowered to share their
              voice.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-blue-100/60 p-3 shadow-sm">
            <Image
              src={aboutHero}
              alt="mission"
              className="w-full rounded-2xl object-cover"
              width={700}
              height={420}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
            <div className="rounded-xl border border-[#EFE4D6] bg-white/90 p-3 text-center">Workshops</div>
            <div className="rounded-xl border border-[#EFE4D6] bg-white/90 p-3 text-center">Community</div>
            <div className="rounded-xl border border-[#EFE4D6] bg-white/90 p-3 text-center">Practice</div>
            <div className="rounded-xl border border-[#EFE4D6] bg-white/90 p-3 text-center">Growth</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
