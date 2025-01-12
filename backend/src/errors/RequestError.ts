import { AppError } from './AppError';

export class RequestError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}