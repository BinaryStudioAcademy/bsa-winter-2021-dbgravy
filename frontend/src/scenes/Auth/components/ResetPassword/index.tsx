/* eslint-disable no-console */
import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import { forgotPasswordSchema as validationSchema } from 'common/models/formik/ValidationSchemas';
import { Routes } from '../../../../common/enums/Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

const resetPasswordSchema = Yup.object({
  password: Yup
    .string()
    .min(5, 'Password should be more, than 5 symbols.')
    .max(30, 'Password should be less, than 40 symbols.')
    .matches(/[a-z]+/, 'Password must include lowercase letters.')
    .matches(/[A-Z]+/, 'Password must include uppercase letters.')
    .matches(/d+/, 'Password must include numbers.')
    .matches(/W+/, 'Password must include special symbols.')
    .required('Password is required'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

interface IResetPassword {
  password: string;
  confirmPassword: string
}

type THandleResetPassword = ({ password, confirmPassword }: { password: string, confirmPassword: string }) => void

interface IProps {
  resetPassword: IBindingCallback1<IResetPasswordCallback>;
  match: {
    params: {
      token: string;
    };
  };
}

const initialValues: IResetPassword = {
  password: '',
  confirmPassword: ''
};

const ResetPassword: FC<IProps> = ({ resetPassword, match }) => {
  const [isPassword, setPassword] = useState(true);
  const [isConfirmPassword, setConfirmPassword] = useState(true);
  const handleResetPassword: THandleResetPassword = ({ password, confirmPassword }) => {
    const { token } = match.params;
    resetPassword({ token, ...values });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <Formik
        validationSchema={resetPasswordSchema}
        initialValues={initialValues}
        onSubmit={handleResetPassword}
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
                Reset password
              </h1>
              <Form.Label className={styles.description}>
                New Password
              </Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text
                    onClick={() => setPassword(!isPassword)}
                    className={styles.secret}
                  >
                    <FontAwesomeIcon icon={isPassword ? faEye : faEyeSlash} size="sm" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type={isPassword ? 'password' : 'text'}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                  disabled={isSubmitting}
                  onBlur={handleBlur}
                  size="lg"
                  className={styles.emailField}
                />
              </InputGroup>
              {touched.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className={styles.description}>
                Confirm Password
              </Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text
                    onClick={() => setConfirmPassword(!isConfirmPassword)}
                    className={styles.secret}
                  >
                    <FontAwesomeIcon icon={isConfirmPassword ? faEye : faEyeSlash} size="sm" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type={isConfirmPassword ? 'password' : 'text'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                  disabled={isSubmitting}
                  onBlur={handleBlur}
                  size="lg"
                  className={styles.emailField}
                />
              </InputGroup>
              {touched.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <NavLink exact to={Routes.ResetPassword}>
              <Button
                type="submit"
                name="reset-link"
                disabled={isSubmitting}
                className={styles.btnSave}
                variant="primary"
                size="lg"
              >
                Save
              </Button>
            </NavLink>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
