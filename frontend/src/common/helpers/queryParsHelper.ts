import Handlebars from 'handlebars';
import { ILocal } from '../models/editor/ILocal';

export const queryParser = (query: string, data: {[key: string]: ILocal }): string => {
  const template = Handlebars.compile(query);
  const customLocal = parseLocals(data);
  return template(customLocal);
};

const parseLocals = (data: {[key: string]: ILocal }) => Object.keys(data).reduce((acc, k) => (
  {
    ...acc, ...{ [k]: data[k].value }
  }
), {});
