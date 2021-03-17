import api from '../common/helpers/apiHelper';
import { IQuery } from '../common/models/queries/IQuery';
import { ICreateQuery } from '../common/models/queries/ICreateQuery';

export const runQuery = (query: ICreateQuery) => api.post<IQuery>('/api/queries', { query });
