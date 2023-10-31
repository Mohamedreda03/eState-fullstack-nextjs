import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-slate-200 h-[80px] flex items-center justify-center">
      <div className="px-2 flex justify-between items-center max-w-7xl mx-auto w-full">
        <h1>
          <Link href="/" className="md:text-2xl text-lg">
            <span className="text-slate-500">e</span>
            <span className="text-slate-700">State</span>
          </Link>
        </h1>
        <form className="bg-white px-3 py-2 rounded flex items-center mx-11">
          <input
            className="bg-transparent focus:outline-none w-full"
            type="text"
            placeholder="Search"
          />
          <FaSearch className="text-slate-400 cursor-pointer" />
        </form>

        <ul className="flex gap-6 text-lg">
          <li className="hidden sm:inline hover:text-slate-600">
            <Link href="/">Home</Link>
          </li>
          <li className="hidden sm:inline hover:text-slate-600">
            <Link href="/profile">Profile</Link>
          </li>
          <li className="hidden sm:inline hover:text-slate-600">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-slate-600">
            <Link href="/signin">Signin</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
