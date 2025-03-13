/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconnection/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helper/getDataFromToken";
import mongoose from "mongoose";

// export async function POST(request: NextRequest) {
//   // await connectDB();
//   // const user_id = await getDataFromToken(request);
//   // const user = await User.findById({ _id: user_id }).select("-password");
//   // return NextResponse.json({ message: "User Found", data: user });

//   const user_id = await getDataFromToken(request);

//   // Validate ObjectId format
//   if (!mongoose.Types.ObjectId.isValid(user_id as string)) {
//     return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//   }

//   const user = await User.findById(user_id).select("-password");

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   return NextResponse.json({ message: "User Found", data: user });
// }




export async function POST(request: Request) {
    await connectDB();

    const userData = await getDataFromToken(request);
    console.log("User Data:", userData);
    const user_id = userData.id; // Extract only the "id" field

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById({_id:user_id}).select("-password");

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User Found", data: user });
}
