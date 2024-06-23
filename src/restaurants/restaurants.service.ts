import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const { typeIds, cityId, serviceIds, ...rest } = createRestaurantDto;
    const restaurantServiceTypes =
      serviceIds?.map((serviceId) => ({
        restaurantServiceTypeId: serviceId,
      })) || [];
    await this.ensureTypesExist(typeIds);
    const restaurant = await this.prisma.restaurant.create({
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
        restaurantTypes: {
          create: typeIds.map((typeId) => ({
            restaurantTypeId: typeId,
          })),
        },
        restaurantToServiceType: {
          create: restaurantServiceTypes,
        },
      },
      include: {
        city: true,
        restaurantTypes: { include: { restaurantType: true } },
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
        restaurantToServiceType: true,
        photo: true,
        photos: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.restaurant.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
        restaurantTypes: { include: { restaurantType: true } },
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
  async addPhotos(id: number, photos: string[]) {
    await this.exists(id);
    const createPhotos = photos.map((photo) => ({
      url: photo,
      restaurantId: id,
    }));
    return this.prisma.photo.createMany({
      data: createPhotos,
    });
  }
  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const { typeIds, cityId, serviceIds, ...rest } = updateRestaurantDto;
    const restaurantServiceTypes =
      serviceIds?.map((serviceId) => ({
        restaurantServiceTypeId: serviceId,
      })) || [];
    await this.ensureTypesExist(typeIds);
    const restaurant = await this.prisma.restaurant.update({
      where: { id },
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
        restaurantTypes: {
          deleteMany: {}, // Remove existing types
          create: typeIds.map((typeId) => ({
            restaurantTypeId: typeId,
          })),
        },
        restaurantToServiceType: {
          deleteMany: {}, // Remove existing service types
          create: restaurantServiceTypes,
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
