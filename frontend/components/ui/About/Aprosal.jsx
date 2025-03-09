"use client";

// pages/index.js
import { storyTellingImage } from "@/lib/data/images";
import Head from "next/head";
import Image from "next/image";
import { Button } from "../button";
import Link from "next/link";

export default function Aprosal() {
  return (
    <div>
      <Head>
        <title>Storytelling Community</title>
        <meta name="description" content="Join our storytelling community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-purple-50 py-8 md:py-12 md:px-4  flex items-center justify-center">
        <div className=" max-w-6xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row">
            {/* Image Section */}
            <div className=" w-[95%] md:w-1/2 h-32 md:h-auto  mx-auto pt-2 rounded-md ">
              <Image
                src={storyTellingImage}
                alt="Teacher reading a book to children"
                width={200}
                height={200}
                className="w-full h-full object-cover bg-red-100 rounded-lg"
              />
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center gap-6  items-start ">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 leading-tight">
                  Become Part of Our Storytelling Community!
                </h1>
                <p className="text-sm md:text-base text-gray-600 mb-6 leading-5">
                  Ready to enhance your public speaking, share your stories, and
                  connect with a supportive community? Join Bharat Storytellers
                  today for exclusive workshops, events, and a platform to make
                  your voice heard!{" "}
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className=" w-1/2 md:min-w-[250px]  md:max-w-[350px] h-12 sm:h-16 rounded-3xl  relative overflow-hidden"
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
                    Become a Member
                  </Link>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
