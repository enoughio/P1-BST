import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <div className="relative flex flex-col bg-whiterounded-lg w-[97%] md:w-1/3 ">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img src={image} alt="card-image" className="object-cover w-full h-full" />
      </div>
      <div className="px-4">
        <h6 className="mb-1 text-slate-800 text-xl font-semibold">{title}</h6>
        <p className=" leading-5 ">{description}</p>
      </div>

    </div>
  );
};

export default Card;
