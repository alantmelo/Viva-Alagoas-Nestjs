import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { Prisma } from 'src/prisma/prisma.module';
import { FileModule } from './../file/file.mudule';

@Module({
  imports: [Prisma, FileModule],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
