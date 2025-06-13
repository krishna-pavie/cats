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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const region_entity_1 = require("../region/entities/region.entity");
let UsersService = class UsersService {
    userRepository;
    regionRepository;
    constructor(userRepository, regionRepository) {
        this.userRepository = userRepository;
        this.regionRepository = regionRepository;
    }
    async create(createUserDto) {
        const { regionId, ...rest } = createUserDto;
        const region = await this.regionRepository.findOneBy({
            id: regionId,
        });
        if (!region) {
            throw new common_1.NotFoundException(`Región ${regionId} no encontrada`);
        }
        const user = this.userRepository.create({
            ...rest,
            region,
        });
        return this.userRepository.save(user);
    }
    findOneByEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
    async findOneByEmailWithPassword(email) {
        return this.userRepository.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'role'],
        });
    }
    async findAll() {
        return this.userRepository.find({
            relations: ['region'],
        });
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['region'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario #${id} no encontrado`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.preload({
            id,
            ...updateUserDto,
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario #${id} no encontrado`);
        }
        return this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        return this.userRepository.remove(user);
    }
    async findOneByEmailWithRelations(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['region', 'cats'],
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                region: user.region,
            },
            cats: user.cats,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map