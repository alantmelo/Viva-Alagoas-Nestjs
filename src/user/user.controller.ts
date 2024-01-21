import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  index(): string {
    return 'index';
  }

  @Post()
  create(@Body() body) {
    console.log(body);
    return { body };
  }

  @Get(':id')
  getOne(@Param() id): string {
    return id;
  }

  @Put(':id')
  update(@Body() body, @Param() param) {
    return {
      body,
      param,
    };
  }

  @Patch(':id')
  partialUpdate(@Body() body, @Param() param) {
    return {
      body,
      param,
    };
  }

  @Delete(':id')
  delete(@Param() param) {
    return {
      param,
    };
  }
}
