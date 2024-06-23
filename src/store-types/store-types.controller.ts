import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreTypesService } from './store-types.service';
import { CreateStoreTypeDto } from './dto/create-store-type.dto';
import { UpdateStoreTypeDto } from './dto/update-store-type.dto';

@Controller('store-types')
export class StoreTypesController {
  constructor(private readonly storeTypesService: StoreTypesService) {}

  @Post()
  create(@Body() createStoreTypeDto: CreateStoreTypeDto) {
    return this.storeTypesService.create(createStoreTypeDto);
  }

  @Get()
  findAll() {
    return this.storeTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreTypeDto: UpdateStoreTypeDto) {
    return this.storeTypesService.update(+id, updateStoreTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeTypesService.remove(+id);
  }
}
