/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconnection/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

export async function POST(request: NextRequest) {
    try {
        // 🔄 Wait for the DB connection to complete
        await connectDB();

        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log("Request Body:", reqBody);

        // Validate request body
        if (!username || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if the user already exists
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const savedUser = await User.create({ username, email, password: hashedPassword });

        // Send verification email
        await sendEmail({ email, emailtype: "Verification", userId: savedUser._id });

        console.log("User created successfully:", savedUser);
        return NextResponse.json({ message: "User created successfully", savedUser, success: true }, { status: 201 });
    } catch (error: any) {
        console.error("Error in POST /signup:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
