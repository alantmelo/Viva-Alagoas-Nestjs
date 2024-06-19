import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class ToursService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create(createTourDto: CreateTourDto) {
    const { cityId, ...rest } = createTourDto;
    const restaurant = await this.prisma.tour.create({
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
      },
      include: {
        city: true,
      },
    });

    return restaurant;
  }

  async findAll() {
    return this.prisma.tour.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        city: true,
        // photo: true,
        photos: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.tour.findUnique({
      where: {
        id,
      },
    });
  }

  // async updatePhoto(id: number, photo: string) {
  //   await this.exists(id);
  //   return this.prisma.tour.update({
  //     data: {
  //       photo: photo,
  //     },
  //     where: {
  //       id,
  //     },
  //   });
  // }
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
  async update(id: number, updateTourDto: UpdateTourDto) {
    const { cityId, ...rest } = updateTourDto;

    const restaurant = await this.prisma.tour.update({
      where: { id },
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
      },
    });

    return restaurant;
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.tour.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.tour.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Tour not found');
    }
  }
  private async ensureTypesExist(typeIds: number[]) {
    const existingTypes = await this.prisma.tourType.findMany({
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
        `TourType(s) with ID(s) ${missingTypeIds.join(', ')} not found`,
      );
    }
  }
}
