import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Prisma } from 'src/prisma/prisma.module';
import { FileModule } from './../file/file.mudule';

@Module({
  imports: [Prisma, FileModule],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
