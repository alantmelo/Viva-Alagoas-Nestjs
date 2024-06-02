import { IsString } from 'class-validator';

export class CreateRestaurantServiceTypeDto {
  @IsString()
  name: string;
}
