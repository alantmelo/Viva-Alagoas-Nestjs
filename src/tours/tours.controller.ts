import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { join } from 'path';
import { FilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
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
        const photoName = `tour-gallery-${id}-${Date.now()}.${ext}`;
        const photoPath = join(uploadDir, photoName);
        writeFileSync(photoPath, photo.buffer);
        photoUrls.push(photoName);
      });
      await this.toursService.addPhotos(+id, photoUrls);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
    return { success: true };
  }
}
