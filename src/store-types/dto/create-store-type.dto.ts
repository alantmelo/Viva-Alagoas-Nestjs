import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  status: boolean;
}
