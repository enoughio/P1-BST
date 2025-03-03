import React, { useState } from "react";
import Image from "next/image";

const MembershipApplication = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const applications = [
    {
      id: 1,
      title: "Real-World Application",
      description: "Use the skills learned to lead more effective presentations, workshops, or speeches in everyday life, whether in professional settings or community interactions.",
      image: "/api/placeholder/400/500"
    },
    {
      id: 2,
      title: "Real-World Application",
      description: "Apply techniques to engage audiences effectively, whether in formal business presentations or casual social gatherings.",
      image: "/api/placeholder/400/500"
    },
    {
      id: 3,
      title: "Real-World Application",
      description: "Transform nervous energy into confident delivery through practiced skills and personalized feedback.",
      image: "/api/placeholder/400/500"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Membership Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="p-6 flex flex-col h-full">
              <div className="border-l-4 border-red-300 pl-4 mb-4">
                <h2 className="text-3xl md:text-4xl font-bold">Become a Member</h2>
              </div>
              
              <p className="text-gray-600 mb-4">
                Et autem amet sequi esse nam quis omnis consequatur explicabo. Ea nihil nobis eum explicabo corporis est nihil neque qui voluptas
              </p>
              
              <div className="mt-auto">
                <button className="bg-black text-white px-6 py-2 rounded-md font-medium flex items-center">
                  ENQUIRE NOW
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Center Image */}
          <div className="lg:col-span-3 rounded-3xl overflow-hidden relative">
            <Image
              src="/api/placeholder/400/500"
              alt="Digital communication concept"
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Connection dots overlay */}
              <div className="absolute inset-0 opacity-60">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Text Box */}
          <div className="lg:col-span-4 bg-white rounded-3xl shadow-md p-6">
            <p className="text-gray-700">
              Ut voluptas quam At obcaecati consequatur ut aliquam architecto qui esse ducimus et omnis quia quo nisi quasi et accusamus doloribus. Ea magnam quasi qui quia accusantium sed aliquam ipsa! Sit doloremque unde in quibusdam corrupti est velit enim et delectus atque quo ullam incidunt. Et dolore mollitia aut excepturi facilis sed voluptate.
            </p>
          </div>
          
          {/* Application Slider Section */}
          <div className="lg:col-span-12 mt-6">
            <div className="relative">
              {/* Slider controls */}
              <div className="absolute z-10 flex justify-between w-full top-1/2 transform -translate-y-1/2">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Slides Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {applications.map((app, index) => (
                    <div key={app.id} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1 rounded-2xl overflow-hidden aspect-square md:aspect-auto">
                          <Image
                            src={app.image}
                            alt={app.title}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                          <div className="bg-black/40 absolute inset-0 flex items-end p-6">
                            <h3 className="text-white font-bold text-2xl">{app.title}</h3>
                          </div>
                        </div>
                        
                        <div className="md:col-span-1 bg-blue-50 rounded-2xl p-6 flex flex-col justify-center">
                          <h3 className="font-bold text-2xl mb-4">{app.title}</h3>
                          <p>{app.description}</p>
                        </div>
                        
                        <div className="md:col-span-1 rounded-2xl overflow-hidden">
                          <Image
                            src={app.image}
                            alt={app.title}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                          <div className="bg-black/40 absolute inset-0 flex items-end p-6">
                            <h3 className="text-white font-bold text-2xl">{app.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Slide indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {[...Array(totalSlides)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-blue-600 w-4' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipApplication;