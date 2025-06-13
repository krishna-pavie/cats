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
exports.Cat = void 0;
const typeorm_1 = require("typeorm");
const breed_entity_1 = require("../../breeds/entities/breed.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Cat = class Cat {
    id;
    name;
    age;
    deleteAt;
    breed;
    status;
    imgUrl;
    user;
};
exports.Cat = Cat;
__decorate([
    (0, typeorm_1.Column)({ primary: true, generated: true }),
    __metadata("design:type", Number)
], Cat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cat.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Cat.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Cat.prototype, "deleteAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => breed_entity_1.Breed, (breed) => breed.id, {
        eager: true,
    }),
    __metadata("design:type", breed_entity_1.Breed)
], Cat.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.Column)(({ default: true })),
    __metadata("design:type", Boolean)
], Cat.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cat.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userEmail', referencedColumnName: 'email', }),
    __metadata("design:type", user_entity_1.User)
], Cat.prototype, "user", void 0);
exports.Cat = Cat = __decorate([
    (0, typeorm_1.Entity)()
], Cat);
//# sourceMappingURL=cat.entity.js.map