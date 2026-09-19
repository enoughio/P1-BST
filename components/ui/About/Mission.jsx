import { mission, values, vision } from "@/lib/data/images";
import Image from "next/image";
import React from "react";

const Mission = () => {
  return (
    <section className="rounded-3xl border border-[#E7DCCF] bg-gradient-to-br from-[#F6EFE5] via-white to-[#E6EFF7] p-6 shadow-sm md:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">
            Mission and Vision
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F1B16] font-serif">
            A clear purpose with a wider horizon.
          </h2>
          <p className="mt-3  leading-relaxed text-[#5B4E44]">
            Whether you are an adult looking to build confidence or a young
            speaker eager to find your voice, our programs cater to all skill
            levels and age groups.
          </p>
          <div className="mt-6 rounded-2xl border border-[#EFE4D6] bg-gradient-to-r from-[#EAD9C8] to-[#E6EFF7] p-4 text-xs uppercase tracking-[0.25em] text-[#6E5C4C]">
            Listen. Learn. Lead.
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/90 to-blue-100/60 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-[#1F1B16]">Mission</h3>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">
                Purpose
              </span>
            </div>
            <div className="mt-4 text-[#5B4E44]">
              <p>
                To cultivate a thriving culture of storytelling and oratory
                across India by building inclusive communities of practice,
                empowering young people to lead, and creating platforms that
                celebrate the spoken word, so that individuals everywhere can
                open doors in their careers, their enterprises, and their lives
                through the art of telling the right story well.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-[#EAD9C8]/70 via-[#FBF4EA] to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-[#1F1B16]">Vision</h3>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8A6D4D]">
                Future
              </span>
            </div>
            <div className="mt-4  text-[#5B4E44]">
              <p>
                We promote storytelling as a tool that helps individuals grow in
                their life and careers. We envision a society in which every
                individual, regardless of age, background, or profession, can
                harness the power of story to communicate with clarity, lead
                with conviction, and connect with meaning.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[mission, vision, values].map((image, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[#EFE4D6] bg-gradient-to-br from-white via-white/85 to-blue-100/60 p-2"
          >
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
