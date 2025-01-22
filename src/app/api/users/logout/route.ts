
export const dynamic = "force-dynamic"; // Force the route to be dynamic

import { connect } from "@/dbConfig/dbconfig";
import {  NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "User logged out successfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as { message: string }).message },
      { status: 500 }
    );
  }
}
