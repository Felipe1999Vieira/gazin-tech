import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ValidationErrorDTO } from '@/shared/dtos/validation-error.dto';

export function ApiResponseValidationError() {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erro na validação dos dados de entrada',
      type: ValidationErrorDTO,
    }),
  );
}
