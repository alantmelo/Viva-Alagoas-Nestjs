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
  index(): string {
    return 'index';
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id) {
    return id;
  }

  @Put(':id')
  update(
    @Body() { name, email, password }: UpdatePutUser,
    @Param('id', ParseIntPipe) id,
  ) {
    return {
      name,
      email,
      password,
      id,
    };
  }

  @Patch(':id')
  partialUpdate(
    @Body() { name, email, password }: UpdatePatchUser,
    @Param('id', ParseIntPipe) id,
  ) {
    return {
      name,
      email,
      password,
      id,
    };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return {
      id,
    };
  }
}
