import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "@/utils/AppError";
import connectDB from "@/db/connectDB";

export const POST = async (req: NextRequest) => {
  await connectDB();
  let { email, username, photo, password } = await req.json();

  const user = await User.findOne({ email });

  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      const error = AppError.create("invalid password", 400, "fail");
      return NextResponse.json(error);
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET as string
    );

    const response = NextResponse.json({
      message: "user logged in successfully",
      status: "success",
      statusCode: 200,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  username =
    username.split(" ").join("").toLowerCase() +
    Math.random().toString().slice(-4);

  const newUser = await User.create({
    username,
    email,
    avatar: photo,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username, email: newUser.email },
    process.env.JWT_SECRET as string
  );

  const response = NextResponse.json({
    message: "user created successfully",
    status: "success",
    statusCode: 201,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
};
