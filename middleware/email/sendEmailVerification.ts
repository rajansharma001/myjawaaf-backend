import nodemailer from "nodemailer";

export const sendEmailVerification = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
   <div style="max-width:600px;margin:0 auto;padding:20px;background-color:#f9f9f9;border-radius:10px;font-family:Arial,sans-serif;color:#333;">
    <h2 style="color:#4CAF50;">Reset Your Password - MyJawaaf LMS 🔐</h2>
    <p>Hi ${email || "there"},</p>

    <p>We received a request to reset your password for your <strong>MyJawaaf LMS</strong> account.</p>
    <p>If you made this request, please click the button below to securely reset your password:</p>

    <div style="text-align:center;margin:30px 0;">
      <a href="${link}" style="background-color:#4CAF50;color:#fff;padding:12px 25px;text-decoration:none;border-radius:5px;font-weight:bold;">Reset Password</a>
    </div>

    <p>If the button above doesn’t work, you can also click or copy and paste this link into your browser:</p>
    <p style="word-break:break-all;"><a href="${link}">${link}</a></p>

    <hr style="margin:30px 0;border:none;border-top:1px solid #ddd;" />

    <p style="font-size:12px;color:#777;">If you didn’t request a password reset, you can safely ignore this email — your password will remain unchanged.</p>
    <p style="font-size:12px;color:#777;">Sent by MyJawaaf LMS • www.myjawaaf.com</p>
  </div>
`;

  await transporter.sendMail({
    from: `"MyJawaaf LMS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: html,
  });
};
