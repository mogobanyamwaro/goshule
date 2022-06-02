import { AuthUser } from '@go-shule/backend/decorators';
import { CreateUserInput } from '@go-shule/backend/dtos';
import { User } from '@go-shule/backend/entities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
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

  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getMe(@AuthUser() user: User) {
    return this.userService.findOneById(user.id);
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
