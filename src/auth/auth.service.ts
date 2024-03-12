import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign, verify } from 'crypto';
import { PrismaSerice } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jWTService: JwtService,
    private readonly prisma: PrismaSerice,
  ) {}
  async createToken() {
    // return this.jWTService.sign();
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
    return user;
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
}
