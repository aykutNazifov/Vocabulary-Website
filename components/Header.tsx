import { UserContext } from "@/context/UserContextProvider";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="w-full bg-primary text-white peer">
      <div className="max-w-[1440px] w-full mx-auto h-12 px-2 flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-2xl">eVoca</h1>
        </Link>
        <Link href={`${user ? "/admin" : "/login"}`}>
          <span className="bg-white text-primary px-3 py-1 cursor-pointer rounded-md hover:bg-secondary hover:text-white transition-colors duration-300">
            Admin
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
