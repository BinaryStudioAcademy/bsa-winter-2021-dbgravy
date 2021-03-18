import React, { FunctionComponent, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signUpValSchema as validationSchema } from '../../../../common/models/formik/ValidationSchemas';
import { IRegisterUser } from '../../../../common/models/auth/IRegisterUser';
import { Routes } from '../../../../common/enums/Routes';
import InputField from '../../../../components/InputField';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import logo from '../../../../images/Logo.svg';
import { IInviteToOrganization } from '../../../../common/models/userOrganization/IInviteToOrganization';
import styles from './styles.module.scss';

interface IProps {
    addNewUser: IBindingCallback1<IRegisterUser>;
    inviteToOrganization: IInviteToOrganization
}

export const SignUp: FunctionComponent<IProps> = ({ addNewUser, inviteToOrganization }) => {
  const [initEmail, setInitEmail] = useState(inviteToOrganization.email);

  useEffect(() => {
    setInitEmail(inviteToOrganization.email);
  }, [inviteToOrganization]);

  const onSubmit = (values: IRegisterUser) => {
    const { email, password, firstName, lastName, organizationName } = values;
    const payload = inviteToOrganization.isLoading
      ? { email,
        password,
        firstName,
        lastName,
        organizationName,
        currentOrganizationId: inviteToOrganization.organizationId }
      : { email, password, firstName, lastName, organizationName };
    addNewUser(payload);
  };
  const initialValues = {
    email: initEmail,
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    organizationName: ''
  };

  return (
    <div className={styles.signUp}>
      <Image src={logo} alt="db-gravy-logo" className={styles.logo} />
      <h1 className={styles.header}>
        Sign up
      </h1>
      {inviteToOrganization.isLoading
          && (
          <p>
            {'You were invited to '}
            <span className={styles.organization}>{`${inviteToOrganization.organizationName}!`}</span>
          </p>
          )}
      <Link className={styles.signInLink} to={Routes.SignIn}>
        Already Signed up?
      </Link>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="signUp-form d-flex flex-column justify-content-center align-items-center">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Ilon"
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Musk"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            disabled={inviteToOrganization.isLoading}
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
          {!inviteToOrganization.isLoading
          && (
          <InputField
            label="Organisation's Name"
            name="organizationName"
            type="text"
            placeholder="Tesla"
          />
          )}
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
