import { PickType } from '@nestjs/swagger';

import { DeleteNiveisUseCaseParamsDTO } from '../usecases/delete-niveis/delete-niveis.usecase.dto';

export class DeleteNiveisControllerParamsDTO extends PickType(
  DeleteNiveisUseCaseParamsDTO,
  ['id'],
) {}
