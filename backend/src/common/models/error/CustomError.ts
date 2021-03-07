export class CustomError extends Error {
  status: number;
  code?: number;

  constructor(msg: string, status: number, code?: number) {
    super();
    this.message = msg;
    this.status = status;
    this.code = code;
  }
}
