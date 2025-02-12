import { Logger, NotFoundException, BadRequestException } from '@nestjs/common';

export namespace DesenvolvedorError {
  export enum Message {
    NOT_FOUND_DESENVOLVEDOR = 'Não foi localizado nenhum desenvolvedor!',
    NOT_FOUND_DESENVOLVEDOR_BY_ID = 'Não foi localizado nenhum desenvolvedor com este ID!',
    NOT_FOUND_NIVEL_ID = 'O nível de desenvolvedor informado não existe!',
    INVALID_ID_DESENVOLVEDOR = 'Id do desenvolvedor é inválido!',
    DATE_INVALID = 'O formato de data informado é inválido, utilize yyyy-mm-dd',
    PAGINATION_INVALID = 'Informe os parâmetros de paginação corretamente.',
  }

  export class PaginationInvalid extends BadRequestException {
    constructor(logger: Logger) {
      const message = DesenvolvedorError.Message.PAGINATION_INVALID;
      logger.error(message);
      super(message);
    }
  }

  export class NotFoundDesenvolvedor extends NotFoundException {
    constructor(logger: Logger) {
      const message = DesenvolvedorError.Message.NOT_FOUND_DESENVOLVEDOR;
      logger.error(message);
      super(message);
    }
  }

  export class NotFoundDesenvolvedorById extends NotFoundException {
    constructor(logger: Logger) {
      const message = DesenvolvedorError.Message.NOT_FOUND_DESENVOLVEDOR_BY_ID;
      logger.error(message);
      super(message);
    }
  }

  export class DateInvalid extends BadRequestException {
    constructor(logger: Logger) {
      const message = DesenvolvedorError.Message.DATE_INVALID;
      logger.error(message);
      super(message);
    }
  }

  export class NotFoundNivelId extends BadRequestException {
    constructor(logger: Logger) {
      const message = DesenvolvedorError.Message.NOT_FOUND_NIVEL_ID;
      logger.error(message);
      super(message);
    }
  }

  export class InvalidIdDesenvolvedor extends BadRequestException {
    constructor(logger: Logger) {
      const message = DesenvolvedorError.Message.INVALID_ID_DESENVOLVEDOR;
      logger.error(message);
      super(message);
    }
  }
}
