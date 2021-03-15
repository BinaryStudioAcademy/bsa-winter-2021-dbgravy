import * as Yup from 'yup';
import { ResourceTypeValue } from '../../enums/ResourceTypeValue';

const resourceSchema = Yup.object({
  type: Yup.mixed<ResourceTypeValue>()
    .oneOf(Object.values(ResourceTypeValue)),
  name: Yup.string()
    .min(5, 'Resource name should be more, than 5 symbols.')
    .max(30, 'Resource name should be less, than 40 symbols.')
    .required('This field is required.'),
  host: Yup.string()
    // .matches(
    // eslint-disable-next-line max-len
    //   /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/,
    //   'Host wrong type'
    // )
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
    .min(5, 'Password should be more, than 5 symbols.')
    .max(30, 'Password should be less, than 40 symbols.')
    .matches(/[a-z]+/, 'Password must include lowercase letters.')
    .matches(/[A-Z]+/, 'Password must include uppercase letters.')
    .matches(/d+/, 'Password must include numbers.')
    .matches(/W+/, 'Password must include special symbols.')
    .notRequired(),
  id: Yup.string()
    .notRequired()
});

export default resourceSchema;
