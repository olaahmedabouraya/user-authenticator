import { HttpStatus } from '@nestjs/common';

export const Error = {
  USERNAME_ALREADY_EXISTS: {
    message: 'Username already exists',
    severity: 'medium',
    code: HttpStatus.BAD_REQUEST,
    validationErrors: [],
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    severity: 'medium',
    code: HttpStatus.NOT_FOUND,
    validationErrors: [],
  },
  INVALID_CREDENTIALS: {
    message: 'Invalid credentials',
    severity: 'medium',
    code: HttpStatus.UNAUTHORIZED,
    validationErrors: [],
  },
  INVALID_INPUTS: (validationErrors: string[]) => ({
    message: 'Invalid Inputs',
    severity: 'medium',
    code: HttpStatus.BAD_REQUEST,
    validationErrors: validationErrors,
  }),
  INVALID_PASSWORD_INPUT: {
    message: 'Invalid Inputs',
    severity: 'medium',
    code: HttpStatus.BAD_REQUEST,
    validationErrors: [
      'Required password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
    ],
  },
};
