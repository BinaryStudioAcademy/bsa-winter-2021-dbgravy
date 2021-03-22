import React, { FC } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { IForgotPasswordInput } from '../../../../common/models/auth/IForgotPasswordInput';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import forgotPasswordSchema from '../../../../common/models/formik/forgotPasswordSchema';
import THandleForgotPassword from '../../../../common/models/auth/THandleForgotPassword';
import TForgotPassword from '../../../../common/models/auth/TForgotPassword';

import styles from './styles.module.scss';

interface IProps {
  forgotPassword: IBindingCallback1<IForgotPasswordInput>;
}

const initialValuesForgotPassword: TForgotPassword = {
  email: ''
};

const ForgotPassword: FC<IProps> = ({ forgotPassword }) => {
  const handleForgotPassword: THandleForgotPassword = ({ email }, formikHelpers) => {
    forgotPassword({ email });
    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={forgotPasswordSchema}
      initialValues={initialValuesForgotPassword}
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
          <Button
            type="submit"
            name="reset-link"
            disabled={isSubmitting}
            className={styles.btnResetLink}
            size="lg"
          >
            Send reset link
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
