import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccommodationTypeDto } from './dto/create-accommodation-type.dto';
import { UpdateAccommodationTypeDto } from './dto/update-accommodation-type.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class AccommodationTypesService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create({ name }: CreateAccommodationTypeDto) {
    return this.prisma.accommodationType.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return this.prisma.accommodationType.findMany({
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
    return this.prisma.accommodationType.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { name }: UpdateAccommodationTypeDto) {
    await this.exists(id);
    return this.prisma.accommodationType.update({
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
    return this.prisma.accommodationType.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.accommodationType.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Accommodation Type not found');
    }
  }
}
