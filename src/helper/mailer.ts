/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/UserModel";
import nodemailer from "nodemailer";
import { connectDB } from "@/dbconnection/db";
import bcrypt from "bcryptjs";

await connectDB();

export const sendEmail = async ({ email, emailtype, userId }: any) => {
  try {
    if (!email || !emailtype || !userId) {
      throw new Error("Missing required parameters: email, emailtype, or userId");
    }

    const hashedToken = await bcrypt.hash(String(userId), 10);

    if (emailtype === "Verification") {
      await User.findOneAndUpdate(
        { _id: userId },
        { $set: { 
            verifyToken: hashedToken, 
            verifyTokenExpiry: Date.now() + 3600000 
          }}
      );
      // updateField = { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 };
    } else if (emailtype === "PasswordReset") {
      await User.findOneAndUpdate(
        { _id: userId },
        { $set: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000 
          }}
      );
      // updateField = { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };
    } else {
      throw new Error("Invalid emailtype");
    }

    

    // if (!updatedUser) {
    //   throw new Error("User not found");
    // }

    const transporter= nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,//2525,
      secure: false, // Use `true` if port 465
      auth: {
        user: "78e77cdad90d0d",
        pass: "9d185222bb6c9b"
      }
    });

    const mailOptions = {
      from: "maddison53@ethereal.email",
      to: email,
      subject: "Email Verification",
      html: `<p>Click
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a>
        ${emailtype === "Verification" ? "to verify your email" : "to reset your password"}
        <br />
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        <br />
      </p>`,
    };

    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error: any) {
    console.error("Email sending failed:", error);
    throw new Error(error.message || "Email sending error");
  }
};
