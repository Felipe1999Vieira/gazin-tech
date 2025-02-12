import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { Niveis } from '../../entities/niveis.entity';

export class NiveisDataResponse extends Niveis {
  @ApiProperty({
    description: 'Quantidade de desenvolvedor por nível',
    example: 1,
  })
  totalDesenvolvedores: number;
}

export class FindAllNiveisUseCaseParamsDTO {
  @ApiProperty({
    example: 1,
    description: 'Numero da página',
  })
  @IsOptional()
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Quantidade de itens por página',
  })
  @IsOptional()
  perPage: number;
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

export class FindAllNiveisUseCaseResponseDTO {
  @ApiProperty({
    description: 'Lista de níveis',
    type: [NiveisDataResponse],
  })
  niveis: NiveisDataResponse[];

  @ApiProperty({
    type: Meta,
    description: 'Lista de desenvolvedores',
  })
  meta: Meta;
}
