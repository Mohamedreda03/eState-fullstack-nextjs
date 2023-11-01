"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const PrivatePage = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const router = useRouter();
  if (!currentUser) {
    router.push("/signin");
    return <div>Redirecting...</div>;
  } else {
    return <>{children}</>;
  }
};

export default PrivatePage;
