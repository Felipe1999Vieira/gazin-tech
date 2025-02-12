/* eslint-disable @typescript-eslint/no-explicit-any */

import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { ValidationErrorItemDTO } from './shared/dtos/validation-error.dto';
export class CustomValidationError extends BadRequestException {
  constructor(errors: ValidationErrorItemDTO[]) {
    super({ message: 'Erro na validação dos dados de entrada', errors });
  }
}

const parseErrors = (error: ValidationError): any => {
  const parsedError = error.constraints
    ? {
        field: error.property,
        errors: Object.values(error.constraints),
      }
    : undefined;

  if (error.children.length === 0) {
    return parsedError;
  }

  const childrenErrors = error.children.map(parseErrors).flat();

  return parsedError ? [parsedError, ...childrenErrors] : childrenErrors;
};
export class ClassValidatorPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  exceptionFactory = (validationErrors: ValidationError[]): void => {
    if (validationErrors.length > 0) {
      const errors = validationErrors.map(parseErrors).flat();

      throw new CustomValidationError(errors);
    }
  };
}
