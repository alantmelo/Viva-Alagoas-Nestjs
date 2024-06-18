import { Module } from '@nestjs/common';
import { TourTypesService } from './tour-types.service';
import { TourTypesController } from './tour-types.controller';
import { Prisma } from 'src/prisma/prisma.module';
@Module({
  imports: [Prisma],
  controllers: [TourTypesController],
  providers: [TourTypesService],
})
export class TourTypesModule {}
