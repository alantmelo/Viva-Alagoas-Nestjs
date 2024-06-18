import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TourTypesService } from './tour-types.service';
import { CreateTourTypeDto } from './dto/create-tour-type.dto';
import { UpdateTourTypeDto } from './dto/update-tour-type.dto';

@Controller('tour-types')
export class TourTypesController {
  constructor(private readonly tourTypesService: TourTypesService) {}

  @Post()
  create(@Body() createTourTypeDto: CreateTourTypeDto) {
    return this.tourTypesService.create(createTourTypeDto);
  }

  @Get()
  findAll() {
    return this.tourTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTourTypeDto: UpdateTourTypeDto,
  ) {
    return this.tourTypesService.update(+id, updateTourTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourTypesService.remove(+id);
  }
}
