import { Module } from '@nestjs/common';
import { AccommodationTypesService } from './accommodation-types.service';
import { AccommodationTypesController } from './accommodation-types.controller';

@Module({
  controllers: [AccommodationTypesController],
  providers: [AccommodationTypesService],
})
export class AccommodationTypesModule {}
