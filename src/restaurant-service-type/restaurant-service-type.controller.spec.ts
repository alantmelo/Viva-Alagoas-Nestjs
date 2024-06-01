import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantServiceTypeController } from './restaurant-service-type.controller';
import { RestaurantServiceTypeService } from './restaurant-service-type.service';

describe('RestaurantServiceTypeController', () => {
  let controller: RestaurantServiceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantServiceTypeController],
      providers: [RestaurantServiceTypeService],
    }).compile();

    controller = module.get<RestaurantServiceTypeController>(RestaurantServiceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
