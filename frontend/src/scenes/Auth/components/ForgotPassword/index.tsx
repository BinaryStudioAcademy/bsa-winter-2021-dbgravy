/* eslint-disable no-console */
import React, { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IForgotPasswordInput } from 'common/models/auth/IForgotPasswordInput';
import { IBindingCallback1 } from 'common/models/callback/IBindingCallback1';
import { Routes } from '../../../../common/enums/Routes';

import styles from './styles.module.scss';

const forgotPasswordSchema = Yup.object({
  email: Yup
    .string()
    .email('You entered incorrectly email')
    .required('This field is required.')
});

type TForgotPassword = Yup.InferType<typeof forgotPasswordSchema>;

type THandleForgotPassword = ({ email }: { email: string }) => void

const initialValues: TForgotPassword = {
  email: ''
};

interface IProps {
  forgotPassword: IBindingCallback1<IForgotPasswordInput>;
}

const ForgotPassword: FC<IProps> = ({ forgotPassword }) => {
  const handleForgotPassword: THandleForgotPassword = ({ email }) => {
    forgotPassword({ email });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <Formik
        validationSchema={forgotPasswordSchema}
        initialValues={initialValues}
        onSubmit={handleForgotPassword}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          errors,
          isSubmitting
        }) => (

          <Form noValidate onSubmit={handleSubmit} className={styles.form}>
            <Form.Group>
              <h1 className={styles.title}>
                Reset your password
              </h1>
              <Form.Label className={styles.description}>
                Enter the email address associated with your account. We will send a reset link to your email.
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && !!errors.email}
                disabled={isSubmitting}
                size="lg"
                className={styles.emailField}
              />
              {touched.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <NavLink exact to={Routes.ResetPassword}>
              <Button
                type="submit"
                name="reset-link"
                disabled={isSubmitting}
                className={styles.btnResetLink}
                size="lg"
              >
                Send reset link
              </Button>
            </NavLink>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
