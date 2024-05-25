import { Module } from '@nestjs/common';
import { RestaurantTypesService } from './restaurant-types.service';
import { RestaurantTypesController } from './restaurant-types.controller';
import { Prisma } from 'src/prisma/prisma.module';
@Module({
  imports: [Prisma],
  controllers: [RestaurantTypesController],
  providers: [RestaurantTypesService],
})
export class RestaurantTypesModule {}
