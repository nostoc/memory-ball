import Image from "next/image";
import React from "react";
import Icon from "../../public/icon.png";

//import Link from "next/link";


const Header = () => {
  return (
    <header className="bg-background flex justify-between items-center shadow-md w-full py-2">
    <div className="container mx-auto flex-1 flex justify-between items-center ">
      <div className="flex items-center flex-1 py-4 text-white">
        <Image src={Icon} alt="memory ball logo" width={40} height={40} />
        <p className="font-bricolage font-bold text-[20px] borde">
          Memory Ball
        </p>
      </div>
      <div>
        
          </div>
      </div>
    </header>
  );
};

export default Header;

