import Image from "next/image";
import * as React from "react";

const BubbleCardDetails = ({ details }) => {
  const { images, heading, duration, age, description, additionalDetails } =
    details;

  return (
    <div className="p-4 h-full overflow-auto">
      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            width={150}
            height={150}
            alt={`Detail ${index}`}
            className=" rounded-lg"
          />
        ))}
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold mb-2">{heading}</h2>

      {/* Duration and Age */}
      <p className="text-sm mb-1">
        <strong>Duration:</strong> {duration}
      </p>
      <p className="text-sm mb-4">
        <strong>Age:</strong> {age}
      </p>

      {/* Description */}
      <p className="text-sm mb-4">{description}</p>

      {/* Additional Details */}
      {additionalDetails && (
        <div className="text-sm">
          <strong>Additional Details:</strong>
          <ul className="list-disc list-inside">
            {additionalDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { BubbleCardDetails };
