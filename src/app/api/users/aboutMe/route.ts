'use server'
import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 500 });
  }
  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
