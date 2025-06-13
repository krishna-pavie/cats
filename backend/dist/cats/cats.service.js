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
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("@nestjs/typeorm");
const breed_entity_1 = require("../breeds/entities/breed.entity");
const cat_entity_1 = require("./entities/cat.entity");
const utils_1 = require("../utils/utils");
const user_entity_1 = require("../users/entities/user.entity");
const rol_enum_1 = require("../common/enums/rol.enum");
let CatsService = class CatsService {
    catRepository;
    breedRepository;
    userRepository;
    constructor(catRepository, breedRepository, userRepository) {
        this.catRepository = catRepository;
        this.breedRepository = breedRepository;
        this.userRepository = userRepository;
    }
    async create(createCatDto, user) {
        try {
            const userEntity = await this.userRepository.findOneBy({
                email: user.email,
            });
            if (!userEntity) {
                throw new common_1.BadRequestException('Usuario no encontrado');
            }
            const breedEntity = await this.breedRepository.findOne({
                where: { name: (0, typeorm_2.ILike)(createCatDto.breed) },
            });
            if (!breedEntity) {
                throw new common_1.BadRequestException(`Raza '${createCatDto.breed}' no encontrada`);
            }
            const newCat = this.catRepository.create({
                ...createCatDto,
                breed: { id: breedEntity.id },
                user: userEntity,
            });
            const savedCat = await this.catRepository.save(newCat);
            return {
                message: 'Gato creado exitosamente',
                data: {
                    ...savedCat,
                    userEmail: userEntity.email,
                },
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
            throw error;
        }
    }
    async findAll(user) {
        if (user.role === rol_enum_1.Role.ADMIN) {
            return await this.catRepository.find({
                relations: ['user', 'breed']
            });
        }
        return await this.catRepository.find({
            where: { user: { email: user.email } },
            relations: ['user', 'breed']
        });
    }
    async findOne(id, user) {
        try {
            const cat = await this.catRepository.findOneBy({ id });
            if (!cat) {
                throw new common_1.BadRequestException('El gatito seleccionado no pudo ser encontrado');
            }
            this.validateOwnership(cat, user);
            return {
                message: 'El gatito fue obtenido con éxito',
                data: cat,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async update(id, updateCatDto, user) {
        try {
            let breedEntity;
            if (updateCatDto.breedId) {
                breedEntity = await this.validateBreed(updateCatDto.breedId);
            }
            const updated = await this.catRepository.update(id, {
                ...updateCatDto,
                breed: breedEntity ?? undefined,
            });
            return {
                message: 'El gato ha sido actualizado con éxito',
                data: updated,
            };
        }
        catch (error) {
            utils_1.default.errorResponse({
                message: 'Error al actualizar el gato. Verifica los datos enviados',
                error,
            });
        }
    }
    async remove(id, user) {
        try {
            const cat = await this.findOne(id, user);
            if (!cat) {
                throw new common_1.NotFoundException('No se encontró el gatito seleccionado');
            }
            await this.catRepository.softDelete(id);
            return {
                message: 'El gatito seleccionado ha sido eliminado correctamente',
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async validateBreed(breedId) {
        try {
            const breed = await this.breedRepository.findOneBy({ id: breedId });
            if (!breed) {
                throw new common_1.BadRequestException('Raza no encontrada');
            }
            return breed;
        }
        catch (error) {
            utils_1.default.errorResponse(error);
            throw error;
        }
    }
    validateOwnership(cat, user) {
        if (!cat.user) {
            throw new common_1.UnauthorizedException('Gato sin dueño');
        }
        if (user.role !== rol_enum_1.Role.ADMIN && cat.user.email !== user.email) {
            throw new common_1.UnauthorizedException();
        }
    }
    findAllPublic() {
        return this.catRepository.find({
            relations: ['breed'],
            select: [
                'name',
                'age',
                'status',
                'imgUrl'
            ]
        });
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_3.InjectRepository)(cat_entity_1.Cat)),
    __param(1, (0, typeorm_3.InjectRepository)(breed_entity_1.Breed)),
    __param(2, (0, typeorm_3.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CatsService);
//# sourceMappingURL=cats.service.js.map