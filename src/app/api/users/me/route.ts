/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconnection/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function POST(request: NextRequest) {
  await connectDB();
  const user_id = await getDataFromToken(request);
  const user = await User.findById({ _id: user_id }).select("-password");
  return NextResponse.json({ message: "User Found", data: user });
}
