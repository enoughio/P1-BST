import { groupPhoto } from "@/lib/data/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Fotter = () => {
  return (
    <div className="flex flex-col justify-around bg-red-100 gap-2 min-h-[50vh]">
      <div className="w-full flex justify-around items-start">

        <div id="left" className="flex flex-col items-start justify-between gap-5">
          <div className="w-fit">
            <h1 className="text-6xl leading-none">Speak</h1>
            <div className="bg-red-600 w-[90%] h-2"></div>
          </div>
          <div className="w-[400px] h-[150px] object-cover overflow-hidden rounded-xl">
            <Image
              src={groupPhoto}
              width={400}
              height={100}
              className="object-cover"
              alt="a image showing the stage"
            />
          </div>
          <h5 className="font-thin text-xs">
            CopyRight @ Bharat Storytellers{" "}
          </h5>
        </div>
        <div id="right" className="my-4">
          <div className="flex flex-col justify-start gap-3">
            <h1 className="text-3xl font-medium">Quick Links</h1>
            <div className="flex justify-end items-start gap-5 w-full">
              <ul className="text-xs font-thin">
                <li className="hover:underline">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/programs">Programs</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/join">Join Us</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
              <ul className="text-xs font-thin">
                <li className="hover:underline">
                  <Link href="/membership">Become a member</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/findclub">Find a Club</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/sponsorship">Sponsorship</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/events">Events</Link>
                </li>
              </ul>
            </div>
  
            <div className="w-full ">

            </div>

          </div>
        </div>
      </div>
      <div id="outro" className="text-center flex pb-2 flex-col w-[90%] mx-auto">
        <div className="w-full h-[2px] bg-gray-500"></div>
        <div>Made with 💗 in India</div>
      </div>
    </div>
  );
};

export default Fotter;
