export const mailTemplate = (name, verificationUrl) => {
  return {
    body: {
      name,
      intro: `Welcome to ${process.env.CLIENT_URI}! We are very excited to have you with us.`,
      action: {
        instructions:
          'To verify your email please click on the following button:',
        button: {
          color: '#1f2937',
          text: 'Verify your email',
          link: verificationUrl,
        },
      },
      outro: 'Do not reply to this email',
    },
  };
};

export const forgotPasswordMailTemplate = (name, resetPasswordUrl) => {
  return {
    body: {
      name,
      intro: 'We got a request to reset passworf of your account',
      action: {
        instructions:
          'To reset your password click on the following button. Do not click if you did not make this request',
        button: {
          color: '#1f2937',
          text: 'Reset password',
          link: resetPasswordUrl,
        },
      },
      outro: 'Do not reply to this email',
    },
  };
};
