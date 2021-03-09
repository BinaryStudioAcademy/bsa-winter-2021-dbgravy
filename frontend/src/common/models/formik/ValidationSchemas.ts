import * as Yup from 'yup';

const signUpPassword = Yup.string()
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
  );

const signInPassword = Yup.string()
  .required('Password is required');

const email = Yup.string()
  .email('Email is invalid')
  .required('Email is required');

const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password'), ''], 'Passwords must match')
  .required('Confirm Password is required');

const firstname = Yup.string()
  .required('first Name is required')
  .max(100, 'first name should be no longer 100 characters');

const lastname = Yup.string()
  .required('Full Name is required')
  .max(10, 'Full name should be no longer 100 characters');

export const signInValSchema = Yup.object().shape({
  email,
  password: signInPassword
});

export const signUpValSchema = Yup.object().shape({
  firstname,
  lastname,
  email,
  password: signUpPassword,
  confirmPassword
});
