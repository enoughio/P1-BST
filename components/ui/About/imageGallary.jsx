import React from "react";
import Image from "next/image";

const ImageGrid = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2  mx-auto p-2 ">
      {/* Top left - Orange background speaker */}
      <div className="rounded-xl overflow-hidden bg-teal-100">
        <Image
          src="#"
          alt="Speaker in orange sweater with microphone"
          width={400}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center image spanning 2 rows - Dark background speaker */}
      <div className="row-span-2 rounded-xl overflow-hidden bg-gray-800">
        <Image
          src="#"
          alt="Speaker on stage"
          width={400}
          height={640}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top right - Purple background woman */}
      <div className="rounded-xl overflow-hidden bg-slate-600">
        <Image
          src="#"
          alt="Woman in yellow outfit speaking"
          width={400}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom left - Purple background child */}
      <div className="rounded-xl overflow-hidden bg-slate-400">
        <Image
          src="#"
          alt="Child with a notebook"
          width={400}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom right - Warm background girl */}
      <div className="rounded-xl overflow-hidden bg-[#E7D8C6]">
        <Image
          src="#"
          alt="Girl writing in a notebook"
          width={400}
          height={320}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ImageGrid;