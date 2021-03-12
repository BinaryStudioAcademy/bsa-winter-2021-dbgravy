import TResource from '../../types/TResource';
import { resourceTypeValue } from '../../../enums/ResourceTypeValue';
import { FormActions } from '../../../../scenes/Resources/models/enums/FormActions';

const resourceInitValues: TResource = {
  type: resourceTypeValue.postgreSQL,
  name: '',
  host: '',
  port: 0,
  dbName: '',
  dbUsername: '',
  password: '',
  id: '',
  resource: [FormActions.testConnection]
};

export default resourceInitValues;
