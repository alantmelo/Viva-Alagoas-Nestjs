import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class AccommodationsService {
  constructor(private readonly prisma: PrismaSerice) {}
  async create(createAccommodationDto: CreateAccommodationDto) {
    const { cityId, accommodationTypeId, ...rest } = createAccommodationDto;

    const accommodation = await this.prisma.accommodation.create({
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
        accommodationType: accommodationTypeId
          ? { connect: { id: accommodationTypeId } }
          : undefined,
      },
      include: {
        city: true,
      },
    });

    return accommodation;
  }

  async findAll() {
    return this.prisma.accommodation.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        city: true,
        photo: true,
        accommodationType: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.accommodation.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePhoto(id: number, photo: string) {
    await this.exists(id);
    return this.prisma.accommodation.update({
      data: {
        photo: photo,
      },
      where: {
        id,
      },
    });
  }
  async update(id: number, updateAccommodationDto: UpdateAccommodationDto) {
    const { cityId, accommodationTypeId, ...rest } = updateAccommodationDto;
    await this.exists(id);
    const accommodation = await this.prisma.accommodation.update({
      where: { id },
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
        accommodationType: accommodationTypeId
          ? { connect: { id: cityId } }
          : undefined,
      },
    });

    return accommodation;
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.accommodation.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.accommodation.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Accommodation not found');
    }
  }
  private async ensureTypesExist(typeIds: number[]) {
    const existingTypes = await this.prisma.accommodationType.findMany({
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
        `accommodationType(s) with ID(s) ${missingTypeIds.join(', ')} not found`,
      );
    }
  }
}
