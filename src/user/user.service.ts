import { Injectable } from '@nestjs/common';
import { PrismaSerice } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaSerice) {}
  async create({ email, name, password }: CreateUserDTO) {
    return await this.prisma.user.create({
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
}
