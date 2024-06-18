import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourTypeDto } from './dto/create-tour-type.dto';
import { UpdateTourTypeDto } from './dto/update-tour-type.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class TourTypesService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create({ name }: CreateTourTypeDto) {
    return this.prisma.tourType.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return this.prisma.tourType.findMany({
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
    return this.prisma.tourType.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { name }: UpdateTourTypeDto) {
    await this.exists(id);
    return this.prisma.tourType.update({
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
    return this.prisma.tourType.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.tourType.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Tour Type not found');
    }
  }
}