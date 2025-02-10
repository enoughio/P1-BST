import React from "react";
import Image from "next/image";

const OurPrograms = () => {
  return (
    <div>
      <section className="wrapper w-full md:h-screen bg-[#FAF9F9] flex flex-col">
        <div className="Header text-center">
          <h1>Our Programs</h1>
          <div className="line">
            Whether you’re an adult looking to build confidence or a young
            speaker eager to find your voice, our programs cater to all skill
            levels and age groups.
          </div>
        </div>

        <div className="Programs">
          <div className="flex w-full items-center justify-center">
            <div className="grid w-[90%] gap-4 p-2 grid-cols-4 grid-rows-6 md:grid-cols-6 md:grid-rows-4 rounded-lg shadow-md">
              {/* small card with bubbles */}
              <div
                className=" relative overflow-hidden col-span-4 md:col-span-2 row-span-2 h-[300px]  rounded-lg shadow-md flex items-center justify-center aspect-w-1 aspect-h-1"
                style={{
                  background: "rgba(92, 149, 255, .3)",
                }}
                >
                <>
                <div
                  className="absolute -right-16 top-0 w-40 h-40 rounded-full  "
                  style={{
                    background: "rgba(92, 149, 255, .3)",
                  }}
                ></div>
                <div
                  className="absolute -top-12 right-6  w-40 h-40 rounded-full  "
                  style={{
                    background: "rgba(92, 149, 255, .3)",
                  }}
                ></div>
                </>

                <div className="w-44 h-48 absolute top-4 -left-4 bg-red">
                  <Image
                    src="/programs/youngOraters.svg"
                    alt="Bhopal Storytellers"
                    layout="fill"
                    className=""
                  />
                </div>

                <div className="absolute bottom-4 right-8 text-end">
                    <h1 className="text-xl ">Bhopal Storytellers</h1>
                    <p className="text-sm">SubHeading</p>
                </div>

              </div>

              {/* big card with bubbles */}
              <div
                className="relative overflow-hidden col-span-2 md:col-span-4 row-span-2 h-[300px]  rounded-lg shadow-md flex items-center justify-center aspect-w-1 aspect-h-1"
                style={{
                  background: "rgba(92, 149, 255, .3)",
                }}
              >
                <>
                  {/* small circle */}
                  <div
                    className="absolute right-16 top-3 w-20 h-20 rounded-full  "
                    style={{
                      background: "rgba(92, 149, 255, .3)",
                    }}
                  ></div>

                  {/* medium circle */}
                  <div
                    className="absolute top-15 right-16 w-32 h-32 rounded-full  "
                    style={{
                      background: "rgba(92, 149, 255, .3)",
                    }}
                  ></div>

                  {/* large circle */}
                  <div
                    className="absolute -right-16 top-0 w-40 h-40 rounded-full  "
                    style={{
                      background: "rgba(92, 149, 255, .3)",
                    }}
                  ></div>

                  {/* bottom circle */}
                  <div
                    className="absolute -right-2 -bottom-16 w-48 h-48 rounded-full  "
                    style={{
                      background: "rgba(92, 149, 255, .3)",
                    }}
                  ></div>
                </>

                <div className="w-60 h-60 absolute top-0 left-1 bg-red">
                  <Image
                    src="/programs/BhopalStorytellers.svg"
                    alt="Bhopal Storytellers"
                    layout="fill"
                    className=""
                  />
                </div>

                <div className="absolute bottom-4 right-16 text-end">
                    <h1 className="text-xl ">Bhopal Storytellers</h1>
                    <p className="text-sm">SubHeading</p>
                </div>


              </div>

               {/* small card with bubbles */}
               <div
                className=" relative overflow-hidden col-span-4 md:col-span-2 row-span-2 h-[300px]  rounded-lg shadow-md flex items-center justify-center aspect-w-1 aspect-h-1"
                style={{
                  background: "rgba(92, 149, 255, .3)",
                }}
                >
                <>
                <div
                  className="absolute -right-10 top-0 w-32 h-32 rounded-full  "
                  style={{
                    background: "rgba(92, 149, 255, .3)",
                  }}
                ></div>
                <div
                  className="absolute -top-12 right-8  w-32 h-32 rounded-full  "
                  style={{
                    background: "rgba(92, 149, 255, .3)",
                  }}
                ></div>
                </>

                <div className="w-44 h-48 absolute top-4 -left-4 bg-red">
                  <Image
                    src="/programs/youngOraters.svg"
                    alt="Bhopal Storytellers"
                    layout="fill"
                    className=""
                  />
                </div>

                <div className="absolute bottom-4 right-8 text-end">
                    <h1 className="text-xl ">Bhopal Storytellers</h1>
                    <p className="text-sm">SubHeading</p>
                </div>

              </div>
              
              <div className="col-span-2 row-span-2 h-[300px] bg-white rounded-lg shadow-md flex items-center justify-center aspect-w-1 aspect-h-1">
                4
              </div>
              <div className="col-span-2 row-span-2 h-[300px] bg-white rounded-lg shadow-md flex items-center justify-center aspect-w-1 aspect-h-1">
                5
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPrograms;
