/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/UserModel";
import nodemailer from "nodemailer";
import { connectDB } from "@/dbconnection/db";
import bcrypt from "bcryptjs";

await connectDB();
export const sendEmail = async ({ email, emailtype, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 10);
    if (emailtype === "Verification") {
      await User.findOneAndUpdate(
        { userId },
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
      );
    } else if (emailtype === "PasswordReset") {
      await User.findOneAndUpdate(
        { userId },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "78e77cdad90d0d",
        pass: "9d185222bb6c9b",
      },
    });
    // send mail with defined transport object
    const mailOptions = {
      from: "maddison53@ethereal.email",
      to: email,
      subject: "Email Verification",
      html: `Hello ${emailtype} ${userId}`,
    };

    const emailResponse = await transporter.sendMail(mailOptions);

    return emailResponse;
  } catch (error: any) {
    throw new Error(error);
  }
};
