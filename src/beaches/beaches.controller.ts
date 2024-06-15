import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('beaches')
export class BeachesController {
  constructor(private readonly beachesService: BeachesService) {}

  @Post()
  create(
    @Body() createBeachDto: CreateBeachDto,
    @Body('cityId', ParseIntPipe) cityId: number,
  ) {
    return this.beachesService.create(createBeachDto, cityId);
  }

  @Get()
  findAll() {
    return this.beachesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beachesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBeachDto: UpdateBeachDto,
    @Body('cityId', ParseIntPipe) cityId: number,
  ) {
    return this.beachesService.update(+id, updateBeachDto, cityId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beachesService.remove(+id);
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
        const photoName = `beach-gallery-${id}-${Date.now()}.${ext}`;
        const photoPath = join(uploadDir, photoName);
        writeFileSync(photoPath, photo.buffer);
        photoUrls.push(photoName);
      });
      await this.beachesService.addPhotos(+id, photoUrls);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
    return { success: true };
  }
}
