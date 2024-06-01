import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaSerice) {}
  async create(createCityDto: CreateCityDto) {
    return this.prisma.city.create({
      data: createCityDto,
    });
  }

  async findAll() {
    return this.prisma.city.findMany({
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
    return this.prisma.city.findUnique({
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

  async update(id: number, updateCityDto: UpdateCityDto) {
    await this.exists(id);
    return this.prisma.city.update({
      data: updateCityDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.city.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.city.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('City not found');
    }
  }

  async updatePhoto(id: number, photo: string) {
    await this.exists(id);
    return this.prisma.city.update({
      data: {
        photo: photo,
      },
      where: {
        id,
      },
    });
  }
}
