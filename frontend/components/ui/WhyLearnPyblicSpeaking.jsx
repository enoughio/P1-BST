import React from 'react';
import { benefits } from '@/lib/data/data';

const BenefitCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg text-center w-full max-w-[280px] hover:shadow-md hover:-translate-y-1.5 transition-all duration-300">
    <div className="text-2xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-6">{description}</p>
  </div>
);

const PublicSpeakingCard = () => {
  return (
    <div className="max-w-5xl mx-auto py-5 my-4 px-4 bg-red-100 rounded-lg shadow-md ">
      <div className="text-left pb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Why learn public speaking?</h1>
        <p className="text-gray-600 text-lg leading-7">
          Public speaking is a valuable skill that can help you grow your career, build your brand, and 
          make a positive impact on the world. Here are some of the key benefits of learning to speak 
          with confidence.
        </p>
      </div>
      
      <div className="grid gap-6 justify-items-center">
        {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicSpeakingCard;