/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconnection/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
    await connectDB();
    try {
        const body = await request.json();
        const { email , password } = body;
        console.log("Request Body:", body);

        // Validate request body
        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existedUser = await User.findOne({ email });
        if (!existedUser) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, existedUser.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        // Generate JWT token
        const payload = {
           id: existedUser._id,
           username: existedUser.username,
           email: existedUser.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({ message: "User logged in successfully", success: true });
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

        
    } catch (error: any) {
        console.error("Error in POST /verifyemail:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }   

}