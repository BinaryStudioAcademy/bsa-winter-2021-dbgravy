import TResource from '../../types/TResource';
import { resourceTypeValue } from '../../../enums/ResourceTypeValue';

const resourceInitValues: TResource = {
  type: resourceTypeValue.postgreSQL,
  name: '',
  host: '',
  port: 0,
  dbName: '',
  dbUsername: '',
  password: '',
  id: ''
};

export default resourceInitValues;
