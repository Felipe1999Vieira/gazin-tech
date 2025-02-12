import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Niveis } from '../../entities/niveis.entity';

export class UpdateNiveisUseCaseParamsDTO extends Niveis {
  @ApiProperty({
    example: 1,
    description: 'Id do nível',
  })
  @IsNotEmpty({ message: 'O Id do nível é obrigatório!' })
  id: number;
}

export class UpdateNiveisUseCaseResponseDTO extends Niveis {}
