import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorItemDTO {
  @ApiProperty({
    example: 'nomeCampo',
  })
  field: string;

  @ApiProperty({
    example: [
      'O campo nomeCampo deve é obrigatório',
      'O campo nomeCampo deve ser do tipo string',
    ],
  })
  errors: string[];
}

export class ValidationErrorDTO {
  @ApiProperty({
    example: 'Erro na validação dos dados de entrada',
  })
  message: string;

  @ApiProperty({ type: [ValidationErrorItemDTO] })
  errors: ValidationErrorItemDTO[];
}
