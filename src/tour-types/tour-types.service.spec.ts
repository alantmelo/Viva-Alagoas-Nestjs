import { Test, TestingModule } from '@nestjs/testing';
import { TourTypesService } from './tour-types.service';

describe('TourTypesService', () => {
  let service: TourTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourTypesService],
    }).compile();

    service = module.get<TourTypesService>(TourTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
