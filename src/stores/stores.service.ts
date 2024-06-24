import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaSerice } from 'src/prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaSerice) {}

  async create(createStoreDto: CreateStoreDto) {
    const { storeTypeId, cityId, ...rest } = createStoreDto;
    const store = await this.prisma.store.create({
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
        storeType: storeTypeId ? { connect: { id: storeTypeId } } : undefined,
      },
      include: {
        city: true,
      },
    });

    return store;
  }

  async findAll() {
    return this.prisma.store.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        city: true,
        photo: true,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.store.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
  }

  async updatePhoto(id: number, photo: string) {
    await this.exists(id);
    return this.prisma.store.update({
      data: {
        photo: photo,
      },
      where: {
        id,
      },
    });
  }
  // async addPhotos(id: number, photos: string[]) {
  //   await this.exists(id);
  //   const createPhotos = photos.map((photo) => ({
  //     url: photo,
  //     storeId: id,
  //   }));
  //   return this.prisma.photo.createMany({
  //     data: createPhotos,
  //   });
  // }
  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const { storeTypeId, cityId, ...rest } = updateStoreDto;
    const store = await this.prisma.store.update({
      where: { id },
      data: {
        ...rest,
        city: cityId ? { connect: { id: cityId } } : undefined,
        storeType: storeTypeId ? { connect: { id: storeTypeId } } : undefined,
      },
    });

    return store;
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.store.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.store.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('Store not found');
    }
  }
}
