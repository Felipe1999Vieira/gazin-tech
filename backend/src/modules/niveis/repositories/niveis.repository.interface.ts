import { UpdateNiveisUseCaseResponseDTO } from '../usecases/update-niveis/update-niveis.usecase.dto';
import {
  CreateNiveisRepositoryParamsDTO,
  CreateNiveisRepositoryResponseDTO,
} from './dtos/create-niveis.repository.dto';
import { DeleteNiveisRepositoryParamsDTO } from './dtos/delete-niveis.repository.dto';
import {
  FindAllNiveisRepositoryParamsDTO,
  FindAllNiveisRepositoryResponseDTO,
} from './dtos/find-all-niveis.repository.dto';
import {
  FindDesenvolvedoresByNivelRepositoryParamsDTO,
  FindDesenvolvedoresByNivelRepositoryResponseDTO,
} from './dtos/find-desenvolvedores-by-niveis.repository.dto';
import {
  FindNiveisByIdRepositoryParamsDTO,
  FindNiveisByIdRepositoryResponseDTO,
} from './dtos/find-niveis-by-id.repository.dto';
import { UpdateNiveisRepositoryParamsDTO } from './dtos/update-niveis.repository.dto';

export abstract class INiveisRepository {
  abstract createNiveis(
    params: CreateNiveisRepositoryParamsDTO,
  ): Promise<CreateNiveisRepositoryResponseDTO>;

  abstract findAllNiveis(
    params: FindAllNiveisRepositoryParamsDTO,
  ): Promise<FindAllNiveisRepositoryResponseDTO>;
  abstract findNiveisById(
    params: FindNiveisByIdRepositoryParamsDTO,
  ): Promise<FindNiveisByIdRepositoryResponseDTO>;
  abstract updateNiveis(
    params: UpdateNiveisRepositoryParamsDTO,
  ): Promise<UpdateNiveisUseCaseResponseDTO>;
  abstract deleteNiveis(params: DeleteNiveisRepositoryParamsDTO);
  abstract findDesenvolvedoresByNiveis(
    params: FindDesenvolvedoresByNivelRepositoryParamsDTO,
  ): Promise<FindDesenvolvedoresByNivelRepositoryResponseDTO | null>;
}
