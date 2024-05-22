import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  geolocation: string;
  @IsString()
  youtube: string;
  status: boolean;
  @IsString()
  state: string;
}
