import { IsString } from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;
  description?: string;
  duration: number;
  price: number;
  @IsString()
  startDate: string;
  endDate?: string;
  status: boolean;
  cityId: number;
  city: number;
}
