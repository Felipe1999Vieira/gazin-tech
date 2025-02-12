import { Injectable } from '@nestjs/common';

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
import { INiveisRepository } from './niveis.repository.interface';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Sexo } from '@/modules/desenvolvedor/entities/desenvolvedor.entity';

@Injectable()
export class NiveisRepository implements INiveisRepository {
  constructor(private prisma: PrismaService) {}

  async findDesenvolvedoresByNiveis(
    params: FindDesenvolvedoresByNivelRepositoryParamsDTO,
  ): Promise<FindDesenvolvedoresByNivelRepositoryResponseDTO | null> {
    const response = await this.prisma.desenvolvedor.findMany({
      where: {
        nivel_id: params.idNivel,
      },
    });
    if (response.length < 1) return;
    return {
      desenvolvedores: response.map((data) => ({
        id: data.id,
        data_nascimento: data.data_nascimento.toString(),
        nivel_id: data.nivel_id,
        nome: data.nome,
        sexo: Sexo[data.sexo],
        hobby: data.hobby,
      })),
    };
  }

  async updateNiveis(params: UpdateNiveisRepositoryParamsDTO) {
    const response = await this.prisma.nivel.update({
      data: {
        nivel: params.nivel,
      },
      where: {
        id: params.id,
      },
    });

    return response;
  }

  async deleteNiveis(params: DeleteNiveisRepositoryParamsDTO) {
    await this.prisma.nivel.delete({
      where: {
        id: params.id,
      },
    });
  }

  async findNiveisById(
    params: FindNiveisByIdRepositoryParamsDTO,
  ): Promise<FindNiveisByIdRepositoryResponseDTO> {
    const response = await this.prisma.nivel.findUnique({
      where: {
        id: params.id,
      },
    });
    return response;
  }

  async findAllNiveis(
    params: FindAllNiveisRepositoryParamsDTO,
  ): Promise<FindAllNiveisRepositoryResponseDTO> {
    const { page, perPage } = params;
    const total = await this.prisma.nivel.count();
    const lastPage = Math.ceil(total / perPage);
    const skip = (page - 1) * perPage;

    const response = await this.prisma.nivel.findMany({
      include: {
        desenvolvedores: true,
      },
      orderBy: {
        nivel: 'asc',
      },

      skip,
      take: perPage,
    });

    return {
      niveis: response.map((data) => ({
        id: data.id,
        nivel: data.nivel,
        totalDesenvolvedores: data.desenvolvedores.length,
      })),
      meta: {
        total,
        per_page: perPage,
        current_page: page,
        last_page: lastPage,
      },
    };
  }

  async createNiveis(
    params: CreateNiveisRepositoryParamsDTO,
  ): Promise<CreateNiveisRepositoryResponseDTO> {
    const response = await this.prisma.nivel.create({
      data: {
        nivel: params.nivel,
      },
    });

    return {
      nivel: response.nivel,
    };
  }
}
