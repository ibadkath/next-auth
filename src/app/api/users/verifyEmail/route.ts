
export const dynamic = "force-dynamic"; // Force the route to be dynamic

import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    const { token } = req;
    console.log(token);

    const user = await User.findOne({
      isVerifiedToken: token,
      isVerifiedTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.isVerifiedToken = undefined;
    user.isVerifiedTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
