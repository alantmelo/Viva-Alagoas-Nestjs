import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { Prisma } from 'src/prisma/prisma.module';

import { FileModule } from './../file/file.mudule';


@Module({
  imports: [Prisma, FileModule],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
