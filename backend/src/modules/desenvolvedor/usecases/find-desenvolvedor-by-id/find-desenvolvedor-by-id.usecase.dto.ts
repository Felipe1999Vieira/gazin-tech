import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Desenvolvedor } from '../../entities/desenvolvedor.entity';
import { Niveis } from '@/modules/niveis/entities/niveis.entity';

export class FindDesenvolvedoresByIdUseCaseParamsDTO {
  @ApiProperty({
    example: 1,
    description: 'Id do desenvolvedor',
  })
  @IsNotEmpty({ message: 'Campo Id é obrigatório' })
  id: number;
}

export class FindDesenvolvedoresByIdUseCaseResponseDTO extends PickType(
  Desenvolvedor,
  ['data_nascimento', 'id', 'hobby', 'nome', 'sexo'],
) {
  @ApiProperty({
    type: Niveis,
    description: 'Lista de desenvolvedores',
  })
  nivel: Niveis;
}
