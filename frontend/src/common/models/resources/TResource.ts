import * as Yup from 'yup';
import resourceSchema from '../formik/resourceSchema';

type TResource = Yup.InferType<typeof resourceSchema>;

export default TResource;
