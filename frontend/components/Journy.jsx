import React from "react";

const StatCard = ({ number, label1, label2 }) => {
  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 bg-red-100 rounded-full flex justify-center items-center">
      <div className="text-2xl font-thin absolute -right-1 -top-2 md:-top-2 md:-right-5 bg-red-300 w-10 h-10 md:w-20 md:h-20 rounded-full flex justify-center items-center">
        +
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl md:text-4xl font-bold">{number}</h1>
        <h4 className="font-extralight">{label1}</h4>
        <h4 className="">{label2}</h4>
      </div>
    </div>
  );
};

const Journy = () => {
  return (
    <section className="wrapper flex flex-col items-center py-5 my-10 mt-16 bg-red-200  overflow-hidden px-5 ">
      <h2 className=" self-start text-4xl font-bold ">Our Journy till now</h2>
      <div className="md:w-full md:h-[40vh] flex justify-center items-center md:gap-20 gap-2 px-6 py-6 ">
        <StatCard number="200" label1="Happy" label2="Members" />
        <StatCard number="100+" label1="Successful" label2="Meetings" />
        <StatCard number="8" label1="Years of" label2="Experience" />
      </div>
    </section>
  );
};

export default Journy;
