"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.Roles = exports.IS_PUBLIC_KEY = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
exports.IS_PUBLIC_KEY = 'isPublic';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=roles.decorator.js.map