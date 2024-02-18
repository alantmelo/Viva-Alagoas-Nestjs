import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { Prisma } from 'src/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  imports: [Prisma],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
