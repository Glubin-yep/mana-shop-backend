import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  private static extractJWTFromCookie(req: any): string | null {
    return req.cookies?.['Authorization'] || null;
  }

  async validate(payload: any) {
    const user = await this.userService.findById(+payload.id);

    if (!user) {
      throw new UnauthorizedException('You do not have access');
    }

    return {
      id: user.id,
    };
  }
}
