import { Injectable } from '@nestjs/common';
import { CreateRestaurantTypeDto } from './dto/create-restaurant-type.dto';
import { UpdateRestaurantTypeDto } from './dto/update-restaurant-type.dto';

@Injectable()
export class RestaurantTypesService {
  create(createRestaurantTypeDto: CreateRestaurantTypeDto) {
    return 'This action adds a new restaurantType';
  }

  findAll() {
    return `This action returns all restaurantTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantType`;
  }

  update(id: number, updateRestaurantTypeDto: UpdateRestaurantTypeDto) {
    return `This action updates a #${id} restaurantType`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurantType`;
  }
}
