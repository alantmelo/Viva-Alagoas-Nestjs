import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class BeachesService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create(createBeachDto: CreateBeachDto) {
    return this.prisma.beach.create({
      data: createBeachDto,
    });
  }

  async findAll() {
    return this.prisma.beach.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.beach.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(id: number, updateBeachDto: UpdateBeachDto) {
    await this.exists(id);
    return this.prisma.beach.update({
      data: updateBeachDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.beach.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.beach.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Beach not found');
    }
  }
}
