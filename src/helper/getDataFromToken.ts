/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {  NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export function getDataFromToken(request: NextRequest)  {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        return decodedToken ;

        
    } catch (error: any) {
        console.error("Error in getDataFromToken:", error);
        throw new Error(error.message);
    }
}