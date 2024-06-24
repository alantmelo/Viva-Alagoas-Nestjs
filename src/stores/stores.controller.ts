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
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { join } from 'path';
import { FileService } from '../file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
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
      await this.storesService.updatePhoto(+id, name);
    } catch (e) {
      throw new BadRequestException(e);
    }
    return { success: true };
  }
}
