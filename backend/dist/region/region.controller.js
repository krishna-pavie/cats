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
exports.RegionController = void 0;
const common_1 = require("@nestjs/common");
const region_service_1 = require("./region.service");
const create_region_dto_1 = require("./dto/create-region.dto");
const update_region_dto_1 = require("./dto/update-region.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const rol_enum_1 = require("../common/enums/rol.enum");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let RegionController = class RegionController {
    regionService;
    constructor(regionService) {
        this.regionService = regionService;
    }
    create(createRegionDto) {
        return this.regionService.create(createRegionDto);
    }
    findAll() {
        return this.regionService.findAll();
    }
    findOne(id) {
        return this.regionService.findOne(+id);
    }
    update(id, updateRegionDto) {
        return this.regionService.update(+id, updateRegionDto);
    }
    remove(id) {
        return this.regionService.remove(+id);
    }
};
exports.RegionController = RegionController;
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_region_dto_1.CreateRegionDto]),
    __metadata("design:returntype", void 0)
], RegionController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RegionController.prototype, "findAll", null);
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegionController.prototype, "findOne", null);
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_region_dto_1.UpdateRegionDto]),
    __metadata("design:returntype", void 0)
], RegionController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegionController.prototype, "remove", null);
exports.RegionController = RegionController = __decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.USER, rol_enum_1.Role.ADMIN),
    (0, common_1.Controller)('region'),
    __metadata("design:paramtypes", [region_service_1.RegionService])
], RegionController);
//# sourceMappingURL=region.controller.js.map