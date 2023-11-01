"use client";

import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/features/userSlice";

const GooglePtn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post("/api/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        password: result.user.uid,
        photo: result.user.photoURL,
      });
      dispatch(signInSuccess(data.user));
      window.localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch (error: any) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="w-full border py-2.5 rounded flex gap-2 items-center justify-center"
    >
      Continue with Google
      <img src="/googleIcon.svg" className="h-[26px]" alt="" />
    </button>
  );
};

export default GooglePtn;
