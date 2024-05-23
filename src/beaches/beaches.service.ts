import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class BeachesService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create(
    { name, description, geolocation, youtube, directions }: CreateBeachDto,
    cityId,
  ) {
    return this.prisma.beach.create({
      data: {
        name: name,
        description: description,
        geolocation: geolocation,
        youtube: youtube,
        cityId: cityId, // Now cityId is already an integer
        directions: directions,
      },
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
        city: true,
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
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        city: true,
      },
    });
  }

  async update(
    id: number,
    { name, description, geolocation, youtube, directions }: UpdateBeachDto,
    cityId,
  ) {
    await this.exists(id);
    return this.prisma.beach.update({
      data: { name, description, geolocation, youtube, directions, cityId },
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
