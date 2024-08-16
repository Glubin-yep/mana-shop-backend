import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Response } from 'express';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { LoginUserDto } from '@/users/dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.login(
      loginUserDto.email,
      loginUserDto.password,
    );

    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 60 * 360,
    });

    return user;
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.register(dto);

    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 60 * 360,
    });

    return user;
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.cookie('Authorization', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
    });
    res.status(200).end();
  }

  @Get('validate')
  async validate(@Request() req) {
    const cookie = req.cookies['Authorization'];
    if (!cookie) {
      return { valid: false, message: 'No token provided' };
    }

    const isValid = await this.authService.validateToken(cookie);
    return { valid: isValid };
  }
}
