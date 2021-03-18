import * as Yup from 'yup';

const resetPasswordSchema = Yup.object({
  password: Yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(
      /^.*((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must include both uppercase and lowercase letters'
    )
    .matches(
      /^.*(?=.*\d).*$/,
      'Password must include numbers'
    )
    .matches(
      /^.*((?=.*[!/@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      'Password must include special symbols'
    ),
  confirmPassword: Yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(
      /^.*((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must include both uppercase and lowercase letters'
    )
    .matches(
      /^.*(?=.*\d).*$/,
      'Password must include numbers'
    )
    .matches(
      /^.*((?=.*[!/@#$%^&*()\-_=+{};:,<.>]){1}).*$/,
      'Password must include special symbols'
    )
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default resetPasswordSchema;
