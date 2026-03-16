import React from "react";

const Header = () => {
  return (
    <header className="mt-10 md:mt-16">
      <div className="relative overflow-hidden rounded-3xl border border-[#E7DCCF] bg-gradient-to-br from-red-100 via-white to-blue-100 px-6 py-10 shadow-sm md:px-10">
        <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-[#E8D8C6] blur-3xl opacity-70" />
        <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-[#C9DCF7] blur-3xl opacity-60" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8A6D4D]">About</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#1F1B16] sm:text-4xl lg:text-5xl font-serif">
            Our story, vision, and values.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#5B4E44] sm:text-base max-w-3xl">
            We are a community that helps people find their voice through storytelling, practice, and
            purposeful connection.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
