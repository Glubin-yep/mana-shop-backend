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
import { UserEntity } from '@/users/entities/user.entity';
import { UserResponseDto } from '@/users/dto/user-response.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user as UserEntity, req);

    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 60 * 360,
    });

    // Return the user details as a DTO
    return new UserResponseDto(req.user as UserEntity);
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
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
    console.log(cookie);
    return this.authService.validateToken(cookie);
  }
}
