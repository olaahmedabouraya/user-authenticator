import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../../Services/users.service';
import { CreateUserDto } from '../../DataTransferObjects/create-user.dto';
import { LoginUserDto } from 'src/DataTransferObjects/login-user.dto';
import { AuthGuard } from 'src/Guards/auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const response = this.usersService.signup(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
    return response;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const response = await this.usersService.login(
      loginUserDto.email,
      loginUserDto.password,
    );
    return response;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request) {
    return { message: '', user: req['user'] };
  }
}
