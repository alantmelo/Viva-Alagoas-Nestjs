import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBeachDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @MinLength(20)
  description: string;
  @IsString()
  @MinLength(20)
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
  cityId: number;
}
