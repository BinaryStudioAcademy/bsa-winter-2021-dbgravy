import { FormikHelpers } from 'formik';
import TResource from '../../../../common/models/types/TResource';

type ThandleSubmitFormData = (
  values: TResource,
  formikHelpers: FormikHelpers<TResource>
) => void

export default ThandleSubmitFormData;
