import { Phone } from "lucide-react";
import React from "react";
import BasicInfo from "./BasicInfo";

const user = {
  username: "JohnDoe",
  firstName: "John",
  lastName: "Doe",
  email: "example@gmail.com",
  Phone: "1234567890",
  gender: "male",
  DOB: "01-01-1990",
  address: "123, Main Street, City, Country",
  profilePic: "https://picsum.photos/200/300",
};

const page = () => {
  const { firstName, lastName } = user; // destructure firstName and lastName from user

  return (
    <div>
      <div className=" w-full h-20 bg-blue-400 text-center ">
        <h1 className="text-3xl font-bold my-auto">
          WellCome {firstName}, {lastName}{" "}
        </h1>{" "}
      </div>

      {/* basic info   */}
      <BasicInfo user={user} />

      {/* additionla info */}

      {/* my club  */}

      {/* membership history */}

      {/* privercy policy */}
    </div>
  );
};

export default page;
