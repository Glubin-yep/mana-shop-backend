import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UserResponseDto } from '@/users/dto/user-response.dto';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return { valid: true, decoded };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findByEmail(email);

    if (user && (await this.passwordService.compare(password, user.password))) {
      return new UserResponseDto(user);
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userService.create(dto);
    const token = this.jwtService.sign({ id: user.id });

    return {
      token,
      user: new UserResponseDto(user),
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id });
    return {
      token,
      user: user,
    };
  }

  async logout() {
    return {
      message: 'Logout successful',
    };
  }

  // Example GitHub OAuth login logic (commented out for now)
  // async Githublogin(req: Request, gitUser: any) {
  //   const existingUser = await this.userService.findByOAuthGithubId(gitUser.id);
  //   if (!existingUser) {
  //     const dto: CreateUserDto = {
  //       OAuthGithubId: gitUser.id,
  //       email: gitUser.email,
  //       firstName: '',
  //       lastName: '',
  //       password: '',
  //     };
  //     const user = await this.userService.create(dto);

  //     return {
  //       token: this.jwtService.sign({ id: user.id }),
  //       user: new UserResponseDto(user),
  //     };
  //   }

  //   return {
  //     token: this.jwtService.sign({ id: existingUser.id }),
  //     user: new UserResponseDto(existingUser),
  //   };
  // }
}
