import { PartialType } from '@nestjs/mapped-types';
import { CreateTourTypeDto } from './create-tour-type.dto';

export class UpdateTourTypeDto extends PartialType(CreateTourTypeDto) {}
