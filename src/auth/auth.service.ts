import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
// import { sign, verify } from 'crypto';
import { PrismaSerice } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jWTService: JwtService,
    private readonly prisma: PrismaSerice,
    private readonly userService: UserService,
  ) {}
  async createToken(user: User) {
    return {
      accessToken: this.jWTService.sign({
        sub: user.id,
        name: user.name,
        email: user.email,
      }),
    };
  }
  async checkToken() {
    // return this.jWTService.verify();
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, password },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.createToken(user);
    // return this.jWTService.verify();
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    //TO-DO send email
    return true;
  }
  async reset(password: string, token: string) {
    //TO-DO validate token
    const id = 1;
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return true;
  }
  async register(data: CreateUserDTO) {
    const user = await this.userService.create(data);
    // return this.createToken(user);
  }
}
