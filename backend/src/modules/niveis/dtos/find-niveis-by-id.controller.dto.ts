import { ApiProperty, PickType } from '@nestjs/swagger';

import {
  FindNiveisByIdUseCaseParamsDTO,
  FindNiveisByIdUseCaseResponseDTO,
} from '../usecases/find-niveis-by-id/find-niveis-by-id.usecase.dto';

export class FindNiveisByIdControllerParamsDTO extends PickType(
  FindNiveisByIdUseCaseParamsDTO,
  ['id'],
) {}

export class FindNiveisByIdControllerResponseDTO {
  @ApiProperty({
    example: 'Sucesso ao buscar nível',
    description: 'Dados do nível',
  })
  message: string;

  @ApiProperty({
    type: FindNiveisByIdUseCaseResponseDTO,
    description: 'Dados do nível',
  })
  data: FindNiveisByIdUseCaseResponseDTO;
}
