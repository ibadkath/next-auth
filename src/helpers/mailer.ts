import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface IMails {
  email: string;
  emailType: string;
  userId: number | string;
}
export const sendEmail = async ({ email, emailType, userId }: IMails) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
     // const updatedUser =
       await User.findByIdAndUpdate(userId, {
        $set: {
          isVerifiedToken: hashedToken,
          isVerifiedTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "743f73676b7bd1",
        pass: "8ae5e5c313e667",
      },
    });
    const mailOptions = {
      from: "ibad@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyEmail?token=${hashedToken}"> here</a> 
            to ${
              emailType == "VERIFY"
                ? "verify your email"
                : "reset your password"
            }
            or copy and paste the link below in your browser <br/>
            ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
            </p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if(error instanceof Error){
      throw new Error(error.message);

    }
    throw new Error("An unknown error occured");
  }
};
