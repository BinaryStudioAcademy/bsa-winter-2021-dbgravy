import { env } from '../env';
import { transporter } from '../config/nodeMailer';

const { mail: from } = env.mail;

export const sendMail = async ({ to, subject, text, html }: any) => {
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

export const sendInviteLinkMail = async (msg: any) => {
  await sendMail(msg);
};
