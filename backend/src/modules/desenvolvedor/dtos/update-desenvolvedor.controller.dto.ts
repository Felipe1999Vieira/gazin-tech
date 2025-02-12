import { ApiProperty, PickType } from '@nestjs/swagger';

import {
  UpdateDesenvolvedorUseCaseParamsDTO,
  UpdateDesenvolvedorUseCaseResponseDTO,
} from '../usecases/update-desenvolvedor/update-desenvolvedor.usecase.dto';

export class UpdateDesenvolvedorControllerParamsDTO extends PickType(
  UpdateDesenvolvedorUseCaseParamsDTO,
  ['id'],
) {}

export class UpdateDesenvolvedorControllerBodyDTO extends PickType(
  UpdateDesenvolvedorUseCaseParamsDTO,
  ['data_nascimento', 'hobby', 'nivel_id', 'nome', 'sexo'],
) {}

export class UpdateDesenvolvedorControllerResponseDTO {
  @ApiProperty({
    description: 'Menssagem',
    example: 'Sucesso ao editar desenvolvedor',
  })
  message: string;

  @ApiProperty({
    description: 'Dados do desenvolvedor',
    type: UpdateDesenvolvedorUseCaseResponseDTO,
  })
  data: UpdateDesenvolvedorUseCaseResponseDTO;
}
