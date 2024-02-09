import { NextResponse,NextRequest } from "next/server";

import nodemailer from "nodemailer"

export const POST = async (req: NextRequest) => {
    try {
        const { email_address } = await req.json(); 
        if (!email_address) {
            return new NextResponse(JSON.stringify({ message: "Email address is required" }), {
                status: 400,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: process.env.BRAVO_MAIL!,
                pass: process.env.BRAVO_SMTP!,
            },
        });

        const mailOptions = {
            from: process.env.BRAVO_MAIL!,
            to: email_address,
            subject: "Thanks for Subscribing",
            text: "Thanks for Subscribing",
        };

        await transporter.sendMail(mailOptions);
        return new NextResponse(JSON.stringify({ message: "Email sent successfully" }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: "Failed to send email" }), {
            status: 500,
        });
    }
};