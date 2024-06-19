import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { Prisma } from 'src/prisma/prisma.module'; 


@Module({
  imports: [Prisma],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
