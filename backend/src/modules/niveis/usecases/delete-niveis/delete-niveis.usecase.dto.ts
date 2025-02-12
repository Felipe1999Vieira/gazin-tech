import { PickType } from '@nestjs/swagger';

import { Niveis } from '../../entities/niveis.entity';

export class DeleteNiveisUseCaseParamsDTO extends PickType(Niveis, ['id']) {}
