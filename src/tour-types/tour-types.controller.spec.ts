import { Test, TestingModule } from '@nestjs/testing';
import { TourTypesController } from './tour-types.controller';
import { TourTypesService } from './tour-types.service';

describe('TourTypesController', () => {
  let controller: TourTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourTypesController],
      providers: [TourTypesService],
    }).compile();

    controller = module.get<TourTypesController>(TourTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
