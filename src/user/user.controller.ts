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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUser } from './dto/update-put-user.dto';
import { UpdatePatchUser } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
// import { LogInterceptor } from 'src/interceptors/log.interceptor';

// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async index() {
    return this.userService.list();
  }
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get(':id')
  async getOne(@ParamId() id) {
    return this.userService.getOne(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUser, @ParamId() id) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async partialUpdate(@Body() data: UpdatePatchUser, @ParamId() id) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return this.userService.delete(id);
  }
}
