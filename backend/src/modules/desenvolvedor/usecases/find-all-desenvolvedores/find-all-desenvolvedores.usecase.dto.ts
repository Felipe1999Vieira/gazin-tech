import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Niveis } from '../../../niveis/entities/niveis.entity';
import { Desenvolvedor } from '../../entities/desenvolvedor.entity';

export class DesenvolvedorWithNivel extends PickType(Desenvolvedor, [
  'data_nascimento',
  'id',
  'hobby',
  'nome',
  'sexo',
]) {
  @ApiProperty({
    type: Niveis,
    description: 'Lista de desenvolvedores',
  })
  nivel: Niveis;
}

export class Meta {
  @ApiProperty({
    example: 10,
    description: 'Total de itens',
  })
  total: number;

  @ApiProperty({
    example: 10,
    description: 'Itens por página',
  })
  per_page: number;

  @ApiProperty({
    example: 1,
    description: 'Página atual',
  })
  current_page: number;

  @ApiProperty({
    example: 1,
    description: 'Ultima página',
  })
  last_page: number;
}

export class FindAllDesenvolvedoresUseCaseParamasDTO {
  @ApiProperty({
    example: 1,
    description: 'Numero da página',
  })
  @IsNotEmpty({ message: 'O campo page é obrigatório.' })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Quantidade de itens por página',
  })
  @IsNotEmpty({ message: 'O campo per page é obrigatório.' })
  perPage: number;
}

export class FindAllDesenvolvedoresUseCaseResponseDTO {
  @ApiProperty({
    type: [Desenvolvedor],
    description: 'Lista de desenvolvedores',
  })
  desenvolvedores: DesenvolvedorWithNivel[];

  @ApiProperty({
    type: Meta,
    description: 'Lista de desenvolvedores',
  })
  meta: Meta;
}
