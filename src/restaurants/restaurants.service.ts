import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const { typeIds, serviceIds, ...rest } = createRestaurantDto;
    await this.ensureTypesExist(typeIds);
    const restaurant = await this.prisma.restaurant.create({
      data: {
        ...rest,
        restaurantTypes: {
          create: typeIds.map((typeId) => ({
            restaurantTypeId: typeId,
          })),
        },
        restaurantToServiceType: {
          create: serviceIds.map((typeId) => ({
            restaurantServiceTypeId: typeId,
          })),
        },
      },
      include: {
        city: true,
        restaurantTypes: true,
      },
    });

    return restaurant;
  }

  async findAll() {
    return this.prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        city: true,
        restaurantTypes: true,
        photo: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePhoto(id: number, photo: string) {
    await this.exists(id);
    return this.prisma.restaurant.update({
      data: {
        photo: photo,
      },
      where: {
        id,
      },
    });
  }
  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const { typeIds, ...rest } = updateRestaurantDto;
    await this.ensureTypesExist(typeIds);
    const restaurant = await this.prisma.restaurant.update({
      where: { id },
      data: {
        ...rest,
        restaurantTypes: {
          deleteMany: {}, // Remove existing types
          create: typeIds.map((typeId) => ({
            restaurantTypeId: typeId,
          })),
        },
      },
    });

    return restaurant;
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.restaurant.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.restaurant.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Restaurant not found');
    }
  }
  private async ensureTypesExist(typeIds: number[]) {
    const existingTypes = await this.prisma.restaurantType.findMany({
      where: {
        id: { in: typeIds },
      },
    });

    if (existingTypes.length !== typeIds.length) {
      const missingTypeIds = typeIds.filter(
        (typeId) =>
          !existingTypes.some((existingType) => existingType.id === typeId),
      );
      throw new NotFoundException(
        `RestaurantType(s) with ID(s) ${missingTypeIds.join(', ')} not found`,
      );
    }
  }
}
