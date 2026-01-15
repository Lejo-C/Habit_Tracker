const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // For DEV, maybe use Ethereal or just logging if no creds, but assuming env vars are there.
    // In production, use SendGrid or similar via SMTP.

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'Gmail', // or host/port
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@habittracker.com',
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[DEV] Email failed to send (expected without valid creds). Message: ${error.message}`);
            // Do not throw in dev, just return null or log
            return null;
        }
        console.error("Error sending email: ", error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
