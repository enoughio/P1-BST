import { aboutHeader } from "@/lib/data/images";
import Image from "next/image";

import React from "react";

const Header = () => {
  return (
    <div className=" mt-10 md:mt-16 mb-5">
      <div className="relative">
       
        <div className=" absolute -top-7 left-3 md:-top-12 md:left-5 text-xl md:text-[3rem] leading-none w-96  ">
        <div className="mb-1" >
          Our Story, Vission,
        </div>
        <div>
        and Values
        </div>
        </div>

        <div>
          <Image
            src={aboutHeader}
            alt="About Header"
            width={1920}
            height={1080}
          />
        </div>

        <div className="text-base leading-5 md:leading-4 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          beatae voluptatibus illum labore, hic tenetur!
        </div>
      </div>
    </div>
  );
};

export default Header;
