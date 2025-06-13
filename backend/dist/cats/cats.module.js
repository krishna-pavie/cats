"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const breeds_module_1 = require("../breeds/breeds.module");
const breeds_service_1 = require("../breeds/breeds.service");
const cats_service_1 = require("./cats.service");
const cats_controller_1 = require("./cats.controller");
const cat_entity_1 = require("./entities/cat.entity");
const users_module_1 = require("../users/users.module");
let CatsModule = class CatsModule {
};
exports.CatsModule = CatsModule;
exports.CatsModule = CatsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cat_entity_1.Cat]), breeds_module_1.BreedsModule, users_module_1.UsersModule],
        controllers: [cats_controller_1.CatsController],
        providers: [cats_service_1.CatsService, breeds_service_1.BreedsService],
    })
], CatsModule);
//# sourceMappingURL=cats.module.js.map