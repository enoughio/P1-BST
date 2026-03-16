'use client';
import React, { useState, useEffect, useRef } from 'react';

const InfiniteCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Clone the first slide and add it to the end for the infinite effect
  const extendedSlides = [...slides, slides[0]];

  const startSlideTimer = () => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // When we reach the cloned first slide (at the end), 
        // quickly reset to the beginning without animation
        if (prevIndex >= slides.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000);
  };

  useEffect(() => {
    startSlideTimer();
    
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  // Pause carousel when user interacts with it
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  // Resume carousel when user stops interacting
  const handleMouseLeave = () => {
    setIsPaused(false);
    startSlideTimer();
  };

  // Handle touch events for mobile swipe functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    handleMouseEnter(); // Pause while touching
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    handleMouseLeave(); // Resume after touch
    
    const diff = touchStartX.current - touchEndX.current;
    // Swipe threshold - only register swipes that move at least 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        prevSlide();
      }
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= slides.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return slides.length - 1;
      }
      return prevIndex - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Calculate transform value for the slide transition
  const getTransformValue = () => {
    return `translateX(-${currentIndex * 100}%)`;
  };

  return (
    <div className="relative w-full overflow-hidden md:max-w-2xl lg:max-w-4xl mx-auto">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: getTransformValue() }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedSlides.map((slide, index) => (
          <div 
            key={`slide-${index}`}
            className="w-full flex-shrink-0 h-64 sm:h-72 md:h-80"
          >
            {/* You can replace this with your slide content */}
            <div 
              className="h-full w-full flex items-center justify-center text-white text-xl font-bold rounded-lg"
              style={{ backgroundColor: slide.bgColor || '#3b82f6' }}
            >
              {slide.content}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Optional: Prev/Next buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full hidden sm:block"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full hidden sm:block"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default InfiniteCarousel;