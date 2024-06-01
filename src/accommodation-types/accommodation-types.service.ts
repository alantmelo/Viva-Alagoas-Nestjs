import { Injectable } from '@nestjs/common';
import { CreateAccommodationTypeDto } from './dto/create-accommodation-type.dto';
import { UpdateAccommodationTypeDto } from './dto/update-accommodation-type.dto';

@Injectable()
export class AccommodationTypesService {
  create(createAccommodationTypeDto: CreateAccommodationTypeDto) {
    return 'This action adds a new accommodationType';
  }

  findAll() {
    return `This action returns all accommodationTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accommodationType`;
  }

  update(id: number, updateAccommodationTypeDto: UpdateAccommodationTypeDto) {
    return `This action updates a #${id} accommodationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} accommodationType`;
  }
}
