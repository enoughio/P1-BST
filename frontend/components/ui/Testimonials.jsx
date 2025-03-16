'use client';

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, Star } from "lucide-react";
import Image from "next/image";
import { piyush, utkrishti, vasanti } from "@/lib/data/images";

const testimonials = [
  {
    id: 1,
    text: "I've been in leadership roles since 2010 but struggled with precise communication. Bharat Storytellers helped me deliver impactful speeches within time, keeping my audience engaged.",
    name: "Piyush Kumar Kachhi",
    handle: "Seasoned Banker ",
    avatar: piyush, // Remove curly braces
    rating: 5,
  },
  {
    id: 2,
    text: "I always searched for a stage to learn and I found it with Bharat Storytellers. Here I got the people who encourages me and give their feedback so that I can improve myself. I know I am still not perfect but I can tell that I am a better speaker today.",
    name: "Vasanthi Rayapati",
    handle: "Student at MANIT",
    avatar: vasanti, // Remove curly braces
    rating: 4,
  },
  {
    id: 3,
    text: "Joining Bharat Storytellers transformed my public speaking. The supportive environment refined my storytelling, making workshops engaging. I now master gestures, pauses, and impactful delivery!",
    name: "Utkrishti Katheriya",
    handle: "Counselling Psychologist",
    avatar: utkrishti, // Remove curly braces
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  // Determine if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle automatic sliding on mobile
  useEffect(() => {
    let interval;

    if (isMobile) {
      interval = setInterval(() => {
        if (!isAnimating) {
          handleNext();
        }
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile, currentIndex, isAnimating]);

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left (next)
      handleNext();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right (prev)
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const visibleTestimonials = isMobile
    ? [testimonials[currentIndex]]
    : testimonials;

  return (
    <section className="py-4 px-4 bg-gradient-to-b from-[#E7EDFA]/30 to-[#C7D9FB]">
      <div className="container mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Testimonials</h2>
          <p className="text-gray-600">
            What our members say about their growth journey
          </p>
        </div>

        {/* Desktop View */}
        <div
          className={`${
            isMobile
              ? "hidden"
              : "flex gap-4"
          }`}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="py-6 bg-white w-full md:w-1/3 flex flex-col justify-center items-center gap-2 backdrop-blur-xl rounded-2xl overflow-hidden min-h-52"
            >
              <div className=" h-full flex justify-center items-center gap-2 mx-2">
                <div className="w-full h-auto">
                  <Image
                    alt="member Image"
                    src={testimonial.avatar} // Use the variable directly
                    width={300}
                    height={300}
                    className="rounded-full bottom-2 w-32 h-32 border-2 border-black mx-auto"
                  />
                </div>
                <p className="text-xs max-w-[55%] mx-2">{testimonial.text}</p>
              </div>

              <div className="text-sm ml-5 self-start  flex justify-center h-full gap-3 mr-6">
                <div className="text-center flex flex-col justify-center items-center gap-1">
                  <h2 className="text-[.9rem] leading-none">
                    {testimonial.name}
                  </h2>
                  <h3 className="text-[.6rem] max-w-[60%] leading-3 ">
                    {testimonial.handle}
                  </h3>
                </div>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < testimonial.rating ? "#FFD700" : "none"}
                    color={i < testimonial.rating ? "#FFD700" : "#D1D5DB"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>




        {/* Mobile View */}
        <div
          className={`${isMobile ? "block" : "hidden"} relative`}
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden" style={{ touchAction: "pan-y" }}>
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full px-4">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 mr-4 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-normal leading-4 text-sm">{testimonial.name}</p>
                          <p className="text-[.5rem] sm:text-sm text-gray-500">
                            {testimonial.handle}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-[.7rem] sm:text-sm leading-4 mb-4">"{testimonial.text}"</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill={i < testimonial.rating ? "#FFD700" : "none"}
                            color={
                              i < testimonial.rating ? "#FFD700" : "#D1D5DB"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-2">
            <button
              onClick={handlePrev}
              className="bg-white rounded-full p-2 shadow-md pointer-events-auto focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              onClick={handleNext}
              className="bg-white rounded-full p-2 shadow-md pointer-events-auto focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all focus:outline-none ${
                  index === currentIndex ? "w-6 bg-pink-500" : "w-2 bg-pink-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
