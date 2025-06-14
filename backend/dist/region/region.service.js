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
exports.RegionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const region_entity_1 = require("./entities/region.entity");
const typeorm_2 = require("typeorm");
const utils_1 = require("../utils/utils");
let RegionService = class RegionService {
    regionRepository;
    constructor(regionRepository) {
        this.regionRepository = regionRepository;
    }
    async create(CreateRegionDto) {
        try {
            const newRegion = await this.regionRepository.save(CreateRegionDto);
            return {
                message: 'La región ha sido creada con éxito', data: newRegion,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async findAll() {
        try {
            const response = await this.regionRepository.find();
            return {
                message: 'Todas las regiones fueron obtenidas con exito!',
                data: response,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    async findOne(id) {
        try {
            const region = await this.regionRepository.findOneBy({ id });
            if (!region) {
                throw new common_1.BadRequestException('No se pudo encontrar la región seleccionada');
            }
            return {
                message: 'La región eleccionada ha sido obtenida con éxito',
                data: region,
            };
        }
        catch (error) {
            utils_1.default.errorResponse(error);
        }
    }
    update(id, updateRegionDto) {
        return `This action updates a #${id} region`;
    }
    remove(id) {
        return `This action removes a #${id} region`;
    }
};
exports.RegionService = RegionService;
exports.RegionService = RegionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(region_entity_1.Region)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RegionService);
//# sourceMappingURL=region.service.js.map