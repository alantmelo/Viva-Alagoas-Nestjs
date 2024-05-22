import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [UserModule, AuthModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
