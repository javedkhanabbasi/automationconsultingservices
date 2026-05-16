import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, company, email, revenue, message } = await req.json();

    await resend.emails.send({
      from: "Automation Consulting Services <onboarding@resend.dev>",  

      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New inquiry from ${name} at ${company}`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;padding:32px;background:#fff;">
          <h2 style="font-size:20px;font-weight:700;color:#000;margin:0 0 24px;border-bottom:2px solid #000;padding-bottom:12px;">
            New Contact Form Submission
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.08em;width:110px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#000;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.08em;">Company</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#000;font-weight:600;">${company}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.08em;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#000;font-weight:600;">${email}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.08em;">Revenue</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#000;font-weight:600;">${revenue}</td>
            </tr>
          </table>
          <div style="margin-top:24px;">
            <p style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">Message</p>
            <div style="background:#f9f9f9;border-radius:8px;padding:16px;font-size:14px;color:#000;line-height:1.7;white-space:pre-wrap;">${message}</div>
          </div>
          <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;">
            <a href="mailto:${email}" style="background:#000;color:#fff;padding:10px 20px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;display:inline-block;">
              Reply to ${name} →
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}