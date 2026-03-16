import React from "react";
import Image from "next/image";
import { grid1, grid2, grid3, grid4, grid5, grid8 } from "@/lib/data/images";

const OurStory = () => {
  return (
    <section className="w-full rounded-3xl border border-[#E7DCCF] bg-gradient-to-br from-red-200 via-white to-blue-100 p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="lg:w-[45%] space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Our Story</p>
          <h3 className="text-3xl font-semibold tracking-tight text-[#1F1B16] font-serif">
            This is how we started.
          </h3>
          <div className="space-y-4 text-sm text-[#5B4E44]">
            <p>
              Over time, our small gathering transformed into a thriving network of passionate individuals
              from across India. Through storytelling, we have built connections, fostered learning, and
              encouraged self-expression, making our community a place of growth and inspiration.
            </p>

            <p>
              Our journey is a testament to the power of stories and the bonds they create. As we continue
              to expand, we remain committed to providing a platform where individuals can express
              themselves, share their narratives, and inspire others along the way.
            </p>
            <p className="hidden md:block">
              Today, our circles host voices from every background, pairing mentorship with practice so
              members can shape their ideas, refine their delivery, and build the confidence to lead.
            </p>
          </div>
          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-r from-red-200 to-blue-100 p-4 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
            From small circles to national stages.
          </div>
          <div className="hidden md:grid grid-cols-3 gap-3 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
            <div className="rounded-xl border border-[#EFE4D6] bg-gradient-to-br from-white to-blue-100/60 p-3 text-center">Weekly circles</div>
            <div className="rounded-xl border border-[#EFE4D6] bg-gradient-to-br from-white to-red-200/60 p-3 text-center">Mentor led</div>
            <div className="rounded-xl border border-[#EFE4D6] bg-gradient-to-br from-white to-blue-100/60 p-3 text-center">Nationwide</div>
          </div>
          <div className="hidden md:block rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-red-200/60 p-5 text-sm text-[#5B4E44]">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Community Note</span>
            <p className="mt-3">
              Every gathering ends with one simple question: “What story will you take forward?” It keeps
              us grounded, curious, and connected.
            </p>
          </div>
        </div>

        <div className="lg:w-[55%]">
          <div className="hidden lg:grid max-w-[560px] grid-flow-dense grid-cols-6 auto-rows-[120px] gap-3">
            <div className="col-span-4 row-span-3 rounded-2xl overflow-hidden border border-[#EFE4D6] bg-white/90">
              <Image
                src={grid1}
                alt="Storytelling moment"
                width={420}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-[#EFE4D6] bg-white/90">
              <Image
                src={grid3}
                alt="Storytelling moment"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-[#EFE4D6] bg-white/90">
              <Image
                src={grid4}
                alt="Storytelling moment"
                width={200}
                height={260}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden border border-[#EFE4D6] bg-white/90">
              <Image
                src={grid5}
                alt="Storytelling moment"
                width={260}
                height={180}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-3 row-span-1 rounded-2xl overflow-hidden border border-[#EFE4D6] bg-white/90">
              <Image
                src={grid8}
                alt="Storytelling moment"
                width={260}
                height={160}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 lg:hidden">
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden">
              <Image
                src={grid1}
                alt="Person in orange sweater speaking"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden">
              <Image
                src={grid2}
                alt="Person with microphone on stage"
                width={200}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden">
              <Image
                src={grid3}
                alt="Young girl reading"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden">
              <Image
                src={grid4}
                alt="Woman in yellow speaking"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="col-span-3 aspect-square rounded-2xl overflow-hidden">
              <Image
                src={grid5}
                alt="Young girl writing"
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
