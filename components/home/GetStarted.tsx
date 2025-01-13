import React from "react";
import { TbBulb } from "react-icons/tb";
import { PiRepeat } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { PiArrowBendDownRightFill } from "react-icons/pi";
import { PiArrowBendUpRightFill } from "react-icons/pi";

const GetStartedSteps = ({}) => {
  return (
    <section className="container mx-auto py-12 my-20">
      <h1 className="text-4xl font-bold text-white text-center mb-20 font-bricolage text-[56px]">
        Get Started in{" "}
        <span className="bg-white text-title px-2">03 Simple Steps</span>
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="w-[220px] h-[220px] border-[4px] boder-white p-2 flex flex-col items-center rounded-[22px] shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className=" w-[100px] p-4 rounded-lg text-white">
            <TbBulb size={80} />
          </div>
          <h3 className="font-bricolage text-[24px] text-white text-center font-semibold">
            Create Your Decks
          </h3>
        </div>
        <PiArrowBendDownRightFill size={80} className="text-white"/>
        <div className="w-[220px] h-[220px] border-[4px] boder-white p-3 flex flex-col items-center rounded-[22px] shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className=" w-[100px] p-4 rounded-lg text-white">
            <PiRepeat size={80} />
          </div>
          <h3 className="font-bricolage text-[24px] text-white text-center font-semibold">
            Flip and <br />
            Study
          </h3>
        </div>
        <PiArrowBendUpRightFill size={80} className="text-white" />
        <div className="w-[220px] h-[220px] border-[4px] boder-white p-3 flex flex-col items-center rounded-[22px] shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className=" w-[100px] p-4 rounded-lg text-white">
            <GiTrophyCup size={80} className="text-white"/>
          </div>
          <h3 className="font-bricolage text-[24px] text-white text-center font-semibold">
            Track Your Success
          </h3>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSteps;
