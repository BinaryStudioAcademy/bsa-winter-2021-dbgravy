import Handlebars from 'handlebars';

export const queryParser = <T>(query: string, data: T): string => {
  const template = Handlebars.compile(query);
  return template(data);
};
