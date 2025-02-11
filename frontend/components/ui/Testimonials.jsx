import React from "react";
import Image from "next/image";
import { youngOratersImg } from "@/lib/data/images";

const Testimonials = () => {
  return (
    <div>
      <div>
        <h1>Testimonials</h1>
        <div>This what out Memebers say about us</div>
      </div>

      {/* cards */}
      <div>
        <div>
          <div>
            <Image
              alt="member
             Image"
              src={youngOratersImg}
              fill
            />
          </div>

          <h2>Member Name</h2>
          <h3>@Stundent at Manit</h3>
        </div>

        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Voluptatum,
            temporibus?
          </p>

          <div className="stars ">
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
