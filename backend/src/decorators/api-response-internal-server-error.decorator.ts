import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { HttpExceptionDTO } from '@/shared/dtos/http-exception.dto';

export function ApiResponseInternalServerError(mensagem?: string) {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: mensagem || 'Erro interno do servidor',
      type: HttpExceptionDTO,
    }),
  );
}
