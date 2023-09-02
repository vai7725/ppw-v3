export const otpMail = (otp) => {
  return {
    subject: `OTP verification for ${process.env.CLIENT_URI}`,
    body: `
    <header>
      <h1>Hello</h1>
    </header>
    <main>
    <p>Thank you for joining ${process.env.CLIENT_URI}, your go-to destination for accessing a vast collection of previous year question papers. We are thrilled to have you as a member of our community!</p>
    <p>To complete your registration and ensure the security of your account, we require you to verify your email address. Please use the following One-Time Password (OTP) to verify your account:</p>
    <h2>OTP: ${otp}</h2>
    <p>Please enter this OTP on the verification page of our website within the next 10 minutes to successfully verify your email address.</p>
    <p>We are excited to have you on board, and we look forward to supporting your academic pursuits. If you have any questions or require any assistance, please feel free to reach out to our team.<p>
    </main>
    <footer>
      <p>Regards</p>
      <p>Team ${process.env.CLIENT_URI}</p>
    </footer>
    `,
  };
};
