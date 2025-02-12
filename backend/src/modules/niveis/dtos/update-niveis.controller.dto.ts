import { ApiProperty, PickType } from '@nestjs/swagger';

import {
  UpdateNiveisUseCaseParamsDTO,
  UpdateNiveisUseCaseResponseDTO,
} from '../usecases/update-niveis/update-niveis.usecase.dto';

export class UpdateNiveisControllerParamsDTO extends PickType(
  UpdateNiveisUseCaseParamsDTO,
  ['id'],
) {}

export class UpdateNiveisControllerBodyDTO extends PickType(
  UpdateNiveisUseCaseParamsDTO,
  ['nivel'],
) {}

export class UpdateNiveisControllerResponseDTO {
  @ApiProperty({
    example: 'Sucesso ao editar nível',
    description: 'Dados do nível',
  })
  message: string;

  @ApiProperty({
    type: UpdateNiveisUseCaseResponseDTO,
    description: 'Dados do nível',
  })
  data: UpdateNiveisUseCaseResponseDTO;
}
