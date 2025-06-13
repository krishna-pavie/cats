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
exports.BreedsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const breed_entity_1 = require("./entities/breed.entity");
const utils_1 = require("../utils/utils");
let BreedsService = class BreedsService {
    breedRepository;
    constructor(breedRepository) {
        this.breedRepository = breedRepository;
    }
    async create(createBreedDto) {
        try {
            const newBreed = await this.breedRepository.save(createBreedDto);
            return {
                message: 'La raza ha sido creada con éxito', data: newBreed,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async findAll() {
        try {
            const response = await this.breedRepository.find();
            return {
                message: 'Todas las razas fueron obtenidas con exito!',
                data: response,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async findOne(id) {
        try {
            const breed = await this.breedRepository.findOneBy({ id });
            if (!breed) {
                throw new common_1.BadRequestException('No se pudo encontrar la raza seleccionada');
            }
            return {
                message: 'La raza eleccionada ha sido obtenida con éxito',
                data: breed,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async update(id, updateBreedDto) {
        try {
            const existingBreed = await this.findOne(id);
            if (!existingBreed) {
                throw new common_1.NotFoundException('No se encontró la raza seleccionada');
            }
            await this.breedRepository.update(id, updateBreedDto);
            return {
                message: 'La raza seleccionada ha sido actualizada correctamente',
                data: updateBreedDto,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async remove(id) {
        try {
            const breed = await this.findOne(id);
            if (!breed) {
                throw new common_1.NotFoundException('No se encontró la raza seleccionada');
            }
            await this.breedRepository.softDelete(id);
            return {
                message: 'La raza seleccionada ha sido eliminada correctamente'
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    findAllPublic() {
        return this.breedRepository.find({
            select: [
                'id',
                'name',
            ]
        });
    }
};
exports.BreedsService = BreedsService;
exports.BreedsService = BreedsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(breed_entity_1.Breed)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BreedsService);
//# sourceMappingURL=breeds.service.js.map