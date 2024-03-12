import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { Prisma } from 'src/prisma/prisma.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
    UserService,
    Prisma,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
