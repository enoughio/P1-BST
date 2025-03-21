import { Input } from "@/components/ui/input";
import React from "react";

const Page = () => {
  return (
    <div>
      <form action="post">
        <div>
          <label htmlFor=""></label>
          <Input type="input" />
        </div>

        <div>
          <label htmlFor=""></label>
          <Input type="password" />
        </div>

        <button type="submit"></button>


      </form>
    </div>
  );
};

export default Page;
