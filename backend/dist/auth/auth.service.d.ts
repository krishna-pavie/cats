import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register({ name, email, password, address, regionId, role, }: RegisterDto): Promise<{
        message: string;
        name: string;
        email: string;
    }>;
    login({ email, password }: LoginDto): Promise<{
        access_token: string;
        user: {
            user: {
                email: string;
                role: Role;
            };
        };
    }>;
    profile({ email, role }: {
        email: string;
        role: string;
    }): Promise<import("../users/entities/user.entity").User | null>;
}
