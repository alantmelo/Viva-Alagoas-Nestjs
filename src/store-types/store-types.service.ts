import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreTypeDto } from './dto/create-store-type.dto';
import { UpdateStoreTypeDto } from './dto/update-store-type.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class StoreTypesService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create({ name }: CreateStoreTypeDto) {
    return this.prisma.storeType.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return this.prisma.storeType.findMany({
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.storeType.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { name }: UpdateStoreTypeDto) {
    await this.exists(id);
    return this.prisma.storeType.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.storeType.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.storeType.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Store Type not found');
    }
  }
}
