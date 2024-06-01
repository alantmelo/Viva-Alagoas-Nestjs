import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantServiceTypeDto } from './create-restaurant-service-type.dto';

export class UpdateRestaurantServiceTypeDto extends PartialType(CreateRestaurantServiceTypeDto) {}
