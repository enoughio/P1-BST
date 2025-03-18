"use client";
import React, { useEffect, useState } from "react";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);

    fetch("/api/login", {
      method: "POST",
      body
    })

  };

  useEffect(() => {
  
  }, [])
  


  return (
    <div className="flex justify-center items-center  p-4 md:p-8 mt-10">
       
      <div className="rounded-xl border bg-white text-black shadow-lg p-8 max-w-md w-full md:w-[60%]">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Welome to Bharat Storytellers </h2>
            <p className="text-sm text-gray-600">
              Enter your email and password below to login
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                className="w-full mt-1 p-2 border rounded-md"
                id="email"
                placeholder="member@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                className="w-full mt-1 p-2 border rounded-md"
                id="password"
                type="password"
                placeholder="Enter password provided by your club admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>

      {/* <div className="hidden md:block w-[] h-full overflow-hidden ">
            <Image src={groupPhoto} fill alt="login page hero image" objectFit="cover" />
        </div> */}

    </div>
  );
};

export default LoginPage;
