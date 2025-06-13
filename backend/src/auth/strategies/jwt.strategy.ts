import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // Este método valida el payload
  async validate(payload: { sub: number; email: string; role: string }) {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    // Puedes retornar el objeto usuario o solo lo que necesitas en request.user
    return user;
  }
}

