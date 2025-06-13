"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const rol_enum_1 = require("../common/enums/rol.enum");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register({ name, email, password, address, regionId, role = rol_enum_1.Role.ADMIN, }) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new common_1.BadRequestException('El usuario ya existe');
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
    async login({ email, password }) {
        const user = await this.usersService.findOneByEmailWithPassword(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Email incorrecto, ingréselo nuevamente.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta, intente nuevamente.');
        }
        const payload = {
            email: user.email,
            role: user.role,
            sub: user.id
        };
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
    async profile({ email, role }) {
        return await this.usersService.findOneByEmail(email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map