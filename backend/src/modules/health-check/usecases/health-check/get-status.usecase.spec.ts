import { Test, TestingModule } from '@nestjs/testing';

import { GetStatusUsecase } from './get-status.usecase';

describe('GetStatusUsecase', () => {
  let sut: GetStatusUsecase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [GetStatusUsecase],
    }).compile();

    sut = app.get<GetStatusUsecase>(GetStatusUsecase);
  });

  describe('root', () => {
    it('deve retornar ok no sucesso', async () => {
      const result = await sut.execute();

      expect(result).toEqual({ status: 'OK' });
    });
  });
});
