"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const emailTemplate = (userName, verificationLink) => {
    const html = `
    <div style="max-width:600px;margin:0 auto;padding:20px;background-color:#f9f9f9;border-radius:10px;font-family:Arial,sans-serif;color:#333;">
      <h2 style="color:#4CAF50;">Welcome to MyJawaaf LMS 🎓</h2>
      <p>Hi ${userName || "there"},</p>
      <p>Thanks for signing up on <strong>MyJawaaf LMS</strong>. To complete your registration, please verify your email address by clicking the button below:</p>

      <div style="text-align:center;margin:30px 0;">
        <a href="${verificationLink}" style="background-color:#4CAF50;color:#fff;padding:12px 25px;text-decoration:none;border-radius:5px;font-weight:bold;">Verify Email</a>
      </div>

      <p>If the button above doesn't work, you can also click or paste the following link into your browser:</p>
      <p style="word-break:break-all;"><a href="${verificationLink}">${verificationLink}</a></p>

      <hr style="margin:30px 0;border:none;border-top:1px solid #ddd;" />

      <p style="font-size:12px;color:#777;">If you didn't request this, you can safely ignore this email.</p>
      <p style="font-size:12px;color:#777;">Sent by MyJawaaf LMS • www.myjawaaf.com</p>
    </div>
  `;
    return html;
};
exports.emailTemplate = emailTemplate;
