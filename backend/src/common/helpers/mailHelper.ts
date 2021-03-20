import sgMail from '@sendgrid/mail';
import { apiKey, emailFrom } from '../../config/sendGridConfig';
import { HTTP_STATUS_ERROR_BAD_REQUEST } from '../constants/http';
import { IEmailMsg } from '../models/email/IEmailMsg';
import { CustomError } from '../models/error/CustomError';

sgMail.setApiKey(apiKey);

export const sendEmail = async (msg: IEmailMsg) => {
  const message = {
    from: emailFrom,
    subject: 'Invite to organization',
    text: 'test sending email',
    html: '<strong>test sending email</strong>',
    ...msg
  };

  await sgMail
    .send(message)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: any) => {
      throw new CustomError(error, HTTP_STATUS_ERROR_BAD_REQUEST);
    });

  return message;
};
