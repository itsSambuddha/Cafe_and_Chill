import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_EMAIL, // Use the email address for auth, not the display name
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


export async function sendContactFormEmail(data: { name: string; email: string; subject: string; message: string }) {
    const mailOptions = {
        from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_EMAIL}>`,
        to: process.env.SMTP_EMAIL, // Send to the admin/support email
        replyTo: data.email, // Allow replying directly to the user
        subject: `[Cafe Contact] ${data.subject}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #4e260a; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #8b4513; border-bottom: 2px solid #8b4513; padding-bottom: 10px;">New Contact Message</h2>
        
        <p><strong>From:</strong> ${data.name} (<a href="mailto:${data.email}">${data.email}</a>)</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
        </div>

        <br/>
        <p style="font-size: 12px; color: #6b7280;">This message was allowed sent from the Cafe & Chill contact form.</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Contact email sent from ${data.email}`);
        return { success: true };
    } catch (error) {
        console.error("Error sending contact email:", error);
        return { success: false, error };
    }
}
