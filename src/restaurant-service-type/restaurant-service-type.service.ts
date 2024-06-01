import { Injectable } from '@nestjs/common';
import { CreateRestaurantServiceTypeDto } from './dto/create-restaurant-service-type.dto';
import { UpdateRestaurantServiceTypeDto } from './dto/update-restaurant-service-type.dto';

@Injectable()
export class RestaurantServiceTypeService {
  create(createRestaurantServiceTypeDto: CreateRestaurantServiceTypeDto) {
    return 'This action adds a new restaurantServiceType';
  }

  findAll() {
    return `This action returns all restaurantServiceType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantServiceType`;
  }

  update(id: number, updateRestaurantServiceTypeDto: UpdateRestaurantServiceTypeDto) {
    return `This action updates a #${id} restaurantServiceType`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurantServiceType`;
  }
}
