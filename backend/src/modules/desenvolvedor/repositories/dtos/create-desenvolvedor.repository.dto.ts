import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import {
  CreateDesenvolvedorUseCaseParamsDTO,
  CreateDesenvolvedorUseCaseResponseDTO,
} from '../../usecases/create-desenvolvedor/create-desenvolvedor.usecase.dto';

export class CreateDesenvolvedorRepositoryParamsDTO extends OmitType(
  CreateDesenvolvedorUseCaseParamsDTO,
  ['data_nascimento'],
) {
  @ApiProperty({
    example: '1995-08-15',
    description: 'Data de nascimento do desenvolvedor',
  })
  @IsNotEmpty({ message: 'O campo data de nascimneto é obrigatório!' })
  data_nascimento: Date;
}
export class CreateDesenvolvedorRepositoryResponseDTO extends CreateDesenvolvedorUseCaseResponseDTO {}
