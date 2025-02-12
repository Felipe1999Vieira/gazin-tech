import { ApiProperty } from '@nestjs/swagger';

import {
  CreateNiveisUseCaseParamsDTO,
  CreateNiveisUseCaseResponseDTO,
} from '../usecases/create-niveis/create-niveis.usecase.dto';

export class CreateNiveisControllerParamsDTO extends CreateNiveisUseCaseParamsDTO {}
export class CreateNiveisControllerResponseDTO {
  @ApiProperty({
    description: 'Menssagem',
    example: 'Sucesso ao cadastrar nível',
  })
  message: string;

  @ApiProperty({
    description: 'Dados do nível',
    type: CreateNiveisUseCaseResponseDTO,
  })
  data: CreateNiveisUseCaseResponseDTO;
}
