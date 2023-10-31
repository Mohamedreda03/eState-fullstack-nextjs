"use client";

import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";

const GooglePtn = () => {
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
      console.log(data);

      router.push("/");
    } catch (error) {
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
