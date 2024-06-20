import { Test, TestingModule } from '@nestjs/testing';
import { TourPackagesController } from './tour-packages.controller';
import { TourPackagesService } from './tour-packages.service';

describe('TourPackagesController', () => {
  let controller: TourPackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TourPackagesController],
      providers: [TourPackagesService],
    }).compile();

    controller = module.get<TourPackagesController>(TourPackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
