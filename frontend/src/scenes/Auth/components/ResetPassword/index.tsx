import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IBindingCallback1 } from '../../../../common/models/callback/IBindingCallback1';
import { IResetPasswordCallback } from '../../../../common/models/auth/IResetPasswordCallback';
import { Routes } from '../../../../common/enums/Routes';
import resetPasswordSchema from '../../../../common/models/formik/resetPasswordSchema';
import { THandleResetPassword } from '../../../../common/models/auth/THandleResetPassword';
import { IResetPassword } from '../../../../common/models/auth/IResetPassword';

import styles from './styles.module.scss';

interface IProps {
  resetPassword: IBindingCallback1<IResetPasswordCallback>;
  token: string
}

const initialValuesResetPassword: IResetPassword = {
  password: '',
  confirmPassword: ''
};

const ResetPassword: FC<IProps> = ({ resetPassword, token }) => {
  const history = useHistory<string>();
  const [isPassword, setPassword] = useState(true);
  const [isConfirmPassword, setConfirmPassword] = useState(true);
  const handleResetPassword: THandleResetPassword = ({ password }) => {
    resetPassword({ token, password });
    history.push(Routes.SignIn);
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <Formik
        validationSchema={resetPasswordSchema}
        initialValues={initialValuesResetPassword}
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

          <Form onSubmit={handleSubmit} className={styles.form}>
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
                <div className={styles.error}>
                  {errors.password}
                </div>
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
                <div className={styles.error}>
                  {errors.confirmPassword}
                </div>
              )}
            </Form.Group>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
