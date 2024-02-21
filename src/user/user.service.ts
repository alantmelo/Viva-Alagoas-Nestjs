import { Injectable, NotFoundException } from '@nestjs/common';
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
      select: {
        email: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async getOne(id: number) {
    await this.exists(id);
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
    await this.exists(id);
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
    await this.exists(id);
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
  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('User not found');
    }
  }
}
