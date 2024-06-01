import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantServiceTypeService } from './restaurant-service-type.service';
import { CreateRestaurantServiceTypeDto } from './dto/create-restaurant-service-type.dto';
import { UpdateRestaurantServiceTypeDto } from './dto/update-restaurant-service-type.dto';

@Controller('restaurant-service-type')
export class RestaurantServiceTypeController {
  constructor(private readonly restaurantServiceTypeService: RestaurantServiceTypeService) {}

  @Post()
  create(@Body() createRestaurantServiceTypeDto: CreateRestaurantServiceTypeDto) {
    return this.restaurantServiceTypeService.create(createRestaurantServiceTypeDto);
  }

  @Get()
  findAll() {
    return this.restaurantServiceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantServiceTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantServiceTypeDto: UpdateRestaurantServiceTypeDto) {
    return this.restaurantServiceTypeService.update(+id, updateRestaurantServiceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantServiceTypeService.remove(+id);
  }
}
