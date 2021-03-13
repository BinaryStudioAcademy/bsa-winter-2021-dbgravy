import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Form, Formik } from 'formik';
import { signInValSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import InputField from '../../../../components/InputField';
import { Button } from 'react-bootstrap';
import { ILoginUser } from '../../../../common/models/auth/ILoginUser';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../common/enums/Routes';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import { ReactComponent as Logo } from '../../../../assets/images/logo.svg';
import { IInviteToOrganization } from '../../../../common/models/userOrganization/IInviteToOrganization';

interface IProps {
  loginUser: IBindingCallback1<ILoginUser>;
  inviteToOrganization: IInviteToOrganization
}

const SignIn: FunctionComponent<IProps> = ({
  loginUser,
  inviteToOrganization
}) => {
  const [initEmail, setInitEmail] = useState(inviteToOrganization.email);

  useEffect(() => {
    setInitEmail(inviteToOrganization.email);
  }, [inviteToOrganization]);

  const onSubmit = (values: ILoginUser) => {
    const { email, password } = values;
    const payload = inviteToOrganization.isLoading
      ? { email, password, currentOrganizationId: inviteToOrganization.organizationId }
      : { email, password };
    return loginUser(payload);
  };

  const initialValues = {
    email: initEmail,
    password: ''
  };

  return (
    <div className={styles.signIn}>
      <header className={styles.signInHeader}>
        <Logo className={styles.logo} />
        <h1 className={styles.header}>Welcome back</h1>
        <p className={styles.signUpLink}>
          {'Need to create a new organisation? '}
          <Link className={styles.authLink} to={Routes.SignUp}>
            Sign up
          </Link>
        </p>
        { inviteToOrganization.isLoading
        && (
        <p>
          {'You were invited to '}
          <span className={styles.organization}>{`${inviteToOrganization.organizationName}!`}</span>
        </p>
        )}
      </header>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form
          className={`${styles.inpBlock} signIn-form d-flex flex-column justify-content-center align-items-center`}
        >
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="user@gmail.com"
            disabled={inviteToOrganization.isLoading}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <div className={`${styles.formFooter} w-100`}>
            <Button
              type="submit"
              variant="primary"
              className={`${styles.primaryBtn} authButton save`}
            >
              Sign In
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
