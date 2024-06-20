import { Module } from '@nestjs/common';
import { TourPackagesService } from './tour-packages.service';
import { TourPackagesController } from './tour-packages.controller';
import { Prisma } from 'src/prisma/prisma.module';
@Module({
  imports: [Prisma],
  controllers: [TourPackagesController],
  providers: [TourPackagesService],
})
export class TourPackagesModule {}
