import { stringifyUrl, ParsedQuery } from 'query-string';
import { IFetchParams } from '../models/fetch/IFetchParams';
import { FetchMethod } from '../enums/FetchMethod';
import { IResponseError } from '../models/fetch/IResponseError';
import { env } from '../../env';
import { IFetchConfig } from '../models/fetch/IFetchConfig';
import { anyPass, is, map, mergeRight, pickBy, pipe } from 'ramda';

const getInitHeaders = (contentType = 'application/json', hasContent = true) => {
  const headers: HeadersInit = new Headers();

  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  return headers;
};

const stringifyNested = (query: ParsedQuery) => pipe(
  pickBy(anyPass([is(Object), is(Array)])),
  map(JSON.stringify),
  mergeRight(query)
)(query);

const getFetchUrl = (url: string, query: ParsedQuery) => stringifyUrl({
  url,
  query: stringifyNested(query)
}, { skipNull: true });

const getFetchOptions = (method: string, body?: IFetchParams) => ({
  method,
  headers: getInitHeaders(),
  body: body && JSON.stringify(body)
});

const parseResErrorBody = async (res: Response) => {
  try {
    const body = await res.text();
    return JSON.parse(body) as IResponseError;
  } catch (err) {
    return null;
  }
};

const throwIfResponseFailed = async (res: Response) => {
  if (res.ok) {
    return;
  }

  const body = await parseResErrorBody(res);

  const exception: IResponseError = body || {
    message: 'Something went wrong with request!',
    status: 500
  };

  throw exception;
};

const makeRequest = (
  method: FetchMethod
) => async <T>(url: string, params?: IFetchParams, config: IFetchConfig = {}): Promise<T> => {
  const domainUrl = config.external ? url : `${env.app.server}${url}`;
  const [fetchUrl, body] = method === FetchMethod.GET
    ? [getFetchUrl(domainUrl, params as ParsedQuery), undefined]
    : [domainUrl, params];

  const fetchOptions = getFetchOptions(method, body);

  const res = await fetch(fetchUrl, fetchOptions);

  await throwIfResponseFailed(res);

  if (res.status === 200) {
    return res.json();
  }

  return null as any;
};

const api = {
  get: makeRequest(FetchMethod.GET),
  post: makeRequest(FetchMethod.POST),
  put: makeRequest(FetchMethod.PUT),
  delete: makeRequest(FetchMethod.DELETE)
};

export default api;
