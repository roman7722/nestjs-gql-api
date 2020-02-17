import { HttpStatus } from '@nestjs/common';

export interface IErrorMessages {
  type: string;
  statusCode: HttpStatus;
  errorMessage: string;
  userMessage: string;
}
