import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { Prisma } from 'src/prisma/prisma.module';

@Module({
  imports: [Prisma],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
