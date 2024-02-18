import { Injectable } from '@nestjs/common';
import { PrismaSerice } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaSerice) {}
  async create({ email, name, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
  async list() {
    return this.prisma.user.findMany({
      where: {
        email: { contains: '@gmail.com' },
      },
      select: {
        email: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async getOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
