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
exports.Breed = void 0;
const typeorm_1 = require("typeorm");
const cat_entity_1 = require("../../cats/entities/cat.entity");
let Breed = class Breed {
    id;
    name;
    cats;
    deletedAt;
};
exports.Breed = Breed;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Breed.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Breed.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cat_entity_1.Cat, (cat) => cat.breed),
    __metadata("design:type", Array)
], Breed.prototype, "cats", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Breed.prototype, "deletedAt", void 0);
exports.Breed = Breed = __decorate([
    (0, typeorm_1.Entity)()
], Breed);
//# sourceMappingURL=breed.entity.js.map