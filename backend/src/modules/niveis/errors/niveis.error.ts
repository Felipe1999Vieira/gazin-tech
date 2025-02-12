import {
  Logger,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

export namespace NiveisError {
  export enum Message {
    NOT_FOUND_NIVEL_BY_ID = 'Nenhum nível localizado com este ID!',
    NOT_FOUND_NIVEL = 'Nenhum nível foi localizado, cadastre um nível!',
    INVALID_ID_NIVEL = 'O ID do nível é inválido!',
    NIVEL_EXIST = 'Já existe um nível com este nome!',
    NOT_FOUND_DESENVOLVEDOR_BY_NIVEIS = 'Não foi localizado nenhum desenvolvedor com este nível!',
    NIVEL_EXIST_DESENVOLVEDOR = 'O nível possui desenvolvedores registrados, não é possível remove-lo!',
    PAGINATION_INVALID = 'Informe os parâmetros de paginação corretamente.',
  }

  export class PaginationInvalid extends BadRequestException {
    constructor(logger: Logger) {
      const message = NiveisError.Message.PAGINATION_INVALID;
      logger.error(message);
      super(message);
    }
  }

  export class NotFoundDesenvolvedoresByNiveis extends NotFoundException {
    constructor(logger: Logger) {
      const message = NiveisError.Message.NOT_FOUND_DESENVOLVEDOR_BY_NIVEIS;
      logger.error(message);
      super(message);
    }
  }

  export class NotFounNivel extends NotFoundException {
    constructor(logger: Logger) {
      const message = NiveisError.Message.NOT_FOUND_NIVEL;
      logger.error(message);
      super(message);
    }
  }
  export class NotFounNivelById extends NotFoundException {
    constructor(logger: Logger) {
      const message = NiveisError.Message.NOT_FOUND_NIVEL_BY_ID;
      logger.error(message);
      super(message);
    }
  }

  export class InvalidIdNivel extends BadRequestException {
    constructor(logger: Logger) {
      const message = NiveisError.Message.INVALID_ID_NIVEL;
      logger.error(message);
      super(message);
    }
  }

  export class NivelExistDesenvolvedor extends UnauthorizedException {
    constructor(logger: Logger) {
      const message = NiveisError.Message.NIVEL_EXIST_DESENVOLVEDOR;
      logger.error(message);
      super(message);
    }
  }

  export class NivelExist extends BadRequestException {
    constructor(logger: Logger) {
      const message = NiveisError.Message.NIVEL_EXIST;
      logger.error(message);
      super(message);
    }
  }
}
