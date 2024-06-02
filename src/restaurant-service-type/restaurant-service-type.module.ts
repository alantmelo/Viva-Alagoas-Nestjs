import { Module } from '@nestjs/common';
import { RestaurantServiceTypeService } from './restaurant-service-type.service';
import { RestaurantServiceTypeController } from './restaurant-service-type.controller';
import { Prisma } from 'src/prisma/prisma.module';

@Module({
  imports: [Prisma],
  controllers: [RestaurantServiceTypeController],
  providers: [RestaurantServiceTypeService],
})
export class RestaurantServiceTypeModule {}
