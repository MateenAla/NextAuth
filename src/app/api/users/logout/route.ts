/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconnection/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import jwt from "jsonwebtoken";


export async function GET(request: NextRequest) {
    await connectDB();

    try {
        const response = NextResponse.json({ message: "User logged out successfully", success: true });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
        
    } catch (error: any) {
        console.error("Error in POST /verifyemail:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}