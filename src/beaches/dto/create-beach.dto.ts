import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBeachDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsString()
  directions: string;
  @IsString()
  @IsNotEmpty()
  geolocation: string;
  @IsString()
  youtube: string;
  status: boolean;
  street: string;
  neighborhood: string;
  number: string;
  additionalAddress: string;
  zipeCode: string;
}
