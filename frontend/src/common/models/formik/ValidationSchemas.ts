import * as Yup from 'yup';

export const signUpPassword = Yup.string()
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

export const email = Yup.string()
  .email('Email is invalid')
  .required('Email is required');

const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password'), ''], 'Passwords must match')
  .required('Password is required');

const firstName = Yup.string()
  .required('First Name is required')
  .max(100, 'first name should be no longer 100 characters');

const lastName = Yup.string()
  .required('Last Name is required')
  .max(10, 'Full name should be no longer 100 characters');

export const signInValSchema = Yup.object().shape({
  email,
  password: signInPassword
});

export const emailValSchema = Yup.object().shape({
  email
});

export const signUpValSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  password: signUpPassword,
  confirmPassword
});

export const inviteEmailSchema = Yup.object().shape({
  email
});
