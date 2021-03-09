import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { Formik, Form } from 'formik';
import { signInValSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import InputField from '../../../../components/InputField/InputField';
import { Button } from 'react-bootstrap';
import { ILoginUser } from '../../../../common/models/auth/ILoginUser';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../common/enums/Routes';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import { ReactComponent as Logo } from '../../../../assets/images/logo.svg';

interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
}

const SignIn: FunctionComponent<IProps> = ({
  loginUser
}) => {
  const onSubmit = (values: ILoginUser) => {
    const { email, password } = values;
    const payload = {
      email,
      password
    };

    return loginUser(payload);
  };

  const initialValues = {
    email: '',
    password: ''
  };

  return (
    <div className={styles.signIn}>
      <header className={styles.signInHeader}>
        <Logo className={styles.logo} />
        <h1 className={styles.header}>
          Welcome back
        </h1>
        <p className={styles.signUpLink}>
          {'Need to create a new organisation? '}
          <Link className={styles.authLink} to={Routes.SignUp}>Sign up</Link>
        </p>
      </header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={`${styles.inpBlock} signIn-form d-flex flex-column justify-content-center align-items-center`}>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="user@gmail.com"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <div className={`${styles.formFooter} w-100`}>
            <Button type="submit" variant="primary" className={`${styles.primaryBtn} authButton save`}>
              Sign In
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
