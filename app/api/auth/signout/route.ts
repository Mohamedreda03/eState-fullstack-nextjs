import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const response = NextResponse.json(
    { msg: "user signed out." },
    { status: 200 }
  );

  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
};
