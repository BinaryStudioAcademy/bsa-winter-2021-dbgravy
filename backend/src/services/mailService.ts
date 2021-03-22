import { env } from '../env';
import { transporter } from '../config/nodeMailer';
import { IMail } from '../common/models/mail/IMail';
import { IResetPasswordMessage } from '../common/models/mail/IResetPasswordMessage';

const { mail: from } = env.mail;
const { baseUrl } = env;

export const sendMail = async ({ to, subject, text, html }: IMail) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: Error, info: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export const sendInviteLinkMail = async (msg: IMail) => {
  await sendMail(msg);
};

export const sendResetPasswordMail = async ({ to, token }: IResetPasswordMessage) => {
  const message: IMail = {
    to,
    subject: 'Password reset instructions',
    text: `Please use the following link to reset your password: ${baseUrl}/auth/reset/${token}`
  };
  await sendMail(message);
};
