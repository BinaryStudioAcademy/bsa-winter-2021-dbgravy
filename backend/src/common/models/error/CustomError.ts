export class CustomError extends Error {
  msg: string;
  status: number;
  code?: number;

  constructor(msg: string, status: number, code?: number) {
    super();
    this.msg = msg;
    this.status = status;
    this.code = code;
  }
}
