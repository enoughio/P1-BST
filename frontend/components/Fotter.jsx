import { groupPhoto } from "@/lib/data/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { YoutubeIcon } from "lucide-react";

const Fotter = () => {
  return (
    <div className="flex flex-col justify-around bg-red-100 gap-2 min-h-[50vh]">
      <div className="w-full flex flex-col md:flex-row justify-around items-start">
        <div
          id="left"
          className="flex flex-col items-start justify-between gap-5 md:w-[50%] px-5"
        >
          <div className="w-fit">
            <h1 className="text-6xl leading-none">Speak</h1>
            <div className="bg-red-300 w-[90%] h-2"></div>
          </div>
          <div className=" w-full md:w-[400px] h-[150px] object-cover overflow-hidden rounded-xl">
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

        <div id="right" className="my-4 w-full md:w-[30%] px-5 py-2 md:py-0">
          <div className="flex flex-col justify-start gap-3    md:px-10 pb-5 px-3">
            <h1 className="text-3xl font-medium">Quick Links</h1>

            <div className="flex justify-between items-start gap-10 w-full ">
              <ul className=" leading-4 text-sm">
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
              <ul className=" leading-4 text-sm">
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
          </div>

          <div className="w-full h-auto rounded-2xl bg-red-50 py-2 px-5">
            <h1>Socials</h1>

            <div className="flex gap-8 my-2 ">

              <Link href="https://www.facebook.com/bharatstorytellers/">
                <FaFacebookF className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/company/bharat-storytellers/posts/?feedView=all">
                <CiLinkedin className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/bhopalstorytellers/">
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link href="/home">
                <YoutubeIcon className="h-6 w-6 " />
              </Link>
            </div>

            <h3 className="text-sm mt-3">
              contact@Bharatstorytellers.com
            </h3>
          </div>
        </div>
      </div>
      <div id="outro" className="text-center flex flex-col w-[90%] mx-auto">
        <div className="w-full h-[1px] bg-gray-500"></div>
        <div className="text-[12px] font-thin">
          Made with 💗 in India{" "}
          <span>
            <Link href="#" className="font-extralight text-gray-400 underline">
              Details
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
