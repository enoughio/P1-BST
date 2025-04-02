import { aboutHeader, aboutHero } from "@/lib/data/images";
import Image from "next/image";

import React from "react";

const Header = () => {
  return (
    <div className="mt-10 md:mt-16">
      <div className="relative">
       
        <div className="  md:-top-12 md:left-5 text-xl md:text-[2.5rem] lg:text-[3rem] leading-none w-96  ">
        <div className="" >
          Our Story, Vission, and Values
        </div>

        </div>

        {/* <div>
          <Image
            src={aboutHero}
            alt="About Header"
            width={1200}
            height={400}
          />
        </div> */}

        {/* <div className="md:text-base  leading-5 md:leading-4 hidden md:inline-block ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          beatae voluptatibus illum labore, hic tenetur!
        </div> */}
      </div>
    </div>
  );
};

export default Header;
