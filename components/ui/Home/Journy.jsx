import React from "react";

const StatCard = ({ number, label1, label2 }) => {
  return (
    <div className="relative w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-full flex justify-center items-center bg-[#F6F1E7]"
        style={{background: ""}}
    >
      <div className="text-2xl font-light absolute -right-1 -top-2 md:-top-2 md:-right-5  w-10 h-10 md:w-20 md:h-20 rounded-full flex justify-center items-center"
          style={{
            background: "rgba(31, 27, 22, 0.06)"
          }}
      >
        +
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-lg md:text-3xl lg:text-4xl font-bold">{number}</h1>
        <div className="font-normal  text-center text-[.7rem] md:text-sm lg:text-lg">
        {label1}
        <br />
        {label2}
        </div>
      </div>
    </div>
  );
};

const Journy = () => {
  return (
    <section className="wrapper flex flex-col items-center py-5 my-10 mt-16  bg-gradient-to-b from-[#F6F1E7]/40 to-[#E7D8C6] overflow-hidden px-5 ">
      <h2 className=" self-start text-lg md:text-3xl font-semibold ">Our Journy till now</h2>
      <div className="md:w-full md:h-[40vh] flex justify-center items-center md:gap-20 gap-2 px-6 py-6 ">
        <StatCard number="200" label1="Happy" label2="Members" />
        <StatCard number="100+" label1="Successful" label2="Club Meetings" />
        <StatCard number="8" label1="Years of" label2="Experience" />
      </div>
    </section>
  );
};

export default Journy;
