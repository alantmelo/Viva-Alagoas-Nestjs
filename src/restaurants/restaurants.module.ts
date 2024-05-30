import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Prisma } from 'src/prisma/prisma.module';
import { FileModule } from './../file/file.mudule';

@Module({
  imports: [Prisma, FileModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
