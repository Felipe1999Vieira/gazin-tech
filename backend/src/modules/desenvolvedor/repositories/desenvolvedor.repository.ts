import { Injectable } from '@nestjs/common';

import { Sexo } from '../entities/desenvolvedor.entity';
import { IDesenvolvedorRepository } from './desenvolvedor.repository.interface';
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
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class DesenvolvedorRepository implements IDesenvolvedorRepository {
  constructor(private prisma: PrismaService) {}

  async findDesenvolvedorById(
    params: FindDesenvolvedorByIdRepositoryParamsDTO,
  ): Promise<FindDesenvolvedorByIdRepositoryResponseDTO | null> {
    const response = await this.prisma.desenvolvedor.findUnique({
      where: {
        id: params.id,
      },
      include: {
        nivel: true,
      },
    });
    if (!response) return;
    return {
      data_nascimento: response.data_nascimento.toISOString().split('T')[0],
      id: response.id,
      nome: response.nome,
      sexo: Sexo[response.sexo],
      hobby: response.hobby,
      nivel: response.nivel,
    };
  }

  async findAllDesenvolvedores(
    params: FindAllDesenvolvedoresRepositoryParamsDTO,
  ): Promise<FindAllDesenvolvedoresRepositoryResponseDTO | null> {
    const { page, perPage } = params;
    const total = await this.prisma.desenvolvedor.count();
    const lastPage = Math.ceil(total / perPage);
    const skip = (page - 1) * perPage;

    const response = await this.prisma.desenvolvedor.findMany({
      include: {
        nivel: true,
      },
      orderBy: {
        nome: 'asc',
      },
      skip,
      take: perPage,
    });

    if (response.length < 1) return;

    return {
      desenvolvedores: response.map((data) => ({
        id: data.id,
        nome: data.nome,
        sexo: Sexo[data.sexo],
        data_nascimento: data.data_nascimento.toISOString().split('T')[0],
        hobby: data.hobby,
        nivel: data.nivel,
      })),
      meta: {
        total,
        per_page: perPage,
        current_page: page,
        last_page: lastPage,
      },
    };
  }

  async createDesenvolvedor(
    params: CreateDesenvolvedorRepositoryParamsDTO,
  ): Promise<CreateDesenvolvedorRepositoryResponseDTO> {
    const response = await this.prisma.desenvolvedor.create({
      data: {
        nome: params.nome,
        data_nascimento: params.data_nascimento,
        hobby: params.hobby,
        sexo: params.sexo,
        nivel_id: params.nivel_id,
      },
    });

    return {
      id: response.id,
      data_nascimento: response.data_nascimento.toISOString().split('T')[0],
      nivel_id: response.nivel_id,
      nome: response.nome,
      sexo: Sexo[response.sexo],
      hobby: response.hobby,
    };
  }
  async updateDesenvolvedor(
    params: UpdateDesenvolvedorRepositoryParamsDTO,
  ): Promise<UpdateDesenvolvedorRepositoryResponseDTO> {
    const response = await this.prisma.desenvolvedor.update({
      data: {
        nome: params.nome,
        data_nascimento: new Date(params.data_nascimento),
        hobby: params.hobby,
        sexo: params.sexo,
        nivel_id: params.nivel_id,
      },
      where: { id: params.id },
    });

    return {
      id: response.id,
      data_nascimento: response.data_nascimento.toISOString().split('T')[0],
      nivel_id: response.nivel_id,
      nome: response.nome,
      sexo: Sexo[response.sexo],
      hobby: response.hobby,
    };
  }

  async deleteDesenvolvedor(params: DeleteDesenvolvedorRepositoryParamsDTO) {
    await this.prisma.desenvolvedor.delete({
      where: { id: params.id },
    });
  }
}
