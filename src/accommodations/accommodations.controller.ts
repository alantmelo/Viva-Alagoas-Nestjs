import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { FileService } from 'src/file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@Controller('accommodations')
export class AccommodationsController {
  constructor(
    private readonly accommodationsService: AccommodationsService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  create(@Body() createAccommodationDto: CreateAccommodationDto) {
    return this.accommodationsService.create(createAccommodationDto);
  }

  @Get()
  findAll() {
    return this.accommodationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accommodationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccommodationDto: UpdateAccommodationDto,
  ) {
    return this.accommodationsService.update(+id, updateAccommodationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accommodationsService.remove(+id);
  }
  @UseInterceptors(FileInterceptor('file'))
  @Post('photo/:id')
  async uploadPhoto(
    @UploadedFile('file') photo: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const extention = photo.mimetype == 'image/jpeg' ? 'jpeg' : 'png';
    const name = `accommodation-${id}.` + extention;
    const path = join(__dirname, '..', 'storage', 'photos', name);
    try {
      await this.fileService.upload(photo, path);
      await this.accommodationsService.updatePhoto(+id, name);
    } catch (e) {
      throw new BadRequestException(e);
    }
    return { success: true };
  }
}
