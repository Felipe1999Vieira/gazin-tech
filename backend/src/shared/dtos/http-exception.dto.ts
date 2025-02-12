import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDTO {
  @ApiProperty({
    example: 'Mensagem de erro',
  })
  message: string;
}
