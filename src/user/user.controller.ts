import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  getList(): Promise<User[]> {
    return this.userService.getList();
  }

  @Get('getUserId')
  async getUserById(@Query('id') id: string): Promise<User> {
    const userId: number = parseInt(id);
    return this.userService.getUserById(userId);
  }

  @Post('updateUser')
  updateUser(@Body() body): Promise<string> {
    return this.userService.updateUser(body);
  }

  @Post('deleteUser')
  delUser(@Body() body): Promise<object> {
    return this.userService.deleteUser(body);
  }

  @Get('pageList')
  async findAll(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    const [users, total] = await this.userService.findAll(page, pagesize);
    return {
      data: users,
      total,
      page,
      pagesize,
    };
  }

  @Get('findByConditions')
  async findByConditions(@Query('name') conditions): Promise<User[]> {
    return this.userService.findByConditions(conditions);
  }
}
