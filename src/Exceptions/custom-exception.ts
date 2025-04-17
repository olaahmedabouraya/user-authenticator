import { HttpException } from '@nestjs/common';
import { ErrorDetails } from 'src/Interfaces/error-detail';

export class CustomError extends HttpException {
  public severity: string;
  public code: number;
  public validationErrors: string[] = [];

  constructor(errorParams: ErrorDetails) {
    const { message, severity, code, validationErrors } = errorParams;

    const response = {
      message,
      severity,
      code,
      validationErrors,
    };

    super(response, code);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
