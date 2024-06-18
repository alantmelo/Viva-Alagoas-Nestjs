import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTourTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  status: boolean;
}
