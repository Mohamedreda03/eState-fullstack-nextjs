import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "@/db/connectDB";
import AppError from "@/utils/AppError";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const { email, password } = await req.json();

    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ email, password });

    if (error) {
      return NextResponse.json(error);
    }

    const user = await User.findOne({ email });

    if (!user) {
      const error = AppError.create("user not found", 404, "fail");
      return NextResponse.json(error);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
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
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    error.status = "error";
    return NextResponse.json(error);
  }
};
