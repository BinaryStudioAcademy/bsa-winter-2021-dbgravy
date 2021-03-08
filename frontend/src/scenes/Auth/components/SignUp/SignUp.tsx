import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { signUpValSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import { IRegisterUser } from '../../../../common/models/auth/IRegister.User';
import { Routes } from '../../../../common/enums/Routes';
import InputField from '../../../../components/InputField/InputField';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import { ReactComponent as Logo } from '../../../../assets/images/logo.svg';

interface IProps {
    addNewUser: IBindingCallback1<IRegisterUser>;
    invitedUserEmail?: string;
}

export const SignUp: FunctionComponent<IProps> = ({ addNewUser }) => {
  const onSubmit = (values: IRegisterUser) => {
    const { email, password, fullName, organisationName } = values;
    const user = { email, password, fullName, organisationName };
    addNewUser(user);
  };

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organisationName: ''
  };

  return (
    <div className={styles.signUp}>
      <Logo className={styles.logo} />
      <h1 className={styles.header}>
        Sign up
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signUp-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="John Brown"
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
            label="Organisation's Name"
            name="organisationName"
            type="text"
            placeholder="Tesla"
          />
          <div className={`${styles.formFooter} w-100`}>
            <Button className={`${styles.primaryBtn} authButton save`} type="submit" variant="primary">
              Sign Up
            </Button>
            <Link className={styles.signInLink} to={Routes.SignIn}>
              Already Signed up?
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
