"use client";
import GooglePtn from "@/components/GooglePtn";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/features/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resData, setresData] = useState("") as any;
  console.log(user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    type DataUser = {
      email: string;
      password: string;
    };

    const dataUser: DataUser = {
      email,
      password,
    };

    const { data } = await axios.post("/api/auth/signin", dataUser);

    dispatch(signInStart());

    if (data.status === "fail") {
      setresData(data);
      dispatch(signInFailure(data.message));
    }
    if (data.status === "success") {
      setresData(data);
      dispatch(signInSuccess(data.user));
      window.localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    }
  };
  return (
    <div className="flex w-full h-[calc(100vh-80px)] items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white h-[700px] max-w-[500px] w-full rounded-md items-center justify-center p-16 gap-5"
      >
        <h2 className="text-[30px] mb-3 font-medium">Sign In</h2>
        {
          // for error message
          resData.status === "fail" && (
            <div className="text-red-500 w-full bg-red-200 rounded-md py-3 text-center">
              {resData.message}
            </div>
          )
        }
        {
          // for success message
          resData.status === "success" && (
            <div className="text-green-500 w-full bg-green-200 rounded-md py-3 text-center">
              {resData.message}
            </div>
          )
        }
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full py-3 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent`}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-3 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full bg-black/80 text-white py-3 rounded-md cursor-pointer hover:bg-black/90 transition-all duration-200 ease-in-out"
        >
          Sign In
        </button>
        <GooglePtn />
        <div className="">
          create an account?{" "}
          <Link href="/signup" className="text-slate-500">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default page;
