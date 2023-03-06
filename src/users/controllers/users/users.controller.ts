import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
// import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { CreateUserValidatePipe } from 'src/users/pipes/create-user-validate/create-user-validate.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.fetchUser();
  }

  @Get('all/posts')
  getUserPosts() {
    return [
      {
        name: 'ram',
        age: 55,
        posts: [
          {
            id: 1,
            title: 'hello',
          },
          {
            id: 2,
            title: 'hey',
          },
        ],
      },
    ];
  }

  // @Post()
  // createUser(@Req() req: Request, @Res() res: Response) {
  //   console.log(req.body);
  //   res.send('created');
  // }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(CreateUserValidatePipe) userData: CreateUserDto) {
    console.log(userData.age.toPrecision());

    return this.userService.createUser(userData);
  }

  // @Get(':id/:postId')
  // getUserById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Param('postId') postId: string,
  // ) {
  //   console.log(id);
  //   return { id, postId };
  // }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);

    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  @Get('name')
  getAllUsers(@Query('name') name: string) {
    console.log(name);
    return {};
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    console.log('deleted: ', id);
    return { msg: 'deleted' };
  }
}
