import { env } from '../env';
import { transporter } from '../config/nodeMailer';
import { IMail } from '../common/models/mail/IMail';

const { mail: from } = env.mail;

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
