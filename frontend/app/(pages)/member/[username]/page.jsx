import { Phone } from "lucide-react";
import React from "react";
import BasicInfo from "./BasicInfo";
import MyClub from "./MyClub.jsx";
import AdditionalInfo from "./AdditionalInfo.jsx";
import PrivercyPolicy from "./PrivercyPolicy.jsx";
import { MembershipHistory } from "./membership-history";

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
  club: {
    clubName: "Club Name",
    clubId: "Club Id",
    clubAddress: "lorem  destructure firstName and lastName from user",
    clubAdmin: "Avril Pavar",
  },
};


const page = () => {
  const { firstName, lastName } = user; // destructure firstName and lastName from user

  return (
    <div className="flex flex-col md:flex-row gap-5 mx-8 my-5 ">
      {/* basic info   */}
      <div className="flex flex-col gap-5 ">
        <div className="">
          <BasicInfo user={user} />
        </div>

        <div className="X">
          <MyClub club={user.club} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* additionla info */}
        <div className="md:col-span-2">
          <AdditionalInfo user={user} />
        </div>

        {/* my club  */}

        {/* membership history */}
        <div className="">
          <MembershipHistory />
        </div>

        {/* privercy policy  */}
        <PrivercyPolicy />
      </div>
    </div>
  );
};

export default page;