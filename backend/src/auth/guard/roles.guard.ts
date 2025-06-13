import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, IS_PUBLIC_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Primero verificar si la ruta es pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Acceso permitido sin autenticación
    }

    // 2. Obtener los roles requeridos (puede ser uno o varios)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no hay roles requeridos, permitir acceso a cualquier usuario autenticado
    if (!requiredRoles) {
      return true;
    }

    // 3. Obtener el usuario del request
    const { user } = context.switchToHttp().getRequest();

    // Si no hay usuario (no autenticado)
    if (!user) {
      return false;
    }

    // 4. Verificar si el usuario tiene al menos uno de los roles requeridos
    return requiredRoles.some((role) => {
      // ADMIN tiene acceso total
      if (user.role === Role.ADMIN) {
        return true;
      }
      return user.role === role;
    });
  }
}