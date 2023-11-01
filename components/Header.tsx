"use client";

import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SignAndUser from "@/components/SignAndUser";
import { signInSuccess } from "@/features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  // const user = JSON.parse(window.localStorage.getItem("user") as any);
  // React.useEffect(() => {
  //   if (user) {
  //     dispatch(signInSuccess(user));
  //   }
  // }, [user]);

  return (
    <header className="bg-slate-200 h-[80px] flex items-center justify-center">
      <div className="px-6 flex justify-between items-center max-w-7xl mx-auto w-full">
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

        <ul className="flex gap-6 text-lg items-center">
          <li className="hidden sm:inline hover:text-slate-600">
            <Link href="/">Home</Link>
          </li>
          <li className="hidden sm:inline hover:text-slate-600">
            <Link href="/about">About</Link>
          </li>
          <SignAndUser />
        </ul>
      </div>
    </header>
  );
};

export default Header;
