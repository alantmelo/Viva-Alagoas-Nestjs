import { Test, TestingModule } from '@nestjs/testing';
import { StoreTypesController } from './store-types.controller';
import { StoreTypesService } from './store-types.service';

describe('StoreTypesController', () => {
  let controller: StoreTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreTypesController],
      providers: [StoreTypesService],
    }).compile();

    controller = module.get<StoreTypesController>(StoreTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
