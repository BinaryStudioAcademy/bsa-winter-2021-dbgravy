import * as Yup from 'yup';
import { ResourceTypeValue } from '../../enums/ResourceTypeValue';

const resourceSchema = Yup.object({
  type: Yup.mixed<ResourceTypeValue>()
    .oneOf(Object.values(ResourceTypeValue)),
  name: Yup.string()
    .min(5, 'ResourceList name should be more, than 5 symbols.')
    .max(30, 'ResourceList name should be less, than 40 symbols.')
    .required('This field is required.'),
  host: Yup.string()
    .required('This field is required.'),
  port: Yup.number()
    .min(1, 'The port number should be more, than 0.')
    .max(10000, 'The port number should be less, than 10000.')
    .integer('The port number must be an integer.')
    .required('This field is required.'),
  dbName: Yup.string()
    .min(5, 'Database name should be more, than 5 symbols.')
    .max(30, 'Database name should be less, than 40 symbols.')
    .notRequired(),
  dbUsername: Yup.string()
    .min(5, 'Database username should be more, than 5 symbols.')
    .max(30, 'Database username should be less, than 40 symbols.')
    .notRequired(),
  password: Yup.string()
    .notRequired(),
  id: Yup.string()
    .notRequired()
});

export default resourceSchema;
