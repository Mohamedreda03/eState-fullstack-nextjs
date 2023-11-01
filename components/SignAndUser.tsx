"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const SignAndUser = () => {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <>
      {currentUser ? (
        <li className="flex items-center gap-2">
          <Link href="/profile">
            <img
              src={currentUser.avatar}
              className="h-[35px] rounded-full"
              alt="img"
            />
          </Link>
        </li>
      ) : (
        <li className="hover:text-slate-600">
          <Link href="/signin">Signin</Link>
        </li>
      )}
    </>
  );
};

export default SignAndUser;
