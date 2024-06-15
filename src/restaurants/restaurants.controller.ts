import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from '../file/file.service';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
  @UseInterceptors(FileInterceptor('file'))
  @Post('photo/:id')
  async uploadPhoto(
    @UploadedFile('file') photo: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const extention = photo.mimetype == 'image/jpeg' ? 'jpeg' : 'png';
    const name = `restaurant-${id}.` + extention;
    const path = join(__dirname, '..', 'storage', 'photos', name);
    try {
      await this.fileService.upload(photo, path);
      await this.restaurantsService.updatePhoto(+id, name);
    } catch (e) {
      throw new BadRequestException(e);
    }
    return { success: true };
  }
  @UseInterceptors(FilesInterceptor('photos', 10))
  @Post('gallery/:id')
  async uploadPhotos(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    const photoUrls: string[] = [];
    const uploadDir = join(__dirname, '..', 'storage', 'photos');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    console.log(photos);
    console.log(id);
    try {
      photos.forEach((photo) => {
        const ext = photo.mimetype.split('/')[1];
        const photoName = `restaurant-gallery-${id}-${Date.now()}.${ext}`;
        const photoPath = join(uploadDir, photoName);
        writeFileSync(photoPath, photo.buffer);
        photoUrls.push(photoName);
      });
      await this.restaurantsService.addPhotos(+id, photoUrls);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
    return { success: true };
  }
}
