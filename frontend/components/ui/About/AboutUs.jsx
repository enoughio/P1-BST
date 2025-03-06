import { about, downQuot } from "@/lib/data/images";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center md:gap-8 gap-4  w-full mt-6">
      <div className="border-red-200 border-2 m-2  p-2 md:p-4 w-full md:w-1/2 rounded-3xl">
        <div className="flex flex-col justify-between items-center w-full relative">
          <p className="p-2 text-sm">
            <Image
              src={downQuot}
              alt="downQuot"
              width={30}
              height={30}
              className="rotate-180 self-start inline-block mr-6 pt-1"
            />
            Ut voluptas quam At obcaecati consequatur ut aliquam architecto qui
            esse ducimus et omnis quia quo nisi quasi et accusamus doloribus. Ea
            magnam quasi qui quia accusantium sed aliquam ipsa! Sit doloremque
            unde in quibusdam corrupti est velit enim et delectus atque quo
            ullam incidunt. Et dolore mollitia aut excepturi facilis sed
            voluptate. sequiqui quia accusantium sed aliquam ipsa!
            <Image
              src={downQuot}
              alt="downQuot"
              width={30}
              height={30}
              className="self-end inline-block mx-3 mt-3"
            />
          </p>
        </div>

        <div className="mt-2">
          <Image
            src={about}
            alt="mission"
            className="rounded-md"
            width={670}
            height={320}
          />
        </div>
      </div>

      <div className="border-blue-100 border-2 p-4  w-full md:w-1/2 md:py-8 bg-blue-50 rounded-3xl ">
        <div className="flex flex-col w-fit">
          <h1 className="font-semibold text-3xl leading-none">About Us</h1>
          <div className=" bg-blue-400 w-[70%] h-1 self-end rounded-3xl"></div>
        </div>

        <div className="mt-6">
          <p>
            Ad quia voluptas et consectetur iusto in repellat necessitatibus qui
            quia dignissimos. Sit nobisssi quam non ratione dolorum et
            reprehenderit vero qui labore aperiam? Ad galisum laborum non soluta
            corrupti qui doloremque quam sed commodi culpa aut dolorum earum.
          </p>
          <p className="mt-6">
            Aut dicta architecto aut distinctio voluptas utleq itaque
            voluptates! Ut quas quaerat eum quin sils voluptatem consequatur et
            dolorem unde exrern cupiditate rerum. Cum delectus quia est enima il
            voluptatem expedita ab dolores enim ut rerum ni recusandae laborum
            et unde obcaecati sed iste nostrum corporis. Ea officiis optio vel
            galisum qui rerum sed iste quibusdam et voluptates sint enim rerum
            nam galisum reiciendis qui nulla.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
