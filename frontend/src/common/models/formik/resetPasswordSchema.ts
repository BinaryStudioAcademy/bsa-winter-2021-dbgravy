import * as Yup from 'yup';
import { signUpPassword } from './ValidationSchemas';

const resetPasswordSchema = Yup.object({
  password: signUpPassword,
  confirmPassword: signUpPassword
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default resetPasswordSchema;
