import { Injectable } from '@nestjs/common';
import { PrismaSerice } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUser } from './dto/update-put-user.dto';
import { UpdatePatchUser } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaSerice) {}
  async create({ email, name, password, birthAt }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
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
  async update(id: number, { name, email, password, birthAt }: UpdatePutUser) {
    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }
  async updatePartial(
    id: number,
    { name, email, password, birthAt }: UpdatePatchUser,
  ) {
    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }
}
