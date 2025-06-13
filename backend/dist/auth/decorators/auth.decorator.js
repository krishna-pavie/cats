"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guard/auth.guard");
const roles_guard_1 = require("../guard/roles.guard");
function Auth(...roles) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('roles', roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard));
}
//# sourceMappingURL=auth.decorator.js.map