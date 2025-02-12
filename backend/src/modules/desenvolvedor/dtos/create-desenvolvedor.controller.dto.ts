import { ApiProperty } from '@nestjs/swagger';

import {
  CreateDesenvolvedorUseCaseParamsDTO,
  CreateDesenvolvedorUseCaseResponseDTO,
} from '../usecases/create-desenvolvedor/create-desenvolvedor.usecase.dto';

export class CreateDesenvolvedorControllerParamsDTO extends CreateDesenvolvedorUseCaseParamsDTO {}
export class CreateDesenvolvedorControllerResponseDTO {
  @ApiProperty({
    description: 'Menssagem',
    example: 'Sucesso ao cadastrar desenvolvedores',
  })
  message: string;

  @ApiProperty({
    description: 'Dados do desenvolvedor',
    type: CreateDesenvolvedorUseCaseResponseDTO,
  })
  data: CreateDesenvolvedorUseCaseResponseDTO;
}
