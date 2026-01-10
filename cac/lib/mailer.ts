import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_APP_PASSWORD,
    },
});

export async function sendWelcomeStaffEmail(toEmail: string) {
    const mailOptions = {
        from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_EMAIL}>`,
        to: toEmail,
        subject: "Welcome to Cafe & Chill! ☕",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #4e260a;">
        <h1 style="color: #8b4513;">Welcome to the Team!</h1>
        <p>Hi there,</p>
        <p>Your staff account for <strong>Cafe & Chill</strong> has been approved by the administrator.</p>
        <p>You can now log in and access the staff dashboard to manage sales and view your daily records.</p>
        <br/>
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" style="background-color: #8b4513; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        <br/><br/>
        <p>Best regards,<br/>Cafe & Chill Admin</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${toEmail}`);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        // Don't crash the request if email fails, but log it
    }
}
