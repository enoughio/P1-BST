import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import SmallFatArrow from "./SmallFatArrow";

export default function Hero() {
  return (
    <>
      
      <section className="relative overflow-hidden bg-background md:py-5 px-2">
        <div className="container relative mx-auto">
          <div className="grid gap-3 sm:gap-5 lg:grid-cols-2 ">
            <div className="left_container flex flex-col justify-start ">
        
              <div className=" left text flex flex-col justify-center items-end">
                <div className="relative text-right pr-3 md:py-2 flex gap-1">
                  <h1 className="text-4xl font-bold tracking-tighter text-wrap sm:text-6xl xl:text-[3rem] md:mt-3">
                    We help you become everyone's favorite speaker!
                  </h1>
                  <div className=" mt-2 w-2.5 h-[87.1%] mx-auto md:w-5 md:h-[91%] bg-[#F1D2D4]"></div>
                  <div className="absolute -bottom-2 right-6 ml- mt-2 h-1.5 md:h-2 w-[82%] bg-[#C7D9FB]"></div>
                </div>
                {/* <p className="w-full  text-muted-foreground text- font-thin leading-tight sm:leading-[30px]  pr-4 my-3 md:my-5 hidden sm:inline-block">
                  Master the art of storytelling, communication, and public
                  speaking with Bharat Storytellers. Whether you're a beginner
                  overcoming stage fright or a speaker refining your craft, our
                  community empowers you with skills, confidence, and a
                  supportive stage to shine.
                </p> */}
                <p className="max-w-[600px] text-muted-foreground text-right font-normal leading-tight sm:leading-[30px]  pr-4 my-3 md:my-5 ">
                  Learn storytelling, communication, and public speaking with
                  Bharat Storytellers. Gain confidence, refine your skills, and
                  shine on stage!
                </p>
              </div>

              <div className="flex gap-2 mx-1 md:mx-10 ">
                <div className="flex justify-center items-center border-[1px] rounded-full border-gray-90000 w-10 h-10">
                  <FaFacebookF className="h-6 w-6" />
                </div>

                <div className="flex justify-center items-center border-[1px] rounded-full border-gray-90000 w-10 h-10">
                  <CiLinkedin className="h-6 w-6" />
                </div>

                <div className="flex justify-center items-center border-[1px] rounded-full border-gray-90000 w-10 h-10">
                  <FaInstagram className="h-6 w-6" />
                </div>
              </div>

              <div className="relative aspect-square mr-3 sm:mr-0 overflow-hidden  lg:hidden mt-4  ">
                <Image
                  src="/test_hero.svg"
                  alt="Hero image"
                  className="object-cover m-0 p-0"
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 80vw, 70vw"
                  // width={400}
                  // height={400}
                />
              </div>

              <div className="flex gap-4  w-full p-2 sm:py-6 ">
                <Button
                  asChild
                  className="bg-pink-100 text-black w-1/2 hover:bg-pink-200 h-20 rounded-3xl m-0 p-0"
                  size="lg"
                >
                  <Link href="#">Explore Programs</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100 w-1/2 h-20 rounded-3xl "
                  size="lg"
                >
                  <Link href="#" className="">
                    Register Now <SmallFatArrow />
                  </Link>
                </Button>
              </div>
            </div>

          

            <div className="relative aspect-square overflow-hidden  lg:inline-block hidden">
              <Image
                src="/test_hero.svg"
                alt="Hero image"
                className="object-cover "
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
