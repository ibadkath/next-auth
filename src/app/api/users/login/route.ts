import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    const { email, password } = req;
    console.log(req);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "This user does not exist" },
        { status: 400 }
      );
    }
    const validpassowrd = await bcryptjs.compare(password, user.password);

    if (!validpassowrd) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "User logged In successfully", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    console.error("Error in login route:", error);

    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
