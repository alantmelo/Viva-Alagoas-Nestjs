import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantTypesService } from './restaurant-types.service';

describe('RestaurantTypesService', () => {
  let service: RestaurantTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantTypesService],
    }).compile();

    service = module.get<RestaurantTypesService>(RestaurantTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
