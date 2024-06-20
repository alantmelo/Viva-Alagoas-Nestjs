import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourPackageDto } from './dto/create-tour-package.dto';
import { UpdateTourPackageDto } from './dto/update-tour-package.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class TourPackagesService {
  constructor(private readonly prisma: PrismaSerice) {}
  async create(createTourPackageDto: CreateTourPackageDto) {
    const { tourIds, ...rest } = createTourPackageDto;
    const packageTour = await this.prisma.tourPackage.create({
      data: {
        ...rest,
        tours: {
          create: tourIds.map((id) => ({
            tourId: id,
          })),
        },
      },
    });
    return packageTour;
  }

  async findAll() {
    return this.prisma.tourPackage.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        tours: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.tourPackage.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        tours: true,
        description: true,
        status: true,
      },
    });
  }

  async update(id: number, updateTourPackageDto: UpdateTourPackageDto) {
    const { tourIds, ...rest } = updateTourPackageDto;
    await this.exists(id);
    const tourPackage = await this.prisma.tourPackage.update({
      where: { id },
      data: {
        ...rest,
        tours: {
          deleteMany: {},
          create: tourIds.map((id) => ({
            tourId: id,
          })),
        },
      },
    });
    return tourPackage;
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.tourPackage.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.tourPackage.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Tour Package not found');
    }
  }
}
