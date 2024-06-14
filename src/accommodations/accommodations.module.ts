import { Module } from '@nestjs/common';
import { AccommodationsService } from './accommodations.service';
import { AccommodationsController } from './accommodations.controller';
import { Prisma } from 'src/prisma/prisma.module';
import { FileModule } from './../file/file.mudule';

@Module({
  imports: [FileModule, Prisma],
  controllers: [AccommodationsController],
  providers: [AccommodationsService],
})
export class AccommodationsModule {}
