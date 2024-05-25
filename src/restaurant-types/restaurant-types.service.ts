import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantTypeDto } from './dto/create-restaurant-type.dto';
import { UpdateRestaurantTypeDto } from './dto/update-restaurant-type.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantTypesService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create({ name }: CreateRestaurantTypeDto) {
    return this.prisma.restaurantType.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return this.prisma.restaurantType.findMany({
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
    return this.prisma.restaurantType.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { name }: UpdateRestaurantTypeDto) {
    await this.exists(id);
    return this.prisma.restaurantType.update({
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
    return this.prisma.restaurantType.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.restaurantType.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Restaurant Type not found');
    }
  }
}
