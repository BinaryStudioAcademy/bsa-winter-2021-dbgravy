import { LocalStorageFields } from '../enums/LocalStorageFields';
import { ITokens } from '../models/ITokens';

export const setAccessToken = (token: string): void => localStorage.setItem(LocalStorageFields.accessToken, token);

export const getAccessToken = (): string | null => localStorage.getItem(LocalStorageFields.accessToken);

export const setRefreshToken = (refreshToken: string) => localStorage.setItem(
  LocalStorageFields.refreshToken,
  refreshToken
);

export const getRefreshToken = () => localStorage.getItem(LocalStorageFields.refreshToken);

export const setTokens = (tokens: ITokens) => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
};

export const clearStorage = (): void => localStorage.clear();
