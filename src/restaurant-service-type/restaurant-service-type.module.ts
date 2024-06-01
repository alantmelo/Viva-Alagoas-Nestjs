import { Module } from '@nestjs/common';
import { RestaurantServiceTypeService } from './restaurant-service-type.service';
import { RestaurantServiceTypeController } from './restaurant-service-type.controller';

@Module({
  controllers: [RestaurantServiceTypeController],
  providers: [RestaurantServiceTypeService],
})
export class RestaurantServiceTypeModule {}
