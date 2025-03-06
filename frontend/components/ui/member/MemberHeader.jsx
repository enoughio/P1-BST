// components/MembershipSection.jsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MembershipSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white">
      {/* Container for the entire section */}
      <div className="flex flex-col md:flex-row w-full p-4">
        {/* Left column with title and description */}
        <div className="w-full md:w-1/3 p-4 flex flex-col">
          <div className="flex items-start mb-6">
            <div className="w-1 h-16 bg-pink-300 mr-3"></div>
            <h2 className="text-4xl font-bold">Become a Member</h2>
          </div>
          
          <p className="text-gray-700 mb-6">
            Et soluta animi ad quas quasi nam odit nihil ut consequatur explicabo. Ea nihil nobis eum explicabo corporis est nihil neque qui voluptas
          </p>
          
          <Link href="/enquire" passHref>
            <button className="bg-pink-200 text-black py-2 px-6 rounded-full flex items-center max-w-xs">
              ENQUIRE NOW
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>
        
        {/* Middle column with image - visible only on desktop */}
        <div className="hidden md:block md:w-1/3 p-4">
          <div className="relative rounded-lg overflow-hidden h-full">
            <div className="relative w-full h-full">
              <Image 
                src={{}} 
                alt="People shaking hands in a business meeting" 
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* Overlay icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 w-full h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <div className="w-10 h-10 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
              {/* Mobile specific image section - visible only on mobile */}
      <div className="block md:hidden px-4 pb-4">
        <div className="relative rounded-lg overflow-hidden h-48">
          <div className="relative w-full h-full">
            <Image 
              src={{}} 
              alt="Business meeting handshake" 
              layout="fill"
              objectFit="cover"
            />
          </div>
          {/* Overlay icons - simplified for mobile */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
        
        {/* Right column with additional info */}
        <div className="w-full md:w-1/3 p-4 mt-4 md:mt-0">
          <div className="bg-white border border-pink-100 rounded-lg p-6">
            <p className="text-gray-700">
              Ut voluptas quam At obcaecati consequatur ut aliquam architecto qui esse ducimus et omnis quia quo nisi quasi et accusamus doloribus. Ea magnam quasi qui quia accusantium sed aliquam ipsa! Sit doloremque unde in quibusdam corrupti est velit enim et delectus atque quo ullam incidunt. Et dolore mollitia aut excepturi facilis sed voluptate.
            </p>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default MembershipSection;