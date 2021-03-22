import * as Yup from 'yup';
import forgotPasswordSchema from '../formik/forgotPasswordSchema';

type TForgotPassword = Yup.InferType<typeof forgotPasswordSchema>;

export default TForgotPassword;
