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
exports.BreedsController = void 0;
const common_1 = require("@nestjs/common");
const breeds_service_1 = require("./breeds.service");
const create_breed_dto_1 = require("./dto/create-breed.dto");
const update_breed_dto_1 = require("./dto/update-breed.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const rol_enum_1 = require("../common/enums/rol.enum");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let BreedsController = class BreedsController {
    breedsService;
    constructor(breedsService) {
        this.breedsService = breedsService;
    }
    create(createBreedDto) {
        return this.breedsService.create(createBreedDto);
    }
    findAllPublic() {
        return this.breedsService.findAllPublic();
    }
    findAll() {
        return this.breedsService.findAll();
    }
    findOne(id) {
        return this.breedsService.findOne(+id);
    }
    update(id, updateBreedDto) {
        return this.breedsService.update(+id, updateBreedDto);
    }
    remove(id) {
        return this.breedsService.remove(+id);
    }
};
exports.BreedsController = BreedsController;
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.USER, rol_enum_1.Role.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_breed_dto_1.CreateBreedDto]),
    __metadata("design:returntype", void 0)
], BreedsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('public'),
    (0, roles_decorator_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BreedsController.prototype, "findAllPublic", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BreedsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BreedsController.prototype, "findOne", null);
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.USER, rol_enum_1.Role.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_breed_dto_1.UpdateBreedDto]),
    __metadata("design:returntype", void 0)
], BreedsController.prototype, "update", null);
__decorate([
    (0, auth_decorator_1.Auth)(rol_enum_1.Role.USER, rol_enum_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BreedsController.prototype, "remove", null);
exports.BreedsController = BreedsController = __decorate([
    (0, common_1.Controller)('breeds'),
    __metadata("design:paramtypes", [breeds_service_1.BreedsService])
], BreedsController);
//# sourceMappingURL=breeds.controller.js.map