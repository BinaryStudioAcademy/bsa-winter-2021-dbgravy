import { ErrorCode } from '../enums/ErrorCode';

export const errorHelper = (errorCode:ErrorCode) => {
  switch (errorCode) {
    case ErrorCode.UserAlreadyExists:
      return 'User AlreadyExists';
    default:
      return 'Something went wrong. Try again later.';
  }
};
