import { PartialType } from '@nestjs/mapped-types';
import { CreateBeachDto } from './create-beach.dto';

export class UpdateBeachDto extends PartialType(CreateBeachDto) {}
