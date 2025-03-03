import React from "react";
import Image from "next/image";

const MemberHeader = () => {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Membership Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-md overflow-hidden">
            <div className="p-6 flex flex-col h-full">
              <div className="border-l-4 border-red-300 pl-4 mb-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Become a Member
                </h2>
              </div>

              <p className="text-gray-600 mb-4">
                Et autem amet sequi esse nam quis omnis consequatur explicabo.
                Ea nihil nobis eum explicabo corporis est nihil neque qui
                voluptas
              </p>

              <div className="mt-auto">
                <button className="bg-black text-white px-6 py-2 rounded-md font-medium flex items-center">
                  ENQUIRE NOW
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
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
              Ut voluptas quam At obcaecati consequatur ut aliquam architecto
              qui esse ducimus et omnis quia quo nisi quasi et accusamus
              doloribus. Ea magnam quasi qui quia accusantium sed aliquam ipsa!
              Sit doloremque unde in quibusdam corrupti est velit enim et
              delectus atque quo ullam incidunt. Et dolore mollitia aut
              excepturi facilis sed voluptate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberHeader;
