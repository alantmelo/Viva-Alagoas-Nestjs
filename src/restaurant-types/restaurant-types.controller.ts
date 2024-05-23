import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestaurantTypesService } from './restaurant-types.service';
import { CreateRestaurantTypeDto } from './dto/create-restaurant-type.dto';
import { UpdateRestaurantTypeDto } from './dto/update-restaurant-type.dto';

@Controller('restaurant-types')
export class RestaurantTypesController {
  constructor(
    private readonly restaurantTypesService: RestaurantTypesService,
  ) {}

  @Post()
  create(@Body() createRestaurantTypeDto: CreateRestaurantTypeDto) {
    return this.restaurantTypesService.create(createRestaurantTypeDto);
  }

  @Get()
  findAll() {
    return this.restaurantTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantTypeDto: UpdateRestaurantTypeDto,
  ) {
    return this.restaurantTypesService.update(+id, updateRestaurantTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantTypesService.remove(+id);
  }
}
