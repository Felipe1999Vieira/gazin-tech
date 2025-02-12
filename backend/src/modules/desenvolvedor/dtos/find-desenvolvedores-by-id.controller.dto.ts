import { ApiProperty, PickType } from '@nestjs/swagger';

import {
  FindDesenvolvedoresByIdUseCaseParamsDTO,
  FindDesenvolvedoresByIdUseCaseResponseDTO,
} from '../usecases/find-desenvolvedor-by-id/find-desenvolvedor-by-id.usecase.dto';

export class FindDesenvolvedoresByIdControllerParamsDTO extends PickType(
  FindDesenvolvedoresByIdUseCaseParamsDTO,
  ['id'],
) {}

export class FindDesenvolvedoresByIdControllerResponseDTO {
  @ApiProperty({
    description: 'Menssagem',
    example: 'Sucesso ao buscar desenvolvedores',
  })
  message: string;

  @ApiProperty({
    description: 'Dados do desenvolvedor',
    type: FindDesenvolvedoresByIdUseCaseResponseDTO,
  })
  data: FindDesenvolvedoresByIdUseCaseResponseDTO;
}
