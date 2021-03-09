import { ErrorCode } from '../../enums/ErrorCode';

export class CustomError extends Error {
  msg: string;
  status: number;
  code?: ErrorCode;

  constructor(msg: string, status: number, code?: ErrorCode) {
    super();
    this.msg = msg;
    this.status = status;
    this.code = code;
  }
}
