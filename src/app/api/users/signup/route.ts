/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/dbconnection/db";
import User from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
connectDB();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        if(!username || !email || !password){
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        const existedUser = await User.findOne({email});
        if(existedUser){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);
        const savedUser = await User.create({username, email, password:hasedPassword});

        //Send Verification Email
        await sendEmail({email, emailtype: "Verification", userId: savedUser._id});
        return NextResponse.json({message: "User created successfully", savedUser, success: true}, {status: 201});
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}