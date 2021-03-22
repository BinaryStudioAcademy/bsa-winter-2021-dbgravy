import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object({
  email: Yup
    .string()
    .email('You entered incorrectly email')
    .required('This field is required.')
});

export default forgotPasswordSchema;
