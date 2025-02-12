import { PickType } from '@nestjs/swagger';

import { Niveis } from '../../entities/niveis.entity';

export class CreateNiveisUseCaseParamsDTO extends PickType(Niveis, ['nivel']) {}

export class CreateNiveisUseCaseResponseDTO extends PickType(Niveis, [
  'nivel',
]) {}
