import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantTypesController } from './restaurant-types.controller';
import { RestaurantTypesService } from './restaurant-types.service';

describe('RestaurantTypesController', () => {
  let controller: RestaurantTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantTypesController],
      providers: [RestaurantTypesService],
    }).compile();

    controller = module.get<RestaurantTypesController>(RestaurantTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
