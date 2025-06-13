"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3007', 'http://localhost:8087'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Accept',
            'Authorization',
            'X-Requested-With',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Methods'
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.setGlobalPrefix('api/v1');
    const port = process.env.APP_PORT || 3007;
    await app.listen(port);
    console.log(`Servidor corriendo en http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map