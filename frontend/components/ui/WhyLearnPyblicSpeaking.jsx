// components/PublicSpeakingSection.jsx
import React from 'react';

const PublicSpeakingSection = () => {
  // Hardcoded data
  const title = "Why learn public speaking?";
  const description = "Public speaking is a valuable skill that can help you grow your career, build your brand, and make a positive impact on the world. Here are some of the key benefits of learning to speak with confidence.";
  const items = [
    {
      title: "Boost confidence",
      image: "https://via.placeholder.com/150?text=Confidence",
      description: "Gain the self-assurance to present yourself effectively.",
    },
    {
      title: "Advance your career",
      image: "https://via.placeholder.com/150?text=Career",
      description: "Open doors to new opportunities with strong presentation skills.",
    },
    {
      title: "Improve networking skills",
      image: "https://via.placeholder.com/150?text=Networking",
      description: "Build meaningful connections through effective communication.",
    },
    {
      title: "Deliver impactful speeches",
      image: "https://via.placeholder.com/150?text=Speeches",
      description: "Inspire and influence your audience with powerful delivery.",
    },
  ];

  return (
    <section className="my-12  py-4 mx-12 border-t-2 border-gray-200 shadow-md rounded-lg bg-red-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-start">{title}</h2>
        <p className="text-gray-600 text-start mb-5 max-w-3xl leading-5">{description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-2 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col max-h-[350px]  items-center text-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover mb-4 pt-2 rounded"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-5">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicSpeakingSection;