import { Module } from '@nestjs/common';
import { RestaurantTypesService } from './restaurant-types.service';
import { RestaurantTypesController } from './restaurant-types.controller';

@Module({
  controllers: [RestaurantTypesController],
  providers: [RestaurantTypesService],
})
export class RestaurantTypesModule {}
