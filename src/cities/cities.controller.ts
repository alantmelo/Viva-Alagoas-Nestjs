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
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { FileService } from '../file/file.service';

@Controller('cities')
export class CitiesController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citiesService.remove(+id);
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
      await this.citiesService.updatePhoto(+id, name);
    } catch (e) {
      throw new BadRequestException(e);
    }
    return { success: true };
  }
}
