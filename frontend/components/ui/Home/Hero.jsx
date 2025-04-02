import Link from "next/link";
import Image from "next/image";

import { HeroImage } from "@/lib/data/images";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-background px-3 sm:px-4 py-4 sm:py-6 lg:py-8 min-h-[90vh] sm:min-h-[85vh] lg:min-h-screen">
        <div className="container relative mx-auto h-full">
          <div className="grid gap-3 sm:gap-5 lg:grid-cols-2 h-full">
            <div className="left_container flex flex-col justify-between h-full">
              <div className="text-center flex flex-col justify-center items-end mt-4 sm:mt-6 lg:mt-8">
                <div className="relative text-right pr-3 flex gap-1">
                  <h1 className="text-[2rem] sm:text-[2.2rem] md:text-5xl lg:text-[3rem] font-bold tracking-tighter leading-[1.2] sm:leading-[1.2] lg:leading-[1.2] text-wrap">
                    We help you become everyone's favorite speaker!
                  </h1>
                  <div className="mt-2 w-2 sm:w-2.5 md:w-4 lg:w-5 h-[85%] sm:h-[87%] md:h-[90%] lg:h-[91%] bg-[#F1D2D4]"></div>
                  <div className="absolute -bottom-2 right-6 h-1 sm:h-1.5 md:h-2 w-[80%] sm:w-[82%] bg-[#C7D9FB]"></div>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-right font-normal leading-tight sm:leading-relaxed md:leading-[30px] text-left sm:text-[1.1rem] md:text-[1.3rem] ml-4 my-3 md:my-5 px-2 sm:px-0">
                  Learn storytelling, communication, and public speaking with
                  Bharat Storytellers. Gain confidence, refine your skills, and
                  shine on stage!
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3 mx-auto sm:mx-3 md:mx-10 my-4 sm:my-2 sm:ml-8">
                <div className="flex justify-center items-center border rounded-full border-gray-300 w-9 h-9 sm:w-10 sm:h-10 hover:bg-gray-100 transition-colors duration-200">
                  <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex justify-center items-center border rounded-full border-gray-300 w-9 h-9 sm:w-10 sm:h-10 hover:bg-gray-100 transition-colors duration-200">
                  <CiLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex justify-center items-center border rounded-full border-gray-300 w-9 h-9 sm:w-10 sm:h-10 hover:bg-gray-100 transition-colors duration-200">
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Hero Image for mobile and tablet view */}
              <div className="relative overflow-hidden lg:hidden mt-2 sm:mt-4 w-[90%] h-[300px] sm:w-[85%] sm:h-[400px] md:h-[450px] mx-auto rounded-2xl bg-[#FFF0F0]">
                <Image
                  src={HeroImage}
                  alt="Hero image"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, 70vw"
                  className="object-cover object-center"
                  priority
                />
                
                {/* Circle indicators for mobile/tablet */}
                <div className="absolute right-3 top-3 bg-white rounded-full p-2 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                
                <div className="absolute -left-4 top-1/4 bg-pink-200 rounded-full h-12 w-12 sm:h-16 sm:w-16"></div>
                <div className="absolute -left-4 top-1/2 bg-pink-200 rounded-full h-12 w-12 sm:h-16 sm:w-16"></div>
                <div className="absolute -left-4 bottom-1/4 bg-pink-200 rounded-full h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 justify-center items-center p-2 sm:py-4 md:py-6 lg:py-10 mx-auto mb-4 sm:mb-6 lg:mb-10 w-full">
                <Button
                  asChild
                  className="text-black w-1/2 min-h-[45px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px] md:min-w-[200px] lg:min-w-[250px] hover:bg-pink-200 rounded-3xl m-0 p-0 relative overflow-hidden text-sm sm:text-base md:text-xl"
                  size="lg"
                  style={{ background: "rgba(193, 18, 31, .12)" }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Bubbles */}
                    <div
                      className="absolute -top-2 -right-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                      style={{ background: "rgba(193, 18, 31, .12)" }}
                    ></div>
                    <div
                      className="absolute -bottom-5 -right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                      style={{ background: "rgba(193, 18, 31, .12)" }}
                    ></div>

                    <Link href="#programs" className="z-10 py-2 px-4 w-full h-full flex items-center justify-center">
                      Explore Programs
                    </Link>
                  </div>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-1/2 min-h-[45px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px] md:min-w-[200px] lg:min-w-[250px] rounded-3xl relative overflow-hidden text-sm sm:text-base md:text-xl"
                  size="lg"
                  style={{ backgroundColor: "rgba(92, 149, 255, .2)" }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Bubbles */}
                    <div
                      className="absolute -top-2 -right-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                      style={{ backgroundColor: "rgba(92, 149, 255, .2)" }}
                    ></div>
                    <div
                      className="absolute -bottom-5 -right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full"
                      style={{ backgroundColor: "rgba(92, 149, 255, .2)" }}
                    ></div>

                    <Link href="/membership" className="z-10 py-2 px-4 w-full h-full flex items-center justify-center">
                      Register Now
                    </Link>
                  </div>
                </Button>
              </div>
            </div>

            {/* Hero Image for desktop view */}
            <div className="relative overflow-hidden lg:inline-block hidden w-full h-full min-h-[500px] rounded-3xl bg-[#FFF0F0]">
              <Image
                src={HeroImage}
                alt="Hero image"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              
              {/* Circle decorations and globe for desktop */}
              <div className="absolute right-5 top-5 bg-white rounded-full p-3 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              
              <div className="absolute -left-6 top-1/4 bg-pink-200 rounded-full h-20 w-20"></div>
              <div className="absolute -left-6 top-1/2 bg-pink-200 rounded-full h-20 w-20"></div>
              <div className="absolute -left-6 bottom-1/4 bg-pink-200 rounded-full h-20 w-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}