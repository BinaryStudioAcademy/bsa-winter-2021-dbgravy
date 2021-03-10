import * as Yup from 'yup';
import resourceSchema from '../formik/resource/resourceSchema';

type TResource = Yup.InferType<typeof resourceSchema>;

export default TResource;
