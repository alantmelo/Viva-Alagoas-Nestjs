import { IsString, IsOptional } from 'class-validator';

export class CreateAccommodationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  directions?: string;

  @IsOptional()
  @IsString()
  geolocation?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  additionalAddress?: string;

  @IsOptional()
  @IsString()
  zipeCode?: string;

  @IsOptional()
  @IsString()
  phone?: string;
  photo?: string;

  @IsOptional()
  @IsString()
  instagram?: string;
  @IsOptional()
  @IsString()
  openingHours?: string;

  @IsOptional()
  @IsString()
  website?: string;
  status: boolean;
  cityId: number;
  city: number;
  accommodationTypeId: number;
  accommodationType: number;
}
