import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { UserActiveInterface } from '../common/enums/interfaces/user-active.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        name: string;
        email: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            user: {
                email: string;
                role: Role;
            };
        };
    }>;
    profile(user: UserActiveInterface): Promise<import("../users/entities/user.entity").User | null>;
}
