import { ITrigger } from './Trigger';

export interface ICreateQuery {
  name: string;
  code: string;
  appId: string;
  resourceId: string;
  showConfirm: boolean;
  triggers?: Array<ITrigger>;
}
