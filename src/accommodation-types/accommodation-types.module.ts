import { Module } from '@nestjs/common';
import { AccommodationTypesService } from './accommodation-types.service';
import { AccommodationTypesController } from './accommodation-types.controller';
import { Prisma } from 'src/prisma/prisma.module';

@Module({
  imports: [Prisma],
  controllers: [AccommodationTypesController],
  providers: [AccommodationTypesService],
})
export class AccommodationTypesModule {}
