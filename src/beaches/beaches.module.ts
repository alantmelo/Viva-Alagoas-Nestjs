import { Module } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { BeachesController } from './beaches.controller';
import { Prisma } from 'src/prisma/prisma.module';

@Module({
  imports: [Prisma],
  controllers: [BeachesController],
  providers: [BeachesService],
})
export class BeachesModule {}
