import * as Yup from 'yup';
import { email } from './ValidationSchemas';

const forgotPasswordSchema = Yup.object({
  email
});

export default forgotPasswordSchema;
