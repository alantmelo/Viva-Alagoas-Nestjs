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
  // @Post('photos/:id')
  // @UseInterceptors(FilesInterceptor('files', 10))
  // async uploadPhotos(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Param('id') id: string,
  // ) {
  //   try {
  //     await this.restaurantsService.savePhotos(+id, files);
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  //   return { success: true };
  // }
  // @UseInterceptors(FileInterceptor('files'))
  // @Post('photos/:id')
  // async uploadPhotos(
  //   @UploadedFiles() photos: Express.Multer.File[],
  //   @Param('id') id: string,
  // ) {
  //   const path = join(
  //     __dirname,
  //     '..',
  //     'storage',
  //     'photos',
  //     `restaurant-${id}.JPG`,
  //   );
  //   try {
  //     await this.fileService.upload(photos, path);
  //   } catch (e) {
  //     throw new BadRequestException(e);
  //   }
  //   return { success: true };
  // }
}
