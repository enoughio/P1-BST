import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const user = {
  username: "JohnDoe",
  firstName: "John",
  lastName: "Doe",
  email: "example@gmail.com",
  Phone: "1234567890",
  gender: "male",
};

const BasicInfo = (props) => {
  const {
    username = "JohnDoe",
    firstName = "John",
    lastName = "Doe",
    email = "example@gmail.com",
    Phone = "1234567890",
    gender = "male",
  } = props.user;

  return (
    <div className="max-w-[500px] bg-slate-700 flex  flex-col p-3 gap-4 rounded-2xl m-5">

      <div className="flex  items-center justify-around">
        <Avatar className="w-[150px] h-[150px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h5>Id: {username}</h5>
      </div>

      <div>
        <ul className="leading-5"> 
            <li>First Name: {firstName}</li>
            <li>Last Name: {lastName}</li>
            <li>Email: {email}</li>
            <li>Phone: {Phone}</li>
            <li>Gender: {gender}</li>

        </ul>
       
      </div>

      <div className="flex justify-center items-center">
        <h1>edit</h1>
        <PenIcon />{" "}
      </div>
    </div>
  );
};

export default BasicInfo;
