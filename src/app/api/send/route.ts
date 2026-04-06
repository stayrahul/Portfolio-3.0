import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import validator from "validator";
import { EmailTemplate } from "@/components/template/Email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderName, senderEmail, reasonToContact, senderMsg } = body;

    // 1. Validation
    if (!senderName || !senderEmail || !senderMsg) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!validator.isEmail(senderEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // 2. Transporter Setup (Free via Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email_from,     // Your Gmail
        pass: process.env.email_password, // Your 16-char App Password
      },
    });

    // 3. Prepare the Auto-Reply Template (for the Client)
    const clientHtml = await render(
      EmailTemplate({
        userName: senderName,
        contactReason: reasonToContact,
        userMessage: senderMsg,
      })
    );

    // 4. THE FIX: Define two distinct email targets
    
    // Email to YOU (Notification)
    const mailToAdmin = {
      from: `"Portfolio Alert" <${process.env.email_from}>`,
      to: process.env.email_from, 
      replyTo: senderEmail, // Hit reply to talk to the client!
      subject: `🚀 New Inquiry: ${reasonToContact} from ${senderName}`,
      text: `Name: ${senderName}\nEmail: ${senderEmail}\nMessage: ${senderMsg}`,
      html: `
        <div style="font-family: sans-serif; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;">
          <h2 style="color: #7c3aed;">New Portfolio Message</h2>
          <p><strong>Sender:</strong> ${senderName}</p>
          <p><strong>Email:</strong> ${senderEmail}</p>
          <p><strong>Reason:</strong> ${reasonToContact}</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <strong>Message:</strong><br/>${senderMsg}
          </div>
        </div>
      `,
    };

    // Email to THEM (Confirmation)
    const mailToClient = {
      from: `"Sushant Kushwaha" <${process.env.email_from}>`,
      to: senderEmail,
      subject: "Got your message! 🚀",
      html: clientHtml,
    };

    // 5. Send both at once
    await Promise.all([
      transporter.sendMail(mailToAdmin),
      transporter.sendMail(mailToClient)
    ]);

    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (err: any) {
    console.error("Email API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}