import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    name,
    email,
    password,
    address,
    regionId,
    role = Role.ADMIN,
  }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    await this.usersService.create({
      name,
      email,
      password, 
      role,
      address,
      regionId
    });

    return {
      message: 'El usuario fue creado con éxito.',
      name,
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(email);

    if (!user) {
      throw new UnauthorizedException(
        'Email incorrecto, ingréselo nuevamente.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Contraseña incorrecta, intente nuevamente.',
      );
    }

    const payload = { 
      email: user.email,
      role: user.role,
       sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        user: {
          email: user.email,
          role: user.role,
        },
      },
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    //  if(role !== 'admin') {
    //      throw new UnauthorizedException('No tienes los permisos correspondientes para acceder.');

    //  }
    return await this.usersService.findOneByEmail(email);
  }
}
