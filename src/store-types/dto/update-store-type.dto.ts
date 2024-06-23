import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreTypeDto } from './create-store-type.dto';

export class UpdateStoreTypeDto extends PartialType(CreateStoreTypeDto) {}
