import {
  CreateDesenvolvedorRepositoryParamsDTO,
  CreateDesenvolvedorRepositoryResponseDTO,
} from './dtos/create-desenvolvedor.repository.dto';
import { DeleteDesenvolvedorRepositoryParamsDTO } from './dtos/delete-desenvolvedor.repository.dto';
import {
  FindAllDesenvolvedoresRepositoryParamsDTO,
  FindAllDesenvolvedoresRepositoryResponseDTO,
} from './dtos/find-all-desenvolvedores.repository.dto';
import {
  FindDesenvolvedorByIdRepositoryParamsDTO,
  FindDesenvolvedorByIdRepositoryResponseDTO,
} from './dtos/find-desenvolvedor-by-id.repository.dto';
import {
  UpdateDesenvolvedorRepositoryParamsDTO,
  UpdateDesenvolvedorRepositoryResponseDTO,
} from './dtos/update-desenvolvedor.repository.dto';

export abstract class IDesenvolvedorRepository {
  abstract findAllDesenvolvedores(
    params: FindAllDesenvolvedoresRepositoryParamsDTO,
  ): Promise<FindAllDesenvolvedoresRepositoryResponseDTO | null>;
  abstract findDesenvolvedorById(
    params: FindDesenvolvedorByIdRepositoryParamsDTO,
  ): Promise<FindDesenvolvedorByIdRepositoryResponseDTO | null>;
  abstract createDesenvolvedor(
    params: CreateDesenvolvedorRepositoryParamsDTO,
  ): Promise<CreateDesenvolvedorRepositoryResponseDTO>;
  abstract updateDesenvolvedor(
    params: UpdateDesenvolvedorRepositoryParamsDTO,
  ): Promise<UpdateDesenvolvedorRepositoryResponseDTO>;
  abstract deleteDesenvolvedor(params: DeleteDesenvolvedorRepositoryParamsDTO);
}
