import { ApiProperty } from '@nestjs/swagger';

import { Niveis } from '../../entities/niveis.entity';
import { IsNotEmpty } from 'class-validator';

export class FindNiveisByIdUseCaseParamsDTO {
  @ApiProperty({
    example: 1,
    description: 'Id do nível',
  })
  @IsNotEmpty({
    message: 'O parâmtro id é obrigatóri',
  })
  id: number;
}

export class FindNiveisByIdUseCaseResponseDTO extends Niveis {}
