import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUser } from './dto/update-put-user.dto';
import { UpdatePatchUser } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  index() {
    return this.userService.list();
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id) {
    return this.userService.getOne(id);
  }

  @Put(':id')
  update(@Body() data: UpdatePutUser, @Param('id', ParseIntPipe) id) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  partialUpdate(@Body() data: UpdatePatchUser, @Param('id', ParseIntPipe) id) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return {
      id,
    };
  }
}
