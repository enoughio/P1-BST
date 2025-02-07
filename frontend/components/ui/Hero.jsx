import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { CiLinkedin } from "react-icons/ci";

export default function Hero() {
  return (
    <>
      {/* <section className="flex justify-center w-f h-screen bg-green-500 py-0">
      <div className=" mx-20 flex justify-center  items-start h-[80%] pt-20">
        <div className="left w-[60%] px-16">
          <div className="upper w-full h-full pl-7 ">
            <div className="heading pb-5">
              <h1 className="text-[60px] font-bold leading-none tracking-normal text-right text-gray-900">
                We help you become everyone's favorite speaker!
              </h1>
            </div>

            <div className="sub-heading ">
              <p className="text-lg text-gray-700  text-right">
                Master the art of storytelling, communication, and public
                speaking with Bharat Storytellers. Whether you're a beginner
                overcoming stage fright or a speaker refining your craft, our
                community empowers you with skills, confidence, and a
                supportive stage to shine.
              </p>
            </div>
          </div>

          <div className="socials">
            <Button variant="icon" className="mr-2">
              <FaInstagram className="h-6 w-6" />
            </Button>
            <Button variant="icon" className="mr-2">
              <FaFacebookF className="h-6 w-6" />
            </Button>
            <Button variant="icon" className="mr-2">
              <AiOutlineYoutube className="h-6 w-6" />
            </Button>
            <Button variant="icon" className="mr-2">
              <CiLinkedin className="h-6 w-6" />
            </Button>
          </div>

          <div className="cta">
            <Button variant="primary">Join Us</Button>
            <Button variant="primary">Join Us</Button>
          </div>
        </div>

        <div className=" flex  justify-center items-center w-[40%]">
          <Image
            src="/test.svg"
            alt="Hero image"
            className="object-cover "
            width={1200}
            height={1200}
          />
        </div>
      </div>
    </section> */}

      <section className="relative overflow-hidden bg-background py-6">
        <div className="container relative mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 ">
            <div className="flex flex-col justify-start space-y-8">
              <div className="space-y-6">
                <div className="border-r-4 border-b-4 border-b-blue-400 border-orange-300 text-right pr-5 ">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
                  We help you become everyone's favorite speaker!
                  </h1>
                </div>
                <p className="max-w-[600px] text-muted-foreground">
                  Quo excepturi quas eum voluptas dicta ut enim deserunt! Id
                  itaque iste es temporibus veniam enim consequatur, omnis est
                  verum temporibus nam dolorum quia. Est modi provident sed
                </p>
              </div>

              <div className="flex gap-4">
                <FaFacebookF className="h-6 w-6" />
                <CiLinkedin className="h-6 w-6" />
                <FaInstagram className="h-6 w-6" />
              </div>

              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-pink-100 text-black hover:bg-pink-200"
                  size="lg"
                >
                  <Link href="#">Explore Programs</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-blue-50 hover:bg-blue-100"
                  size="lg"
                >
                  <Link href="#">Register Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square overflow-hidden [border-radius:48px_48px_48px_150px] ">
                <Image
                  src="/test.svg"
                  alt="Hero image"
                  className="object-cover "
                  width={1200}
                  height={1200}
                />
              </div>

              <div className="absolute -right-1 top-2 flex flex-col justify-center items-center border-2 rounded-full ">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Profile 1"
                  width={64}
                  height={64}
                  className="h-20 w-20 rounded-full border-2 border-red-600 bg-white"
                />
              </div>

              <div className="absolute left-1 bottom-6 flex flex-col justify-center items-center border-2 rounded-full gap-3 border-red-600 ">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Profile 1"
                  width={64}
                  height={64}
                  className="h-20 w-20 rounded-full border-2 border-red-600 bg-white"
                />
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Profile 2"
                  width={64}
                  height={64}
                  className="h-20 w-20 rounded-full border-2 border-white bg-white"
                />
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Profile 1"
                  width={64}
                  height={64}
                  className="h-20 w-20 rounded-full border-2 border-red-600 bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

{
  /*
  <div className="relative">
  <div className="relative aspect-square overflow-hidden [border-radius:48px_48px_48px_150px] bg-pink-100">
<Image
    src="/test.svg" // 🔹 Use actual image path
    alt="Hero image"
    fill
    className="object-cover bg-white"
    priority
  />
</div>
<div className="absolute -left-4 top-1/3 flex -space-x-4">
<Image
    src="/kid-playing.jpg" // 🔹 Use actual image path
    alt="Profile 1"
    width={64}
    height={64}
    className="h-16 w-16 rounded-full border-2 border-white bg-white"
  />
  <Image
    src="/happy-speach.jpg" // 🔹 Use actual image path
    alt="Profile 2"
    width={64}
    height={64}
    className="h-16 w-16 rounded-full border-2 border-white bg-white"
  />
</div>
</div>
   */
}
