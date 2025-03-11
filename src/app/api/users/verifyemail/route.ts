/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconnection/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

export async function GET(request: NextRequest) {
    await connectDB();
    
    try {
        // const reqBody = await request.json();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token"); // Get token from URL query parameters
        console.log("Request Body:", token);

        // Validate request body
        const user = await User.findOne({ verifyToken: token }, {verifyTokenExpiry: { $gt: Date.now() }});
        // Check if the user  exists
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log("User found:", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        console.log("User updated successfully:", user);

        // Update user's isVerified field to true
        return NextResponse.json({ message: `Email verified successfully` },{ status: 200 });
        
        // Validate request body
        
        
    } catch (error: any) {
        console.error("Error in POST /verifyemail:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}