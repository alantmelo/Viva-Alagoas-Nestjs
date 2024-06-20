import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTourPackageDto {
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  status: boolean;
  @IsArray()
  tourIds: number[];
}
