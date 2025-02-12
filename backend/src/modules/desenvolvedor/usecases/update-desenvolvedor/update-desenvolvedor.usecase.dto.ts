import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Desenvolvedor } from '../../entities/desenvolvedor.entity';

export class UpdateDesenvolvedorUseCaseParamsDTO extends Desenvolvedor {
  @ApiProperty({
    example: '1',
    description: 'Id do desenvolvedor',
  })
  @IsNotEmpty({ message: 'O Id do desenvolvedor é obrigatório!' })
  id: number;
}

export class UpdateDesenvolvedorUseCaseResponseDTO extends Desenvolvedor {}
