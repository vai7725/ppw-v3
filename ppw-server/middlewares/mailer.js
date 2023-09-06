import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: `Previous Papers`,
      link: `${process.env.CLIENT_URI}`,
    },
  });

  const emailText = mailGenerator.generatePlaintext(options.mailContent);

  const emailHtml = mailGenerator.generate(options.mailContent);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  const mail = {
    from: process.env.CLIENT_URI,
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log(error);
  }
};
