import { NextResponse,NextRequest } from "next/server";

import nodemailer from "nodemailer"

export const POST = async (req: NextRequest) => {
    try {
        const { email_address,name } = await req.json(); 
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
            from:{
                name:name,
                address: process.env.BRAVO_MAIL! ,

            } ,
            to: email_address,
            subject: "Thanks for Subscribing",
            text: "Thanks for Subscribing",
        };

        
await new Promise((resolve, reject) => {
   
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            // console.log(info);
            resolve(info);
        }
    });
});
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