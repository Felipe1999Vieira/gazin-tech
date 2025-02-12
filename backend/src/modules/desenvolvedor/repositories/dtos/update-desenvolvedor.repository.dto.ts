import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import {
  UpdateDesenvolvedorUseCaseParamsDTO,
  UpdateDesenvolvedorUseCaseResponseDTO,
} from '../../usecases/update-desenvolvedor/update-desenvolvedor.usecase.dto';

export class UpdateDesenvolvedorRepositoryParamsDTO extends OmitType(
  UpdateDesenvolvedorUseCaseParamsDTO,
  ['data_nascimento'],
) {
  @ApiProperty({
    example: '1995-08-15',
    description: 'Data de nascimento do desenvolvedor',
  })
  @IsNotEmpty({ message: 'O campo data de nascimneto é obrigatório!' })
  data_nascimento: Date;
}
export class UpdateDesenvolvedorRepositoryResponseDTO extends UpdateDesenvolvedorUseCaseResponseDTO {}
