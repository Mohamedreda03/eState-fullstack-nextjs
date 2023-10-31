class AppError extends Error {
  statusCode!: number;
  status!: string;
  constructor() {
    super();
  }

  create(message: string, statusCode: number, status: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;

    return this;
  }
}
export default new AppError();
