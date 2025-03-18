import Link from "next/link";
import Image from "next/image";

import { HeroImage } from "@/lib/data/images";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-background lg:py-5 px-2 min-h-screen">
        <div className="container relative mx-auto">
          <div className="grid gap-3 sm:gap-5 lg:grid-cols-2 ">
            <div className="left_container flex flex-col justify-between">
              <div className="text-center flex flex-col justify-center items-end">
                <div className="relative text-right pr-3 md:py-2 flex gap-1">
                  <h1 className="text-[2.2rem] font-bold tracking-tighter leading-[2.2rem] text-wrap sm:text-5xl sm:leading-[2.7rem] xl:text-[3rem] md:mt-3">
                    We help you become everyone's favorite speaker!
                  </h1>
                  <div className=" mt-2 w-2.5 h-[87.1%] mx-auto md:w-5 md:h-[91%] bg-[#F1D2D4]"></div>
                  <div className="absolute -bottom-2 right-6  mt-2 h-1.5 md:h-2 w-[82%] bg-[#C7D9FB]"></div>
                </div>
                <p className="max-w-[600px] text-muted-foreground  md:text-right font-normal leading-tight  md:leading-[30px] text-left ml-4 my-3 md:my-5 ">
                  Learn storytelling, communication, and public speaking with
                  Bharat Storytellers. Gain confidence, refine your skills, and
                  shine on stage!
                </p>
              </div>

              <div className="flex gap-2 mx-3 md:mx-10 ">
                <div className="flex justify-center items-center border-[1px] rounded-full border-gray-90000 w-8 h-8 sm:w-10 sm:h-10">
                  <FaFacebookF className=" w-5 h-5 sm:h-5 sm:w-6" />
                </div>

                <div className="flex justify-center items-center border-[1px] rounded-full border-gray-90000  w-8 h-8 sm:w-10 sm:h-10">
                  <CiLinkedin className=" w-5 h-5 sm:h-5 sm:w-6" />
                </div>

                <div className="flex justify-center items-center border-[1px] rounded-full border-gray-90000  w-8 h-8 sm:w-10 sm:h-10">
                  <FaInstagram className=" w-5 h-5 sm:h-5 sm:w-6" />
                </div>
              </div>

              {/* Hero Image for mobile and tab view */}
              <div className="relative overflow-hidden  lg:hidden mt-2 sm:mt-4 w-[350px] h-[350px] sm:w-[700px] sm:h-[500px] mx-auto  ">
                <Image
                  src={HeroImage}
                  alt="Hero image"
                  fill
                  // sizes="(max-width: 640px) 85vw, (max-width: 768px) 80vw, 70vw"
                  style={{
                    objectFit: "contain",
                    marginX: "auto",
                  }}
                />
              </div>

            
              <div className="flex gap-4  justify-center items-center  p-2 sm:py-6 lg:py-12 lg:mx-auto lg:mb-10">
                <Button
                  asChild
                  className=" text-black w-1/2 md:min-w-[250px]  md:max-w-[320px] hover:bg-pink-200 h-12 md:h-20 rounded-3xl m-0 p-0 relative overflow-hidden"
                  size="lg"
                  style={{ background: "rgba(193, 18, 31, .12)" }}
                >
                  <div>
                    {/* bubbles */}
                    <>
                      <div
                        className="absolute -top-2 -right-8 w-16 h-16  rounded-full"
                        style={{ background: "rgba(193, 18, 31, .12)" }}
                      ></div>
                      <div
                        className="absolute -bottom-5 -right-2 w-16 h-16  rounded-full"
                        style={{ background: "rgba(193, 18, 31, .12)" }}
                      ></div>
                    </>

                    <Link href="#programs" className="md:text-2xl z-10">
                      Explore Programs
                    </Link>
                  </div>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className=" w-1/2 md:min-w-[250px]  md:max-w-[350px] h-12 sm:h-20 rounded-3xl  relative overflow-hidden"
                  size="lg"
                  style={{
                    backgroundColor: "rgba(92, 149, 255, .2)",
                  }}
                >
                  <div>
                    {/* bubbles */}
                    <>
                      <div
                        className="absolute -top-2 -right-8 w-16 h-16  rounded-full"
                        style={{
                          backgroundColor: "rgba(92, 149, 255, .2)",
                        }}
                      ></div>
                      <div
                        className="absolute -bottom-5 -right-2 w-16 h-16  rounded-full"
                        style={{
                          backgroundColor: "rgba(92, 149, 255, .2)",
                        }}
                      ></div>
                    </>

                    <Link href="/membership" className="md:text-2xl z-10">
                      Register Now
                    </Link>
                  </div>
                </Button>
              </div>
            </div>

            {/* Hero Image for desktop view */}
            <div className="relative aspect-square overflow-hidden  lg:inline-block hidden">
              <Image
                src={HeroImage}
                alt="Hero image"
                className="object-cover "
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 80vw, 70vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
