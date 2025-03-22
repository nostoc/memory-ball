import Image from "next/image";
import React from "react";
import StudyingCuate from "../../public/images/Studying-pana.png";
import { TiTick } from "react-icons/ti";

const Intro = () => {
  return (
    <section className="py-8 container mx-auto my-20">
      <div className="flex flex-1 justify-around items-center">
        <div className=" p-2 flex flex-col justify-start">
          <h1 className="text-white font-bold font-bricolage text-[64px]">
            Bounce Your Way to <br />
            <span>
              a{" "}
              <span className="bg-white text-title px-4 font-bold font-bricolage text-[64px]">
                Better Memory
              </span>
            </span>
          </h1>
          <h3 className="text-[24px] text-white font-bricolage mt-6">
            Tired of over whelming study tools?
          </h3>
          <p className="text-[20px] text-white font-bricolage">
            Keep It Simple with Memory Ball.
          </p>
          <div className="flex mt-4 items-center">
            <TiTick className="text-button text-[24px] mr-2" />
            <p className="text-white font-bricolage text-[20px]">Simple & Quick</p>
          </div>
          <div className="flex mt-4 items-center">
            <TiTick className="text-button text-[24px] mr-2" />
            <p className="text-white font-bricolage text-[20px]">Study Smarter</p>
          </div>
          <div className="flex mt-4 items-center">
            <TiTick className="text-button text-[24px] mr-2" />
            <p className="text-white font-bricolage text-[20px]">Any Time, Any Place</p>
          </div>
        </div>
        <Image
          src={StudyingCuate}
          width={450}
          alt="Student studying illustration by story set"
          className="flex justify-evenly p-4"
        />
      </div>
    </section>
  );
};

export default Intro;
