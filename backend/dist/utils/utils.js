"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class Utils {
    static errorResponse(error) {
        const payload = {
            statusCode: error.status,
            message: error.message,
            timestamp: new Date().toISOString(),
        };
        throw new common_1.HttpException(payload, error.status);
    }
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map