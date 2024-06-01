import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantServiceTypeService } from './restaurant-service-type.service';

describe('RestaurantServiceTypeService', () => {
  let service: RestaurantServiceTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantServiceTypeService],
    }).compile();

    service = module.get<RestaurantServiceTypeService>(RestaurantServiceTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
