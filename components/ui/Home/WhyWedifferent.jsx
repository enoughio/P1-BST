
// components/CoachingCarousel.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ExpertCoaches, PersonalizedFeedback, RealWorldPractice } from '@/lib/data/images';

const CoachingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoSlideInterval = useRef(null);

  // Carousel data matching the image
  const cards = [
    {
      id: 1,
      title: "Expert coaches",
      description: "Our coaches have helped thousands of speakers find their voice",
      imageSrc: ExpertCoaches, 
    },
    {
      id: 2,
      title: "Real-world practice",
      description: "Practice in a safe space with real audience members and get feedback",
      imageSrc: RealWorldPractice,
    },
    {
      id: 3,
      title: "Personalized feedback",
      description: "We'll help you identify your strengths and areas for improvement",
      imageSrc: PersonalizedFeedback,
    }
  ];

  // Auto slide functionality
  const startAutoSlide = () => {
    autoSlideInterval.current = setInterval(() => {
      goToNextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoSlide();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;
    
    // If swipe distance is significant
    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        // Swipe left - go to next slide
        goToNextSlide();
      } else {
        // Swipe right - go to previous slide
        goToPrevSlide();
      }
    }
    
    startAutoSlide();
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Initialize auto-sliding
  useEffect(() => {
    startAutoSlide();
    
    return () => {
      stopAutoSlide();
    };
  }, []);

  return (
    <div className="w-full mb-8 border-t-2  py-4 bg-gradient-to-b from-[#E7EDFA]/30 to-[#C7D9FB]  border-gray-200  rounded-xl px-8">
      {/* Main heading and text */}
      <div className="mb-8">
        <h2 className=" text-2xl md:text-3xl font-bold mb-4 hidden md:inline-block">Why we're different</h2>
        <p className=" hidden md:inline-block text-gray-700 text-sm max-w-3xl" >
          We believe that the best way to improve your public speaking is through practice, feedback,
          and hard work. That's why our coaching sessions are designed to help you develop the skills
          you need to become a better speaker.
        </p>
      </div>

      {/* Mobile & Tablet Carousel (visible only on smaller screens) */}
      <div className="md:hidden relative mx-5 md:mx-0 ">
        <div 
          className="overflow-hidden"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out "
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card) => (
              <div key={card.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-blue-50 rounded-lg p-4 h-full">
                  <div className="mb-4 h-48 w-full relative">
                    <div className=" w-full h-full rounded overflow-hidden">
                      <Image 
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        className='object-cover rounded-sm'
                      />
                
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-gray-600 mt-2">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {cards.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Layout (visible only on larger screens) */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-6 ">
        {cards.map((card) => (
          <div key={card.id} className="bg-blue-50 rounded-lg p-4">
            <div className="mb-4 h-48 w-full relative">
              <div className=" w-full h-full rounded overflow-hidden">
                
                <Image 
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  className='object-cover rounded-sm'
                />
               
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
            <p className="text-gray-600 mt-2">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachingCarousel;