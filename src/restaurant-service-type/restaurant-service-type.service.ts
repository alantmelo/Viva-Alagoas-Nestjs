import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantServiceTypeDto } from './dto/create-restaurant-service-type.dto';
import { UpdateRestaurantServiceTypeDto } from './dto/update-restaurant-service-type.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantServiceTypeService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create({ name }: CreateRestaurantServiceTypeDto) {
    return this.prisma.restaurantServiceType.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return this.prisma.restaurantServiceType.findMany({
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
    return this.prisma.restaurantServiceType.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { name }: UpdateRestaurantServiceTypeDto) {
    await this.exists(id);
    return this.prisma.restaurantServiceType.update({
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
    return this.prisma.restaurantServiceType.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.restaurantServiceType.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Restaurant Serivice Type not found');
    }
  }
}
