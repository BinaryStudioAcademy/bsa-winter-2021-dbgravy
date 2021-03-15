import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { signUpValSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import { IRegisterUser } from '../../../../common/models/auth/IRegisterUser';
import { Routes } from '../../../../common/enums/Routes';
import InputField from '../../../../components/InputField';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import { ReactComponent as Logo } from '../../../../assets/images/logo.svg';

interface IProps {
  addNewUser: IBindingCallback1<IRegisterUser>;
}

export const SignUp: FunctionComponent<IProps> = ({ addNewUser }) => {
  const onSubmit = (values: IRegisterUser) => {
    const { email, password, firstName, lastName, organizationName } = values;
    const user = { email, password, firstName, lastName, organizationName };
    addNewUser(user);
  };
  const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    organizationName: ''
  };

  return (
    <div className={styles.signUp}>
      <Logo className={styles.logo} />
      <h1 className={styles.header}>
        Sign up
      </h1>
      <Link className={styles.signInLink} to={Routes.SignIn}>
        Already Signed up?
      </Link>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signUp-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="firstName"
            name="firstName"
            type="text"
            placeholder="Ilon"
          />
          <InputField
            label="lastName"
            name="lastName"
            type="text"
            placeholder="Musk"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
          <InputField
            label="Organization's Name"
            name="organizationName"
            type="text"
            placeholder="Tesla"
          />
          <div className={`${styles.formFooter} w-100`}>
            <Button type="submit" variant="primary" className={`${styles.primaryBtn} authButton save`}>
              Sign Up
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
