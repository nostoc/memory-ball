import Image from "next/image";
import React from "react";
import Icon from "../../public/icon.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className="container mx-auto bg-background flex-1 flex justify-between items-center">
      <div className="flex items-center flex-1 py-4 text-white">
        <Image src={Icon} alt="memory ball logo" width={40} height={40} />
        <p className="font-bricolage font-bold text-[20px] borde">
          Memory Ball
        </p>
      </div>
      <div>
        <Link href="#">
          <button className="btn btn-ghost font-bricolage text-black text-[20px] bg-button  hover:bg-background hover:text-white hover:border-2 hover:border-black">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
