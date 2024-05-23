import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeachesService } from './beaches.service';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';

@Controller('beaches')
export class BeachesController {
  constructor(private readonly beachesService: BeachesService) {}

  @Post()
  create(@Body() createBeachDto: CreateBeachDto) {
    return this.beachesService.create(createBeachDto);
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
  update(@Param('id') id: string, @Body() updateBeachDto: UpdateBeachDto) {
    return this.beachesService.update(+id, updateBeachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beachesService.remove(+id);
  }
}
