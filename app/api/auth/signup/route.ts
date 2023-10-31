import { NextRequest, NextResponse } from "next/server";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/models/user.model";
import connectDB from "@/db/connectDB";
import AppError from "@/utils/AppError";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const { username, email, password } = await req.json();

    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ username, email, password });

    if (error) {
      return NextResponse.json(error);
    }

    const usernameOldUser: any = await User.findOne({ username });

    if (usernameOldUser) {
      const error = AppError.create("username already exists.", 400, "fail");
      return NextResponse.json(error);
    }

    const emailOldUser = await User.findOne({ email }, { maxTimeMS: 1000 });

    if (emailOldUser) {
      const error = AppError.create("email already exists.", 400, "fail");
      return NextResponse.json(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET as string
    );

    const response = NextResponse.json({
      message: "user created successfully",
      status: "success",
      statusCode: 201,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: any) {
    error.status = "error";
    return NextResponse.json(error);
  }
};
