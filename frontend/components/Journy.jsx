import React from "react";

const StatCard = ({ number, label1, label2 }) => {
  return (
    <div className="relative w-48 h-48 bg-red-100 rounded-full flex justify-center items-center">
      <div className="text-2xl font-thin absolute -top-2 -right-5 bg-red-300 w-20 h-20 rounded-full flex justify-center items-center">
        +
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold">{number}</h1>
        <h4 className="font-extralight">{label1}</h4>
        <h4>{label2}</h4>
      </div>
    </div>
  );
};

const Journy = () => {
  return (
    <section className="wrapper flex flex-col items-center py-5 my-10 bg-red-200">
      <h2 className="mx-12 self-start font-medium text-2xl ">Our Journy till now</h2>
      <div className="w-full h-[40vh] flex justify-center gap-24 items-center">
        <StatCard number="200" label1="Happy" label2="Members" />
        <StatCard number="100+" label1="Successful" label2="Meetings" />
        <StatCard number="8" label1="Years of" label2="Experience" />
      </div>
    </section>
  );
};

export default Journy;
