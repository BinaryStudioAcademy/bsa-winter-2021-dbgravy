import { FormikHelpers } from 'formik';
import TForgotPassword from './TForgotPassword';

type THandleForgotPassword = (
  { email }: { email: string },
  formikHelpers: FormikHelpers<TForgotPassword>
) => void

export default THandleForgotPassword;
