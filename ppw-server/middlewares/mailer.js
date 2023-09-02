import mailer from 'nodemailer';
import { otpMail } from '../templates/mailTemplates.js';
import OTP from 'otp-generator';

export const mail = async (req, res) => {
  try {
    const { email } = req.body;
    req.app.locals.user = {
      email,
      otp: OTP.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      }),
      otpExpiry: Date.now() + 300000,
    };

    const config = {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    };

    const transporter = mailer.createTransport(config);

    const mail = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: otpMail(req.app.locals.user.otp).subject,
      html: otpMail(req.app.locals.user.otp).body,
    };

    const emailSent = await transporter.sendMail(mail);
    if (!emailSent) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not send email' });
    }
    console.log(req.app.locals.user);
    return res
      .status(200)
      .json({ success: true, msg: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
