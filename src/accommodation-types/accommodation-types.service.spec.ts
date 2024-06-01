import { Test, TestingModule } from '@nestjs/testing';
import { AccommodationTypesService } from './accommodation-types.service';

describe('AccommodationTypesService', () => {
  let service: AccommodationTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccommodationTypesService],
    }).compile();

    service = module.get<AccommodationTypesService>(AccommodationTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
