import { CreateUserInput } from '@go-shule/backend/dtos';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserInput })
  async createUser(@Body() input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Get('me/:id')
  @ApiOperation({ summary: 'Get current user' })
  async getMe(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  async getAll() {
    return this.userService.findAll();
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user' })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
