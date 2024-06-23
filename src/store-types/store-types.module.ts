import { Module } from '@nestjs/common';
import { StoreTypesService } from './store-types.service';
import { StoreTypesController } from './store-types.controller';
import { Prisma } from 'src/prisma/prisma.module';
@Module({
  imports: [Prisma],
  controllers: [StoreTypesController],
  providers: [StoreTypesService],
})
export class StoreTypesModule {}
