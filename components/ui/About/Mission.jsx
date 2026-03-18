import { mission, values, vision } from "@/lib/data/images";
import Image from "next/image";
import React from "react";

const Mission = () => {
  return (
    <section className="rounded-3xl border border-[#E7DCCF] bg-gradient-to-br from-[#F6EFE5] via-white to-[#E6EFF7] p-6 shadow-sm md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Mission and Vision</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F1B16] font-serif">
            A clear purpose with a wider horizon.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5B4E44]">
            Whether you are an adult looking to build confidence or a young speaker eager to find your
            voice, our programs cater to all skill levels and age groups.
          </p>
          <div className="mt-6 rounded-2xl border border-[#EFE4D6] bg-gradient-to-r from-[#EAD9C8] to-[#E6EFF7] p-4 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
            Listen. Learn. Lead.
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-blue-100/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-[#1F1B16]">Mission</h3>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">Purpose</span>
            </div>
            <div className="mt-4 text-sm text-[#5B4E44]">
              <p>
                At Bharat Storytellers, we believe that every voice has a story to tell, and every story
                deserves to be heard. Everyone has a unique perspective, and sharing these stories helps
                build connections and understanding.
              </p>
              <p className="mt-4">
                Our mission is to empower individuals to find their voice, articulate their ideas, and
                express themselves with confidence. Through storytelling and public speaking, we help
                people connect with the world and make a lasting impact.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-[#EAD9C8]/70 via-[#FBF4EA] to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-[#1F1B16]">Vision</h3>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">Future</span>
            </div>
            <div className="mt-4 text-sm text-[#5B4E44]">
              <p>
                We envision a world where communication barriers are broken, enabling people from all
                backgrounds to express themselves with confidence. Everyone should have the opportunity to
                share their stories, connect with others, and make their voices heard.
              </p>
              <p className="mt-4">
                Through our programs, we strive to build a supportive community that fosters mutual growth
                and learning. By embracing the power of storytelling, we inspire individuals to develop
                their communication skills and create meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[mission, vision, values].map((image, index) => (
          <div key={index} className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/85 to-blue-100/60 p-2">
            <Image
              src={image}
              alt="mission images"
              width={260}
              height={260}
              className="w-full rounded-xl object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mission;
