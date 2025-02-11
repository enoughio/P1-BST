import React from "react";

const StatCard = ({ number, label1, label2 }) => {
  return (
    <div className="relative w-40 h-40 bg-red-100 rounded-full flex justify-center items-center">
      <div className="absolute -top-2 -right-4 bg-red-300 w-16 h-16 rounded-full flex justify-center items-center">
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
    <div className="bg-red-200 w-full h-[35vh] flex justify-center gap-24 items-center my-5">
      <StatCard number="200" label1="Happy" label2="Members" />
      <StatCard number="100+" label1="Successful" label2="Meetings" />
      <StatCard number="8" label1="Years of" label2="Experience" />
    </div>
  );
};

export default Journy;
