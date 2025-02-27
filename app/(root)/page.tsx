import GetStarted from "@/components/home/GetStarted";
import Intro from "@/components/home/Intro";
import React from "react";

const page = () => {
  return (
    <div className="bg-background ">
      <Intro />
      <GetStarted />
    </div>
  );
};

export default page;
