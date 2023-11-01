"use client";

import PrivatePage from "@/components/PrivatePage";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signInSuccess } from "@/features/userSlice";
import { StorageReference, getStorage } from "@firebase/storage";
import { ref } from "@firebase/storage";
import { app } from "@/utils/firebase";
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "@firebase/storage";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user) as any;
  const [file, setFile] = useState(undefined) as any;
  const [progress, setProgress] = useState(0);
  const [imageUpload, setImageUpload] = useState(false) as any;
  const [avatar, setAvatar] = useState("");
  const fileRef = useRef(null) as any;
  const handleSignOut = async (e: any) => {
    e.preventDefault();

    await axios.post("/api/auth/signout");
    window.localStorage.removeItem("user");
    dispatch(signInSuccess(null));
    router.push("/signin");
  };

  useEffect(() => {
    if (file) {
      handkeFileUpload(file);
    }
  }, [file]);

  const handkeFileUpload = async (file: any) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setAvatar(downloadURL);
          setImageUpload(true);
        });
      }
    );
  };

  return (
    <PrivatePage>
      <main>
        <div className="flex w-full h-[calc(100vh-80px)] items-center justify-center bg-slate-100">
          <form className="flex flex-col w-[600px] justify-center items-center gap-6">
            <h2 className="text-[35px] mb-3 font-medium text-center">
              Profile
            </h2>
            <div>
              <img
                src={avatar ? avatar : user?.currentUser?.avatar}
                className="w-[160px] h-[160px] rounded-full mb-4 cursor-pointer hover:opacity-80 transition-all duration-200 ease-in-out object-cover"
                alt="img"
                onClick={() => fileRef.current.click()}
              />
              {imageUpload && (
                <div className="text-green-400 flex w-full items-center justify-center">
                  <h3>success upload img</h3>
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={(e: any) => setFile(e.target.files[0])}
              ref={fileRef}
              accept={"image/*"}
              hidden
            />
            <input
              type="text"
              name="username"
              placeholder="UserName"
              className={`w-full text-lg py-4 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent`}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={`w-full text-lg py-4 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent`}
            />
            <input
              type="text"
              name="Password"
              placeholder="Password"
              className={`w-full text-lg py-4 px-4 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent`}
            />
            <button
              type="button"
              className="w-full bg-black/80 text-xl text-white py-4 rounded-md cursor-pointer hover:bg-black/90 transition-all duration-200 ease-in-out"
            >
              Update
            </button>
            <button
              type="button"
              className="w-full bg-emerald-500 text-xl text-white py-4 rounded-md cursor-pointer hover:bg-emerald-600 transition-all duration-200 ease-in-out"
            >
              Create Listing
            </button>
            <div className="flex items-center justify-between w-full">
              <button className="text-red-500 text-xl">Delete Acount</button>
              <button onClick={handleSignOut} className="text-red-500 text-xl">
                Sign Out
              </button>
            </div>
          </form>
        </div>
      </main>
    </PrivatePage>
  );
};

export default page;
function gitDownloadURL(ref: StorageReference) {
  throw new Error("Function not implemented.");
}
