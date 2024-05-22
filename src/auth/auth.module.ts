import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
// import { UserService } from 'src/user/user.service';
import { Prisma } from 'src/prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    // UserService,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    Prisma,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
